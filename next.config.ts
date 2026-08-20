import type { NextConfig } from "next";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "connect-src 'self'",
  "font-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "img-src 'self' data: blob:",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
].join("; ");

const nextConfig: NextConfig = {
  agentRules: false,
  poweredByHeader: false,
  async headers() {
    const siteHeaders = [
      { key: "Content-Security-Policy", value: contentSecurityPolicy },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      {
        key: "Permissions-Policy",
        value: "camera=(), geolocation=(), microphone=()",
      },
    ];

    if (process.env.SITE_INDEXING_ENABLED !== "true") {
      siteHeaders.push({ key: "X-Robots-Tag", value: "noindex, nofollow" });
    }

    return [
      {
        source: "/api/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/:path*",
        headers: siteHeaders,
      },
    ];
  },
};

export default nextConfig;
