import {
  enquiryFieldNames,
  type EnquiryFieldErrors,
  type ValidatedEnquiry,
} from "./contracts";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+()\d][+()\d\s.-]{6,24}$/;

export const enquiryFieldLimits = {
  email: 254,
  fullName: 100,
  phone: 25,
  preferredTiming: 100,
  referralContext: 300,
  travelIntent: 1_500,
  website: 200,
} as const;

function clean(value: unknown, maximum: number) {
  if (typeof value !== "string") return null;
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(value)) return null;
  const normalized = value.trim().replace(/\s+/g, " ");
  return normalized.length <= maximum ? normalized : null;
}

export type ValidationResult =
  | { ok: true; data: ValidatedEnquiry; isBot: false }
  | { ok: false; fieldErrors: EnquiryFieldErrors; isBot: boolean };

export function validateEnquiry(input: unknown): ValidationResult {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return {
      ok: false,
      fieldErrors: { fullName: "Enter your name." },
      isBot: false,
    };
  }

  const record = input as Record<string, unknown>;
  const knownFields = new Set<string>(enquiryFieldNames);

  if (Object.keys(record).some((key) => !knownFields.has(key))) {
    return { ok: false, fieldErrors: {}, isBot: false };
  }

  const fullName = clean(record.fullName, enquiryFieldLimits.fullName);
  const phone = clean(record.phone, enquiryFieldLimits.phone);
  const email = clean(record.email ?? "", enquiryFieldLimits.email);
  const referralContext = clean(
    record.referralContext,
    enquiryFieldLimits.referralContext,
  );
  const travelIntent = clean(record.travelIntent, enquiryFieldLimits.travelIntent);
  const preferredTiming = clean(
    record.preferredTiming ?? "",
    enquiryFieldLimits.preferredTiming,
  );
  const website = clean(record.website ?? "", enquiryFieldLimits.website);

  if (website) {
    return { ok: false, fieldErrors: {}, isBot: true };
  }

  const fieldErrors: EnquiryFieldErrors = {};

  if (!fullName || fullName.length < 2) {
    fieldErrors.fullName = "Enter your full name.";
  }
  if (!phone || !PHONE_PATTERN.test(phone)) {
    fieldErrors.phone = "Enter a valid phone number.";
  }
  if (email === null || (email && !EMAIL_PATTERN.test(email))) {
    fieldErrors.email = "Enter a valid email address or leave it blank.";
  }
  if (!referralContext || referralContext.length < 2) {
    fieldErrors.referralContext = "Tell us who introduced you.";
  }
  if (!travelIntent || travelIntent.length < 10) {
    fieldErrors.travelIntent = "Share a little more about the journey.";
  }
  if (preferredTiming === null) {
    fieldErrors.preferredTiming = "Keep timing under 100 characters.";
  }
  if (record.consent !== true) {
    fieldErrors.consent = "Please agree so we can respond to your enquiry.";
  }

  if (
    Object.keys(fieldErrors).length ||
    !fullName ||
    !phone ||
    email === null ||
    !referralContext ||
    !travelIntent ||
    preferredTiming === null
  ) {
    return { ok: false, fieldErrors, isBot: false };
  }

  return {
    ok: true,
    isBot: false,
    data: {
      fullName,
      phone,
      email,
      referralContext,
      travelIntent,
      preferredTiming,
      consent: true,
    },
  };
}
