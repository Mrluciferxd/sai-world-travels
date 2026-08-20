import type { MetadataRoute } from "next";

import {
  isSiteIndexingEnabled,
  resolveCanonicalOrigin,
} from "./organization-schema";

export default function robots(): MetadataRoute.Robots {
  const canonicalOrigin = resolveCanonicalOrigin();
  const indexingEnabled = isSiteIndexingEnabled();

  return {
    rules: indexingEnabled
      ? {
          userAgent: "*",
          allow: "/",
          disallow: "/api/",
        }
      : {
          userAgent: "*",
          disallow: ["/", "/api/"],
        },
    sitemap: `${canonicalOrigin}/sitemap.xml`,
    host: canonicalOrigin,
  };
}
