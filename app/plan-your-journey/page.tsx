import type { Metadata } from "next";

import { InteriorPage } from "../../components/interior-page";
import { ReferralEnquiryForm } from "../../components/referral-enquiry-form";

export const metadata: Metadata = {
  title: "Plan Your Journey",
  description: "Begin a private, referral-led travel enquiry with Sai World Travels.",
  alternates: {
    canonical: "/plan-your-journey",
  },
};

export default function PlanYourJourneyPage() {
  return (
    <InteriorPage
      activeHref="/plan-your-journey"
      emphasizedTitle="with a conversation."
      eyebrow="A private introduction"
      intro="Share the essential details of the journey you have in mind and the trusted introduction that brought you here."
      sectionAriaLabel="Referral enquiry"
      title="Your journey begins"
      variant="enquiry"
    >
      <div className="enquiry-page-layout">
        <aside className="enquiry-page-note" aria-labelledby="enquiry-note-title">
          <span aria-hidden="true">Before you begin / 01</span>
          <h2 id="enquiry-note-title">Only the first details.</h2>
          <p>
            This enquiry is for travel preferences and follow-up details only.
            Please do not share identity documents or payment information.
          </p>
        </aside>

        <ReferralEnquiryForm />
      </div>
    </InteriorPage>
  );
}
