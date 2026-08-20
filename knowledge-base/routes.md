# Public Content Routes

## What this subsystem does
The public route subsystem expands the referral-led homepage into substantive editorial pages without turning the site into a package catalogue. It currently covers How We Work, Travel Inspiration, and About.

## How it is structured
- `app/how-we-work/page.tsx` renders a four-stage process dossier.
- `app/travel-inspiration/page.tsx` renders a non-interactive mood index.
- `app/about/page.tsx` renders a relationship-led principles manifesto.
- `components/interior-page.tsx` provides the shared header, skip link, folio masthead, main landmark, content region, and footer.
- `content/page-content.ts` provides readonly draft content and route metadata for exactly the three supported slugs.
- Each route has an adjacent render test; shared content invariants live in `content/page-content.test.ts`.

## Conventions and rules
- Keep route pages as Server Components and export route metadata from each `page.tsx`.
- Pass the route's real pathname as `activeHref` so `aria-current="page"` is rendered on the server.
- Preserve `/` for the logo/home link and `/#contact` for the shared planning CTA.
- Use exactly one `h1`, then a logical `h2`/`h3` hierarchy.
- Keep page copy typed and explicitly draft until owner approval.
- Give each route a composition suited to its content; do not clone a hero-and-card template.
- Informational entries must not look interactive unless they are real links or buttons.

## Known gotchas
- No destination, supplier, company-history, staff, statistics, award, testimonial, contact, guarantee, or legal content is approved yet.
- The shared logo is still a low-resolution JPEG and remains a production-quality blocker.
- The browser QA environment did not expose reduced-motion or coarse-pointer emulation; CSS media contracts must be inspected and repeated on capable devices before production.

## How it is tested
Run `pnpm test` for content, shell, navigation, metadata, and per-route render contracts, then `pnpm verify`. Direct-load all three paths through `next start` and browser-test each at 390 x 844 and 1440 x 900. Confirm cross-route navigation, `/` home, `/#contact`, focus-visible behavior, no overflow, and no console errors.

## Related knowledge-base files
- [Product](product.md)
- [Frontend](frontend.md)
- [Testing](testing.md)
- [Deployment](deployment.md)
