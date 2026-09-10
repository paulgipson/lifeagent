import Link from "next/link";
import { coverageSection } from "@/lib/content";
import { products } from "@/lib/products";

/** Four product cards (#coverage) — each links to its landing page and to a preselected quote form. */
export function CoverageGrid() {
  return (
    <section id="coverage" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-[clamp(1rem,4vw,2rem)]">
        <p className="text-center font-heading text-[10px] font-bold uppercase tracking-[0.26em] text-black md:text-[11px]">
          {coverageSection.kicker}
        </p>
        <h2 className="font-heading mt-4 text-center text-3xl font-bold tracking-tight text-brand sm:text-4xl">
          {coverageSection.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-black sm:text-lg">{coverageSection.intro}</p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <article
              key={p.slug}
              className="flex flex-col rounded-2xl border-2 border-neutral-900 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">{p.bestFor}</p>
              <h3 className="mt-2 font-heading text-xl font-bold text-black">{p.cardTitle}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-black/80">{p.cardBody}</p>
              <div className="mt-6 flex flex-col gap-2">
                <Link
                  href={`/${p.slug}#quote`}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-black px-5 text-xs font-bold uppercase tracking-[0.16em] text-brand-bright transition hover:bg-neutral-900"
                >
                  {coverageSection.quoteLabel}
                </Link>
                <Link
                  href={`/${p.slug}#fit`}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-black px-5 text-xs font-bold uppercase tracking-[0.16em] text-black transition hover:bg-slate-50"
                >
                  {coverageSection.ctaLabel}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
