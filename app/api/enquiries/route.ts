import { NextRequest, NextResponse } from "next/server";

import type { EnquiryResponse } from "../../../lib/enquiries/contracts";
import {
  clientRateKey,
  takeEnquiryAttempt,
  takeGlobalEnquiryAttempt,
} from "../../../lib/enquiries/rate-limit";
import {
  EnquiryRepositoryUnavailableError,
  saveEnquiry,
} from "../../../lib/enquiries/repository";
import { validateEnquiry } from "../../../lib/enquiries/validation";

const MAX_BODY_BYTES = 16 * 1_024;

export const runtime = "nodejs";

function json(body: EnquiryResponse, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    const allowedOrigins = new Set<string>();
    const configuredOrigin = process.env.SITE_URL?.trim();

    if (configuredOrigin) {
      const configuredUrl = new URL(configuredOrigin);
      if (!["http:", "https:"].includes(configuredUrl.protocol)) return false;
      allowedOrigins.add(configuredUrl.origin);
    }
    if (process.env.NODE_ENV !== "production") {
      allowedOrigins.add("http://localhost:3000");
      allowedOrigins.add("http://127.0.0.1:3000");
    }

    return allowedOrigins.has(new URL(origin).origin);
  } catch {
    return false;
  }
}

async function readBoundedBody(request: NextRequest) {
  if (!request.body) return "";

  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let total = 0;
  let body = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      total += value.byteLength;
      if (total > MAX_BODY_BYTES) {
        await reader.cancel();
        return null;
      }
      body += decoder.decode(value, { stream: true });
    }

    body += decoder.decode();
    return body;
  } catch {
    return undefined;
  }
}

export async function POST(request: NextRequest) {
  const mediaType = request.headers
    .get("content-type")
    ?.split(";", 1)[0]
    .trim()
    .toLowerCase();
  const contentEncoding = request.headers.get("content-encoding")?.toLowerCase();

  if (mediaType !== "application/json" || (contentEncoding && contentEncoding !== "identity")) {
    return json({ ok: false, code: "UNSUPPORTED_MEDIA_TYPE" }, 415);
  }

  if (!isSameOrigin(request)) {
    return json({ ok: false, code: "INVALID_REQUEST" }, 400);
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return json({ ok: false, code: "INVALID_REQUEST" }, 413);
  }

  const globalRate = takeGlobalEnquiryAttempt();
  const rate = globalRate.allowed
    ? takeEnquiryAttempt(clientRateKey(request))
    : globalRate;
  if (!rate.allowed) {
    return json(
      { ok: false, code: "TOO_MANY_REQUESTS" },
      429,
      { "Retry-After": String(rate.retryAfterSeconds) },
    );
  }

  const rawBody = await readBoundedBody(request);
  if (rawBody === null) {
    return json({ ok: false, code: "INVALID_REQUEST" }, 413);
  }
  if (rawBody === undefined) {
    return json({ ok: false, code: "INVALID_REQUEST" }, 400);
  }

  let input: unknown;
  try {
    input = JSON.parse(rawBody);
  } catch {
    return json({ ok: false, code: "INVALID_REQUEST" }, 400);
  }

  const validation = validateEnquiry(input);
  if (!validation.ok) {
    if (validation.isBot) {
      return json({ ok: true }, 201);
    }

    return json(
      {
        ok: false,
        code: "INVALID_REQUEST",
        fieldErrors: validation.fieldErrors,
      },
      400,
    );
  }

  try {
    await saveEnquiry(validation.data);
    return json({ ok: true }, 201);
  } catch (error) {
    if (error instanceof EnquiryRepositoryUnavailableError) {
      return json({ ok: false, code: "ENQUIRY_UNAVAILABLE" }, 503);
    }

    return json({ ok: false, code: "SUBMISSION_FAILED" }, 500);
  }
}
