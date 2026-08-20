# Public Content Routes

## What this subsystem does
The public route subsystem expands the referral-led homepage into substantive editorial pages and a private enquiry workflow without turning the site into a package catalogue. It covers the homepage, How We Work, Travel Inspiration, About, Plan Your Journey, and a branded not-found recovery surface.

## How it is structured
- `app/how-we-work/page.tsx` renders a four-stage process dossier.
- `app/travel-inspiration/page.tsx` renders a non-interactive mood index.
- `app/about/page.tsx` renders a relationship-led principles manifesto.
- `app/plan-your-journey/page.tsx` renders the minimal referral-enquiry workflow.
- `components/interior-page.tsx` provides the shared header, skip link, masthead, main landmark, content region, and footer. Its typed `enquiry` variant creates a task-first layout without changing route semantics.
- `app/not-found.tsx` renders a real recovery route with one heading, home/planning links, and shared site chrome; unmatched URLs must still return HTTP 404 and noindex.
- `content/page-content.ts` provides readonly draft content and route metadata for exactly the three supported slugs.
- Each route has an adjacent render test; shared content invariants live in `content/page-content.test.ts`.

## Conventions and rules
- Keep route pages as Server Components and export route metadata from each `page.tsx`.
- Export an explicit `alternates.canonical` path for every indexable public page.
- Pass the route's real pathname as `activeHref` so `aria-current="page"` is rendered on the server.
- Preserve `/` for the logo/home link and `/plan-your-journey` for every shared planning CTA.
- Plan Your Journey marks the header CTA current rather than adding a fourth desktop navigation label.
- Use exactly one `h1`, then a logical `h2`/`h3` hierarchy.
- Keep page copy typed and explicitly draft until owner approval.
- Give each route a composition suited to its content; do not clone a hero-and-card template.
- Plan Your Journey must use `variant="enquiry"` and keep actual form controls inside the initial 844px mobile and 900px desktop viewport.
- Informational entries must not look interactive unless they are real links or buttons.

## Known gotchas
- No destination, supplier, company-history, staff, statistics, award, testimonial, contact, guarantee, or legal content is approved yet.
- The shared logo is still a low-resolution JPEG and remains a production-quality blocker.
- The browser QA environment did not expose reduced-motion or coarse-pointer emulation; CSS media contracts must be inspected and repeated on capable devices before production.

## How it is tested
Run `pnpm test` for content, shell, navigation, metadata, form, 404, and per-route render contracts, then `pnpm verify`. Direct-load all five public paths and an arbitrary missing path through `next start`, then browser-test at 390 x 844 and 1440 x 900. Confirm cross-route navigation, native mobile disclosure, `/` home, `/plan-your-journey`, form states, focus-visible behavior, 404 recovery, no overflow, and no console errors.

## Related knowledge-base files
- [Product](product.md)
- [Frontend](frontend.md)
- [Testing](testing.md)
- [Deployment](deployment.md)
- [SEO and discovery](seo.md)
