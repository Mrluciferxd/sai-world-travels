import type { ReactNode } from "react";

import { siteContent } from "../content/site-content";
import { Eyebrow } from "./eyebrow";
import { SiteFooter } from "./site-footer";
import { SiteHeader, type SiteNavigationItem } from "./site-header";

const interiorNavigation: readonly SiteNavigationItem[] =
  siteContent.navigation.items;

export type InteriorPageProps = {
  activeHref?: string;
  children: ReactNode;
  emphasizedTitle: string;
  eyebrow: string;
  intro: string;
  title: string;
  sectionAriaLabel?: string;
  variant?: "default" | "enquiry";
};

export function InteriorPage({
  activeHref,
  children,
  emphasizedTitle,
  eyebrow,
  intro,
  title,
  sectionAriaLabel,
  variant = "default",
}: InteriorPageProps) {
  const shellClassName =
    variant === "enquiry"
      ? "site-shell interior-shell interior-shell-enquiry"
      : "site-shell interior-shell";

  return (
    <div className={shellClassName}>
      <a className="skip-link" href="#interior-main">
        Skip to main content
      </a>

      <SiteHeader
        activeHref={activeHref}
        ctaHref="/plan-your-journey"
        ctaLabel={siteContent.navigation.primaryAction.label}
        homeHref="/"
        homeLabel={siteContent.brand.homeLabel}
        logoAlt={siteContent.brand.logo.alt}
        logoSrc={siteContent.brand.logo.src}
        navigation={interiorNavigation}
        navigationLabel={siteContent.navigation.ariaLabel}
      />

      <main className="interior-page" id="interior-main" tabIndex={-1}>
        <section className="interior-masthead" aria-labelledby="interior-page-title">
          <div className="interior-route-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div className="interior-masthead-heading">
            <Eyebrow tone="dark" withRule>
              {eyebrow}
            </Eyebrow>
            <h1 id="interior-page-title">
              {title}
              <br />
              <em>{emphasizedTitle}</em>
            </h1>
          </div>

          <p className="interior-intro">{intro}</p>
        </section>

        <section className="interior-content" aria-label={sectionAriaLabel}>
          {children}
        </section>
      </main>

      <SiteFooter
        brandName={siteContent.footer.brandName}
        copyright={siteContent.footer.legalNotice.text}
        description={siteContent.footer.summary}
        homeHref="/"
        logoSrc={siteContent.brand.logo.src}
        tagline={siteContent.footer.tagline}
      />
    </div>
  );
}
