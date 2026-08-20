import type { Metadata } from "next";

import { InteriorPage } from "../../components/interior-page";
import { pageContent } from "../../content/page-content";

const page = pageContent["travel-inspiration"];

export const metadata: Metadata = {
  ...page.metadata,
  alternates: {
    canonical: "/travel-inspiration",
  },
};

export default function TravelInspirationPage() {
  return (
    <InteriorPage
      activeHref="/travel-inspiration"
      emphasizedTitle={page.intro.emphasizedTitle}
      eyebrow={page.intro.eyebrow}
      intro={page.intro.summary}
      sectionAriaLabel={page.sectionLabel}
      title={page.intro.title}
    >
      <header className="interior-section-heading moods-heading">
        <p>Not destinations. Directions.</p>
        <h2>{page.sectionLabel}</h2>
      </header>

      <ul className="mood-index">
        {page.moods.map((mood) => (
          <li className="mood-entry" id={mood.id} key={mood.id}>
            <span className="interior-entry-number" aria-hidden="true">
              {mood.number}
            </span>
            <h3>{mood.title}</h3>
            <p>{mood.body}</p>
          </li>
        ))}
      </ul>
    </InteriorPage>
  );
}
