# Release Checklist

## What this subsystem does
This checklist is the controlled handoff from verified local code to an optional Vercel demo and the final Hostinger production site. It prevents a preview, database migration, or domain action from being mistaken for a complete launch.

## How it is structured
Release has four gates: owner/content approval, Supabase readiness, temporary-domain deployment, and custom-domain cutover. Each gate must preserve its own evidence and must stop if a required credential, owner decision, backup, or external approval is missing.

## Conventions and rules
- Never deploy an unapproved branch or uncommitted worktree.
- Never copy `.env.local`, a Supabase secret, or any credential into Git, chat, screenshots, or the knowledge base.
- Vercel is demo/preview only. Hostinger Node.js Web App is production.
- Use the Hostinger temporary domain until the complete runtime and enquiry workflow pass.
- Do not remove the existing Hostinger website, connect DNS, or replace the domain without a verified backup and explicit user approval. Hostinger warns that removing a website can remove deployments and associated configuration/data.
- Keep real customer/test submissions out of preview environments; use clearly synthetic values.
- Record exact branch/commit, environment, Node version, build, runtime, database migration, and smoke-test evidence.

## Gate 1 — Owner and content approval
- [ ] Approve all draft public copy.
- [ ] Supply and verify official phone/WhatsApp/email/office details, if they will be published.
- [ ] Approve Privacy and Terms wording, enquiry retention period, deletion process, and operational owner.
- [ ] Approve any testimonials, photographs, supplier/destination claims, and a production-quality logo.
- [ ] Confirm the current website/domain backup and rollback owner.

## Gate 2 — Supabase
- [ ] Identify and confirm the exact owned Supabase organisation/project; do not infer it from a connector list.
- [ ] Inspect the current CLI help and pin the CLI version used for the release.
- [ ] Link/dry-run the committed migration against the confirmed project.
- [ ] Apply the migration and confirm migration history.
- [ ] Run the 21 pgTAP assertions in `supabase/tests/database/referral_enquiries.test.sql`.
- [ ] Verify one synthetic server insert through `/api/enquiries`.
- [ ] Verify `anon` and `authenticated` cannot select, insert, update, or delete enquiries.
- [ ] Verify `service_role`/secret behavior and the exact table/column grants.
- [ ] Run Supabase security and performance advisors and resolve relevant findings.
- [ ] Configure and test the approved retention/deletion process.

## Gate 3 — Optional Vercel demo
- [ ] Obtain explicit deployment approval.
- [ ] Configure `SITE_URL` to the exact preview origin, `CANONICAL_SITE_URL=https://saiworldtravels.in`, `SITE_INDEXING_ENABLED=false`, plus server-only Supabase values for a dedicated non-production project.
- [ ] Prove response `X-Robots-Tag`, root robots metadata, and `robots.txt` keep the demo noindex/disallow-all.
- [ ] Deploy the approved commit and repeat routes, headers, images, form/API, mobile, desktop, and console checks.
- [ ] Keep production DNS and the Hostinger target unchanged.

## Gate 4 — Hostinger temporary domain
- [ ] Confirm the Hostinger plan supports Node.js Web Apps and connect the approved GitHub repository/branch.
- [ ] Select Node.js 22 or 24 and confirm pnpm, `pnpm build`, and `pnpm start` settings.
- [ ] Add `SITE_URL`, `CANONICAL_SITE_URL=https://saiworldtravels.in`, `SITE_INDEXING_ENABLED=false`, `SUPABASE_URL`, and `SUPABASE_SECRET_KEY` in hPanel; do not upload a local env file containing unrelated secrets.
- [ ] Verify `/api/health`, all five public pages, sitemap, robots, manifest, optimized image, 404, and response headers.
- [ ] Submit one synthetic referral enquiry and verify the stored minimal row.
- [ ] Repeat 390 x 844 and desktop checks, keyboard navigation, reduced motion on a capable device, no overflow, no console errors, and runtime logs.
- [ ] Verify 200% browser zoom/reflow and run Lighthouse or an equivalent bounded performance audit on the real temporary-domain runtime; record observed results rather than estimated scores.
- [ ] Verify Hostinger trusted-proxy behavior and install the approved upstream/durable enquiry rate limit.
- [ ] Confirm restart/redeploy behavior and that environment changes take effect only after redeployment.

## Gate 5 — Custom domain and rollback
- [ ] Reconfirm the backup, rollback path, DNS owner, and exact current records immediately before change.
- [ ] Obtain explicit user approval for the custom-domain/DNS action.
- [ ] Connect `saiworldtravels.in` only after the temporary-domain gate passes.
- [ ] Set `SITE_URL=https://saiworldtravels.in` and keep `CANONICAL_SITE_URL=https://saiworldtravels.in`; rebuild with `SITE_INDEXING_ENABLED=false` for the first custom-domain smoke.
- [ ] Verify automatic SSL, canonical metadata, same-origin enquiry submission, sitemap/robots, images, headers, and health on the real domain.
- [ ] Enable `SITE_INDEXING_ENABLED=true` and redeploy only after the custom-domain content/privacy/backend/HTTPS gate passes; then verify public X-Robots removal while `/api/*` remains noindex.
- [ ] Allow for DNS propagation and monitor both the temporary and custom domains.
- [ ] Add HSTS only after HTTPS is stable and rollback implications are reviewed.
- [ ] If a blocker appears, restore the previous routing/site using the approved backup/rollback plan; never destroy the old site as an ad hoc fix.

## Known gotchas
- The current public site is broken, but that does not make a destructive replacement safe.
- Hostinger's detected build settings must be inspected; do not assume a static export because the enquiry API needs a persistent Next.js server.
- `/api/health` is liveness only. A green response does not prove Supabase persistence, anonymous denial, or content approval.
- Vercel preview success does not replace the Hostinger Node 22/24 gate.
- The canonical and indexing settings are consumed at build time; changing hPanel values without redeploying does not update already generated metadata routes.

## How it is tested
This checklist is evidence-driven rather than an automated suite. The local prerequisites are `pnpm install --frozen-lockfile`, `pnpm verify`, `next start`, the route/image/API/header probes, and responsive browser QA. Each external gate adds environment-specific database, runtime, logging, SSL, and rollback evidence.

## Related knowledge-base files
- [Deployment](deployment.md)
- [Backend and Supabase](backend.md)
- [Referral enquiries](enquiries.md)
- [Testing](testing.md)
- [Known issues](known-issues.md)
