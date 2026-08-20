# Architecture

## System Overview
Sai World Travels is a content-led Next.js website. Mostly static Server Components present the brand, service process, journey inspiration, and trust signals. A client form submits minimal referral details to a Node.js App Route, which performs bounded parsing, shared validation, origin checks, best-effort abuse protection, and server-only Supabase persistence.

## Architecture Diagram
```text
Visitor browser
    |
    v
Next.js pages and components
    |
    +--> /plan-your-journey client form
    |
    +--> POST /api/enquiries (Node.js only)
              |
              v
        Supabase Data API with server secret
              |
              v
        referral_enquiries (RLS; no public grants/policies)

GitHub --> optional Vercel demo/preview
    |
    +--> Hostinger Node.js Web App production (later, after approval)
```

## Layers & Responsibilities
| Layer | Technology | Responsibility |
|---|---|---|
| Frontend | Next.js, React, custom CSS | Responsive pages and conversion journey |
| Backend/API | Next.js server boundary | Validate and submit enquiries without exposing privileged secrets |
| Database | Supabase Postgres | Store minimum enquiry and follow-up state after the migration is applied |
| Auth | None in public v1 | No customer accounts or login |
| Storage | Local/optimised public assets initially | Brand and approved travel media |
| CDN/Hosting | Hostinger production; optional Vercel demo | Portable preview and production delivery |
| Testing | Vitest, React Testing Library, jsdom | Unit, render, build, and later integration coverage |

## Data Flow
The visitor reads mostly static content, chooses to start planning, supplies referral and trip context, and submits JSON to the same-origin server handler. The handler reads at most 16 KiB, validates the shared contract, applies a honeypot plus bounded process-local limits, and inserts through the Supabase REST endpoint using a server-only secret key. The response exposes no database identifier or upstream error detail.

## Key Design Patterns
- App Router with Server Components by default.
- Client Components only for real interaction.
- Typed content structures for destinations and stories instead of a package database.
- Server-only backend credentials and least-privilege database access.
- Static-first rendering for speed and resilience.
- Fail-closed indexing with separate deployed-origin and production-canonical configuration.
- JavaScript-independent mobile navigation through native disclosure semantics.
- Standard Next.js Node runtime boundaries so the backend remains Hostinger-compatible.
- `sharp` as a production dependency for self-hosted `next/image` optimization.

## External Dependencies
- GitHub stores the source and phase history.
- Vercel may host optional demo/preview builds later.
- Hostinger Node.js Web App is the final production target.
- Supabase provides the planned enquiry database; the local migration exists, but no hosted project is linked or changed yet.
- A later human phone or WhatsApp follow-up occurs only after an enquiry; no unverified direct-contact link is published.

## Scalability & Limits
The content-led site can scale through static delivery. Enquiry volume is expected to be modest and high-touch. The current rate limiter is process-local and resets on restart, so production still requires Hostinger proxy verification and an upstream or durable control before higher-volume exposure. If operational needs expand, introduce authenticated staff tools separately rather than exposing administration in the public site.

## What NOT to Do
- Do not build package search, price comparison, instant checkout, or customer accounts for v1.
- Do not place Supabase secret or service-role keys in client code.
- Do not let anonymous browser clients read the enquiry table.
- Do not collect documents or payment data through the public enquiry flow.
- Do not connect the domain until the replacement is verified and approved.
- Do not enable indexing on demo, preview, temporary-domain, or incomplete production environments.
