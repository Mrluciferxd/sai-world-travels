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
**Symptom**: There is no project reference, migration history, or environment configuration for the planned enquiry backend.
**Root Cause**: Backend provisioning is deliberately deferred until the relevant phase.
**Workaround**: Keep Phase 1 frontend-only and define the integration boundary in documentation.
**Fix**:
**Regression Test**: Local migration and real insert-path tests when the backend phase starts.

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
