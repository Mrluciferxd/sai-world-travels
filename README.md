# Sai World Travels

A referral-led travel website for personalised, end-to-end trip planning and booking. The public experience is intentionally enquiry-led: it presents travel inspiration and trust signals without fixed packages, instant checkout, or customer accounts.

## Local development

### Requirements

- Node.js 22 or 24 (both supported by the intended Hostinger runtime)
- pnpm 11.19.0 (the version declared in `package.json`)

Install the exact dependency graph recorded in `pnpm-lock.yaml`:

```bash
corepack enable
pnpm install --frozen-lockfile
```

For the first install before a lockfile exists, run `pnpm install` once and commit the generated lockfile with the phase.

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verification commands

| Command | Purpose |
|---|---|
| `pnpm lint` | Run ESLint across the project |
| `pnpm typecheck` | Check TypeScript without emitting files |
| `pnpm test` | Run the deterministic Vitest suite once |
| `pnpm test:watch` | Run Vitest in watch mode during development |
| `pnpm build` | Create a production Next.js build |
| `pnpm verify` | Run lint, typecheck, tests, and the production build |

The build command uses Next.js's supported Webpack path because the default Turbopack CSS worker requires local port binding that is unavailable in the restricted local verification environment. This keeps `pnpm build` deterministic without adding host-specific application code.

## Delivery model

- Build and verify locally during the initial phases.
- Git history is organised into completed, verified phase commits.
- Supabase is planned for the later referral-enquiry backend; no production project is connected in Phase 1.
- Vercel may be used later for demo or preview deployments only.
- Hostinger is the intended final production host, so the application must remain portable and avoid Vercel-only runtime assumptions.
- The portable production commands are `pnpm build` followed by `pnpm start`; do not configure a static export.
- `sharp` is an exact production dependency with its install script explicitly allowed so self-hosted `next/image` optimization works on Hostinger.
- Deployment, production environment changes, and domain changes require explicit user approval.

Project architecture, business rules, active work, and verification conventions are documented in [`knowledge-base/README.md`](knowledge-base/README.md).
