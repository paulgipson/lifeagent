/**
 * Product landing pages — `/term`, `/whole-life`, `/iul`, `/final-expense`.
 * Each page shares the hero form (coverage preselected) and answers that buyer's objections.
 */

import type { CoverageValue } from "@/lib/content";
import { site } from "@/lib/content";

export type ProductFaq = { q: string; a: string };

export type Product = {
  slug: string;
  coverage: Exclude<CoverageValue, "" | "other">;
  name: string;
  shortName: string;
  /** Card copy on the homepage */
  cardTitle: string;
  cardBody: string;
  bestFor: string;
  /** Landing page hero */
  kicker: string;
  headline: string;
  sub: string;
  bullets: readonly string[];
  /** SEO */
  metaTitle: string;
  metaDescription: string;
  /** "Who it's for" section */
  fitHeading: string;
  fitPoints: readonly string[];
  faq: readonly ProductFaq[];
};

export const products: readonly Product[] = [
  {
    slug: "term",
    coverage: "term-life",
    name: "Term Life Insurance",
    shortName: "Term life",
    cardTitle: "Term life",
    cardBody: "The most coverage for the lowest premium, for 10–30 years. Ideal for replacing income and paying off the mortgage.",
    bestFor: "Young families, homeowners, breadwinners",
    kicker: "Term life insurance",
    headline: "Protect your family's income for less than you think.",
    sub: `Lock in 10, 20, or 30 years of coverage at a fixed monthly price. I compare ${site.carrierCountLabel} carriers—including no-exam options—so you get the strongest policy for your budget.`,
    bullets: [
      "Fixed premiums for the full term—no surprises",
      "No-medical-exam approval available for many applicants",
      "Convertible to permanent coverage later with select carriers",
    ],
    metaTitle: "Term Life Insurance Quotes | Compare 15+ Carriers",
    metaDescription:
      "Affordable term life insurance from a licensed agent. Compare 10, 20, and 30-year term quotes from 15+ carriers, with no-exam options. Free, no-obligation quote.",
    fitHeading: "Term life is usually the right fit if you…",
    fitPoints: [
      "Have kids, a spouse, or parents who rely on your income",
      "Want to cover a mortgage, student loans, or other debt for a set period",
      "Want maximum coverage now and plan to be self-insured later",
      "Prefer the simplest, lowest-cost policy",
    ],
    faq: [
      {
        q: "How much term coverage do I need?",
        a: "A common starting point is 10–12× your annual income plus outstanding debts, minus savings. On our call I'll run the numbers for your actual situation rather than a rule of thumb.",
      },
      {
        q: "What happens when the term ends?",
        a: "Coverage stops unless you renew (at a higher rate) or convert to a permanent policy. Many of my clients pair a long term policy with a smaller permanent policy so they're never fully uncovered.",
      },
      {
        q: "Can I get term life without a medical exam?",
        a: "Yes—several carriers approve based on health questions, prescription history, and a phone interview, often within days. If an exam would save you money, I'll tell you.",
      },
    ],
  },
  {
    slug: "whole-life",
    coverage: "whole-life",
    name: "Whole Life Insurance",
    shortName: "Whole life",
    cardTitle: "Whole life",
    cardBody: "Lifelong coverage with premiums that never increase and guaranteed cash value you can borrow against.",
    bestFor: "Guaranteed lifelong protection and legacy planning",
    kicker: "Whole life insurance",
    headline: "Coverage that lasts as long as you do—with guarantees, not guesses.",
    sub: "Fixed premiums, a guaranteed death benefit, and cash value that grows every year. I'll show you how different carriers' dividends and riders compare before you commit.",
    bullets: [
      "Premiums locked for life—never increase",
      "Guaranteed cash value plus potential dividends",
      "Tax-advantaged access to cash value through policy loans",
    ],
    metaTitle: "Whole Life Insurance Quotes | Guaranteed Lifetime Coverage",
    metaDescription:
      "Whole life insurance with fixed premiums and guaranteed cash value. Compare top carriers with a licensed agent. Free, no-obligation quote.",
    fitHeading: "Whole life is usually the right fit if you…",
    fitPoints: [
      "Want coverage that can never expire or be cancelled for age or health",
      "Are planning a legacy, final expenses, or estate liquidity",
      "Value guaranteed, predictable growth over market upside",
      "Want a policy for a child or grandchild that locks in insurability",
    ],
    faq: [
      {
        q: "Why is whole life more expensive than term?",
        a: "You're paying for coverage that lasts your entire life plus building cash value. Over decades the total cost is often lower than repeatedly renewing term policies at older ages.",
      },
      {
        q: "Can I use the cash value while I'm alive?",
        a: "Yes. You can borrow against it, withdraw it, or use it to pay premiums. Loans reduce the death benefit until repaid—I'll walk you through how that works.",
      },
      {
        q: "Whole life vs. IUL?",
        a: "Whole life is guarantees-first: fixed premiums, guaranteed growth. IUL trades some guarantees for higher growth potential tied to a market index. We'll pick based on how you feel about certainty vs. upside.",
      },
    ],
  },
  {
    slug: "iul",
    coverage: "iul",
    name: "Indexed Universal Life (IUL)",
    shortName: "IUL",
    cardTitle: "Indexed universal life (IUL)",
    cardBody: "Permanent protection plus tax-advantaged cash value that grows with a market index—with a floor so a bad year doesn't set you back.",
    bestFor: "Tax-free retirement income and wealth building",
    kicker: "Indexed universal life",
    headline: "Protect your family today and build tax-advantaged wealth for tomorrow.",
    sub: "IUL links your cash value growth to an index like the S&P 500 with a 0% floor, so you participate in gains without market losses. I'll walk you through caps, participation rates, and fees—straight talk, no hype.",
    bullets: [
      "0% floor: cash value doesn't drop when the market does",
      "Tax-free access to cash value through policy loans in retirement",
      "Flexible premiums you can adjust as life changes",
    ],
    metaTitle: "Indexed Universal Life (IUL) Insurance | Tax-Advantaged Growth",
    metaDescription:
      "IUL insurance explained by a licensed agent: market-linked cash value with a 0% floor, tax-free retirement income, and lifelong protection. Free consultation.",
    fitHeading: "IUL is usually the right fit if you…",
    fitPoints: [
      "Already max out (or can't access) a 401(k) or IRA and want another tax-advantaged bucket",
      "Want permanent coverage with more growth potential than whole life",
      "Have 10+ years before you'd need to draw income",
      "Value flexibility in how much and when you pay",
    ],
    faq: [
      {
        q: "Is IUL a scam or too good to be true?",
        a: "No—but it's often sold badly. The gains are capped, fees are real, and illustrations can be overly rosy. I'll show you conservative illustrations and explain every moving part so you decide with clear eyes.",
      },
      {
        q: "How is IUL different from investing in the market?",
        a: "You're not buying stocks. The insurer credits interest based on index performance, subject to a cap and a floor, inside a life insurance policy with tax advantages and a death benefit. It's protection first, accumulation second.",
      },
      {
        q: "What does it cost?",
        a: "IUL is a funded strategy, so it's designed around what you want to contribute—many clients start at a few hundred dollars per month. We'll design it around your budget and goals.",
      },
    ],
  },
  {
    slug: "final-expense",
    coverage: "final-expense",
    name: "Final Expense Insurance",
    shortName: "Final expense",
    cardTitle: "Final expense",
    cardBody: "Simple whole life coverage—typically $5,000–$50,000—to cover funeral costs and final bills so your family isn't left with them.",
    bestFor: "Ages 50–85, no medical exam",
    kicker: "Final expense & burial insurance",
    headline: "Make sure your family never has to pay for your funeral.",
    sub: "Affordable whole life coverage with no medical exam—just a few health questions. Premiums never go up, coverage never expires, and most people are approved within days.",
    bullets: [
      "No medical exam—approval based on a few health questions",
      "Premiums that never increase and coverage that never expires",
      "Options for ages 50–85, including plans for those declined elsewhere",
    ],
    metaTitle: "Final Expense Insurance | No Exam Burial Coverage Ages 50–85",
    metaDescription:
      "Final expense and burial insurance with no medical exam. Fixed premiums, lifetime coverage, fast approval. Talk to a licensed agent—request a free quote online.",
    fitHeading: "Final expense is usually the right fit if you…",
    fitPoints: [
      "Are 50–85 and want to spare your family funeral and medical bills",
      "Have health conditions that make traditional coverage hard to get",
      "Want a simple, fixed monthly payment that fits a fixed income",
      "Want your beneficiary paid quickly, without probate",
    ],
    faq: [
      {
        q: "How much does final expense insurance cost?",
        a: "Most plans run roughly $30–$100 per month depending on age, health, and coverage amount. Once issued, your premium is locked for life.",
      },
      {
        q: "Can I be approved with health problems?",
        a: "Very likely. Many plans accept diabetes, high blood pressure, COPD, and heart history. If you've been declined elsewhere, guaranteed-issue options exist with no health questions at all.",
      },
      {
        q: "How fast will my family get paid?",
        a: "Most carriers pay the death benefit within days to a couple of weeks after receiving the claim—directly to your beneficiary, tax-free, and outside of probate.",
      },
    ],
  },
];

export const productBySlug = new Map(products.map((p) => [p.slug, p]));
export const productByCoverage = new Map(products.map((p) => [p.coverage, p]));
