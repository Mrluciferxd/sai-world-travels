# Referral Enquiries

## What this subsystem does
The referral-enquiry subsystem gives a referred traveller one private, non-commerce path to share the minimum details needed for a personal follow-up. It does not quote, confirm, book, take payment, or collect travel documents.

## How it is structured
The `/plan-your-journey` route renders `ReferralEnquiryForm` inside the shared folio shell. The client posts the typed `EnquiryRequest` JSON to `POST /api/enquiries`. The route applies media, origin, size, rate, honeypot, and shared validation checks before `repository.ts` inserts into `public.referral_enquiries`. The database row contains an internal UUID, name, phone, optional email, referral context, travel intent, optional timing, consent timestamp, creation timestamp, and a constrained follow-up status.

## Conventions and rules
- Phone is the required follow-up channel; email is optional.
- Collect no passport, identity, payment, date-of-birth, address, or document data.
- Keep the request and response types in `lib/enquiries/contracts.ts` and field rules in `validation.ts`; the client must import them rather than duplicate them.
- Preserve entered values on validation and unavailable states. Clear the form only after an HTTP-success response with `{ "ok": true }`.
- Honeypot submissions receive the same success response without a database insert.
- `SITE_URL` is the canonical allowed origin. Localhost origins are accepted only outside production.
- The database is never called from the browser. `SUPABASE_SECRET_KEY` is server-only.
- Do not expose database IDs or raw error messages in public responses.
- Do not claim the enquiry is operational in production until the hosted migration, real insert, anonymous denial, advisors, retention, and Hostinger proxy checks pass.

## Known gotchas
- The in-memory limiter resets during deploys/restarts and is not shared across processes.
- Proxy-derived client signals are only trustworthy after Hostinger's forwarding behavior is verified.
- The success response deliberately reveals no submission reference.
- The consent sentence authorises response to the enquiry; it is not a substitute for owner-approved privacy/legal copy.
- The migration and plain PostgreSQL probes ran in isolated PostgreSQL 17; the pgTAP contract itself has not run because that extension and the Supabase test harness are unavailable.

## How it is tested
Run `pnpm test -- app/api/enquiries components/referral-enquiry-form lib/enquiries app/plan-your-journey`, followed by `pnpm verify`. In a controlled Supabase project, apply the migration through the CLI, run `supabase/tests/database/referral_enquiries.test.sql`, confirm a server insert, confirm `anon` cannot select or insert, inspect migration history, and run security/performance advisors. Browser QA must cover validation, pending, unavailable, and successful mocked states at 390 x 844 and desktop width.

## Related knowledge-base files
- [Backend and Supabase](backend.md)
- [Product](product.md)
- [Testing](testing.md)
- [Deployment](deployment.md)
- [Known issues](known-issues.md)
