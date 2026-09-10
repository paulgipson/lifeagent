import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { HeroSection } from "@/components/HeroSection";
import { PartnerLogoMarquee } from "@/components/PartnerLogoMarquee";
import { HowItWorks } from "@/components/HowItWorks";
import { AgentSpotlight } from "@/components/AgentSpotlight";
import { AboutCollage } from "@/components/AboutCollage";
import { BottomCta } from "@/components/BottomCta";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { IconCheck } from "@/components/icons";
import { QuoteCta } from "@/components/QuoteCta";
import { partnerLogos } from "@/lib/partnerLogos";
import { productBySlug, products } from "@/lib/products";
import { site } from "@/lib/content";

type Params = Promise<{ product: string }>;

/** Only the four known product slugs are built; anything else 404s. */
export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ product: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { product: slug } = await params;
  const product = productBySlug.get(slug);
  if (!product) return {};
  return {
    title: product.metaTitle,
    description: product.metaDescription,
    alternates: { canonical: `/${product.slug}` },
    openGraph: {
      title: `${product.metaTitle} | ${site.name}`,
      description: product.metaDescription,
      url: `${site.url}/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { product: slug } = await params;
  const product = productBySlug.get(slug);
  if (!product) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const others = products.filter((p) => p.slug !== product.slug);

  return (
    <>
      <SiteHeader />
      <main id="main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <HeroSection
          kicker={product.kicker}
          title={product.headline}
          sub={product.sub}
          bullets={product.bullets}
          defaultCoverage={product.coverage}
          hideCoverage
          source="product_form"
        />
        <PartnerLogoMarquee id="carriers" logos={partnerLogos} showLabel />

        <section id="fit" className="bg-white py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-[clamp(1rem,4vw,2rem)] md:grid-cols-2 md:items-start lg:gap-16">
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-brand sm:text-4xl">{product.fitHeading}</h2>
              <ul className="mt-8 space-y-4">
                {product.fitPoints.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-base leading-snug text-black sm:text-lg">
                    <IconCheck className="mt-0.5 h-6 w-6 shrink-0 text-brand" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <QuoteCta
                location="product_fit"
                className="mt-10 inline-flex min-h-[48px] items-center justify-center rounded-full bg-black px-8 text-xs font-bold uppercase tracking-[0.2em] text-brand-bright transition hover:bg-neutral-900"
              >
                Get my {product.shortName.toLowerCase()} quote
              </QuoteCta>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-surface-soft p-6 md:p-8">
              <h3 className="font-heading text-xl font-bold text-black">{product.shortName} questions, answered</h3>
              <div className="mt-4 divide-y divide-slate-200">
                {product.faq.map((item) => (
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
            <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-black/60">Not sure this is the one? Compare:</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {others.map((p) => (
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

        <BottomCta defaultCoverage={product.coverage} hideCoverage />
      </main>
      <SiteFooter />
      <MobileStickyBar />
    </>
  );
}
