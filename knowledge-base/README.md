# Sai World Travels
> A referral-led travel website for personalised, end-to-end trip planning and booking.

## Tech Stack
| Layer | Technology |
|---|---|
| Language | TypeScript |
| Framework | Next.js App Router |
| Styling | Tailwind CSS |
| Database | Supabase Postgres (planned; not provisioned) |
| Hosting | Hostinger production; Vercel optional demo/preview only |
| Auth | None for the public v1 website |
| Test Runner | Vitest, React Testing Library, jsdom |

## Directory Structure
```text
app/                 Next.js routes, layout, styles, and adjacent tests
public/              Static brand and website assets
supabase/            Local Supabase configuration and migrations when backend work begins
knowledge-base/      Project source of truth
```

## Critical Rules
- Sai World Travels personally plans, arranges, and books complete trips.
- The business accepts clients through past-customer referrals and trusted introductions.
- Do not present the business as an OTA, package marketplace, or walk-in booking portal.
- Do not publish fixed packages, fixed prices, discount-led offers, instant checkout, or customer login in v1.
- The primary conversion is a qualified referral enquiry followed by personal WhatsApp or phone contact.
- Do not collect passports, identity documents, payment information, or other unnecessary sensitive data through the public enquiry form.
- Build and verify locally first. Hostinger, Vercel, and domain changes require explicit approval.
- Commit and push at the end of each completed phase after verification.
- Keep `sharp` installed while using `next/image` on self-hosted production.
- Use `pnpm verify` for the complete local check: lint, typecheck, tests, and the production build.

## Quick Facts
| Key | Value |
|---|---|
| Repo | `https://github.com/Mrluciferxd/sai-world-travels` |
| Local workspace | `/Users/abhishekmishra/Downloads/Sai world Website` |
| Current production domain | `saiworldtravels.in` (existing site is broken; replacement deployment is later) |
| Primary CTA | Start Planning Your Journey / WhatsApp |
| Backend | Supabase, introduced when the enquiry workflow is implemented |
| Test Command | `pnpm test` (full local gate: `pnpm verify`) |
| Demo | Optional Vercel preview after approval |
| Production | Hostinger Node.js Web App after approval |

## Reading Order
| File | When to Read |
|---|---|
| `README.md` | Always first |
| `active-context.md` | Every session |
| `decisions.md` | Before architecture or product changes |
| `known-issues.md` | Before debugging |
| `testing.md` | Before adding or changing tests |
| `architecture.md` | Before changing system boundaries |
| `product.md` | Before changing copy, journeys, or calls to action |
| `frontend.md` | Before changing the website UI |
| `backend.md` | Before adding Supabase or enquiry handling |
| `deployment.md` | Before any Vercel, Hostinger, or domain work |
| `changelog.md` | When tracing project history |
