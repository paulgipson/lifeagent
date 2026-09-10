import { QuoteCta } from "@/components/QuoteCta";
import { lifestyleStory } from "@/lib/content";

export function LifestyleSplit() {
  return (
    <section id="why-us" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-[clamp(1rem,4vw,2rem)] text-center">
        <p className="font-heading text-[10px] font-bold uppercase tracking-[0.28em] text-black md:text-[11px]">
          {lifestyleStory.kicker}
        </p>
        <h2 className="font-heading mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-brand sm:text-4xl lg:text-[2.35rem]">
          {lifestyleStory.heading}
        </h2>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-black sm:text-lg">
          {lifestyleStory.paragraphs.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>
        <QuoteCta
          location="why_us"
          className="mt-10 inline-flex min-h-[48px] items-center justify-center rounded border-2 border-black bg-white px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          Get your free quote
        </QuoteCta>
      </div>
    </section>
  );
}
