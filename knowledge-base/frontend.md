# Frontend

## What this subsystem does
The frontend presents a premium, approachable travel-concierge experience and guides referred visitors toward a personal enquiry.

## How it is structured
The root App Router layout provides brand metadata and safe structured data. `app/page.tsx` composes the homepage from readonly data in `content/site-content.ts`. The three editorial routes use the shared default `components/interior-page.tsx` shell; `/plan-your-journey` selects its typed `enquiry` variant so real controls enter the first desktop and mobile viewport. `components/referral-enquiry-form.tsx` is the only current Client Component. `components/site-header.tsx` renders both desktop navigation and a native no-JavaScript mobile Menu from the same typed links. `app/not-found.tsx` supplies the branded recovery route. `app/globals.css` implements the approved continuous planning canvas, distinct content silhouettes, two finite motion effects, focus treatment, and reduced-motion fallback. `public/brand/sai-world-logo.jpeg` is the supplied temporary brand asset.

## Conventions and rules
- Server Components by default; add `use client` only for interaction.
- Use `next/image` for responsive images.
- Maintain strong keyboard focus, semantic headings, readable contrast, and reduced-motion behaviour.
- Design mobile-first and verify the 390 x 844 critical path.
- Use the logo palette as a starting point: deep blue, sky blue, warm orange/gold, and light neutral backgrounds.
- Preserve content-specific asymmetry and strong negative space. Avoid folio jargon/numbers, floating itinerary panels, synthetic route/airplane drawings, repeated left-heading/right-list sections, generic rounded-card grids, glass panels, stock travel icons, carousels, and uniform reveal effects.
- Prefer CSS-only motion that communicates hierarchy. Guard all motion with `prefers-reduced-motion`, guard scroll timelines with `@supports`, and suppress hover-only choreography on coarse pointers.
- Keep interactive touch targets at least 44 x 44 pixels and never hide essential content behind JavaScript animation.
- Public interior routes must pass their own `activeHref`; current navigation is rendered server-side and must not require `usePathname` or a client boundary.
- Keep the interior skip link and `#interior-main` landmark stable.
- Keep the native mobile `<details>/<summary>` navigation server-rendered; do not replace it with a JavaScript-only menu without a complete focus/fallback review.
- Keep the mobile summary and every navigation/CTA target at least 44 x 44 pixels.
- Import form limits and validation from `lib/enquiries/validation.ts`; never duplicate that contract in the component.

## Known gotchas
- The supplied logo is a low-resolution JPEG with a white background. Use it safely in Phase 1, then produce an approved transparent/vector-quality version before launch.
- Do not rely on remote reference-site images; use local licensed or approved media.
- Avoid dense package grids, discount banners, and chat widgets that obscure the personal positioning.
- Planning CTAs point to `/plan-your-journey`; direct phone, WhatsApp, email, and office details remain unpublished until verified.
- Self-hosted image optimization depends on the pinned `sharp` production dependency.
- `next.config.ts` disables Next's automatic root agent-instruction files because the project knowledge base is the maintained source of truth.
- Desktop and mobile navigation both exist in the server HTML; CSS selects the appropriate presentation at 760px. Accessible names in tests must distinguish the two navigation landmarks.
- The display stack is `Arial, Helvetica, sans-serif`; do not reintroduce `Arial Narrow` without bundling and approving a deterministic font asset.
- The logo-cleanup image-generation attempt was rejected and is not referenced by the app because it changed the bird geometry and produced a baked checkerboard rather than true alpha.

## How it is tested
Run `pnpm verify`, then exercise `next start`, the 404, discovery routes, enquiry API, and optimized logo endpoint. Browser verification must cover 390 x 844 and desktop widths, native mobile disclosure with JavaScript unavailable, visible labels/errors/focus, pending/unavailable states, no horizontal overflow, logo loading, animation completion, coarse-pointer behavior where available, reduced-motion behavior where media emulation is available, and console/CSP errors.

## Related knowledge-base files
- [Product](product.md)
- [Architecture](architecture.md)
- [Testing](testing.md)
- [Referral enquiries](enquiries.md)
- [SEO and discovery](seo.md)
