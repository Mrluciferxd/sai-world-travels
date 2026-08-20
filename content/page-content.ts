export const corePageSlugs = [
  "how-we-work",
  "travel-inspiration",
  "about",
] as const;

export type CorePageSlug = (typeof corePageSlugs)[number];
export type DraftContentStatus = "draft";
export type PageId<Slug extends CorePageSlug = CorePageSlug> = `${Slug}-page`;
export type PageSectionId<Slug extends CorePageSlug = CorePageSlug> =
  `${Slug}-${string}`;

export interface PageMetadata {
  readonly title: string;
  readonly description: string;
}

export interface PageIntro<Slug extends CorePageSlug> {
  readonly id: `${Slug}-intro`;
  readonly eyebrow: string;
  readonly title: string;
  readonly emphasizedTitle: string;
  readonly summary: string;
}

export interface EditorialEntry<Slug extends CorePageSlug> {
  readonly id: PageSectionId<Slug>;
  readonly number: `0${1 | 2 | 3 | 4}`;
  readonly title: string;
  readonly body: string;
}

export type EditorialCollection<Entry> =
  | readonly [Entry, Entry, Entry]
  | readonly [Entry, Entry, Entry, Entry];

export interface PageBase<Slug extends CorePageSlug> {
  readonly status: DraftContentStatus;
  readonly slug: Slug;
  readonly id: PageId<Slug>;
  readonly metadata: PageMetadata;
  readonly intro: PageIntro<Slug>;
}

export interface HowWeWorkPage extends PageBase<"how-we-work"> {
  readonly structure: "process";
  readonly sectionLabel: "The personal route";
  readonly steps: EditorialCollection<EditorialEntry<"how-we-work">>;
}

export interface TravelInspirationPage
  extends PageBase<"travel-inspiration"> {
  readonly structure: "moods";
  readonly sectionLabel: "Ways a journey can feel";
  readonly moods: EditorialCollection<EditorialEntry<"travel-inspiration">>;
}

export interface AboutPage extends PageBase<"about"> {
  readonly structure: "principles";
  readonly sectionLabel: "The principles behind the journey";
  readonly principles: EditorialCollection<EditorialEntry<"about">>;
}

export type CorePageContent =
  | HowWeWorkPage
  | TravelInspirationPage
  | AboutPage;

export const pageContent = {
  "how-we-work": {
    status: "draft",
    slug: "how-we-work",
    id: "how-we-work-page",
    metadata: {
      title: "How We Work",
      description:
        "See how a trusted introduction becomes a personal conversation, a customised journey, and travel handled with continued involvement.",
    },
    intro: {
      id: "how-we-work-intro",
      eyebrow: "How we work",
      title: "A personal route,",
      emphasizedTitle: "shaped one conversation at a time.",
      summary:
        "For travellers arriving through a past client or trusted introduction, the journey begins with listening—not with a shelf of ready-made choices.",
    },
    structure: "process",
    sectionLabel: "The personal route",
    steps: [
      {
        id: "how-we-work-introduction",
        number: "01",
        title: "A trusted introduction",
        body:
          "A referral from a past client or trusted connection creates the personal starting point for the journey.",
      },
      {
        id: "how-we-work-conversation",
        number: "02",
        title: "The conversation comes first",
        body:
          "We listen to the travellers, their pace, their priorities, and the moments they want the trip to hold.",
      },
      {
        id: "how-we-work-planning",
        number: "03",
        title: "The journey takes shape",
        body:
          "Sai World Travels plans and arranges the details around what has been discussed, rather than asking travellers to select a fixed itinerary.",
      },
      {
        id: "how-we-work-involvement",
        number: "04",
        title: "Personal involvement throughout",
        body:
          "The same personal approach continues from planning through return, with Sai World Travels involved in the journey it has arranged.",
      },
    ],
  },
  "travel-inspiration": {
    status: "draft",
    slug: "travel-inspiration",
    id: "travel-inspiration-page",
    metadata: {
      title: "Travel Inspiration",
      description:
        "Explore mood-led travel ideas that begin with a trusted introduction and become a journey shaped around the people taking it.",
    },
    intro: {
      id: "travel-inspiration-intro",
      eyebrow: "Travel inspiration",
      title: "Begin with the feeling.",
      emphasizedTitle: "Let the itinerary follow.",
      summary:
        "For every traveller introduced through the trusted network, inspiration is a starting point for conversation—not a catalogue of fixed trips.",
    },
    structure: "moods",
    sectionLabel: "Ways a journey can feel",
    moods: [
      {
        id: "travel-inspiration-family",
        number: "01",
        title: "Family escapes",
        body:
          "Begin with the people travelling: their pace, priorities, and the moments they want to share. Those details guide a journey shaped for that group.",
      },
      {
        id: "travel-inspiration-celebration",
        number: "02",
        title: "Celebration journeys",
        body:
          "Let the occasion set the tone, then shape the pace and details around how the travellers want to mark it together.",
      },
      {
        id: "travel-inspiration-honeymoon",
        number: "03",
        title: "Honeymoons",
        body:
          "A honeymoon can begin with a conversation about pace, atmosphere, and the experiences the travellers value most.",
      },
      {
        id: "travel-inspiration-unhurried",
        number: "04",
        title: "Unhurried getaways",
        body:
          "For travellers who value breathing room, the journey can be shaped around a considered pace instead of a ready-made schedule.",
      },
    ],
  },
  about: {
    status: "draft",
    slug: "about",
    id: "about-page",
    metadata: {
      title: "About",
      description:
        "Understand the relationship-led principles behind Sai World Travels: trusted introductions, thoughtful conversations, and personalised planning.",
    },
    intro: {
      id: "about-intro",
      eyebrow: "About Sai World Travels",
      title: "Travel planning built",
      emphasizedTitle: "around trust and attention.",
      summary:
        "Sai World Travels works through past-client referrals and trusted introductions, then personally plans and arranges each journey around the travellers taking it.",
    },
    structure: "principles",
    sectionLabel: "The principles behind the journey",
    principles: [
      {
        id: "about-introduction",
        number: "01",
        title: "Trust begins the relationship",
        body:
          "A past-client referral or trusted introduction creates a personal beginning for the conversation.",
      },
      {
        id: "about-listening",
        number: "02",
        title: "Listening comes before planning",
        body:
          "The travellers' priorities, preferences, pace, and purpose give the journey its direction.",
      },
      {
        id: "about-customisation",
        number: "03",
        title: "The journey is shaped, not selected",
        body:
          "Planning grows from the conversation rather than from a list of fixed itineraries or ready-made choices.",
      },
      {
        id: "about-involvement",
        number: "04",
        title: "Personal involvement stays close",
        body:
          "Sai World Travels plans, arranges, and remains personally involved from the planning stage through the travellers' return.",
      },
    ],
  },
} as const satisfies {
  readonly [Slug in CorePageSlug]: Extract<CorePageContent, { slug: Slug }>;
};

export const corePages = corePageSlugs.map((slug) => pageContent[slug]);
