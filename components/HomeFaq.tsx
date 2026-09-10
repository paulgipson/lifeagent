import { QuoteCta } from "@/components/QuoteCta";
import { homeFaq } from "@/lib/content";

/** Homepage FAQ (#faq) — answers the objections that stop people from filling in the form. */
export function HomeFaq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section id="faq" className="bg-surface-soft py-16 md:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-3xl px-[clamp(1rem,4vw,2rem)]">
        <p className="text-center font-heading text-[10px] font-bold uppercase tracking-[0.26em] text-black md:text-[11px]">
          {homeFaq.kicker}
        </p>
        <h2 className="font-heading mt-4 text-center text-3xl font-bold tracking-tight text-brand sm:text-4xl">{homeFaq.heading}</h2>
        <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
          {homeFaq.items.map((item) => (
            <details key={item.q} className="group py-1 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-base font-semibold text-black transition hover:text-brand sm:text-lg">
                <span>{item.q}</span>
                <span className="shrink-0 text-slate-400 transition group-open:rotate-180" aria-hidden>
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </summary>
              <div className="pb-5 pr-8 text-base leading-relaxed text-slate-700">{item.a}</div>
            </details>
          ))}
        </div>
        <p className="mt-8 text-center text-base text-black/80">
          Still have a question?{" "}
          <QuoteCta location="faq" className="font-semibold text-brand underline underline-offset-2 hover:no-underline">
            Ask me in the form
          </QuoteCta>{" "}
          and I&apos;ll answer it personally.
        </p>
      </div>
    </section>
  );
}
