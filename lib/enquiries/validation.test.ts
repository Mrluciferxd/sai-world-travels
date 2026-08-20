import { describe, expect, it } from "vitest";

import { validateEnquiry } from "./validation";

const validEnquiry = {
  fullName: "Aarav Shah",
  phone: "+91 98765 43210",
  email: "aarav@example.com",
  referralContext: "Introduced by Priya",
  travelIntent: "A quiet family holiday with time outdoors.",
  preferredTiming: "December",
  consent: true,
  website: "",
};

describe("validateEnquiry", () => {
  it("normalises a minimal valid enquiry", () => {
    const result = validateEnquiry({
      ...validEnquiry,
      fullName: "  Aarav   Shah ",
      email: "",
      preferredTiming: "",
    });

    expect(result).toEqual({
      ok: true,
      isBot: false,
      data: {
        fullName: "Aarav Shah",
        phone: "+91 98765 43210",
        email: "",
        referralContext: "Introduced by Priya",
        travelIntent: "A quiet family holiday with time outdoors.",
        preferredTiming: "",
        consent: true,
      },
    });
  });

  it("reports user-correctable field errors", () => {
    const result = validateEnquiry({
      ...validEnquiry,
      fullName: "A",
      phone: "12",
      email: "not-email",
      referralContext: "",
      travelIntent: "Short",
      consent: false,
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.isBot).toBe(false);
      expect(result.fieldErrors).toMatchObject({
        fullName: expect.any(String),
        phone: expect.any(String),
        email: expect.any(String),
        referralContext: expect.any(String),
        travelIntent: expect.any(String),
        consent: expect.any(String),
      });
    }
  });

  it("silently identifies a filled honeypot", () => {
    expect(validateEnquiry({ ...validEnquiry, website: "spam.example" })).toEqual({
      ok: false,
      fieldErrors: {},
      isBot: true,
    });
  });

  it("rejects unknown fields and control characters", () => {
    const withUnknown = validateEnquiry({ ...validEnquiry, role: "admin" });
    const withControl = validateEnquiry({
      ...validEnquiry,
      fullName: "Aarav\u0000Shah",
    });

    expect(withUnknown.ok).toBe(false);
    expect(withControl.ok).toBe(false);
  });
});
