"use client";

import Link from "next/link";
import {
  type FormEvent,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  EnquiryFieldErrors,
  EnquiryRequest,
  EnquiryResponse,
} from "../lib/enquiries/contracts";
import {
  enquiryFieldLimits,
  validateEnquiry,
} from "../lib/enquiries/validation";

type SubmissionState =
  | "idle"
  | "submitting"
  | "success"
  | "validation"
  | "unavailable";

type ErrorField = keyof EnquiryFieldErrors;

function readPayload(form: HTMLFormElement): EnquiryRequest {
  const formData = new FormData(form);

  return {
    fullName: String(formData.get("fullName") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    referralContext: String(formData.get("referralContext") ?? "").trim(),
    travelIntent: String(formData.get("travelIntent") ?? "").trim(),
    preferredTiming: String(formData.get("preferredTiming") ?? "").trim(),
    consent: formData.get("consent") === "on",
    website: String(formData.get("website") ?? "").trim(),
  };
}

function isEnquiryResponse(payload: unknown): payload is EnquiryResponse {
  return Boolean(
    payload &&
      typeof payload === "object" &&
      "ok" in payload &&
      typeof payload.ok === "boolean",
  );
}

function FieldError({ field, errors }: { field: ErrorField; errors: EnquiryFieldErrors }) {
  const message = errors[field];

  return message ? (
    <span className="enquiry-field-error" id={`${field}-error`}>
      {message}
    </span>
  ) : null;
}

function focusStatus(ref: RefObject<HTMLDivElement | null>) {
  ref.current?.focus();
}

export function ReferralEnquiryForm() {
  const [state, setState] = useState<SubmissionState>("idle");
  const [fieldErrors, setFieldErrors] = useState<EnquiryFieldErrors>({});
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state === "success" || state === "validation" || state === "unavailable") {
      focusStatus(statusRef);
    }
  }, [state]);

  function clearFieldError(field: ErrorField) {
    if (!fieldErrors[field]) {
      return;
    }

    setFieldErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const payload = readPayload(form);
    const validation = validateEnquiry(payload);

    if (!validation.ok && !validation.isBot) {
      setFieldErrors(validation.fieldErrors);
      setState("validation");
      return;
    }

    setFieldErrors({});
    setState("submitting");

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responsePayload: unknown = await response.json().catch(() => null);

      if (response.ok && isEnquiryResponse(responsePayload) && responsePayload.ok) {
        form.reset();
        setState("success");
        return;
      }

      if (
        response.status === 400 &&
        isEnquiryResponse(responsePayload) &&
        !responsePayload.ok &&
        responsePayload.code === "INVALID_REQUEST" &&
        responsePayload.fieldErrors &&
        Object.keys(responsePayload.fieldErrors).length > 0
      ) {
        setFieldErrors(responsePayload.fieldErrors);
        setState("validation");
        return;
      }

      setState("unavailable");
    } catch {
      setState("unavailable");
    }
  }

  if (state === "success") {
    return (
      <div
        className="enquiry-result enquiry-result-success"
        ref={statusRef}
        role="status"
        tabIndex={-1}
      >
        <span aria-hidden="true">04 / Received</span>
        <h2>Your referral enquiry was received.</h2>
        <p>Thank you for sharing the first details of your journey.</p>
        <Link href="/">Return to the homepage</Link>
      </div>
    );
  }

  const isSubmitting = state === "submitting";

  return (
    <form className="referral-enquiry-form" noValidate onSubmit={handleSubmit}>
      <div className="enquiry-form-heading">
        <span aria-hidden="true">Private enquiry / 04</span>
        <h2>Tell us where your journey begins.</h2>
        <p>Required fields are marked with an asterisk.</p>
      </div>

      {state === "validation" ? (
        <div
          className="enquiry-form-status enquiry-form-status-error"
          ref={statusRef}
          role="alert"
          tabIndex={-1}
        >
          <strong>Check the highlighted details.</strong>
          <p>Your enquiry has not been sent yet.</p>
        </div>
      ) : null}

      {state === "unavailable" ? (
        <div
          className="enquiry-form-status enquiry-form-status-unavailable"
          ref={statusRef}
          role="alert"
          tabIndex={-1}
        >
          <strong>Your enquiry could not be sent.</strong>
          <p>Please wait a little and try again.</p>
        </div>
      ) : null}

      <div className="enquiry-field-grid">
        <div className="enquiry-field" data-step="01">
          <label htmlFor="fullName">
            Full name <span aria-hidden="true">*</span>
          </label>
          <input
            aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
            aria-invalid={fieldErrors.fullName ? "true" : undefined}
            autoComplete="name"
            id="fullName"
            maxLength={enquiryFieldLimits.fullName}
            name="fullName"
            onChange={() => clearFieldError("fullName")}
            required
            type="text"
          />
          <FieldError errors={fieldErrors} field="fullName" />
        </div>

        <div className="enquiry-field" data-step="02">
          <label htmlFor="phone">
            Phone number <span aria-hidden="true">*</span>
          </label>
          <input
            aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
            aria-invalid={fieldErrors.phone ? "true" : undefined}
            autoComplete="tel"
            id="phone"
            inputMode="tel"
            maxLength={enquiryFieldLimits.phone}
            name="phone"
            onChange={() => clearFieldError("phone")}
            required
            type="tel"
          />
          <FieldError errors={fieldErrors} field="phone" />
        </div>

        <div className="enquiry-field" data-step="03">
          <label htmlFor="email">Email address <small>Optional</small></label>
          <input
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            aria-invalid={fieldErrors.email ? "true" : undefined}
            autoComplete="email"
            id="email"
            maxLength={enquiryFieldLimits.email}
            name="email"
            onChange={() => clearFieldError("email")}
            type="email"
          />
          <FieldError errors={fieldErrors} field="email" />
        </div>

        <div className="enquiry-field" data-step="04">
          <label htmlFor="preferredTiming">Preferred travel timing <small>Optional</small></label>
          <input
            aria-describedby={fieldErrors.preferredTiming ? "preferredTiming-error" : undefined}
            aria-invalid={fieldErrors.preferredTiming ? "true" : undefined}
            autoComplete="off"
            id="preferredTiming"
            maxLength={enquiryFieldLimits.preferredTiming}
            name="preferredTiming"
            onChange={() => clearFieldError("preferredTiming")}
            placeholder="For example, October or flexible"
            type="text"
          />
          <FieldError errors={fieldErrors} field="preferredTiming" />
        </div>
      </div>

      <div className="enquiry-field enquiry-field-wide" data-step="05">
        <label htmlFor="referralContext">
          Who introduced you to Sai World Travels? <span aria-hidden="true">*</span>
        </label>
        <textarea
          aria-describedby={fieldErrors.referralContext ? "referralContext-error" : undefined}
          aria-invalid={fieldErrors.referralContext ? "true" : undefined}
          id="referralContext"
          maxLength={enquiryFieldLimits.referralContext}
          name="referralContext"
          onChange={() => clearFieldError("referralContext")}
          required
          rows={3}
        />
        <FieldError errors={fieldErrors} field="referralContext" />
      </div>

      <div className="enquiry-field enquiry-field-wide" data-step="06">
        <label htmlFor="travelIntent">
          What kind of journey do you have in mind? <span aria-hidden="true">*</span>
        </label>
        <textarea
          aria-describedby={fieldErrors.travelIntent ? "travelIntent-error" : undefined}
          aria-invalid={fieldErrors.travelIntent ? "true" : undefined}
          id="travelIntent"
          maxLength={enquiryFieldLimits.travelIntent}
          name="travelIntent"
          onChange={() => clearFieldError("travelIntent")}
          required
          rows={5}
        />
        <FieldError errors={fieldErrors} field="travelIntent" />
      </div>

      <div className="enquiry-honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          autoComplete="off"
          id="website"
          maxLength={enquiryFieldLimits.website}
          name="website"
          tabIndex={-1}
          type="text"
        />
      </div>

      <div className="enquiry-consent">
        <input
          aria-describedby={fieldErrors.consent ? "consent-error" : undefined}
          aria-invalid={fieldErrors.consent ? "true" : undefined}
          id="consent"
          name="consent"
          onChange={() => clearFieldError("consent")}
          required
          type="checkbox"
        />
        <div>
          <label htmlFor="consent">
            I agree that Sai World Travels may use these details to respond to this enquiry.
            <span aria-hidden="true"> *</span>
          </label>
          <FieldError errors={fieldErrors} field="consent" />
        </div>
      </div>

      <div className="enquiry-submit-row">
        <p>Do not include passport, identity, payment, or other sensitive information.</p>
        <button className="button enquiry-submit" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Sending enquiry…" : "Send referral enquiry"}
        </button>
      </div>

      <p className="enquiry-live-status" aria-live="polite">
        {isSubmitting ? "Sending your enquiry." : ""}
      </p>
    </form>
  );
}
