# Backend and Supabase

## What this subsystem does
The backend will accept qualified referral enquiries, enforce validation and abuse controls, store only necessary follow-up data, and keep privileged database access on the server.

## How it is structured
No backend code or Supabase project exists yet. The planned boundary is a Next.js server handler or Server Action calling Supabase with server-only credentials. Schema and migrations will live under `supabase/` when implemented.

## Conventions and rules
- Verify current Supabase documentation and changelog before implementation.
- Create migrations with the Supabase CLI rather than inventing filenames.
- Enable RLS on every exposed table.
- Anonymous visitors must never be able to select enquiry records.
- Never expose a service-role or secret key through a `NEXT_PUBLIC_` variable.
- Minimise retention and fields; do not collect passports, identity documents, or payment details.
- Validate on the server even when client-side validation exists.

## Known gotchas
- Data API grants and RLS are separate controls; both must be checked.
- A public insert policy can become an abuse channel without server validation, rate limits, and spam controls.
- Supabase is planned but not provisioned, so current project identifiers and credentials are unknown.

## How it is tested
The backend phase must test valid and invalid submissions, abuse controls, real test inserts, anonymous read denial, migrations, and Supabase advisors. External calls are mocked in unit tests and verified against a controlled project before release.

## Related knowledge-base files
- [Architecture](architecture.md)
- [Product](product.md)
- [Testing](testing.md)
- [Deployment](deployment.md)
