export const siteSectionIds = [
  "top",
  "approach",
  "inspiration",
  "about",
  "contact",
] as const;

export type SiteSectionId = (typeof siteSectionIds)[number];
export type SiteSectionHref = `#${SiteSectionId}`;
export type CorePageHref = "/how-we-work" | "/travel-inspiration" | "/about";
export type SiteHref = SiteSectionHref | CorePageHref;
export type ContentStatus = "verified" | "pending";

export interface NavigationItem {
  readonly label: string;
  readonly href: SiteHref;
}

export interface ServiceStep {
  readonly number: `0${1 | 2 | 3}`;
  readonly title: string;
  readonly description: string;
}

export interface JourneyType {
  readonly number: `0${1 | 2 | 3 | 4}`;
  readonly label: string;
}

export interface SiteContent {
  readonly brand: {
    readonly status: "verified";
    readonly name: string;
    readonly tagline: string;
    readonly logo: {
      readonly src: string;
      readonly alt: string;
    };
    readonly homeLabel: string;
  };
  readonly navigation: {
    readonly status: "verified";
    readonly ariaLabel: string;
    readonly items: readonly NavigationItem[];
    readonly primaryAction: NavigationItem;
  };
  readonly hero: {
    readonly status: "verified";
    readonly eyebrow: string;
    readonly title: string;
    readonly emphasizedTitle: string;
    readonly summary: string;
    readonly primaryAction: NavigationItem;
    readonly secondaryAction: NavigationItem;
    readonly relationshipNote: string;
    readonly journeyCard: {
      readonly topline: string;
      readonly label: string;
      readonly title: string;
      readonly points: readonly [string, string, string];
    };
    readonly personalTouch: {
      readonly title: string;
      readonly detail: string;
    };
    readonly scrollAction: NavigationItem & { readonly ariaLabel: string };
  };
  readonly service: {
    readonly status: "verified";
    readonly eyebrow: string;
    readonly title: string;
    readonly emphasizedTitle: string;
    readonly titleContinuation: string;
    readonly description: string;
    readonly steps: readonly ServiceStep[];
  };
  readonly inspiration: {
    readonly status: "verified";
    readonly eyebrow: string;
    readonly title: string;
    readonly emphasizedTitle: string;
    readonly description: string;
    readonly listLabel: string;
    readonly journeyTypes: readonly JourneyType[];
  };
  readonly promise: {
    readonly status: "verified";
    readonly kicker: string;
    readonly quote: string;
    readonly signoffName: string;
    readonly signoffTagline: string;
  };
  readonly contact: {
    readonly status: "pending";
    readonly eyebrow: string;
    readonly title: string;
    readonly emphasizedTitle: string;
    readonly description: string;
    readonly action: {
      readonly label: string;
      readonly enabled: false;
      readonly href: null;
    };
    readonly availabilityNote: string;
  };
  readonly footer: {
    readonly status: "verified";
    readonly brandName: string;
    readonly tagline: string;
    readonly summary: string;
    readonly homeHref: SiteSectionHref;
    readonly legalNotice: {
      readonly status: "pending";
      readonly text: string;
    };
  };
}

export const siteContent = {
  brand: {
    status: "verified",
    name: "Sai World Travels",
    tagline: "Holidays, your way.",
    logo: {
      src: "/brand/sai-world-logo.jpeg",
      alt: "Sai World Travels",
    },
    homeLabel: "Sai World Travels home",
  },
  navigation: {
    status: "verified",
    ariaLabel: "Main navigation",
    items: [
      { label: "How we work", href: "/how-we-work" },
      { label: "Travel inspiration", href: "/travel-inspiration" },
      { label: "About", href: "/about" },
    ],
    primaryAction: {
      label: "Plan your journey",
      href: "#contact",
    },
  },
  hero: {
    status: "verified",
    eyebrow: "Personal travel, by introduction",
    title: "A holiday shaped",
    emphasizedTitle: "around you.",
    summary:
      "Sai World Travels personally plans, arranges, and manages your complete journey—with the care that comes from a trusted introduction.",
    primaryAction: {
      label: "Start planning your journey",
      href: "#contact",
    },
    secondaryAction: {
      label: "Discover how we work",
      href: "#approach",
    },
    relationshipNote:
      "Welcoming travellers referred by our past clients and trusted network.",
    journeyCard: {
      topline: "Made for you",
      label: "Your next story",
      title: "From a first idea to a beautiful return.",
      points: ["Imagine", "Plan", "Travel"],
    },
    personalTouch: {
      title: "One personal team",
      detail: "with you throughout",
    },
    scrollAction: {
      label: "Our approach",
      href: "#approach",
      ariaLabel: "Scroll to how we work",
    },
  },
  service: {
    status: "verified",
    eyebrow: "Why the difference feels personal",
    title: "We begin with",
    emphasizedTitle: "you,",
    titleContinuation: "not a package.",
    description:
      "There is no shelf of fixed itineraries here. Every journey begins with a conversation and grows around the people taking it.",
    steps: [
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
    ],
  },
  inspiration: {
    status: "verified",
    eyebrow: "Travel inspiration",
    title: "The feeling comes first.",
    emphasizedTitle: "The itinerary follows.",
    description:
      "Tell us what you want to celebrate, discover, or simply leave behind for a while. We will shape the right journey from there.",
    listLabel: "Journeys we can personalise",
    journeyTypes: [
      { number: "01", label: "Family escapes" },
      { number: "02", label: "Celebration journeys" },
      { number: "03", label: "Honeymoons" },
      { number: "04", label: "Unhurried getaways" },
    ],
  },
  promise: {
    status: "verified",
    kicker: "Our promise",
    quote:
      "“Thoughtful advice, honest conversations, and one team that stays close to every detail.”",
    signoffName: "Sai World Travels",
    signoffTagline: "Holidays, your way.",
  },
  contact: {
    status: "pending",
    eyebrow: "When you are ready",
    title: "Let's begin with",
    emphasizedTitle: "a conversation.",
    description:
      "Have a destination in mind—or just a feeling you want your next holiday to have? We would love to hear it.",
    action: {
      label: "Start planning your journey",
      enabled: false,
      href: null,
    },
    availabilityNote:
      "Enquiry channel coming next — official details to be confirmed",
  },
  footer: {
    status: "verified",
    brandName: "Sai World Travels",
    tagline: "Holidays, your way.",
    summary:
      "Personalised travel for referred guests and trusted introductions.",
    homeHref: "#top",
    legalNotice: {
      status: "pending",
      text: "© 2026 Sai World Travels",
    },
  },
} as const satisfies SiteContent;
