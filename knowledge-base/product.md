# Product and Content

## What this subsystem does
This subsystem defines the website's audience, promise, conversion journey, content boundaries, and claims. It prevents the interface from drifting into a fixed-package or walk-in travel marketplace.

## How it is structured
The homepage sections live in the typed `siteContent` model. Phase 3 adds typed draft content for How We Work, Travel Inspiration, and About in `page-content.ts`; the drafts expand only known business facts and remain subject to owner copy approval. Plan Your Journey, Contact, Privacy, and Terms remain later workflow/release concerns; no Journeys case-study route exists until authentic material is supplied.

## Conventions and rules
- Say that Sai World personally plans, arranges, and books the complete journey.
- Explain referral-led service positively: personal introductions allow focused attention.
- Use `Start Planning Your Journey` as the primary conversion language.
- Present destinations as inspiration, never as fixed inventory.
- Treat all unapproved statistics, testimonials, awards, partnerships, and service claims as unavailable.
- Clearly label draft content during development.
- Keep the contact action disabled until official details and the secure enquiry workflow are ready.
- Put repeated or publishable copy in `content/site-content.ts`; page components should render it rather than duplicate it.
- Keep route-specific draft copy in `content/page-content.ts` and preserve its `status: "draft"` marker until the owner approves it.

## Known gotchas
- `Referral-only` can sound exclusionary if phrased as a rejection. Use warm, relationship-led language.
- `Personalised` must not imply that the website can generate or instantly confirm a trip.
- Reference websites are design research, not sources of copy, imagery, or business claims.

## How it is tested
Review the rendered mobile and desktop pages against this document. Automated tests cover referral language, banned commerce claims, declared navigation targets, pending contact status, and rendered CTA behavior; final copy still requires human approval.

## Related knowledge-base files
- [Architecture](architecture.md)
- [Frontend](frontend.md)
- [Backend](backend.md)
- [Known issues](known-issues.md)
