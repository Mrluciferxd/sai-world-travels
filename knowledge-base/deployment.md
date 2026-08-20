# Deployment

## What this subsystem does
Deployment moves verified local phases to GitHub, may publish approved demo builds through Vercel, and ultimately releases production through a Hostinger Node.js Web App.

## How it is structured
The repository is `Mrluciferxd/sai-world-travels` with default branch `main`. Work should occur on scoped feature branches. Neither Vercel nor Hostinger is linked yet, and no production environment variables or domain configuration exist in this workspace. The portable runtime contract is `pnpm build` followed by `pnpm start` on Node.js 22 or 24. The enquiry endpoint explicitly uses the standard Node.js runtime.

The current Hostinger Node.js Web App documentation supports Next.js, GitHub-based deployment, and Node 22/24 on eligible Business or Cloud plans. Deploy the approved branch to a temporary Hostinger domain first, review the detected build/start commands, set environment variables in hPanel, and verify the complete site before connecting `saiworldtravels.in`. Hostinger notes that environment changes require redeployment and a custom-domain connection/SSL propagation can take up to 24 hours.

## Conventions and rules
- Build locally first.
- Commit and push only completed, verified phases.
- Do not deploy, connect Vercel or Hostinger, change DNS, or promote production without explicit approval.
- Keep secrets out of Git and configure environment variables per environment when deployment begins.
- Use Vercel only for an optional demo/preview; it is not the production architecture.
- Deploy production to Hostinger's Node.js Web App runtime and preserve standard Next.js Node portability.
- Keep `sharp` as a production dependency while `next/image` is used.
- Configure `SITE_URL`, `CANONICAL_SITE_URL`, `SITE_INDEXING_ENABLED`, `SUPABASE_URL`, and `SUPABASE_SECRET_KEY` only in the target environment; the Supabase secret must never have a `NEXT_PUBLIC_` prefix.
- Set `SITE_URL` to the exact Vercel preview/demo origin in demo and the exact Hostinger public origin in production.
- Set `CANONICAL_SITE_URL=https://saiworldtravels.in` in every environment. Keep `SITE_INDEXING_ENABLED=false` for local, Vercel demo, and Hostinger temporary-domain builds; set it to `true` only for the final approved custom-domain build after every release gate passes.
- Apply the committed migration to the approved Supabase project through the CLI; never paste it into an unverified project.
- Prefer Hostinger's GitHub integration for the approved release branch. Select Node.js 22 or 24, use `pnpm build` and `pnpm start`, and keep `package.json` at the repository root.
- Use a temporary Hostinger domain for the full production-equivalent gate. Do not connect or replace `saiworldtravels.in` until that gate and a rollback/backup review pass.
- A Hostinger liveness check may call `/api/health`; it proves the Node process responds, not that Supabase is ready. The route is deliberately constant, no-store, and noindex.

## Known gotchas
- The current `saiworldtravels.in` page is broken, but replacing it still requires a verified rollback-aware domain plan.
- Local Git credentials must be verified by the first successful phase push.
- Supabase URLs and keys must be environment-specific and must not be copied into documentation or committed files.
- A current `sb_secret_*` key uses only the `apikey` header in this server adapter. Do not add a legacy bearer-key pattern without a documented migration decision.
- The process-local limiter needs Hostinger trusted-proxy and multi-process verification; it is not a substitute for upstream protection.
- Retention/legal approval is a production gate even though the local migration and UI exist.
- HSTS is intentionally absent until the custom domain is connected and HTTPS is verified. Add it only in a separately reviewed post-cutover change.
- Build-time metadata and header configuration means changes to `CANONICAL_SITE_URL` or `SITE_INDEXING_ENABLED` require a new build/redeployment, not only a process restart.
- The current machine does not reproduce Hostinger's Node.js 22/24 runtime exactly; repeat all production checks on that runtime before release.

## How it is tested
Before production, require frozen install, lint, typecheck, tests, Webpack production build, `next start`, optimized-image smoke test, mobile browser verification, Hostinger preview-domain verification on Node.js 22 or 24, production environment validation, and a post-domain smoke test. For Supabase, also require migration dry-run/application, migration-history review, pgTAP, a real same-origin server insert, anonymous select/insert denial, service privilege inspection, and security/performance advisors.

## Related knowledge-base files
- [Architecture](architecture.md)
- [Backend](backend.md)
- [Testing](testing.md)
- [Active context](active-context.md)
- [Release checklist](release-checklist.md)

## Current official Hostinger references
- [Deploy a Node.js Web App](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/)
- [Choose the Node.js version](https://www.hostinger.com/support/how-to-select-the-node-js-version-for-your-application/)
- [Configure environment variables](https://www.hostinger.com/support/how-to-add-environment-variables-during-node-js-application-deployment/)
- [Connect a custom domain](https://www.hostinger.com/support/how-to-connect-a-custom-domain-to-a-node-js-application/)
- [Redeploy after configuration changes](https://www.hostinger.com/support/how-to-redeploy-a-node-js-application/)
