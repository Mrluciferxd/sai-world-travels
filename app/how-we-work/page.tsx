import type { Metadata } from "next";

import { InteriorPage } from "../../components/interior-page";
import { pageContent } from "../../content/page-content";

const page = pageContent["how-we-work"];

export const metadata: Metadata = page.metadata;

export default function HowWeWorkPage() {
  return (
    <InteriorPage
      activeHref="/how-we-work"
      emphasizedTitle={page.intro.emphasizedTitle}
      eyebrow={page.intro.eyebrow}
      folioNumber="03"
      intro={page.intro.summary}
      sectionAriaLabel={page.sectionLabel}
      title={page.intro.title}
    >
      <header className="interior-section-heading process-heading">
        <p>From introduction to return</p>
        <h2>{page.sectionLabel}</h2>
      </header>

      <ol className="process-dossier">
        {page.steps.map((step) => (
          <li className="process-entry" id={step.id} key={step.id}>
            <span className="interior-entry-number" aria-hidden="true">
              {step.number}
            </span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </InteriorPage>
  );
}
