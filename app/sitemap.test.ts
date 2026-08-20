import { afterEach, describe, expect, it } from "vitest";

import sitemap from "./sitemap";

const originalCanonicalValue = process.env.CANONICAL_SITE_URL;

afterEach(() => {
  if (originalCanonicalValue === undefined) {
    delete process.env.CANONICAL_SITE_URL;
  } else {
    process.env.CANONICAL_SITE_URL = originalCanonicalValue;
  }
});

describe("public sitemap", () => {
  it("contains exactly the five canonical public pages", () => {
    delete process.env.CANONICAL_SITE_URL;

    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls).toEqual([
      "https://saiworldtravels.in/",
      "https://saiworldtravels.in/how-we-work",
      "https://saiworldtravels.in/travel-inspiration",
      "https://saiworldtravels.in/about",
      "https://saiworldtravels.in/plan-your-journey",
    ]);
    expect(new Set(urls).size).toBe(5);
    expect(urls.every((url) => !url.includes("/api/"))).toBe(true);
  });

  it("does not invent freshness or ranking signals", () => {
    delete process.env.CANONICAL_SITE_URL;

    for (const entry of sitemap()) {
      expect(Object.keys(entry)).toEqual(["url"]);
    }
  });

  it("uses the validated build-time canonical origin", () => {
    process.env.CANONICAL_SITE_URL = "https://preview.example.test/path";

    expect(sitemap()[0]?.url).toBe("https://preview.example.test/");
  });
});
