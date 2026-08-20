import { afterEach, describe, expect, it, vi } from "vitest";

import {
  EnquiryRepositoryUnavailableError,
  EnquiryRepositoryWriteError,
  isEnquiryRepositoryConfigured,
  saveEnquiry,
} from "./repository";

const originalUrl = process.env.SUPABASE_URL;
const originalKey = process.env.SUPABASE_SECRET_KEY;

afterEach(() => {
  vi.unstubAllGlobals();
  if (originalUrl === undefined) delete process.env.SUPABASE_URL;
  else process.env.SUPABASE_URL = originalUrl;
  if (originalKey === undefined) delete process.env.SUPABASE_SECRET_KEY;
  else process.env.SUPABASE_SECRET_KEY = originalKey;
});

const enquiry = {
  fullName: "Aarav Shah",
  phone: "+91 98765 43210",
  email: "",
  referralContext: "Introduced by Priya",
  travelIntent: "A quiet family holiday with time outdoors.",
  preferredTiming: "December",
  consent: true as const,
};

describe("enquiry repository", () => {
  it("fails closed when server-only configuration is absent", async () => {
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_SECRET_KEY;

    expect(isEnquiryRepositoryConfigured()).toBe(false);
    await expect(saveEnquiry(enquiry)).rejects.toBeInstanceOf(
      EnquiryRepositoryUnavailableError,
    );
  });

  it("sends a minimal insert using only the secret apikey header", async () => {
    process.env.SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SECRET_KEY = "sb_secret_test";
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 201 }));
    vi.stubGlobal("fetch", fetchMock);

    await saveEnquiry(enquiry);

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://example.supabase.co/rest/v1/referral_enquiries");
    expect(init.headers).toMatchObject({ apikey: "sb_secret_test" });
    expect(init.headers).not.toHaveProperty("Authorization");
    expect(JSON.parse(String(init.body))).toMatchObject({
      full_name: "Aarav Shah",
      email: null,
      consent_at: expect.any(String),
    });
  });

  it("does not expose upstream error details", async () => {
    process.env.SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SECRET_KEY = "sb_secret_test";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("database internals", { status: 500 })),
    );

    await expect(saveEnquiry(enquiry)).rejects.toEqual(
      new EnquiryRepositoryWriteError(
        "Enquiry persistence failed with status 500.",
      ),
    );
  });
});
