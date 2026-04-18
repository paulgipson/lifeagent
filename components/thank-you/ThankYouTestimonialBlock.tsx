"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { thankYouTestimonialsSection } from "@/lib/thankYouPage";

const { kicker, items, intervalMs } = thankYouTestimonialsSection;

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

export function ThankYouTestimonialBlock() {
  const [index, setIndex] = useState(0);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reduceMotion || items.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const active = items[index] ?? items[0];

  return (
    <section className="bg-white py-10 md:py-12">
      <div className="mx-auto max-w-5xl px-[clamp(1rem,4vw,2rem)]">
        <div
          className="rounded-[2rem] px-8 py-12 text-center shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] md:rounded-[2.25rem] md:px-14 md:py-14"
          style={{
            background:
              "radial-gradient(ellipse 110% 100% at 50% 35%, #cffafe 0%, #67e8f9 38%, #22d3d6 72%, #0d9488 100%)",
          }}
        >
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.26em] text-black md:text-[11px]">
            {kicker}
          </p>

          <div
            key={index}
            className="mx-auto mt-8 max-w-3xl"
            aria-live={reduceMotion ? undefined : "polite"}
          >
            <blockquote className="font-heading text-lg font-bold leading-snug text-black sm:text-xl md:text-[1.35rem] md:leading-relaxed">
              &ldquo;{active.quote}&rdquo;
            </blockquote>
            <footer className="mt-8">
              <cite className="not-italic">
                <span className="block font-heading text-lg font-bold text-black">{active.author}</span>
                <span className="mt-1 block text-sm font-normal text-black/80">{active.verifiedLabel}</span>
              </cite>
            </footer>
          </div>

          <div
            className="mt-8 flex justify-center gap-2.5"
            role="tablist"
            aria-label="Testimonial slides"
          >
            {items.map((_, i) => {
              const isActive = i === index;
              return (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Testimonial ${i + 1} of ${items.length}`}
                  className={
                    isActive
                      ? "h-2.5 w-2.5 shrink-0 rounded-full bg-white shadow-[0_0_0_2px_rgba(251,191,36,0.95)]"
                      : "h-2 w-2 shrink-0 rounded-full bg-white/45 transition-opacity hover:bg-white/70"
                  }
                  onClick={() => setIndex(i)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
