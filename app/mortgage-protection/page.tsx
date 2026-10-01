import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { AgentSpotlight } from "@/components/AgentSpotlight";
import { AboutCollage } from "@/components/AboutCollage";
import { BottomCta } from "@/components/BottomCta";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { IconCheck } from "@/components/icons";
import { QuoteCta } from "@/components/QuoteCta";
import { mortgageProtection } from "@/lib/mortgageProtection";
import { products } from "@/lib/products";
import { site } from "@/lib/content";

const mp = mortgageProtection;

export const metadata: Metadata = {
  title: mp.metaTitle,
  description: mp.metaDescription,
  alternates: { canonical: `/${mp.slug}` },
  openGraph: {
    title: `${mp.metaTitle} | ${site.name}`,
    description: mp.metaDescription,
    url: `${site.url}/${mp.slug}`,
  },
};

export default function MortgageProtectionPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: mp.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <SiteHeader />
      <main id="main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <HeroSection
          kicker={mp.kicker}
          title={mp.headline}
          sub={mp.sub}
          bullets={[...mp.bullets]}
          defaultCoverage={mp.coverage}
          hideCoverage
          source="product_form"
        />

        <section id="cash-back" className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-[clamp(1rem,4vw,2rem)]">
            <p className="font-heading text-[10px] font-bold uppercase tracking-[0.26em] text-black md:text-[11px]">
              Cash Back Option
            </p>
            <h2 className="font-heading mt-4 max-w-3xl text-3xl font-bold tracking-tight text-brand sm:text-4xl">
              {mp.cbo.heading}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-black sm:text-lg">{mp.cbo.intro}</p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {mp.cbo.points.map((pt) => (
                <article
                  key={pt.title}
                  className="rounded-2xl border-2 border-neutral-900 bg-white p-6 shadow-sm md:p-7"
                >
                  <h3 className="font-heading text-lg font-bold text-black">{pt.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-black/80 sm:text-base">{pt.body}</p>
                </article>
              ))}
            </div>
            <p className="mt-8 text-xs leading-relaxed text-black/55 sm:text-sm">{mp.cbo.footnote}</p>
          </div>
        </section>

        <section id="living-benefits" className="bg-surface-soft py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-[clamp(1rem,4vw,2rem)]">
            <p className="font-heading text-[10px] font-bold uppercase tracking-[0.26em] text-black md:text-[11px]">
              Living benefits
            </p>
            <h2 className="font-heading mt-4 max-w-3xl text-3xl font-bold tracking-tight text-brand sm:text-4xl">
              {mp.livingBenefits.heading}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-black sm:text-lg">
              {mp.livingBenefits.intro}
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {mp.livingBenefits.items.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border-2 border-neutral-900 bg-white p-6 shadow-sm md:p-7"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white">
                    <IconCheck className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-bold text-black">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-black/80 sm:text-base">{item.body}</p>
                </article>
              ))}
            </div>
            <p className="mt-8 text-xs leading-relaxed text-black/55 sm:text-sm">{mp.livingBenefits.footnote}</p>
            <div className="mt-10">
              <QuoteCta
                location="mortgage_living_benefits"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-black px-8 text-xs font-bold uppercase tracking-[0.2em] text-brand-bright transition hover:bg-neutral-900"
              >
                Get my mortgage quote
              </QuoteCta>
            </div>
          </div>
        </section>

        <section id="fit" className="bg-white py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-[clamp(1rem,4vw,2rem)] md:grid-cols-2 md:items-start lg:gap-16">
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-brand sm:text-4xl">{mp.fitHeading}</h2>
              <ul className="mt-8 space-y-4">
                {mp.fitPoints.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-base leading-snug text-black sm:text-lg">
                    <IconCheck className="mt-0.5 h-6 w-6 shrink-0 text-brand" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <QuoteCta
                location="mortgage_fit"
                className="mt-10 inline-flex min-h-[48px] items-center justify-center rounded-full bg-black px-8 text-xs font-bold uppercase tracking-[0.2em] text-brand-bright transition hover:bg-neutral-900"
              >
                Get my mortgage protection quote
              </QuoteCta>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-surface-soft p-6 md:p-8">
              <h3 className="font-heading text-xl font-bold text-black">Mortgage protection questions</h3>
              <div className="mt-4 divide-y divide-slate-200">
                {mp.faq.map((item) => (
                  <details key={item.q} className="group py-1 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-base font-semibold text-black transition hover:text-brand">
                      <span>{item.q}</span>
                      <span className="shrink-0 text-slate-400 transition group-open:rotate-180" aria-hidden>
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </summary>
                    <div className="pb-4 pr-6 text-sm leading-relaxed text-slate-700 sm:text-base">{item.a}</div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <HowItWorks />
        <AgentSpotlight />
        <AboutCollage />

        <section className="bg-white py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-[clamp(1rem,4vw,2rem)]">
            <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-black/60">
              Looking at other coverage too?
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {products.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${p.slug}`}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-black px-5 text-xs font-bold uppercase tracking-[0.14em] text-black transition hover:bg-slate-50"
                >
                  {p.shortName}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <BottomCta defaultCoverage={mp.coverage} hideCoverage />
      </main>
      <SiteFooter />
      <MobileStickyBar />
    </>
  );
}
