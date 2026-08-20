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
  homeHref?: string;
  homeLabel?: string;
  navigationLabel?: string;
};

export function SiteHeader({
  ctaHref,
  ctaLabel,
  logoAlt,
  logoSrc,
  navigation,
  homeHref = "#top",
  homeLabel = "Sai World Travels home",
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
          <a key={`${item.href}-${item.label}`} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <a className="header-cta" href={ctaHref}>
        <span>{ctaLabel}</span>
        <ArrowIcon />
      </a>
    </header>
  );
}
