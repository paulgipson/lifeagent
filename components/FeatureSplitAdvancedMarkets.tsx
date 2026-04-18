import Link from "next/link";
import { CoverageOptionsList } from "@/components/CoverageOptionsList";
import { advancedMarketsSection } from "@/lib/content";

export function FeatureSplitAdvancedMarkets() {
  return (
    <section id="advanced-markets" className="bg-surface-soft py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-[clamp(1rem,4vw,2rem)]">
        <div className="grid gap-12 md:grid-cols-2 md:items-start md:gap-0 lg:gap-8">
          <div className="md:pr-8 lg:pr-14">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-brand sm:text-4xl">
              {advancedMarketsSection.heading}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-black sm:text-lg">{advancedMarketsSection.body}</p>
            <Link
              href="/#quote"
              className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded border-2 border-black px-8 py-3 text-xs font-bold uppercase tracking-[0.18em] text-black transition hover:bg-black hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              Get your free quote
            </Link>
            <p className="mt-8 rounded-md bg-black px-5 py-4 text-center font-heading text-sm font-semibold leading-snug text-brand-bright sm:text-base">
              {advancedMarketsSection.callout}
            </p>
          </div>
          <div className="border-t border-slate-200 pt-12 md:border-l md:border-t-0 md:pl-8 md:pt-0 lg:pl-14">
            <CoverageOptionsList
              items={advancedMarketsSection.coverage}
              listLabel="Advanced market options"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
