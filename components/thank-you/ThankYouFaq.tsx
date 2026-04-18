"use client";

import { thankYouFaq } from "@/lib/thankYouPage";

export function ThankYouFaq() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-3xl px-[clamp(1rem,4vw,2rem)]">
        <h2 className="font-heading text-center text-2xl font-bold text-brand sm:text-3xl">{thankYouFaq.heading}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-slate-600">
          {thankYouFaq.intro}
        </p>
        <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
          {thankYouFaq.items.map((item) => (
            <details key={item.q} className="group py-1 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-base font-semibold text-black transition hover:text-brand sm:text-lg">
                <span>{item.q}</span>
                <span className="shrink-0 text-slate-400 transition group-open:rotate-180" aria-hidden>
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </summary>
              <div className="pb-5 pr-8 text-base leading-relaxed text-slate-600">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
