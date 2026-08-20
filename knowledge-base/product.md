# Product and Content

## What this subsystem does
This subsystem defines the website's audience, promise, conversion journey, content boundaries, and claims. It prevents the interface from drifting into a fixed-package or walk-in travel marketplace.

## How it is structured
Phase 2 keeps the homepage sections—hero, approach, inspiration, promise, contact preview, and footer—in a typed `siteContent` model. Each content group carries a verified or pending status so unavailable contact/legal information cannot silently appear as approved copy. The later route hierarchy remains Home, How We Work, Travel Inspiration, Our Journeys, About, Plan Your Journey, Contact, Privacy, and Terms.

## Conventions and rules
- Say that Sai World personally plans, arranges, and books the complete journey.
- Explain referral-led service positively: personal introductions allow focused attention.
- Use `Start Planning Your Journey` as the primary conversion language.
- Present destinations as inspiration, never as fixed inventory.
- Treat all unapproved statistics, testimonials, awards, partnerships, and service claims as unavailable.
- Clearly label draft content during development.
- Keep the contact action disabled until official details and the secure enquiry workflow are ready.
- Put repeated or publishable copy in `content/site-content.ts`; page components should render it rather than duplicate it.

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
