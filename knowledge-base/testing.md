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
- The production build passes after the last change.
- Mobile layout is verified at approximately 390 x 844 before release.
- A self-hosted `next start` smoke test must verify `/` and an optimized `/_next/image` response.

## Mocks, Fakes, and Fixtures
Next Image is mocked only in render-level unit tests; real image optimization is covered by the production runtime smoke test. External services must be mocked for unit and component tests. Supabase integration requires a controlled local or dedicated test environment when introduced.

## Known Flaky Tests
None — keep it that way.

## Current Phase 3 Coverage
- Six homepage tests verify referral-led wording, accessible navigation/CTA targets, valid rendered hash targets, one primary heading, disabled enquiry state, hero semantics, non-interactive journey rows, journey inspiration, and absence of package pricing language.
- Four component tests verify decorative icon semantics, eyebrow variants, labelled local navigation, supplied-logo rendering, and footer accessibility.
- Four content tests verify positive referral language, no commerce/pricing claims, declared local navigation targets, and explicit pending contact/legal status.
- Automated checks and the production build pass.
- Browser verification at 390 x 844 and 1440 x 900 confirms the Private Journey Folio composition, route animations, meaningful content, no horizontal overflow, loaded logo, disabled enquiry state, and no application errors. Reduced-motion rules were statically inspected because this browser session did not expose media emulation.
- Interior-shell tests cover the skip link, main landmark, home-safe links, supplied logo, folio heading, children, and active navigation state.
- One test per core route covers unique metadata, heading hierarchy, route-specific structure, non-interactive informational rows, and current navigation.
- Page-content tests enforce exactly three slugs, draft status, unique IDs/headings, positive referral language, and banned-claim absence.
- Direct-load and navigation browser QA passed for `/how-we-work`, `/travel-inspiration`, and `/about` at 390 x 844 and 1440 x 900 with no horizontal overflow or application errors.
