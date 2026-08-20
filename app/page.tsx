import Image from "next/image";

const serviceSteps = [
  {
    number: "01",
    title: "A personal introduction",
    description:
      "You arrive through someone who already knows the care we put into every journey.",
  },
  {
    number: "02",
    title: "A thoughtful conversation",
    description:
      "We listen to your pace, priorities, preferences, and the moments you want the trip to hold.",
  },
  {
    number: "03",
    title: "One journey, handled fully",
    description:
      "We shape the itinerary, arrange the details, and stay personally involved from planning to return.",
  },
] as const;

const journeyTypes = [
  "Family escapes",
  "Celebration journeys",
  "Honeymoons",
  "Unhurried getaways",
] as const;

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="M4 10h11m-4-4 4 4-4 4" />
    </svg>
  );
}

function CompassMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="28" />
      <path d="m40 23-5.1 11.9L23 40l5.1-11.9L40 23Z" />
      <circle cx="32" cy="32" r="2.5" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Sai World Travels home">
          <Image
            src="/brand/sai-world-logo.jpeg"
            alt="Sai World Travels"
            width={72}
            height={72}
            priority
          />
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#approach">How we work</a>
          <a href="#inspiration">Travel inspiration</a>
          <a href="#about">Our promise</a>
        </nav>

        <a className="header-cta" href="#contact">
          <span>Plan your journey</span>
          <ArrowIcon />
        </a>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span aria-hidden="true" />
              Personal travel, by introduction
            </p>
            <h1 id="hero-title">
              A holiday shaped
              <br />
              <em>around you.</em>
            </h1>
            <p className="hero-summary">
              Sai World Travels personally plans, arranges, and manages your
              complete journey—with the care that comes from a trusted
              introduction.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">
                Start planning your journey
                <ArrowIcon />
              </a>
              <a className="text-link" href="#approach">
                Discover how we work
              </a>
            </div>
            <p className="relationship-note">
              <span aria-hidden="true">✦</span>
              Welcoming travellers referred by our past clients and trusted
              network.
            </p>
          </div>

          <div className="hero-visual" aria-label="A personalised journey from idea to return">
            <div className="sun-orbit" aria-hidden="true" />
            <div className="route-line route-line-one" aria-hidden="true" />
            <div className="route-line route-line-two" aria-hidden="true" />

            <div className="journey-card">
              <div className="journey-card-topline">
                <CompassMark />
                <span>Made for you</span>
              </div>
              <p className="journey-label">Your next story</p>
              <p className="journey-title">From a first idea to a beautiful return.</p>
              <div className="journey-track" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="journey-points" aria-hidden="true">
                <span>Imagine</span>
                <span>Plan</span>
                <span>Travel</span>
              </div>
            </div>

            <div className="personal-touch-card">
              <span className="personal-touch-icon" aria-hidden="true">✓</span>
              <p>
                <strong>One personal team</strong>
                <span>with you throughout</span>
              </p>
            </div>
          </div>

          <a className="hero-scroll" href="#approach" aria-label="Scroll to how we work">
            <span />
            Our approach
          </a>
        </section>

        <section className="approach section" id="approach" aria-labelledby="approach-title">
          <div className="section-heading">
            <p className="eyebrow eyebrow-dark">Why the difference feels personal</p>
            <h2 id="approach-title">
              We begin with <em>you,</em>
              <br />
              not a package.
            </h2>
            <p>
              There is no shelf of fixed itineraries here. Every journey begins
              with a conversation and grows around the people taking it.
            </p>
          </div>

          <ol className="steps-grid">
            {serviceSteps.map((step) => (
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
            <p className="eyebrow eyebrow-dark">Travel inspiration</p>
            <h2 id="inspiration-title">
              The feeling comes first.
              <br />
              <em>The itinerary follows.</em>
            </h2>
            <p>
              Tell us what you want to celebrate, discover, or simply leave
              behind for a while. We will shape the right journey from there.
            </p>
          </div>

          <ul className="journey-types" aria-label="Journeys we can personalise">
            {journeyTypes.map((journey, index) => (
              <li key={journey}>
                <span>0{index + 1}</span>
                <strong>{journey}</strong>
                <ArrowIcon />
              </li>
            ))}
          </ul>
        </section>

        <section className="promise section" id="about" aria-labelledby="promise-title">
          <p className="promise-kicker">Our promise</p>
          <blockquote>
            <p id="promise-title">
              “Thoughtful advice, honest conversations, and one team that stays
              close to every detail.”
            </p>
          </blockquote>
          <div className="promise-signoff">
            <span />
            <p>
              <strong>Sai World Travels</strong>
              <span>Holidays, your way.</span>
            </p>
          </div>
        </section>

        <section className="contact section" id="contact" aria-labelledby="contact-title">
          <div>
            <p className="eyebrow">When you are ready</p>
            <h2 id="contact-title">
              Let&apos;s begin with
              <br />
              <em>a conversation.</em>
            </h2>
          </div>
          <div className="contact-action">
            <p>
              Have a destination in mind—or just a feeling you want your next
              holiday to have? We would love to hear it.
            </p>
            <button className="button button-light" type="button" disabled>
              Start planning your journey
              <ArrowIcon />
            </button>
            <small>Enquiry channel coming next — official details to be confirmed</small>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="footer-brand" href="#top">
          <Image
            src="/brand/sai-world-logo.jpeg"
            alt=""
            width={58}
            height={58}
          />
          <span>
            <strong>Sai World Travels</strong>
            <small>Holidays, your way.</small>
          </span>
        </a>
        <p>Personalised travel for referred guests and trusted introductions.</p>
        <small>© 2026 Sai World Travels</small>
      </footer>
    </div>
  );
}
