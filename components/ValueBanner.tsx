import { QuoteCta } from "@/components/QuoteCta";
import { valueBanner } from "@/lib/content";

export function ValueBanner() {
  return (
    <section id="value" className="bg-white py-8 md:py-10">
      <div className="mx-auto max-w-5xl px-[clamp(1rem,4vw,2rem)]">
        <div className="rounded-2xl bg-black px-6 py-10 text-center shadow-xl shadow-black/20 md:rounded-3xl md:px-12 md:py-14">
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.28em] text-white/90 md:text-[11px]">
            {valueBanner.kicker}
          </p>
          <h2 className="font-heading mt-4 text-2xl font-bold leading-snug text-white sm:text-3xl md:text-[2rem] md:leading-tight">
            <span>{valueBanner.headlineA}</span>
            <span className="text-brand-bright">{valueBanner.headlineB}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            {valueBanner.body}
          </p>
          <QuoteCta
            location="value_banner"
            className="mt-8 inline-flex min-h-[48px] min-w-[200px] items-center justify-center rounded-full bg-brand-bright px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-bright focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {valueBanner.cta}
          </QuoteCta>
        </div>
      </div>
    </section>
  );
}
