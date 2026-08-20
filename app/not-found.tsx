import Link from "next/link";

import { ArrowIcon } from "../components/arrow-icon";
import { Eyebrow } from "../components/eyebrow";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { siteContent } from "../content/site-content";

export default function NotFound() {
  return (
    <div className="site-shell interior-shell not-found-shell">
      <a className="skip-link" href="#not-found-main">
        Skip to main content
      </a>

      <SiteHeader
        ctaHref="/plan-your-journey"
        ctaLabel={siteContent.navigation.primaryAction.label}
        homeHref="/"
        homeLabel={siteContent.brand.homeLabel}
        logoAlt={siteContent.brand.logo.alt}
        logoSrc={siteContent.brand.logo.src}
        navigation={siteContent.navigation.items}
        navigationLabel={siteContent.navigation.ariaLabel}
      />

      <main className="not-found-page" id="not-found-main" tabIndex={-1}>
        <section className="not-found-folio" aria-labelledby="not-found-title">
          <div className="not-found-route" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <p className="not-found-index">
            <span>Error</span>
            404
          </p>

          <div className="not-found-copy">
            <Eyebrow tone="dark" withRule>
              Route not found
            </Eyebrow>
            <h1 id="not-found-title">
              This page is outside
              <br />
              <em>the current route.</em>
            </h1>
            <p>
              The address may have changed, or the page may no longer be part of
              this site.
            </p>

            <div className="not-found-actions">
              <Link className="button button-primary" href="/">
                <span>Return home</span>
                <ArrowIcon />
              </Link>
              <Link className="text-link" href="/plan-your-journey">
                Start planning your journey
              </Link>
            </div>
          </div>
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
