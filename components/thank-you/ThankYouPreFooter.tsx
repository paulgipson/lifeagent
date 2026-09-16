"use client";

import { thankYouPreFooter } from "@/lib/thankYouPage";
import { bookingEnabled } from "@/lib/booking";
import { track } from "@/lib/analytics";

export function ThankYouPreFooter() {
  return (
    <section className="bg-black py-12 text-center md:py-14">
      <div className="mx-auto max-w-3xl px-[clamp(1rem,4vw,2rem)]">
        <p className="font-heading text-xl font-bold text-brand sm:text-2xl">{thankYouPreFooter.line1}</p>
        <p className="mt-4 text-base leading-relaxed text-white/90 sm:text-lg">{thankYouPreFooter.line2}</p>
        {bookingEnabled && (
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#book"
              onClick={() => track("cta_click", { location: "thank_you_footer_book" })}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-brand-bright px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black transition hover:bg-white"
            >
              Pick a time
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
