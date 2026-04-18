/** Thank you page — post–quote form (see build.md). */

import { paul, site } from "@/lib/content";

export const thankYouHero = {
  title: "Thank you",
  subtitle: `for reaching out and taking the first step with ${site.name}!`,
  body: "I'm excited to help you explore life insurance options that fit your goals—no pressure, no jargon overload.",
  personalQuote: `I'm ${paul.displayName}, and I want to personally guide you through the next steps.`,
} as const;

/** Optional YouTube video ID — set to enable the play button (e.g. "abc123"). */
export const thankYouVideoYoutubeId = "";

export const thankYouExpect = {
  heading: "Here's what you can expect to happen next",
  closing: "I look forward to helping you find the right life insurance coverage!",
  steps: [
    {
      label: "STEP I",
      body: "I'll review your request and match you with life insurance options that fit what you shared—no broker fees or application fees to get started.",
    },
    {
      label: "STEP II",
      body: "You may get a call from a number you don't recognize—that could be me or my line. If you miss it, I'll try again or send a text so we can connect.",
    },
    {
      label: "STEP III",
      body: "On our call, we'll walk through your goals and compare carriers together. There's no obligation—just straight answers until you're ready to move forward.",
    },
  ],
} as const;

/** Thank you page — dedicated testimonials (separate from homepage carousel). */
export const thankYouTestimonialsSection = {
  kicker: "CUSTOMER TESTIMONIALS",
  intervalMs: 6000,
  items: [
    {
      quote:
        "Paul explained term versus permanent coverage without the jargon—I finally understood what I was buying and why it fit our budget.",
      author: "Sarah T.",
      verifiedLabel: "Verified Review",
    },
    {
      quote:
        "I braced for a hard sell. Instead I got straight answers, a few solid options, and someone who actually picked up when I had follow-up questions.",
      author: "Marcus J.",
      verifiedLabel: "Verified Review",
    },
    {
      quote:
        "From our first call through enrollment, Paul stayed in the loop. That kind of follow-through is exactly what I wanted for something this important.",
      author: "Elena V.",
      verifiedLabel: "Verified Review",
    },
  ],
} as const;

export const thankYouFaq = {
  heading: "Frequently Asked Questions",
  intro: "Quick answers about how I work with clients and what happens after you request a quote.",
  items: [
    {
      q: "What types of life insurance do you offer?",
      a: "I help with term, whole, universal, indexed products, final expense, and other life insurance designs—matched to what you're trying to protect (income, mortgage, legacy, and more).",
    },
    {
      q: "How do I know which type of life insurance is right for me?",
      a: "We'll talk through your budget, timeline, and who depends on you. I'll explain a short list of options with trade-offs in plain English so you can decide with confidence.",
    },
    {
      q: "What information do I need to provide to get a quote?",
      a: "Basics like contact info, state, and what you're looking for get us started. As we go, I may ask follow-ups so quotes reflect your real situation.",
    },
    {
      q: "How do I get a quote?",
      a: "Submit the form, and I'll reach out to schedule a quick conversation. From there I'll run comparisons across carriers I work with.",
    },
    {
      q: "Is there a cost for getting a quote?",
      a: "There's no fee to talk through options or get a quote. You only pay premiums if you choose to apply for and place a policy.",
    },
  ],
} as const;

export const thankYouPreFooter = {
  line1: "No fees. No hassle. Just honest life insurance help.",
  line2: "Get started today—I'll help you find a plan that fits your needs.",
} as const;
