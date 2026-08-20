# Deployment

## What this subsystem does
Deployment moves verified local phases to GitHub, may publish approved demo builds through Vercel, and ultimately releases production through a Hostinger Node.js Web App.

## How it is structured
The repository is `Mrluciferxd/sai-world-travels` with default branch `main`. Work should occur on scoped feature branches. Neither Vercel nor Hostinger is linked yet, and no production environment variables or domain configuration exist in this workspace. The portable runtime contract is `pnpm build` followed by `pnpm start` on Node.js 22 or 24.

## Conventions and rules
- Build locally first.
- Commit and push only completed, verified phases.
- Do not deploy, connect Vercel or Hostinger, change DNS, or promote production without explicit approval.
- Keep secrets out of Git and configure environment variables per environment when deployment begins.
- Use Vercel only for an optional demo/preview; it is not the production architecture.
- Deploy production to Hostinger's Node.js Web App runtime and preserve standard Next.js Node portability.
- Keep `sharp` as a production dependency while `next/image` is used.

## Known gotchas
- The current `saiworldtravels.in` page is broken, but replacing it still requires a verified rollback-aware domain plan.
- Local Git credentials must be verified by the first successful phase push.
- Supabase URLs and keys must be environment-specific and must not be copied into documentation or committed files.
- The current machine does not reproduce Hostinger's Node.js 22/24 runtime exactly; repeat all production checks on that runtime before release.

## How it is tested
Before production, require frozen install, lint, typecheck, tests, Webpack production build, `next start`, optimized-image smoke test, mobile browser verification, Hostinger preview-domain verification on Node.js 22 or 24, production environment validation, and a post-domain smoke test.

## Related knowledge-base files
- [Architecture](architecture.md)
- [Backend](backend.md)
- [Testing](testing.md)
- [Active context](active-context.md)
