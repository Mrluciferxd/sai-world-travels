import type { ValidatedEnquiry } from "./contracts";

export class EnquiryRepositoryUnavailableError extends Error {}
export class EnquiryRepositoryWriteError extends Error {}

function readConfiguration() {
  const url = process.env.SUPABASE_URL?.trim();
  const secretKey = process.env.SUPABASE_SECRET_KEY?.trim();

  if (!url || !secretKey) {
    throw new EnquiryRepositoryUnavailableError(
      "The enquiry repository is not configured.",
    );
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new EnquiryRepositoryUnavailableError(
      "The enquiry repository URL is invalid.",
    );
  }

  const isLocal = ["localhost", "127.0.0.1"].includes(parsed.hostname);
  if (parsed.protocol !== "https:" && !(isLocal && parsed.protocol === "http:")) {
    throw new EnquiryRepositoryUnavailableError(
      "The enquiry repository URL must use HTTPS outside local development.",
    );
  }

  return { secretKey, url: parsed.origin };
}

export function isEnquiryRepositoryConfigured() {
  try {
    readConfiguration();
    return true;
  } catch {
    return false;
  }
}

export async function saveEnquiry(enquiry: ValidatedEnquiry) {
  const { secretKey, url } = readConfiguration();
  const response = await fetch(`${url}/rest/v1/referral_enquiries`, {
    method: "POST",
    headers: {
      apikey: secretKey,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      full_name: enquiry.fullName,
      phone: enquiry.phone,
      email: enquiry.email || null,
      referral_context: enquiry.referralContext,
      travel_intent: enquiry.travelIntent,
      preferred_timing: enquiry.preferredTiming || null,
      consent_at: new Date().toISOString(),
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) {
    throw new EnquiryRepositoryWriteError(
      `Enquiry persistence failed with status ${response.status}.`,
    );
  }
}
