import type { MetadataRoute } from "next";

import { resolveCanonicalOrigin } from "./organization-schema";

const publicPaths = [
  "/",
  "/how-we-work",
  "/travel-inspiration",
  "/about",
  "/plan-your-journey",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const canonicalOrigin = resolveCanonicalOrigin();

  return publicPaths.map((path) => ({
    url: new URL(path, canonicalOrigin).toString(),
  }));
}
