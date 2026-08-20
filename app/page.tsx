import type { Metadata } from "next";

import { ArrowIcon } from "../components/arrow-icon";
import { Eyebrow } from "../components/eyebrow";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { siteContent } from "../content/site-content";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const {
    brand,
    contact,
    footer,
    hero,
    inspiration,
    navigation,
    promise,
    service,
  } = siteContent;

  return (
    <div className="site-shell">
      <SiteHeader
        ctaHref={navigation.primaryAction.href}
        ctaLabel={navigation.primaryAction.label}
        homeLabel={brand.homeLabel}
        logoAlt={brand.logo.alt}
        logoSrc={brand.logo.src}
        navigation={navigation.items}
        navigationLabel={navigation.ariaLabel}
      />

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <Eyebrow withRule>{hero.eyebrow}</Eyebrow>
            <h1 id="hero-title">
              {hero.title}
              <br />
              <em>{hero.emphasizedTitle}</em>
            </h1>
            <p className="hero-summary">{hero.summary}</p>
            <div className="hero-actions">
              <a className="button button-primary" href={hero.primaryAction.href}>
                {hero.primaryAction.label}
                <ArrowIcon />
              </a>
              <a className="text-link" href={hero.secondaryAction.href}>
                {hero.secondaryAction.label}
              </a>
            </div>
            <p className="relationship-note">{hero.relationshipNote}</p>
          </div>

          <div className="hero-visual">
            <div className="journey-card">
              <div className="journey-card-topline">
                <span>{hero.journeyCard.topline}</span>
              </div>
              <p className="journey-label">{hero.journeyCard.label}</p>
              <p className="journey-title">{hero.journeyCard.title}</p>
              <div className="journey-points">
                {hero.journeyCard.points.map((point) => (
                  <span key={point}>{point}</span>
                ))}
              </div>
            </div>

            <div className="personal-touch-card">
              <p>
                <strong>{hero.personalTouch.title}</strong>
                <span>{hero.personalTouch.detail}</span>
              </p>
            </div>
          </div>

          <a
            className="hero-scroll"
            href={hero.scrollAction.href}
            aria-label={hero.scrollAction.ariaLabel}
          >
            <span />
            {hero.scrollAction.label}
          </a>
        </section>

        <section className="approach section" id="approach" aria-labelledby="approach-title">
          <div className="section-heading">
            <Eyebrow tone="dark">{service.eyebrow}</Eyebrow>
            <h2 id="approach-title">
              {service.title} <em>{service.emphasizedTitle}</em>
              <br />
              {service.titleContinuation}
            </h2>
            <p>{service.description}</p>
          </div>

          <ol className="steps-grid">
            {service.steps.map((step) => (
              <li key={step.number}>
                <span className="step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="inspiration section" id="inspiration" aria-labelledby="inspiration-title">
          <div className="inspiration-copy">
            <Eyebrow tone="dark">{inspiration.eyebrow}</Eyebrow>
            <h2 id="inspiration-title">
              {inspiration.title}
              <br />
              <em>{inspiration.emphasizedTitle}</em>
            </h2>
            <p>{inspiration.description}</p>
          </div>

          <ul className="journey-types" aria-label={inspiration.listLabel}>
            {inspiration.journeyTypes.map((journey) => (
              <li key={journey.number}>
                <strong>{journey.label}</strong>
              </li>
            ))}
          </ul>
        </section>

        <section className="promise section" id="about" aria-labelledby="promise-title">
          <p className="promise-kicker">{promise.kicker}</p>
          <blockquote>
            <p id="promise-title">{promise.quote}</p>
          </blockquote>
          <div className="promise-signoff">
            <span />
            <p>
              <strong>{promise.signoffName}</strong>
              <span>{promise.signoffTagline}</span>
            </p>
          </div>
        </section>

        <section className="contact section" id="contact" aria-labelledby="contact-title">
          <div>
            <Eyebrow>{contact.eyebrow}</Eyebrow>
            <h2 id="contact-title">
              {contact.title}
              <br />
              <em>{contact.emphasizedTitle}</em>
            </h2>
          </div>
          <div className="contact-action">
            <p>{contact.description}</p>
            <a className="button button-light" href={contact.action.href}>
              {contact.action.label}
              <ArrowIcon />
            </a>
            <small>{contact.availabilityNote}</small>
          </div>
        </section>
      </main>

      <SiteFooter
        brandName={footer.brandName}
        copyright={footer.legalNotice.text}
        description={footer.summary}
        homeHref={footer.homeHref}
        logoSrc={brand.logo.src}
        tagline={footer.tagline}
      />
    </div>
  );
}
