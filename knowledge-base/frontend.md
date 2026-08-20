# Frontend

## What this subsystem does
The frontend presents a premium, approachable travel-concierge experience and guides referred visitors toward a personal enquiry.

## How it is structured
The root App Router layout provides brand metadata. `app/page.tsx` composes the homepage from readonly data in `content/site-content.ts`. The three core routes use draft-safe data from `content/page-content.ts` and a shared `components/interior-page.tsx` shell. `app/globals.css` implements the Private Journey Folio visual system, distinct route compositions, finite motion, focus treatment, and reduced-motion fallback. `public/brand/sai-world-logo.jpeg` is the supplied temporary brand asset.

## Conventions and rules
- Server Components by default; add `use client` only for interaction.
- Use `next/image` for responsive images.
- Maintain strong keyboard focus, semantic headings, readable contrast, and reduced-motion behaviour.
- Design mobile-first and verify the 390 x 844 critical path.
- Use the logo palette as a starting point: deep blue, sky blue, warm orange/gold, and light neutral backgrounds.
- Preserve editorial asymmetry, document-like folio edges, and route/checkpoint storytelling; avoid generic rounded-card grids, glass panels, stock travel icons, carousels, and uniform reveal effects.
- Prefer CSS-only motion that communicates hierarchy. Guard all motion with `prefers-reduced-motion`, guard scroll timelines with `@supports`, and suppress hover-only choreography on coarse pointers.
- Keep interactive touch targets at least 44 x 44 pixels and never hide essential content behind JavaScript animation.
- Public interior routes must pass their own `activeHref`; current navigation is rendered server-side and must not require `usePathname` or a client boundary.
- Keep the interior skip link and `#interior-main` landmark stable.

## Known gotchas
- The supplied logo is a low-resolution JPEG with a white background. Use it safely in Phase 1, then produce an approved transparent/vector-quality version before launch.
- Do not rely on remote reference-site images; use local licensed or approved media.
- Avoid dense package grids, discount banners, and chat widgets that obscure the personal positioning.
- The current contact control is intentionally disabled until official details and the Supabase enquiry flow exist.
- Self-hosted image optimization depends on the pinned `sharp` production dependency.
- `next.config.ts` disables Next's automatic root agent-instruction files because the project knowledge base is the maintained source of truth.

## How it is tested
Run `pnpm verify`, then exercise `next start` and the optimized logo endpoint. Browser verification must cover 390 x 844 and desktop widths, visible focus treatment, no horizontal overflow, logo loading, disabled enquiry state, animation completion, coarse-pointer behavior where available, reduced-motion behavior where media emulation is available, and console errors.

## Related knowledge-base files
- [Product](product.md)
- [Architecture](architecture.md)
- [Testing](testing.md)
