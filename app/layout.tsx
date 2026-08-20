import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import {
  isSiteIndexingEnabled,
  OrganizationSchema,
  resolveCanonicalOrigin,
} from "./organization-schema";
import "./globals.css";

const canonicalSiteUrl = new URL(resolveCanonicalOrigin());
const indexingEnabled = isSiteIndexingEnabled();
const siteTitle = "Sai World Travels | Holidays, Your Way";
const siteDescription =
  "Personalised, end-to-end holidays planned for travellers introduced through Sai World Travels' trusted client network.";

export const metadata: Metadata = {
  metadataBase: canonicalSiteUrl,
  applicationName: "Sai World Travels",
  title: {
    default: siteTitle,
    template: "%s | Sai World Travels",
  },
  description: siteDescription,
  robots: {
    index: indexingEnabled,
    follow: indexingEnabled,
  },
  openGraph: {
    type: "website",
    siteName: "Sai World Travels",
    title: siteTitle,
    description: siteDescription,
    url: "/",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#183c78",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <OrganizationSchema />
        {children}
      </body>
    </html>
  );
}
