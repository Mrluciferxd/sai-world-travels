import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { resetEnquiryRateLimitForTests } from "../../../lib/enquiries/rate-limit";
import { POST } from "./route";

const originalUrl = process.env.SUPABASE_URL;
const originalKey = process.env.SUPABASE_SECRET_KEY;
const originalSiteUrl = process.env.SITE_URL;

const validBody = {
  fullName: "Aarav Shah",
  phone: "+91 98765 43210",
  email: "",
  referralContext: "Introduced by Priya",
  travelIntent: "A quiet family holiday with time outdoors.",
  preferredTiming: "December",
  consent: true,
  website: "",
};

let clientNumber = 0;

function request(
  body: unknown,
  options: {
    contentEncoding?: string;
    contentType?: string;
    origin?: string;
    raw?: string;
    url?: string;
  } = {},
) {
  clientNumber += 1;
  return new NextRequest(options.url ?? "http://localhost:3000/api/enquiries", {
    method: "POST",
    headers: {
      ...(options.contentEncoding
        ? { "content-encoding": options.contentEncoding }
        : {}),
      "content-type": options.contentType ?? "application/json",
      origin: options.origin ?? "http://localhost:3000",
      "x-forwarded-for": `203.0.113.${clientNumber}`,
    },
    body: options.raw ?? JSON.stringify(body),
  });
}

beforeEach(() => {
  resetEnquiryRateLimitForTests();
  process.env.SUPABASE_URL = "https://example.supabase.co";
  process.env.SUPABASE_SECRET_KEY = "sb_secret_test";
  process.env.SITE_URL = "http://localhost:3000";
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 201 })));
});

afterEach(() => {
  vi.unstubAllGlobals();
  process.env.SUPABASE_URL = originalUrl;
  process.env.SUPABASE_SECRET_KEY = originalKey;
  process.env.SITE_URL = originalSiteUrl;
});

describe("POST /api/enquiries", () => {
  it("persists a valid same-origin enquiry", async () => {
    const response = await POST(request(validBody));

    expect(response.status).toBe(201);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(fetch).toHaveBeenCalledOnce();
  });

  it("rejects unsupported media, encoding, and cross-origin requests", async () => {
    const media = await POST(request(validBody, { contentType: "application/jsonbad" }));
    const encoding = await POST(request(validBody, { contentEncoding: "gzip" }));
    const origin = await POST(
      request(validBody, {
        origin: "https://attacker.example",
        url: "https://attacker.example/api/enquiries",
      }),
    );

    expect(media.status).toBe(415);
    expect(encoding.status).toBe(415);
    expect(origin.status).toBe(400);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("uses the configured canonical origin instead of a spoofed request host", async () => {
    process.env.SITE_URL = "https://saiworldtravels.in";
    const accepted = await POST(
      request(validBody, {
        origin: "https://saiworldtravels.in",
        url: "https://spoofed-host.example/api/enquiries",
      }),
    );
    const missingOrigin = await POST(
      new NextRequest("https://saiworldtravels.in/api/enquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(validBody),
      }),
    );

    expect(accepted.status).toBe(201);
    expect(missingOrigin.status).toBe(400);
  });

  it("rejects malformed, oversized, and invalid bodies", async () => {
    const malformed = await POST(request(null, { raw: "{" }));
    const oversized = await POST(
      request(null, { raw: JSON.stringify({ value: "x".repeat(17_000) }) }),
    );
    const invalid = await POST(request({ ...validBody, consent: false }));
    const encoder = new TextEncoder();
    const streamed = await POST(
      new NextRequest("http://localhost:3000/api/enquiries", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          origin: "http://localhost:3000",
          "x-forwarded-for": "203.0.113.220",
        },
        body: new ReadableStream({
          start(controller) {
            controller.enqueue(encoder.encode("x".repeat(9_000)));
            controller.enqueue(encoder.encode("x".repeat(9_000)));
            controller.close();
          },
        }),
        duplex: "half",
      }),
    );

    expect(malformed.status).toBe(400);
    expect(oversized.status).toBe(413);
    expect(streamed.status).toBe(413);
    expect(invalid.status).toBe(400);
    await expect(invalid.json()).resolves.toMatchObject({
      ok: false,
      code: "INVALID_REQUEST",
      fieldErrors: { consent: expect.any(String) },
    });
  });

  it("returns indistinguishable success for the honeypot without inserting", async () => {
    const response = await POST(request({ ...validBody, website: "spam.example" }));

    expect(response.status).toBe(201);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(fetch).not.toHaveBeenCalled();
  });

  it("fails closed when persistence is not configured", async () => {
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_SECRET_KEY;

    const response = await POST(request(validBody));

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      ok: false,
      code: "ENQUIRY_UNAVAILABLE",
    });
  });

  it("returns a generic server error without upstream details", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("sensitive details", { status: 500 })),
    );

    const response = await POST(request(validBody));

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      ok: false,
      code: "SUBMISSION_FAILED",
    });
  });

  it("limits repeated attempts with a retry interval", async () => {
    const repeatedRequest = () =>
      new NextRequest("http://localhost:3000/api/enquiries", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          origin: "http://localhost:3000",
          "x-forwarded-for": "203.0.113.250",
        },
        body: JSON.stringify({ ...validBody, consent: false }),
      });

    await POST(repeatedRequest());
    await POST(repeatedRequest());
    await POST(repeatedRequest());
    await POST(repeatedRequest());
    const response = await POST(repeatedRequest());

    expect(response.status).toBe(429);
    expect(response.headers.get("retry-after")).toMatch(/^\d+$/);
  });
});
