import Link from "next/link";
import { thankYouPreFooter } from "@/lib/thankYouPage";

export function ThankYouPreFooter() {
  return (
    <section className="bg-black py-12 text-center md:py-14">
      <div className="mx-auto max-w-3xl px-[clamp(1rem,4vw,2rem)]">
        <p className="font-heading text-xl font-bold text-brand sm:text-2xl">{thankYouPreFooter.line1}</p>
        <p className="mt-4 text-base leading-relaxed text-white/90 sm:text-lg">{thankYouPreFooter.line2}</p>
        <Link
          href="/#quote"
          className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded border-2 border-white px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-bright"
        >
          Get started
        </Link>
      </div>
    </section>
  );
}
