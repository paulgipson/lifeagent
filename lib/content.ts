/** Central copy and config — Paul Gipson, first person (see build.md). */

import { licensedStateCodeList, licensedStates } from "@/lib/licenses";

export const paul = {
  displayName: "Paul Gipson",
  brandName: "LifeAgentPaul",
} as const;

export const site = {
  name: "LifeAgentPaul",
  tagline:
    "I'm Paul Gipson—a licensed life insurance agent who compares term, whole life, IUL, and final expense coverage from 15+ carriers so you get the right policy at the right price.",
  /** SEO title for the homepage */
  seoTitle: "Life Insurance Agent | Term, Whole Life, IUL & Final Expense Quotes",
  url: "https://lifeagentpaul.com",
  phone: "(424) 244-1061",
  /** E.164 — used for `tel:` links and structured data */
  phoneTel: "+14242441061",
  /** Prefilled text so a lead can start a conversation in one tap */
  smsBody: "Hi Paul, I just requested a life insurance quote on your site and I'd like to talk.",
  email: "hello@lifeagentpaul.com",
  /** Single line for footer / UI */
  address: "Los Angeles, CA",
  addressLocality: "Los Angeles",
  addressRegion: "CA",
  addressCountry: "US",
  /** How fast a lead should expect to hear from Paul — used in copy; keep it honest. */
  responsePromise: "within 1 business hour",
  carrierCountLabel: "15+",
} as const;

export const licensedStateCount = licensedStates.length;

export type NavItem = {
  id: string;
  href: string;
  label: string;
};

/** Primary header/footer nav — one entry per destination. Blog is hidden until it has content. */
export const primaryNav: readonly NavItem[] = [
  { id: "coverage", href: "/#coverage", label: "Coverage" },
  { id: "how", href: "/#how-it-works", label: "How it works" },
  { id: "paul", href: "/#agent", label: "Meet Paul" },
  { id: "faq", href: "/#faq", label: "FAQ" },
];

/** Header / sticky-bar primary CTA */
export const primaryCta = {
  label: "Get my free quote",
  shortLabel: "Get quote",
  href: "/#quote",
} as const;

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
  kicker: "Term · Whole Life · IUL · Final Expense",
  title: "Life insurance that fits your budget—from a real agent, not a call center.",
  sub: `I compare ${site.carrierCountLabel} top carriers, explain your options in plain English, and get you covered in one 15-minute call. No pressure, no jargon.`,
  bullets: [
    "Quotes back within 24 hours—usually same day",
    "No-medical-exam options for most ages and budgets",
    `Licensed in ${licensedStateCount} states · ${site.carrierCountLabel} carriers compared for you`,
  ],
  formTitle: "Get your free quote",
  formSub: "Takes about 60 seconds. I'll personally review it and reach out.",
  submitLabel: "Get my free quote",
  /** Trust strip under the hero copy */
  trust: [
    { value: `${licensedStateCount}`, label: "States licensed", detail: licensedStateCodeList },
    { value: site.carrierCountLabel, label: "Carriers compared" },
    { value: "1", label: "Agent, start to finish" },
    { value: "$0", label: "Fees to work with me" },
  ],
} as const;

export const coverageOptions = [
  { value: "", label: "What are you looking for?" },
  { value: "term-life", label: "Term life" },
  { value: "whole-life", label: "Whole life" },
  { value: "iul", label: "Indexed universal life (IUL)" },
  { value: "final-expense", label: "Final expense / burial" },
  { value: "other", label: "Not sure yet—help me choose" },
] as const;

export type CoverageValue = (typeof coverageOptions)[number]["value"];

export const valueBanner = {
  kicker: `One agent. ${site.carrierCountLabel} carriers. Zero runaround.`,
  headlineA: "You talk to me—",
  headlineB: "not a call center.",
  body:
    "I shop the carriers, explain every option in plain English, and stay with you from application through approval. No fees to work with me, ever—carriers pay me, you don't.",
  cta: "Compare my options",
};

/** Coverage grid (#coverage) — one card per product, linking to its landing page. */
export const coverageSection = {
  kicker: "Coverage",
  heading: "Four ways to protect the people you love",
  intro: "Not sure which one fits? Pick the closest and I'll walk you through the rest on our call.",
  ctaLabel: "Learn more",
  quoteLabel: "Get a quote",
} as const;

/** Lifestyle block: image left, story right (#why-us) */
export const lifestyleStory = {
  kicker: "PEOPLE OVER PROFITS",
  heading: "You won't get a random rep reading a script. You get me.",
  paragraphs: [
    "Insurance should create room to breathe—so when life throws a curveball, your family is protected, not panicking.",
    "I shop multiple carriers and explain what you're actually buying—premiums, payouts, exclusions, and the fine print—before you sign anything.",
    "And I pick up when you call. After the policy is issued, I'm still your agent: beneficiary changes, questions, reviews when life changes.",
  ],
};

