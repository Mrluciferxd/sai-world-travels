import { describe, expect, it } from "vitest";

import { siteContent, siteSectionIds } from "./site-content";

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

describe("claim-safe site content", () => {
  it("states the referral-led relationship model positively", () => {
    const publishedCopy = collectText(siteContent).join(" ");

    expect(publishedCopy).toMatch(/personal travel, by introduction/i);
    expect(publishedCopy).toMatch(/referred by our past clients/i);
    expect(publishedCopy).toMatch(/trusted (introduction|network)/i);
  });

  it("offers personalised inspiration without commerce or pricing claims", () => {
    const publishedCopy = collectText(siteContent).join(" ");

    expect(siteContent.service.titleContinuation).toBe("not a package.");
    expect(siteContent.service.description).toMatch(/no shelf of fixed itineraries/i);
    expect(publishedCopy).not.toMatch(
      /book now|instant checkout|starting from|fixed price|limited-time offer|discount|₹|\$\d|\bUSD\b|\bINR\b/i,
    );
  });

  it("keeps global navigation on the three declared core routes", () => {
    expect(siteContent.navigation.items.map((item) => item.href)).toEqual([
      "/how-we-work",
      "/travel-inspiration",
      "/about",
    ]);
  });

  it("keeps contextual actions on declared local sections", () => {
    const declaredTargets = new Set(siteSectionIds.map((id) => `#${id}`));
    const navigationTargets = [
      siteContent.hero.secondaryAction.href,
      siteContent.hero.scrollAction.href,
      siteContent.footer.homeHref,
    ];

    expect(navigationTargets).not.toHaveLength(0);
    for (const target of navigationTargets) {
      expect(target).toMatch(/^#[a-z][a-z-]*$/);
      expect(declaredTargets.has(target)).toBe(true);
    }
  });

  it("routes qualified visitors to the referral enquiry workflow", () => {
    expect(siteContent.navigation.primaryAction.href).toBe("/plan-your-journey");
    expect(siteContent.hero.primaryAction.href).toBe("/plan-your-journey");
    expect(siteContent.contact.status).toBe("verified");
    expect(siteContent.contact.action.enabled).toBe(true);
    expect(siteContent.contact.action.href).toBe("/plan-your-journey");
    expect(siteContent.contact.availabilityNote).toMatch(/private enquiry.*referred guests/i);
    expect(siteContent.footer.legalNotice.status).toBe("pending");
  });
});
