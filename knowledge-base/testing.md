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

## Current Phase 1 Coverage
- Three homepage tests verify referral-led wording, accessible navigation/CTA targets, journey inspiration, and absence of package pricing language.
- Automated checks and the production build pass.
- Browser verification at 390 x 844 and 1440 x 900 confirms meaningful content, no horizontal overflow, loaded logo, disabled enquiry state, and no browser warnings/errors.
