import { bottomCta } from "@/lib/content";
import { QuoteForm } from "@/components/QuoteForm";

/** Final conversion block — a second form so nobody has to scroll back to the top. */
export function BottomCta({ defaultCoverage, hideCoverage }: { defaultCoverage?: string; hideCoverage?: boolean }) {
  return (
    <section id="get-started" className="gradient-cta py-16 text-white md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-[clamp(1rem,4vw,2rem)] md:grid-cols-2 md:gap-14">
        <div>
          <p className="font-heading text-[11px] font-bold uppercase tracking-[0.26em] text-white/85">{bottomCta.kicker}</p>
          <h2 className="mt-4 font-heading text-3xl font-bold leading-tight sm:text-4xl">{bottomCta.heading}</h2>
          <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">{bottomCta.sub}</p>
        </div>
        <div className="rounded-[20px] bg-white px-5 py-7 text-black shadow-[0_24px_60px_-18px_rgba(0,0,0,0.35)] sm:px-7 sm:py-8">
          <QuoteForm source="bottom_form" idPrefix="bottom" defaultCoverage={defaultCoverage} hideCoverage={hideCoverage} />
        </div>
      </div>
    </section>
  );
}
