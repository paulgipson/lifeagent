import Link from "next/link";
import { QuoteCta } from "@/components/QuoteCta";
import { IconCheck } from "@/components/icons";
import { mortgageProtection } from "@/lib/mortgageProtection";

/** Spotlight under the four coverage cards — Cash Back Option mortgage protection. */
export function MortgageProtectionSection() {
  const { section, slug } = mortgageProtection;

  return (
    <section id="mortgage-protection" className="bg-surface-soft py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-[clamp(1rem,4vw,2rem)]">
        <p className="text-center font-heading text-[10px] font-bold uppercase tracking-[0.26em] text-black md:text-[11px]">
          {section.kicker}
        </p>
        <h2 className="font-heading mt-4 text-center text-3xl font-bold tracking-tight text-brand sm:text-4xl">
          {section.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-black sm:text-lg">{section.intro}</p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {section.highlights.map((h) => (
            <article
              key={h.title}
              className="rounded-2xl border-2 border-neutral-900 bg-white p-6 shadow-sm md:p-7"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white">
                <IconCheck className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold text-black">{h.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-black/80 sm:text-base">{h.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <QuoteCta
            location="mortgage_section"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-black px-8 text-xs font-bold uppercase tracking-[0.18em] text-brand-bright transition hover:bg-neutral-900"
          >
            {section.ctaQuote}
          </QuoteCta>
          <Link
            href={`/${slug}`}
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-black px-8 text-xs font-bold uppercase tracking-[0.18em] text-black transition hover:bg-white"
          >
            {section.ctaLearn}
          </Link>
        </div>
      </div>
    </section>
  );
}
