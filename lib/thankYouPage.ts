/** Thank you page — post–quote form (see build.md). */

import { paul, site } from "@/lib/content";

export const thankYouHero = {
  title: "You're in.",
  subtitle: `Thanks for reaching out—I've got your request, ${site.name} style: personally, not through a call center.`,
  body: `I'll review what you shared and call you ${site.responsePromise}. Want to skip the wait? Pick a time below and I'll call you then, or call or text me right now.`,
  personalQuote: `I'm ${paul.displayName}, and I'll be the one on the phone—same agent from first call to policy in force.`,
  callLabel: "Call Paul now",
  textLabel: "Text Paul",
  outOfStateNotice:
    "Heads up: I'm not licensed in your state yet, so I'll personally connect you with a trusted agent who is. You'll still hear from me first.",
} as const;

/** Optional YouTube video ID — set to enable the play button (e.g. "abc123"). */
export const thankYouVideoYoutubeId = "";

export const thankYouExpect = {
  heading: "What happens next",
  closing: "No fees, no obligation—just straight answers until you're ready.",
  steps: [
    {
      label: "STEP I",
      body: `I review your request and run your numbers across ${site.carrierCountLabel} carriers—no broker fees or application fees to get started.`,
    },
    {
      label: "STEP II",
      body: `I call you from ${site.phone} (save it so you know it's me). If you booked a time, I'll call exactly then. If I miss you, I'll text.`,
    },
    {
      label: "STEP III",
      body: "On our 15-minute call we compare your best options side by side. If one fits, I can start the application on the same call.",
    },
  ],
} as const;

/**
 * Thank-you page testimonials — leave empty until you have real, attributable reviews.
 * The block hides itself when there are no items.
 */
export const thankYouTestimonialsSection = {
  kicker: "WHAT CLIENTS SAY",
  intervalMs: 6000,
  items: [] as readonly { quote: string; author: string; verifiedLabel: string }[],
};

export const thankYouFaq = {
  heading: "Frequently Asked Questions",
  intro: "Quick answers about how I work with clients and what happens after you request a quote.",
  items: [
    {
      q: "What types of life insurance do you offer?",
      a: "Term, whole life, indexed universal life (IUL), and final expense—matched to what you're trying to protect (income, mortgage, legacy, funeral costs).",
    },
    {
      q: "How do I know which type of life insurance is right for me?",
      a: "We'll talk through your budget, timeline, and who depends on you. I'll explain a short list of options with trade-offs in plain English so you can decide with confidence.",
    },
    {
      q: "What will you need from me on the call?",
      a: "Roughly: your date of birth, height/weight, any medications or conditions, how much coverage you want, and your monthly budget. Fifteen minutes is usually enough.",
    },
    {
      q: "Is there a cost for getting a quote?",
      a: "No. There's no fee to talk through options or get a quote. You only pay premiums if you choose to apply for and place a policy.",
    },
    {
      q: "What if I don't hear from you?",
      a: `Call or text me directly at ${site.phone}, or email ${site.email}. Check your spam folder too—my confirmation email sometimes lands there.`,
    },
  ],
} as const;

export const thankYouPreFooter = {
  line1: "Don't want to wait for my call?",
  line2: "Call or text me now and we can get started today.",
} as const;
