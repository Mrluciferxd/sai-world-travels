import { beforeEach, describe, expect, it } from "vitest";

import {
  clientRateKey,
  resetEnquiryRateLimitForTests,
  takeEnquiryAttempt,
  takeGlobalEnquiryAttempt,
} from "./rate-limit";

beforeEach(resetEnquiryRateLimitForTests);

describe("enquiry rate limit", () => {
  it("hashes client signals instead of storing a raw address", () => {
    const request = new Request("https://example.com", {
      headers: {
        "x-forwarded-for": "203.0.113.10, 10.0.0.1",
        "user-agent": "test-agent",
      },
    });

    const key = clientRateKey(request);
    expect(key).not.toContain("203.0.113.10");
    expect(key.length).toBeGreaterThan(20);
  });

  it("limits repeated attempts and permits them after expiry", () => {
    const start = 1_000;
    expect(takeEnquiryAttempt("client", start).allowed).toBe(true);
    expect(takeEnquiryAttempt("client", start).allowed).toBe(true);
    expect(takeEnquiryAttempt("client", start).allowed).toBe(true);
    expect(takeEnquiryAttempt("client", start).allowed).toBe(true);

    const denied = takeEnquiryAttempt("client", start);
    expect(denied.allowed).toBe(false);
    expect(denied.retryAfterSeconds).toBeGreaterThan(0);
    expect(takeEnquiryAttempt("client", start + 10 * 60 * 1_000).allowed).toBe(true);
  });

  it("places a separate ceiling on total process traffic", () => {
    const start = 1_000;
    for (let index = 0; index < 40; index += 1) {
      expect(takeGlobalEnquiryAttempt(start).allowed).toBe(true);
    }

    expect(takeGlobalEnquiryAttempt(start).allowed).toBe(false);
    expect(takeGlobalEnquiryAttempt(start + 60_000).allowed).toBe(true);
  });
});