/** Agent difference: text left, portrait right (#agent) */
export const agentDifference = {
  kicker: "MEET PAUL",
  heading: "Licensed, accountable, and on your side",
  paragraphs: [
    `I'm Paul Gipson, a licensed life insurance producer (NPN 21670586) serving families in ${licensedStateCount} states. LifeAgentPaul isn't a brand with a sales floor behind it—it's me.`,
    "My name is on the line every time I recommend a plan. I'll show you term, whole life, IUL, and final expense options side by side, tell you which one I'd pick for your situation and why, and then stay available as your needs evolve.",
  ],
  quote:
    "I'll help you stay protected when life changes—and I'll answer when you call. Your family's future is a relationship to me, not a one-time sale.",
  quoteAttribution: "Paul Gipson",
};

/**
 * Homepage testimonials. Leave `items` empty until you have real, attributable reviews
 * (e.g. copied from your Google Business Profile with the reviewer's consent). The section
 * hides itself when there are no items. Never publish invented reviews — FTC rules apply.
 */
export const testimonialsSection = {
  kicker: "WHAT CLIENTS SAY",
  intervalMs: 6000,
  /** Public reviews URL (Google Business Profile). Shown as "Read all reviews" when set. */
  reviewsUrl: "",
  items: [] as readonly { quote: string; author: string; verifiedLabel: string }[],
};

/** Black value banner — benefit lines */
export const stats = {
  headline: "Protection You Can Actually Understand",
  items: [
    { line: "Simplified Life Insurance Strategies" },
    { line: "Fast Approvals (No Hassle)" },
    { line: `Access to ${site.carrierCountLabel} Top-Rated Carriers` },
    { line: "Guided Step-by-Step Support" },
  ],
} as const;

/** How it works — three steps + intro */
export const howItWorksSection = {
  kicker: "HOW IT WORKS",
  heading: "Covered in 3 simple steps",
  intro: "No fees, no obligation, and you can stop at any step.",
  ctaText: "Start step 1 now",
  ctaHref: "/#quote",
  steps: [
    {
      stepLabel: "STEP 1",
      title: "Tell me about you",
      body: "60 seconds: who you're protecting, your budget, and the best way to reach you.",
    },
    {
      stepLabel: "STEP 2",
      title: "I compare carriers & call you",
      body: `I run your numbers across ${site.carrierCountLabel} carriers and call ${site.responsePromise}—or pick a time on my calendar that suits you.`,
    },
    {
      stepLabel: "STEP 3",
      title: "Apply in one call",
      body: "We pick the plan together and I handle the application and follow-ups until your policy is in force.",
    },
  ],
} as const;

/** Homepage FAQ (#faq) — objections that block form fills. */
export const homeFaq = {
  kicker: "FAQ",
  heading: "Questions I get every day",
  items: [
    {
      q: "How much does life insurance cost?",
      a: "It depends on your age, health, coverage amount, and policy type. Healthy 30-somethings often find 20-year term coverage for less than a streaming subscription each month; final expense plans for seniors typically run from roughly $30–$100 per month. I'll show you real numbers from multiple carriers so you can see the range for your situation.",
    },
    {
      q: "Do I need a medical exam?",
      a: "Often, no. Many carriers offer no-exam term, whole life, and final expense policies based on a few health questions and a phone interview. If an exam would get you a meaningfully better rate, I'll tell you and let you decide.",
    },
    {
      q: "Can I get covered with diabetes, high blood pressure, or another condition?",
      a: "Usually yes. Different carriers treat conditions differently, which is exactly why I shop more than one. Final expense and guaranteed-issue plans are also available for people who have been declined elsewhere.",
    },
    {
      q: "What's the difference between term, whole life, and IUL?",
      a: "Term covers you for a set period (10–30 years) at the lowest cost. Whole life lasts your entire life with fixed premiums and guaranteed cash value. IUL is permanent coverage whose cash value grows based on a market index with a floor against losses—useful for tax-advantaged accumulation. We'll figure out which fits your goal and budget on our call.",
    },
    {
      q: "How fast can I get covered?",
      a: "Some no-exam policies can be approved the same day you apply. Fully underwritten policies typically take two to six weeks. I'll set expectations up front based on the carrier we choose.",
    },
    {
      q: "What happens after I submit the form?",
      a: `I personally review your request and reach out ${site.responsePromise} during business hours. You can also book a specific time on my calendar or call me directly at ${site.phone}. There's no fee and no obligation.`,
    },
    {
      q: "Do you charge a fee?",
      a: "No. I'm paid by the insurance carrier when a policy is placed, so my help—quotes, comparisons, application support—costs you nothing.",
    },
  ],
} as const;

/** Final CTA with embedded form at the bottom of the homepage */
export const bottomCta = {
  kicker: "Ready when you are",
  heading: "Get your free quote—I'll take it from here.",
  sub: `Fill this out and I'll personally reach out ${site.responsePromise}. Prefer to talk now? Call ${site.phone}.`,
} as const;
