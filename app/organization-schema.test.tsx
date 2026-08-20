// @vitest-environment jsdom

import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { metadata, viewport } from "./layout";
import {
  isSiteIndexingEnabled,
  OrganizationSchema,
  resolveCanonicalOrigin,
} from "./organization-schema";

afterEach(cleanup);

const originalCanonicalValue = process.env.CANONICAL_SITE_URL;

beforeEach(() => {
  delete process.env.CANONICAL_SITE_URL;
});

afterEach(() => {
  if (originalCanonicalValue === undefined) {
    delete process.env.CANONICAL_SITE_URL;
  } else {
    process.env.CANONICAL_SITE_URL = originalCanonicalValue;
  }
});

describe("Organization structured data", () => {
  it("keeps root sharing metadata claim-safe and image-free", () => {
    expect(metadata.openGraph).toMatchObject({
      type: "website",
      siteName: "Sai World Travels",
      title: "Sai World Travels | Holidays, Your Way",
      description:
        "Personalised, end-to-end holidays planned for travellers introduced through Sai World Travels' trusted client network.",
      url: "/",
    });
    expect(metadata.openGraph).not.toHaveProperty("images");
    expect(metadata.twitter).toMatchObject({
      card: "summary",
      title: "Sai World Travels | Holidays, Your Way",
      description:
        "Personalised, end-to-end holidays planned for travellers introduced through Sai World Travels' trusted client network.",
    });
    expect(metadata.twitter).not.toHaveProperty("images");
  });

  it("declares the brand theme color through the viewport API", () => {
    expect(viewport).toEqual({
      width: "device-width",
      initialScale: 1,
      themeColor: "#183c78",
    });
  });

  it("uses safe discovery defaults for missing or invalid build settings", () => {
    expect(resolveCanonicalOrigin(undefined)).toBe("https://saiworldtravels.in");
    expect(resolveCanonicalOrigin("not a URL")).toBe("https://saiworldtravels.in");
    expect(resolveCanonicalOrigin("http://example.com")).toBe(
      "https://saiworldtravels.in",
    );
    expect(resolveCanonicalOrigin("https://preview.example.test/path")).toBe(
      "https://preview.example.test",
    );
    expect(isSiteIndexingEnabled(undefined)).toBe(false);
    expect(isSiteIndexingEnabled("false")).toBe(false);
    expect(isSiteIndexingEnabled("true")).toBe(true);
  });

  it("publishes only minimal verified organization and website fields", () => {
    const { container } = render(<OrganizationSchema />);
    const script = container.querySelector('script[type="application/ld+json"]');

    expect(script).toBeTruthy();

    const schema = JSON.parse(script?.textContent ?? "") as Record<string, unknown>;

    expect(schema).toEqual({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://saiworldtravels.in/#organization",
          name: "Sai World Travels",
          url: "https://saiworldtravels.in/",
          logo: "https://saiworldtravels.in/brand/sai-world-logo.jpeg",
          description:
            "Personalised travel planning for travellers introduced through Sai World Travels' trusted client network.",
        },
        {
          "@type": "WebSite",
          "@id": "https://saiworldtravels.in/#website",
          name: "Sai World Travels",
          url: "https://saiworldtravels.in/",
          description:
            "Personalised travel planning for travellers introduced through Sai World Travels' trusted client network.",
          publisher: {
            "@id": "https://saiworldtravels.in/#organization",
          },
        },
      ],
    });

    const graph = schema["@graph"] as Record<string, unknown>[];

    for (const node of graph) {
      expect(node).not.toHaveProperty("address");
      expect(node).not.toHaveProperty("telephone");
      expect(node).not.toHaveProperty("sameAs");
    }
  });
});
