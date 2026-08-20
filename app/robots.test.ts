import { afterEach, describe, expect, it } from "vitest";

import robots from "./robots";

const originalIndexingValue = process.env.SITE_INDEXING_ENABLED;
const originalCanonicalValue = process.env.CANONICAL_SITE_URL;

afterEach(() => {
  if (originalIndexingValue === undefined) {
    delete process.env.SITE_INDEXING_ENABLED;
  } else {
    process.env.SITE_INDEXING_ENABLED = originalIndexingValue;
  }

  if (originalCanonicalValue === undefined) {
    delete process.env.CANONICAL_SITE_URL;
  } else {
    process.env.CANONICAL_SITE_URL = originalCanonicalValue;
  }
});

describe("robots discovery route", () => {
  it("disallows all crawling by default", () => {
    delete process.env.SITE_INDEXING_ENABLED;

    const result = robots();

    expect(result.rules).toEqual({
      userAgent: "*",
      disallow: ["/", "/api/"],
    });
  });

  it("allows public pages while excluding the API when indexing is enabled", () => {
    process.env.SITE_INDEXING_ENABLED = "true";

    const result = robots();

    expect(result.rules).toEqual({
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    });
  });

  it("points crawlers to the canonical host and sitemap", () => {
    delete process.env.SITE_INDEXING_ENABLED;
    delete process.env.CANONICAL_SITE_URL;

    const result = robots();

    expect(result.host).toBe("https://saiworldtravels.in");
    expect(result.sitemap).toBe("https://saiworldtravels.in/sitemap.xml");
  });

  it("uses the validated build-time canonical origin", () => {
    process.env.CANONICAL_SITE_URL = "https://preview.example.test/path";

    const result = robots();

    expect(result.host).toBe("https://preview.example.test");
    expect(result.sitemap).toBe("https://preview.example.test/sitemap.xml");
  });
});
