import { afterEach, describe, expect, it } from "vitest";

import nextConfig from "./next.config";

const originalIndexing = process.env.SITE_INDEXING_ENABLED;

afterEach(() => {
  if (originalIndexing === undefined) {
    delete process.env.SITE_INDEXING_ENABLED;
  } else {
    process.env.SITE_INDEXING_ENABLED = originalIndexing;
  }
});

describe("portable response safety headers", () => {
  it("removes framework disclosure and applies safe defaults to every route", async () => {
    expect(nextConfig.poweredByHeader).toBe(false);
    expect(nextConfig.headers).toBeTypeOf("function");

    const rules = await nextConfig.headers?.();
    expect(rules).toHaveLength(2);
    expect(rules?.[0]).toEqual({
      source: "/api/:path*",
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
    });
    expect(rules?.[1].source).toBe("/:path*");

    const headers = Object.fromEntries(
      rules?.[1].headers.map(({ key, value }) => [key, value]) ?? [],
    );

    expect(headers).toMatchObject({
      "Cross-Origin-Opener-Policy": "same-origin",
      "Permissions-Policy": "camera=(), geolocation=(), microphone=()",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
    });
    expect(headers["Content-Security-Policy"]).toContain("frame-ancestors 'none'");
    expect(headers["Content-Security-Policy"]).toContain("form-action 'self'");
    expect(headers["Content-Security-Policy"]).not.toContain("https://*.supabase.co");
    expect(headers["X-Robots-Tag"]).toBe("noindex, nofollow");
  });

  it("removes only the public noindex header when production indexing is enabled", async () => {
    process.env.SITE_INDEXING_ENABLED = "true";
    const rules = await nextConfig.headers?.();
    const siteHeaders = Object.fromEntries(
      rules?.[1].headers.map(({ key, value }) => [key, value]) ?? [],
    );
    const apiHeaders = Object.fromEntries(
      rules?.[0].headers.map(({ key, value }) => [key, value]) ?? [],
    );

    expect(siteHeaders["X-Robots-Tag"]).toBeUndefined();
    expect(apiHeaders["X-Robots-Tag"]).toBe("noindex, nofollow");
  });

  it("does not enable HSTS before the approved HTTPS cutover", async () => {
    const rules = await nextConfig.headers?.();
    const names = rules?.flatMap((rule) => rule.headers.map((header) => header.key));

    expect(names).not.toContain("Strict-Transport-Security");
  });
});
