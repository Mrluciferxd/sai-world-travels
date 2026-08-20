export const enquiryFieldNames = [
  "fullName",
  "phone",
  "email",
  "referralContext",
  "travelIntent",
  "preferredTiming",
  "consent",
  "website",
] as const;

export type EnquiryFieldName = (typeof enquiryFieldNames)[number];

export type EnquiryRequest = {
  fullName: string;
  phone: string;
  email: string;
  referralContext: string;
  travelIntent: string;
  preferredTiming: string;
  consent: boolean;
  website: string;
};

export type EnquiryFieldErrors = Partial<
  Record<Exclude<EnquiryFieldName, "website">, string>
>;

export type EnquiryErrorCode =
  | "INVALID_REQUEST"
  | "UNSUPPORTED_MEDIA_TYPE"
  | "TOO_MANY_REQUESTS"
  | "ENQUIRY_UNAVAILABLE"
  | "SUBMISSION_FAILED";

export type EnquiryResponse =
  | { ok: true }
  | {
      ok: false;
      code: EnquiryErrorCode;
      fieldErrors?: EnquiryFieldErrors;
    };

export type ValidatedEnquiry = Omit<EnquiryRequest, "website"> & {
  consent: true;
};
