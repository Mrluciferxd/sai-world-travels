import type { Metadata } from "next";

import { InteriorPage } from "../../components/interior-page";
import { pageContent } from "../../content/page-content";

const page = pageContent.about;

export const metadata: Metadata = {
  ...page.metadata,
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <InteriorPage
      activeHref="/about"
      emphasizedTitle={page.intro.emphasizedTitle}
      eyebrow={page.intro.eyebrow}
      intro={page.intro.summary}
      sectionAriaLabel={page.sectionLabel}
      title={page.intro.title}
    >
      <header className="interior-section-heading principles-heading">
        <p>A relationship-led point of view</p>
        <h2>{page.sectionLabel}</h2>
      </header>

      <div className="principles-manifesto">
        {page.principles.map((principle) => (
          <article className="principle-entry" id={principle.id} key={principle.id}>
            <span className="interior-entry-number" aria-hidden="true">
              {principle.number}
            </span>
            <div>
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
            </div>
          </article>
        ))}
      </div>
    </InteriorPage>
  );
}
