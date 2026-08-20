const defaultCanonicalOrigin = "https://saiworldtravels.in";

export function resolveCanonicalOrigin(
  configuredValue = process.env.CANONICAL_SITE_URL,
) {
  if (!configuredValue?.trim()) return defaultCanonicalOrigin;

  try {
    const url = new URL(configuredValue.trim());

    if (url.protocol !== "https:" || url.username || url.password) {
      return defaultCanonicalOrigin;
    }

    return url.origin;
  } catch {
    return defaultCanonicalOrigin;
  }
}

export function isSiteIndexingEnabled(
  configuredValue = process.env.SITE_INDEXING_ENABLED,
) {
  return configuredValue === "true";
}

export function OrganizationSchema() {
  const canonicalOrigin = resolveCanonicalOrigin();
  const organizationId = `${canonicalOrigin}/#organization`;
  const websiteId = `${canonicalOrigin}/#website`;
  const description =
    "Personalised travel planning for travellers introduced through Sai World Travels' trusted client network.";
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "Sai World Travels",
        url: `${canonicalOrigin}/`,
        logo: `${canonicalOrigin}/brand/sai-world-logo.jpeg`,
        description,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: "Sai World Travels",
        url: `${canonicalOrigin}/`,
        description,
        publisher: {
          "@id": organizationId,
        },
      },
    ],
  } as const;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
