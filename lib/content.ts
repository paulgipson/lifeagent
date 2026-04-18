/** Central copy and config — Paul Gipson, first person (see build.md). */

export const paul = {
  displayName: "Paul Gipson",
  brandName: "LifeAgentPaul",
} as const;

export const site = {
  name: "LifeAgentPaul",
  tagline:
    "I'm Paul Gipson—personal life insurance help from someone who works for you, not a script.",
  url: "https://lifeagentpaul.com",
  phone: "(424) 244-1061",
  /** E.164 — used for `tel:` links and structured data */
  phoneTel: "+14242441061",
  email: "hello@lifeagentpaul.com",
  /** Single line for footer / UI */
  address: "Los Angeles, CA",
  addressLocality: "Los Angeles",
  addressRegion: "CA",
  addressCountry: "US",
} as const;

export type NavItem = {
  id: string;
  href: string;
  label: string;
};

/** Primary header/footer nav — one entry per destination. */
export const primaryNav: readonly NavItem[] = [
  { id: "carriers", href: "/#carriers", label: "Carriers I work with" },
  { id: "services", href: "/#life", label: "Services" },
  { id: "paul", href: "/#agent", label: "Meet Paul" },
  { id: "about", href: "/#about", label: "About me" },
  { id: "blog", href: "/blog", label: "Blog" },
];

/** Dedupe by href (first wins) — use if merging nav from multiple sources. */
export function dedupeNavByHref(items: readonly NavItem[]): NavItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.href)) return false;
    seen.add(item.href);
    return true;
  });
}

export const hero = {
  title: "A Smarter Way to Protect Your Life & Build Wealth",
  sub:
    "I help individuals and families protect what matters today while building long-term, tax-advantaged wealth through the right life insurance strategy.",
  bullets: [
    "Personalized Coverage That Fits Your Budget",
    "Straightforward Guidance — No Confusion",
    "Ongoing Support (Not Just a One-Time Sale)",
  ],
  /** Social / discovery strip above logo row (hero). */
  featuredTitle: "Life Agent Paul has been SEEN on:",
};

export const coverageOptions = [
  { value: "", label: "Select Insurance Type" },
  { value: "term-life", label: "Term life" },
  { value: "whole-life", label: "Whole life" },
  { value: "universal-life", label: "Universal life" },
  { value: "iul", label: "Indexed universal life (IUL)" },
  { value: "final-expense", label: "Final expense" },
  { value: "other", label: "Other / not sure" },
] as const;

export const valueBanner = {
  /** Small kicker above the headline — edit to taste */
  kicker: "THE DOORDASH OF INSURANCE",
  body:
    "I connect you with strong carriers, explain every option in plain English, and stay with you through enrollment—so you skip the runaround and get coverage that fits.",
};

export const lifeSection = {
  heading: "Protect what matters most.",
  body:
    "Life insurance is about the people who depend on you. I work with leading carriers to match term, permanent, or final expense coverage to your goals and budget—no cookie-cutter quotes.",
  callout: "There's not a plan or product I can't source for you.",
  coverage: [
    {
      title: "Term life",
      description: "Affordable protection for a set period—ideal for income replacement and major obligations.",
    },
    {
      title: "Whole & universal life",
      description: "Lifelong coverage with cash value options you can understand before you commit.",
    },
    {
      title: "Final expense",
      description: "Simpler policies designed to cover end-of-life costs for peace of mind.",
    },
  ] as const,
};

/** Advanced / accumulation products (IUL, annuities, etc.). */
export const advancedMarketsSection = {
  heading: "Advanced market options—built around your goals.",
  body:
    "When you're ready to go beyond basic protection, I help you navigate indexed products and annuities with straight talk: caps, floors, fees, and how they fit your tax picture and retirement income plan.",
  callout: "If it grows your legacy or your income, I'll help you understand it before you sign.",
  coverage: [
    {
      title: "Indexed Universal Life (IUL)",
      description:
        "Cash value growth tied to an index—with a floor that limits downside in many designs. I walk you through caps, participation rates, and how loans or withdrawals can work.",
    },
    {
      title: "Fixed indexed annuities (FIA)",
      description:
        "Principal protection with growth linked to indexes; I compare crediting methods, surrender periods, and income riders so you know what you're locking in.",
    },
    {
      title: "Variable & traditional annuities",
      description:
        "From variable annuities with investment subaccounts to fixed and immediate income annuities—I'll spell out fees, guarantees, and payout options in plain English.",
    },
    {
      title: "Income & legacy riders",
      description:
        "Guaranteed lifetime withdrawal benefit (GLWB) and death benefit riders—when they help, when they don't, and what they cost.",
    },
    {
      title: "1035 exchanges & tax-aware moves",
      description:
        "When a tax-free exchange or repositioning an old policy makes sense—and when it doesn't—I map the tradeoffs before you move a dollar.",
    },
  ] as const,
};

