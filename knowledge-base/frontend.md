# Frontend

## What this subsystem does
The frontend presents a premium, approachable travel-concierge experience and guides referred visitors toward a personal enquiry.

## How it is structured
The root App Router layout provides brand metadata. `app/page.tsx` currently implements the responsive Phase 1 homepage foundation with header navigation, hero, approach steps, inspiration categories, promise, disabled contact preview, and footer. `app/globals.css` contains the initial design tokens and responsive rules. `public/brand/sai-world-logo.jpeg` is the supplied temporary brand asset.

## Conventions and rules
- Server Components by default; add `use client` only for interaction.
- Use `next/image` for responsive images.
- Maintain strong keyboard focus, semantic headings, readable contrast, and reduced-motion behaviour.
- Design mobile-first and verify the 390 x 844 critical path.
- Use the logo palette as a starting point: deep blue, sky blue, warm orange/gold, and light neutral backgrounds.

## Known gotchas
- The supplied logo is a low-resolution JPEG with a white background. Use it safely in Phase 1, then produce an approved transparent/vector-quality version before launch.
- Do not rely on remote reference-site images; use local licensed or approved media.
- Avoid dense package grids, discount banners, and chat widgets that obscure the personal positioning.
- The current contact control is intentionally disabled until official details and the Supabase enquiry flow exist.
- Self-hosted image optimization depends on the pinned `sharp` production dependency.

## How it is tested
Run `pnpm verify`, then exercise `next start` and the optimized logo endpoint. Browser verification must cover 390 x 844 and desktop widths, visible focus treatment, no horizontal overflow, logo loading, disabled enquiry state, and console errors.

## Related knowledge-base files
- [Product](product.md)
- [Architecture](architecture.md)
- [Testing](testing.md)
