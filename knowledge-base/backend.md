# Backend and Supabase

## What this subsystem does
The backend accepts qualified referral enquiries, enforces validation and abuse controls, stores only necessary follow-up data, and keeps privileged database access on the server.

## How it is structured
- `app/api/enquiries/route.ts` is the Node.js-only HTTP boundary.
- `lib/enquiries/contracts.ts` defines the stable request and response envelope.
- `lib/enquiries/validation.ts` normalises and validates the shared field contract.
- `lib/enquiries/rate-limit.ts` provides bounded, process-local throttling without persisting raw addresses.
- `lib/enquiries/repository.ts` performs the timed server-only REST insert.
- `supabase/migrations/20260820081452_create_referral_enquiries.sql` defines the table, constraints, grants, and RLS posture.
- No hosted Supabase project is linked or modified.

## Conventions and rules
- Verify current Supabase documentation and changelog before implementation.
- Create migrations with the Supabase CLI rather than inventing filenames.
- Enable RLS on every exposed table.
- Anonymous visitors must never be able to select enquiry records.
- Never expose a service-role or secret key through a `NEXT_PUBLIC_` variable.
- Minimise retention and fields; do not collect passports, identity documents, or payment details.
- Validate on the server even when client-side validation exists.
- Require an exact JSON media type, no compressed request body, a configured same-origin value, and a 16 KiB streaming cap.
- Use `SITE_URL`, `SUPABASE_URL`, and `SUPABASE_SECRET_KEY`; none may use the `NEXT_PUBLIC_` prefix.
- Current `sb_secret_*` keys are sent only in the `apikey` header. Do not add a bearer header intended for legacy JWT keys.
- Return only stable generic response codes. Do not log or return names, contact details, referral context, travel intent, IPs, database errors, or keys.

## Known gotchas
- Data API grants and RLS are separate controls; the migration revokes `PUBLIC`, `anon`, and `authenticated`, enables RLS, and creates no public policy.
- The secret key maps to privileged server access and bypasses RLS; it must remain confined to the Node.js route.
- The current per-client signal is derived from proxy headers and the limiter is process-local. It is defense in depth, not distributed protection, until Hostinger's trusted-proxy behavior and an upstream/durable limit are verified.
- Supabase is not provisioned, so migration execution, pgTAP, anonymous denial, a real insert, and advisors remain pre-production gates.
- No approved retention schedule exists yet. Do not apply the migration to production until retention and operational ownership are approved.

## How it is tested
Vitest covers valid and invalid submissions, exact content type, canonical origin, bounded streamed bodies, honeypot behavior, process-local limiting, unavailable configuration, safe upstream failure, adapter headers, and validation. The migration and plain catalog/privilege/boundary probes ran on an isolated PostgreSQL 17 instance. The pgTAP file under `supabase/tests/database/` documents the database contract but has not executed because the pgTAP extension and Supabase database-test harness are unavailable. Before release, execute it in the approved Supabase project and verify a real Data API insert, anonymous read denial, migration history, and security/performance advisors.

## Related knowledge-base files
- [Architecture](architecture.md)
- [Product](product.md)
- [Testing](testing.md)
- [Deployment](deployment.md)
- [Referral enquiries](enquiries.md)
