# Testing

## Test Frameworks in Use
- Vitest 4 for the test runner.
- React Testing Library 16 for render and accessibility-role assertions.
- jsdom 26 for the deterministic browser-like test environment.

Tests must be deterministic and must not require uncontrolled network access.

## How to Run Tests
| Command | What it runs |
|---|---|
| `pnpm test` | Deterministic Vitest suite once |
| `pnpm test:watch` | Vitest in watch mode |
| `pnpm lint` | ESLint across the repository |
| `pnpm typecheck` | TypeScript without output |
| `pnpm build` | Next.js production build through the supported Webpack path |
| `pnpm verify` | Lint, typecheck, tests, and production build |

## Test File Conventions
- Place tests adjacent to the behaviour they cover, such as `app/page.test.tsx`.
- Component contracts live in `components/components.test.tsx`; claim and navigation invariants live in `content/site-content.test.ts`.
- Each public route has an adjacent render test; cross-route content invariants live in `content/page-content.test.ts`.
- Use React Testing Library queries that reflect user-visible roles and text.
- Browser-level verification should cover the phone-sized critical path.

## What Must Be Tested
- Brand foundation renders without runtime errors.
- Navigation and primary calls to action are accessible.
- Enquiry validation covers successful and invalid submissions when that feature is added.
- Anonymous clients cannot read stored enquiries.
- Cross-origin, unsupported, compressed, malformed, and oversized enquiry requests are rejected before persistence.
- The production build passes after the last change.
- Mobile layout is verified at approximately 390 x 844 before release.
- A self-hosted `next start` smoke test must verify `/` and an optimized `/_next/image` response.
- Discovery tests must verify all five canonicals, the exact sitemap, fail-closed robots/indexing, claim-safe Organization/WebSite JSON-LD, browser-mode manifest, API noindex, and custom 404 status/noindex.
- Header runtime checks must verify CSP, frame/referrer/content-type protections, preview-wide noindex, API noindex, no framework disclosure, and intentional absence of pre-cutover HSTS.

## Mocks, Fakes, and Fixtures
Next Image is mocked only in render-level unit tests; real image optimization is covered by the production runtime smoke test. External services must be mocked for unit and component tests. Supabase integration requires a controlled local or dedicated test environment when introduced.

## Known Flaky Tests
None — keep it that way.

## Phase 3 Historical Coverage
- Six homepage tests verify referral-led wording, accessible navigation/CTA targets, valid rendered hash targets, one primary heading, the referral-enquiry route, hero semantics, non-interactive journey rows, journey inspiration, and absence of package pricing language.
- Four component tests verify decorative icon semantics, eyebrow variants, labelled local navigation, supplied-logo rendering, and footer accessibility.
- Four content tests verify positive referral language, no commerce/pricing claims, declared local navigation targets, and explicit pending contact/legal status.
- Automated checks and the production build pass.
- The original Phase 3 folio composition was later rejected and superseded in Phase 5; its route/content/accessibility contracts remain covered.
- Interior-shell tests cover the skip link, main landmark, home-safe links, supplied logo, typed default/enquiry variants, children, and active navigation state.
- One test per core route covers unique metadata, heading hierarchy, route-specific structure, non-interactive informational rows, and current navigation.
- Page-content tests enforce exactly three slugs, draft status, unique IDs/headings, positive referral language, and banned-claim absence.
- Direct-load and navigation browser QA passed for `/how-we-work`, `/travel-inspiration`, and `/about` at 390 x 844 and 1440 x 900 with no horizontal overflow or application errors.

## Current Phase 4 Coverage
- Form and route render tests cover minimal required/optional fields, the hidden honeypot, sensitive-data warnings, shared limits, accessible client/server validation, duplicate-click prevention, success, and generic unavailable states.
- API tests cover the success insert, exact JSON type, unsupported encoding, canonical-origin enforcement independent of the request host, missing origin, malformed JSON, a streamed 16 KiB limit, field errors, honeypot no-insert, missing configuration, safe upstream failure, 429, and `Retry-After`.
- Validation, limiter, and repository tests cover whitespace normalization, unknown/control-character rejection, field boundaries, non-raw client keys, limiter expiry/global ceiling, secret-key header shape, timed requests, missing configuration, and safe upstream errors.
- The migration applied successfully to an isolated PostgreSQL 17 instance. Catalog/privilege/constraint probes confirmed its ten fields, seven checks plus primary key, RLS, zero policies/triggers, denied anonymous/authenticated reads and inserts, narrow service privileges, valid boundary insert, and invalid-boundary rejection.
- `supabase/tests/database/referral_enquiries.test.sql` contains 21 pgTAP assertions but has not executed because pgTAP/Supabase database-test infrastructure is not available. Hosted migration, pgTAP, real insert, anonymous denial, and advisors remain pre-production gates.

## Current Phase 5 Coverage
- Component tests cover the JavaScript-independent mobile disclosure, shared typed links, desktop/mobile current-page semantics, keyboard disclosure behavior, 44px target contracts, and branded not-found recovery.
- Metadata tests cover explicit public-page canonicals, validated canonical origin, fail-closed indexing, the exact five-route sitemap, robots modes, browser manifest, safe structured data, and banned unsupported claims.
- Route/config tests cover the constant health response, no-store/noindex API behavior, portable security headers, framework-disclosure removal, preview-wide noindex, API noindex after production indexing, CSP constraints, and absence of pre-cutover HSTS.
- `pnpm verify` passes with 78/78 tests and static generation for all public/discovery routes.
- Production runtime probes cover five public 200s, health 200/no-store, 404/noindex, API 405/415/400/413/429/503, optimized JPEG 200, CSP/header policy, canonical/noindex/JSON-LD, exact sitemap/robots/manifest, and secret-leak bans.
- Browser QA at 390 x 844 and 1440 x 900 covers closed/open native Menu, four real mobile links, one heading, no horizontal overflow, task-first form-control placement, final typography wrapping, and zero production console errors. The independent visual auditor approved the final non-template composition.
- No Lighthouse or field Core Web Vitals score was run locally; do not claim one. Run performance tooling on the Hostinger temporary domain when its real runtime/CDN is available.
