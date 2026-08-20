import Image from "next/image";

import { ArrowIcon } from "./arrow-icon";

export type SiteNavigationItem = {
  href: string;
  label: string;
};

export type SiteHeaderProps = {
  ctaHref: string;
  ctaLabel: string;
  logoAlt: string;
  logoSrc: string;
  navigation: readonly SiteNavigationItem[];
  activeHref?: string;
  homeHref?: string;
  homeLabel?: string;
  mobileNavigationLabel?: string;
  navigationLabel?: string;
};

export function SiteHeader({
  activeHref,
  ctaHref,
  ctaLabel,
  logoAlt,
  logoSrc,
  navigation,
  homeHref = "#top",
  homeLabel = "Sai World Travels home",
  mobileNavigationLabel = "Menu",
  navigationLabel = "Main navigation",
}: SiteHeaderProps) {
  return (
    <header className="site-header">
      <a className="brand" href={homeHref} aria-label={homeLabel}>
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={72}
          height={72}
          priority
        />
      </a>

      <nav className="desktop-nav" aria-label={navigationLabel}>
        {navigation.map((item) => (
          <a
            key={`${item.href}-${item.label}`}
            href={item.href}
            aria-current={item.href === activeHref ? "page" : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <details className="mobile-folio-nav">
        <summary>
          <span>{mobileNavigationLabel}</span>
          <span className="mobile-folio-checkpoints" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </summary>

        <nav aria-label={`${navigationLabel} mobile`}>
          {navigation.map((item, index) => {
            const routeNumber = String(index + 1).padStart(2, "0");

            return (
              <a
                key={`mobile-${item.href}-${item.label}`}
                href={item.href}
                aria-label={`${routeNumber} — ${item.label}`}
                aria-current={item.href === activeHref ? "page" : undefined}
              >
                <span aria-hidden="true">{routeNumber}</span>
                <strong aria-hidden="true">{item.label}</strong>
              </a>
            );
          })}
          <a
            className="mobile-folio-cta"
            href={ctaHref}
            aria-label={`04 — ${ctaLabel}`}
            aria-current={ctaHref === activeHref ? "page" : undefined}
          >
            <span aria-hidden="true">04</span>
            <strong aria-hidden="true">{ctaLabel}</strong>
            <ArrowIcon />
          </a>
        </nav>
      </details>

      <a
        className="header-cta"
        href={ctaHref}
        aria-current={ctaHref === activeHref ? "page" : undefined}
      >
        <span>{ctaLabel}</span>
        <ArrowIcon />
      </a>
    </header>
  );
}
