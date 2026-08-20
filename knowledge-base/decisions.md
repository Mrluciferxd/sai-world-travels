## Decision: Referral-led concierge positioning
**Date**: 2026-08-20
**Status**: Accepted
**Context**: Sai World Travels personally handles complete trip planning and booking but serves clients through past-customer referrals and trusted introductions rather than walk-ins.
**Decision**: Build a trust-first, enquiry-led website with travel inspiration and social proof. Require referral context in the future enquiry workflow and route qualified visitors to personal contact.
**Alternatives Considered**: A fixed-package catalogue, OTA-style search, instant checkout, and a generic brochure site.
**Consequences**: The site can communicate high-touch service clearly, but it needs authentic client stories and strong enquiry handling instead of package inventory.
**Superseded By**: None.

## Decision: Portable Next.js application with Hostinger production
**Date**: 2026-08-20
**Status**: Accepted
**Context**: The project needs a fast, responsive marketing site now and a secure server-side enquiry path later. Vercel is only a possible demo surface; Hostinger is the final production target.
**Decision**: Use a host-portable TypeScript Next.js App Router application, develop locally, optionally preview on Vercel, and deploy production to a Hostinger Node.js Web App only after approval.
**Alternatives Considered**: A static HTML site, a client-only SPA, and a Vercel-only production architecture.
**Consequences**: Content pages can remain mostly static while standard Next.js server routes handle enquiry submission. The app must retain `build`/`start` portability, self-hosted image support, and no Vercel-only runtime assumptions.
**Superseded By**: None.

## Decision: Vitest and React Testing Library
**Date**: 2026-08-20
**Status**: Accepted
**Context**: Phase 1 introduced a React/Next.js user interface and required deterministic automated coverage.
**Decision**: Use Vitest with jsdom and React Testing Library, with tests adjacent to the application surface they cover.
**Alternatives Considered**: No test framework and browser-only manual checks.
**Consequences**: Product wording, accessibility roles, navigation targets, and the no-package/no-pricing contract can be checked quickly without network access.
**Superseded By**: None.

## Decision: Webpack for the deterministic production build
**Date**: 2026-08-20
**Status**: Accepted
**Context**: The restricted local environment prevents Turbopack's CSS worker from binding its local port during `next build`, while Next.js 16's supported Webpack build completes successfully.
**Decision**: Use `next build --webpack` as the project `build` script. Keep ordinary `next start` for the portable production runtime.
**Alternatives Considered**: Treating the environment failure as an application failure or requiring Turbopack for production builds.
**Consequences**: Local and Hostinger-oriented builds remain deterministic without adding host-specific application code.
**Superseded By**: None.

## Decision: Supabase for the enquiry backend
**Date**: 2026-08-20
**Status**: Accepted
**Context**: The user selected Supabase for backend needs. The first backend requirement is expected to be secure referral-enquiry persistence and internal follow-up support.
**Decision**: Use Supabase when backend implementation begins. Keep v1 public access minimal, enable RLS on every exposed table, and never expose privileged keys to the browser.
**Alternatives Considered**: No database, a generic form provider, and a custom standalone API/database.
**Consequences**: The application gains managed Postgres and future operational flexibility, but schema, grants, RLS, retention, and privacy must be verified before launch.
**Superseded By**: None.

## Decision: Phase-based Git history
**Date**: 2026-08-20
**Status**: Accepted
**Context**: The user requested repository commits whenever phases are completed.
**Decision**: Work on scoped feature branches and commit/push only after each phase passes its required checks.
**Alternatives Considered**: Continuous unverified commits directly to the default branch.
**Consequences**: Each milestone remains reviewable and recoverable; incomplete work stays local or on the active feature branch.
**Superseded By**: None.