/** Lifestyle block: image left, story right (#why-us) */
export const lifestyleStory = {
  kicker: "PEOPLE OVER PROFITS",
  heading: "Paul Gipson isn't your average insurance agent—get ready to level up.",
  paragraphs: [
    "I believe in more than dropping a policy in your inbox. Insurance should create room to breathe—so when life throws a curveball, you're protected, not panicking.",
    "You won't get a random rep reading a script. You get me—Paul Gipson—on your side: straight answers, options that fit your budget, and someone who picks up when you call.",
    "I shop multiple carriers and explain what you're actually buying—premiums, payouts, exclusions, and the fine print—before you sign anything.",
    "If you're ready to level up how you protect your family and your future, I'm ready to earn your trust. Tap below and I'll reach out personally.",
  ],
};

/** Agent difference: text left, portrait right (#agent) */
export const agentDifference = {
  kicker: "WHY CHOOSE ME?",
  heading: "Discover the LifeAgentPaul difference",
  paragraphs: [
    "LifeAgentPaul isn't a faceless brand—it's how I work as an individual agent: licensed, accountable, and focused on long-term relationships, not one-off sales.",
    "My name is on the line every time I recommend a plan. I'll walk you through life and advanced-market options in plain English, then stay available as your needs evolve.",
  ],
  quote:
    "I'll help you stay protected when life changes—and I'll answer when you call. Your family's future is a relationship to me, not a one-time sale.",
  quoteAttribution: "Paul Gipson",
};

/** Homepage testimonial carousel (auto-advances every `intervalMs` unless reduced motion) */
export const testimonialsSection = {
  kicker: "CUSTOMER TESTIMONIALS",
  intervalMs: 5000,
  items: [
    {
      quote:
        "The application process was smooth, and Paul was a true professional throughout—clear, patient, and on top of every detail.",
      author: "Jason S.",
      verifiedLabel: "Verified Review",
    },
    {
      quote:
        "Paul explained our options without pressure and helped us pick coverage that actually fit our budget. I finally felt like someone was on our side.",
      author: "Maria R.",
      verifiedLabel: "Verified Review",
    },
    {
      quote:
        "I had questions after enrollment—Paul picked up and walked me through it. That kind of follow-through is rare.",
      author: "David K.",
      verifiedLabel: "Verified Review",
    },
  ],
} as const;

/** Services / “next level” three-up cards */
export const servicesHighlight = {
  kicker: "SERVICES",
  heading: "Taking insurance to the next level",
  intro:
    "You work with me—not a script. Here's how I help you move from confused to confident.",
  cards: [
    {
      title: "Comprehensive plans",
      body: "Life and advanced-market options—matched to what you actually need, not a one-size-fits-all quote.",
    },
    {
      title: "Expert consultation",
      body: "Straight answers from a licensed agent: I'll help you compare carriers, policy designs, and costs until the decision feels right for your family.",
    },
    {
      title: "Hassle-free policy support",
      body: "Enrollment, paperwork, and follow-ups—I'll stay in the loop so you're never guessing what happens next.",
    },
  ] as const,
};

/** Black value banner — benefit lines */
export const stats = {
  headline: "Protection You Can Actually Understand",
  items: [
    { line: "Simplified Life Insurance Strategies" },
    { line: "Fast Approvals (No Hassle)" },
    { line: "Access to Top-Rated Carriers" },
    { line: "Guided Step-by-Step Support" },
  ],
} as const;

/** How it works — three steps + intro */
export const howItWorksSection = {
  kicker: "HOW IT WORKS",
  heading: "Protect your loved ones in 3 simple steps",
  intro:
    "At LifeAgentPaul, my mission is to make life insurance simple, accessible, and tailored to your unique requirements.",
  ctaText: "Click here to get started today!",
  ctaHref: "/#quote",
  steps: [
    {
      stepLabel: "STEP 1",
      body: "Fill out a quick questionnaire and let me know your needs.",
    },
    {
      stepLabel: "STEP 2",
      body: "I craft a range of policies tailored to fit your needs and budget—no cookie-cutter quotes.",
    },
    {
      stepLabel: "STEP 3",
      body: "Apply with no broker fees—I stay with you through the application until you're covered.",
    },
  ],
} as const;
