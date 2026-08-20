# SEO and Discovery

## What this subsystem does
The discovery layer publishes claim-safe metadata for the five public pages while preventing unfinished demo or preview environments from being indexed. It also exposes standard sitemap, robots, manifest, and structured-data routes without turning the site into a package, offer, or review catalogue.

## How it is structured
- `app/layout.tsx` defines the canonical metadata base, title template, shared description, indexing policy, Open Graph/Twitter text, viewport/theme colour, and global JSON-LD component.
- Each public `page.tsx` exports its own canonical path; the four interior routes also provide unique titles and descriptions.
- `app/organization-schema.tsx` resolves `CANONICAL_SITE_URL`, applies the fail-closed `SITE_INDEXING_ENABLED` contract, and renders the minimal Organization/WebSite graph.
- `app/sitemap.ts`, `app/robots.ts`, and `app/manifest.ts` use Next.js metadata-file conventions.
- `next.config.ts` adds portable response headers, suppresses framework disclosure, and applies `X-Robots-Tag` to APIs and every response while indexing is disabled.

## Conventions and rules
- `CANONICAL_SITE_URL` is the production public origin used for canonical links, sitemap, robots host, and structured data. It defaults safely to `https://saiworldtravels.in` and accepts HTTPS origins only.
- `SITE_URL` is the exact deployed origin accepted by the enquiry API. It may be a Vercel or Hostinger temporary origin and must not be reused as the production canonical by accident.
- `SITE_INDEXING_ENABLED` is fail-closed: only the exact value `true` permits public indexing. Local, Vercel demo, and Hostinger temporary-domain environments must keep it `false`.
- Enable indexing only on the approved custom-domain release after content, privacy, Supabase, HTTPS, canonical, and runtime gates pass.
- Keep the sitemap limited to `/`, `/how-we-work`, `/travel-inspiration`, `/about`, and `/plan-your-journey` until another real public route ships.
- Keep `/api/*`, health, 404s, query variants, and draft/nonexistent routes out of the sitemap. APIs remain noindex even when public indexing is enabled.
- Structured data may describe only verified Organization and WebSite facts. Do not add search actions, packages, offers, prices, ratings, reviews, people, contacts, addresses, opening hours, awards, suppliers, service areas, or social profiles without approval and source evidence.
- Do not use the temporary 200 x 200 JPEG as a social card. Replace it with approved production artwork before adding Open Graph images.
- The manifest uses browser display only. It makes no offline, installability, or PWA claim.

## Known gotchas
- `metadataBase` does not create a canonical link by itself; each public page must export `alternates.canonical`.
- `robots.txt` is crawler guidance, not an access-control boundary. API validation, server-only credentials, database grants, and RLS protect enquiry data.
- The custom 404 receives Next.js noindex output at runtime; keep the production 404 status and metadata smoke test in the release gate.
- CSP currently permits Next.js inline bootstrap/style requirements. Recheck the browser console after framework upgrades or third-party scripts are introduced.
- HSTS is deliberately absent until the real custom domain has stable HTTPS and rollback implications have been reviewed.

## How it is tested
Adjacent Vitest files cover canonical paths, canonical-origin validation, the indexing flag, the exact sitemap set, robots behavior, manifest claims, safe JSON-LD fields, and response-header rules. `pnpm verify` must pass, followed by `next start` probes for page canonicals, robots, sitemap, manifest, API noindex, 404 status/noindex, CSP, and absence of secrets. Browser QA covers mobile/desktop navigation, JavaScript-independent disclosure behavior, console errors, and horizontal reflow.

## Related knowledge-base files
- [Architecture](architecture.md)
- [Frontend](frontend.md)
- [Public routes](routes.md)
- [Deployment](deployment.md)
- [Release checklist](release-checklist.md)
- [Testing](testing.md)
