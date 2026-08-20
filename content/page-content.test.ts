import { describe, expect, it } from "vitest";

import { corePages, corePageSlugs, pageContent } from "./page-content";

function collectText(value: unknown): string[] {
  if (typeof value === "string") {
    return [value];
  }

  if (Array.isArray(value)) {
    return value.flatMap(collectText);
  }

  if (value && typeof value === "object") {
    return Object.values(value).flatMap(collectText);
  }

  return [];
}

function pageEntryIds(page: (typeof corePages)[number]): readonly string[] {
  switch (page.structure) {
    case "process":
      return page.steps.map((step) => step.id);
    case "moods":
      return page.moods.map((mood) => mood.id);
    case "principles":
      return page.principles.map((principle) => principle.id);
  }
}

describe("Phase 3 core page content", () => {
  it("defines exactly the three approved route slugs", () => {
    expect(corePageSlugs).toEqual([
      "how-we-work",
      "travel-inspiration",
      "about",
    ]);
    expect(Object.keys(pageContent)).toEqual(corePageSlugs);
    expect(corePages).toHaveLength(3);
  });

  it("keeps every page explicitly draft for owner approval", () => {
    for (const page of corePages) {
      expect(page.status).toBe("draft");
      expect(page.metadata.title).toBeTruthy();
      expect(page.metadata.description).toBeTruthy();
    }
  });

  it("gives every route unique metadata, title treatment, and section language", () => {
    expect(new Set(corePages.map((page) => page.metadata.title)).size).toBe(3);
    expect(new Set(corePages.map((page) => page.intro.title)).size).toBe(3);
    expect(new Set(corePages.map((page) => page.intro.emphasizedTitle)).size).toBe(3);
    expect(new Set(corePages.map((page) => page.sectionLabel)).size).toBe(3);
  });

  it("uses positive referral and trusted-introduction positioning", () => {
    for (const page of corePages) {
      const copy = collectText(page).join(" ");

      expect(copy).toMatch(/referral|referred|trusted introduction/i);
      expect(copy).toMatch(/conversation|listening/i);
      expect(copy).toMatch(/plan|shape|arrange/i);
    }
  });

  it("uses stable, unique IDs for pages, intros, and editorial entries", () => {
    const ids = corePages.flatMap((page) => [
      page.id,
      page.intro.id,
      ...pageEntryIds(page),
    ]);

    expect(new Set(ids).size).toBe(ids.length);

    for (const page of corePages) {
      const pageIds = [page.id, page.intro.id, ...pageEntryIds(page)];

      for (const id of pageIds) {
        expect(id).toMatch(/^[a-z][a-z0-9-]*$/);
        expect(id.startsWith(`${page.slug}-`)).toBe(true);
      }
    }
  });

  it("contains no unverified commercial, company, contact, or legal claims", () => {
    const copy = collectText(corePages).join(" ");

    expect(copy).not.toMatch(
      /book now|instant booking|instant confirmation|starting from|fixed price|limited-time|discount|offer ends|best price|price match|guarantee|guaranteed|24\/?7|within \d+ (?:minute|hour|day)s?|award|accredit|certified|licensed|registered|founded|established|since \d{4}|\d+ years?|testimonial|client says|our partners?|₹|\$\d|\bUSD\b|\bINR\b/i,
    );
    expect(copy).not.toMatch(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i);
    expect(copy).not.toMatch(/(?:\+\d{1,3}[\s-]?)?(?:\d[\s-]?){10,}/);
  });
});
