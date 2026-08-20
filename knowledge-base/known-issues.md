## ISSUE-001: Existing production website does not render
**Status**: Open
**Severity**: High
**Discovered**: 2026-08-20
**Resolved**:
**Symptom**: `saiworldtravels.in` remains on a blank loading screen and displays a browser alert.
**Root Cause**: The observed page reports a JavaScript syntax error. The old source and hosting configuration are not part of this workspace, so the deeper cause is not yet verified.
**Workaround**: Build and verify the replacement locally without changing the current domain.
**Fix**: Replace the existing site only after the new Hostinger production deployment passes production-readiness checks and the user approves the domain change.
**Regression Test**: Future deployment smoke test for the public home page.

## ISSUE-002: Final production content is not yet supplied
**Status**: Open
**Severity**: Medium
**Discovered**: 2026-08-20
**Resolved**:
**Symptom**: Official contact details, approved testimonials, travel photographs, legal copy, and complete company history are unavailable.
**Root Cause**: The project is beginning with product discovery and a logo only.
**Workaround**: Use clearly identifiable draft content during development and never invent unverifiable business claims.
**Fix**:
**Regression Test**: Pre-launch content review checklist.

## ISSUE-003: Supabase project is not provisioned
**Status**: Open
**Severity**: Low
**Discovered**: 2026-08-20
**Resolved**:
**Symptom**: The local enquiry API and migration exist, but there is no project reference, hosted migration history, or deployed environment configuration.
**Root Cause**: External backend provisioning is deliberately deferred until the user approves a specific Supabase project.
**Workaround**: Use mocked REST tests and the isolated PostgreSQL schema probes; the public API fails closed with a generic 503 when credentials are absent.
**Fix**: Link the approved project, apply the committed migration through the CLI, run pgTAP/advisors, verify a real server insert, and prove anonymous select/insert denial before deployment.
**Regression Test**: `app/api/enquiries/route.test.ts`, `lib/enquiries/repository.test.ts`, and `supabase/tests/database/referral_enquiries.test.sql` (database test authored but not yet executed).

## ISSUE-004: Supplied logo is not production-quality
**Status**: Open
**Severity**: Medium
**Discovered**: 2026-08-20
**Resolved**:
**Symptom**: The supplied 200 x 200 JPEG has a white background and loses clarity at larger display sizes.
**Root Cause**: No transparent high-resolution or vector brand master was supplied.
**Workaround**: Phase 1 renders the exact supplied image at small sizes through `next/image`.
**Fix**: Create and obtain approval for a clean transparent/vector-quality logo before launch.
**Regression Test**: Manual retina/mobile header and social-preview review.

## ISSUE-005: Hostinger runtime version not yet reproduced locally
**Status**: Open
**Severity**: Low
**Discovered**: 2026-08-20
**Resolved**:
**Symptom**: The project declares Node 22–24 for Hostinger, while the available local workspace runtime is newer.
**Root Cause**: A Hostinger-equivalent Node runtime is not currently configured in this workspace.
**Workaround**: Keep dependencies within the declared engine range and use standard Next.js build/start commands.
**Fix**: Re-run frozen install, verification, production start, and image smoke tests on Node 22 or 24 before production deployment.
**Regression Test**: Hostinger preview-domain smoke test and runtime log review.

## ISSUE-006: Enquiry rate limiting is not distributed
**Status**: Open
**Severity**: Medium
**Discovered**: 2026-08-20
**Resolved**:
**Symptom**: Rate counters reset on a Node.js restart and are not shared if Hostinger runs more than one process; proxy headers are not yet verified against Hostinger's actual forwarding behavior.
**Root Cause**: Phase 4 intentionally uses bounded process-local defense in depth until the production topology is known.
**Workaround**: Keep the honeypot, strict origin/media/size/validation checks, per-client hashed limiter, and process-wide ceiling enabled. Do not describe the control as distributed or durable.
**Fix**: Verify trusted proxy behavior on the Hostinger preview and add an upstream or durable limiter before higher-volume production exposure.
**Regression Test**: `lib/enquiries/rate-limit.test.ts`, `app/api/enquiries/route.test.ts`, and Hostinger proxy/load smoke tests.

## ISSUE-007: Enquiry retention and final privacy wording are not approved
**Status**: Open
**Severity**: Medium
**Discovered**: 2026-08-20
**Resolved**:
**Symptom**: The schema records necessary enquiry details and consent time, but there is no owner-approved retention period, deletion process, Privacy page, or final legal wording.
**Root Cause**: Official legal/content inputs have not been supplied.
**Workaround**: Do not apply the migration to production. Keep the form limited to follow-up details and warn visitors not to share documents, identity data, or payment information.
**Fix**: Approve retention, operational ownership, deletion procedure, and legal/privacy copy before launch.
**Regression Test**: Pre-launch privacy/content review and controlled retention/deletion test.
