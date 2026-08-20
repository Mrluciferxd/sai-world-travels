# Architecture

## System Overview
Sai World Travels is a content-led Next.js website. Mostly static Server Components present the brand, service process, journey inspiration, and trust signals. A later server-only enquiry boundary will validate referral enquiries, apply anti-spam controls, and persist only the minimum operational data to Supabase.

## Architecture Diagram
```text
Visitor browser
    |
    v
Next.js pages and components
    |
    +--> WhatsApp / phone handoff
    |
    +--> Server-only enquiry endpoint (later phase)
              |
              v
        Supabase Postgres with RLS

GitHub --> optional Vercel demo/preview
    |
    +--> Hostinger Node.js Web App production (later, after approval)
```

## Layers & Responsibilities
| Layer | Technology | Responsibility |
|---|---|---|
| Frontend | Next.js, React, Tailwind CSS | Responsive pages and conversion journey |
| Backend/API | Next.js server boundary | Validate and submit enquiries without exposing privileged secrets |
| Database | Supabase Postgres | Store minimum enquiry and follow-up data when implemented |
| Auth | None in public v1 | No customer accounts or login |
| Storage | Local/optimised public assets initially | Brand and approved travel media |
| CDN/Hosting | Hostinger production; optional Vercel demo | Portable preview and production delivery |
| Testing | Vitest, React Testing Library, jsdom | Unit, render, build, and later integration coverage |

## Data Flow
The visitor reads mostly static content, chooses to start planning, supplies referral and trip context, and submits it to a server-only handler. The handler will validate, rate-limit, and store the minimum required data. The confirmation state will offer a WhatsApp continuation without placing personal data in a URL unless explicitly designed and reviewed.

## Key Design Patterns
- App Router with Server Components by default.
- Client Components only for real interaction.
- Typed content structures for destinations and stories instead of a package database.
- Server-only backend credentials and least-privilege database access.
- Static-first rendering for speed and resilience.
- Standard Next.js Node runtime boundaries so the backend remains Hostinger-compatible.
- `sharp` as a production dependency for self-hosted `next/image` optimization.

## External Dependencies
- GitHub stores the source and phase history.
- Vercel may host optional demo/preview builds later.
- Hostinger Node.js Web App is the final production target.
- Supabase will provide the enquiry database later.
- WhatsApp and telephone links provide personal contact; availability is outside the site's control.

## Scalability & Limits
The content-led site can scale through static delivery. Enquiry volume is expected to be modest and high-touch. If operational needs expand, introduce authenticated staff tools separately rather than exposing administration in the public site.

## What NOT to Do
- Do not build package search, price comparison, instant checkout, or customer accounts for v1.
- Do not place Supabase secret or service-role keys in client code.
- Do not let anonymous browser clients read the enquiry table.
- Do not collect documents or payment data through the public enquiry flow.
- Do not connect the domain until the replacement is verified and approved.
