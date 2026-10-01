/**
 * Mortgage protection — Cash Back Option (CBO) + Living Benefits focus.
 * Carrier-agnostic marketing copy (do not name underwriters on the page).
 */

export const mortgageProtection = {
  slug: "mortgage-protection",
  coverage: "mortgage-protection" as const,
  name: "Mortgage Protection",
  shortName: "Mortgage protection",

  /** Homepage spotlight under #coverage */
  section: {
    kicker: "Homeowners",
    heading: "Mortgage protection with a Cash Back Option",
    intro:
      "Help keep your home in the family if something happens to you—and, with the Cash Back Option, you may get a large share of your premiums back if you outlive the need.",
    highlights: [
      {
        title: "Help pay the mortgage",
        body: "Choose a coverage amount and term that line up with your loan. The death benefit stays level for the full period and goes to your beneficiaries—to help pay off the mortgage or cover other costs.",
      },
      {
        title: "Cash Back Option (CBO)",
        body: "CBO 100 and CBO 50 give you life insurance while you need it, plus the option to receive 100% or 50% of base premiums back at the end of the cash-back period if you request a surrender within the window (less any loans).",
      },
      {
        title: "Living benefits included",
        body: "Critical, chronic, and terminal illness riders can unlock an early (accelerated) payout of death benefits if you qualify—typically at no extra premium for these living benefits.",
      },
    ],
    ctaLearn: "See how mortgage protection works",
    ctaQuote: "Get a mortgage quote",
  },

  /** Dedicated landing page */
  kicker: "Mortgage protection · Cash Back Option",
  headline: "Protect your home—and keep the option to get money back.",
  sub: "Mortgage-focused coverage that helps your family pay the loan if you pass away. With a Cash Back Option, you may reclaim 50% or 100% of base premiums at the end of the period if you never need the claim.",
  bullets: [
    "Level death benefit sized to your mortgage term",
    "Cash Back Option: reclaim 50% or 100% of base premiums when the period ends",
    "Living benefits for critical, chronic, and terminal illness—included at no extra cost on qualifying products",
  ],
  metaTitle: "Mortgage Protection Insurance | Cash Back Option & Living Benefits",
  metaDescription:
    "Mortgage protection with a Cash Back Option and living benefits. Help protect your home, get coverage without a medical exam in many cases, and request a free quote.",

  cbo: {
    heading: "Cash Back Option: coverage now, money-back potential later",
    intro:
      "Hopefully you outlive your mortgage in good health. CBO products are built so you have life insurance while you need it—and a contractual path to get base premiums returned if you terminate at the end of the cash-back period.",
    points: [
      {
        title: "CBO 100",
        body: "At the end of the Cash Back Option period, you may request to terminate and receive 100% of base premiums paid (less any outstanding loans), if the benefit is still in effect.",
      },
      {
        title: "CBO 50",
        body: "Same idea at a lower premium: at the end of the period you may reclaim 50% of base premiums paid (less loans) when you request the cash-back surrender in time.",
      },
      {
        title: "Match the loan timeline",
        body: "Common cash-back / level periods include 15, 20, 25, and 30 years—so you can align protection with how long you’ll be paying the mortgage.",
      },
      {
        title: "Simple underwriting",
        body: "Many applicants answer a few health questions with no medical exam. You’ll often know if you’re covered quickly after applying.",
      },
    ],
    footnote:
      "Cash-back amounts apply to base policy premiums only—not rider premiums. Surrender must be requested within the product’s window after the anniversary (often 60 days). Loans reduce the amount returned. Examples are illustrative; your illustration will show exact numbers.",
  },

  livingBenefits: {
    heading: "Living benefits—if illness hits before a claim",
    intro:
      "Living Benefit riders can give you access to an early (accelerated) payout of death benefits if you’re diagnosed with a qualifying illness. On qualifying products these living benefits are included at no additional premium—and that money can help with treatment, bills, or keeping the household running.",
    items: [
      {
        title: "Critical illness",
        body: "A lump-sum acceleration if you’re diagnosed with a qualifying critical illness such as invasive cancer, stroke, or heart attack.",
      },
      {
        title: "Chronic illness",
        body: "Help if a catastrophic health crisis leaves you unable to perform two activities of daily living for a qualifying period—funds that can go toward care and other expenses.",
      },
      {
        title: "Terminal illness",
        body: "A lump-sum benefit if you’re diagnosed with a qualifying terminal illness (typically life expectancy of 12 months or less)—usable for any purpose.",
      },
    ],
    footnote:
      "Accelerations are subject to eligibility, policy terms, administrative charges, and actuarial discounts. Requested amounts may result in little or no payment. Living benefits reduce the remaining death benefit. Not all benefits are available on every product or in every state.",
  },

  fitHeading: "Mortgage protection with CBO is often a fit if you…",
  fitPoints: [
    "Have a mortgage (or are buying) and want the loan covered if you die",
    "Want the chance to get premiums back if you never file a death claim",
    "Prefer level coverage for a set period that matches the loan",
    "Want living benefits for critical, chronic, or terminal illness built into the plan",
  ],

  faq: [
    {
      q: "How is this different from regular term life?",
      a: "It’s still life insurance sized around a mortgage timeline, but Cash Back Option products add a contractual path to reclaim a large share of base premiums at the end of the period if you terminate on schedule. Living benefits can also unlock money while you’re alive if you qualify.",
    },
    {
      q: "Do I get money back automatically?",
      a: "No. You typically must request the cash-back surrender within a short window after the period ends (often 60 days). If you keep the policy past that window, the cash-back opportunity for that anniversary may no longer apply—I’ll walk you through the exact rules on your illustration.",
    },
    {
      q: "What do living benefits cost?",
      a: "On qualifying Cash Back Option / mortgage-protection designs, critical, chronic, and terminal illness living benefits are often included at no extra premium. Accelerating benefits still reduces the remaining death benefit and may involve charges or discounts.",
    },
    {
      q: "Is there a medical exam?",
      a: "Often no—many applicants qualify by answering health questions on the application. Issuance still depends on those answers and underwriting guidelines.",
    },
    {
      q: "Can the benefit help my family keep the house?",
      a: "The death benefit is paid to your beneficiaries. They can use it to help pay off the mortgage, cover payments, or handle other needs. Optional income-style riders exist on some products if monthly payments would help—ask on our call.",
    },
  ],
} as const;
