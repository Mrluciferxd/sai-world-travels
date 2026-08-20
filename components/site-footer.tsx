import Image from "next/image";

export type SiteFooterProps = {
  brandName: string;
  copyright: string;
  description: string;
  tagline: string;
  logoSrc: string;
  homeHref?: string;
};

export function SiteFooter({
  brandName,
  copyright,
  description,
  tagline,
  logoSrc,
  homeHref = "#top",
}: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <a className="footer-brand" href={homeHref}>
        <Image
          src={logoSrc}
          alt=""
          width={58}
          height={58}
        />
        <span>
          <strong>{brandName}</strong>
          <small>{tagline}</small>
        </span>
      </a>
      <p>{description}</p>
      <small>{copyright}</small>
    </footer>
  );
}
