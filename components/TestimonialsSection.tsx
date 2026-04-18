"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { testimonialsSection } from "@/lib/content";

const { kicker, items, intervalMs } = testimonialsSection;

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

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const reduceMotion = usePrefersReducedMotion();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduceMotion || paused || items.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [reduceMotion, paused]);

  const slidePct = (100 / items.length) * index;
  const transitionMs = reduceMotion ? 0 : 500;

  return (
    <section id="testimonials" className="bg-white py-[1.625rem] md:py-[1.95rem]">
      <div className="mx-auto max-w-5xl px-[clamp(1rem,4vw,2rem)]">
        <div
          className="rounded-[2rem] px-6 py-[0.975rem] text-center shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] md:rounded-[2.25rem] md:px-12 md:py-[1.3rem]"
          style={{
            background:
              "radial-gradient(ellipse 110% 100% at 50% 35%, #cffafe 0%, #67e8f9 38%, #22d3d6 72%, #0d9488 100%)",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
          }}
        >
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.26em] text-black md:text-[11px]">
            {kicker}
          </p>

          {/* Fixed-height viewport: slides move horizontally (slide-left when advancing) */}
          <div
            className="relative mx-auto mt-[0.8125rem] w-full max-w-3xl overflow-hidden md:mt-[0.975rem]"
            style={{
              minHeight: "clamp(9.1rem, 18.2vw, 12.675rem)",
            }}
            aria-roledescription="carousel"
            aria-label="Customer testimonials"
          >
            <div
              className="flex"
              style={{
                width: `${items.length * 100}%`,
                transform: `translateX(-${slidePct}%)`,
                transition: `transform ${transitionMs}ms cubic-bezier(0.33, 1, 0.68, 1)`,
              }}
            >
              {items.map((item, i) => (
                <div
                  key={i}
                  className="flex shrink-0 flex-col justify-center px-1 text-center sm:px-3"
                  style={{ width: `${100 / items.length}%` }}
                  aria-hidden={i !== index}
                >
                  <blockquote
                    className="font-heading text-lg font-bold leading-snug text-black sm:text-xl md:text-[1.4rem] md:leading-snug"
                    aria-live={i === index && !reduceMotion ? "polite" : undefined}
                  >
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <footer className="mt-[0.8125rem] md:mt-[0.975rem]">
                    <cite className="not-italic">
                      <span className="block font-heading text-base font-bold text-black md:text-[1.05rem]">{item.author}</span>
                      <span className="mt-1 block text-sm font-normal text-black/80">{item.verifiedLabel}</span>
                    </cite>
                  </footer>
                </div>
              ))}
            </div>
          </div>

          <div
            className="mt-[0.975rem] flex justify-center gap-2.5 md:mt-[1.138rem]"
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
