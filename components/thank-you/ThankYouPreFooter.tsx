"use client";

import { site } from "@/lib/content";
import { thankYouPreFooter } from "@/lib/thankYouPage";
import { track } from "@/lib/analytics";

export function ThankYouPreFooter() {
  const smsHref = `sms:${site.phoneTel}?&body=${encodeURIComponent(site.smsBody)}`;
  return (
    <section className="bg-black py-12 text-center md:py-14">
      <div className="mx-auto max-w-3xl px-[clamp(1rem,4vw,2rem)]">
        <p className="font-heading text-xl font-bold text-brand sm:text-2xl">{thankYouPreFooter.line1}</p>
        <p className="mt-4 text-base leading-relaxed text-white/90 sm:text-lg">{thankYouPreFooter.line2}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`tel:${site.phoneTel}`}
            onClick={() => track("phone_click", { location: "thank_you_footer" })}
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-brand-bright px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black transition hover:bg-white"
          >
            Call {site.phone}
          </a>
          <a
            href={smsHref}
            onClick={() => track("sms_click", { location: "thank_you_footer" })}
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-white px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
          >
            Text Paul
          </a>
        </div>
      </div>
    </section>
  );
}
