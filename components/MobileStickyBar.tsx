"use client";

import { useEffect, useState } from "react";
import { primaryCta } from "@/lib/content";
import { QUOTE_FORM_ANCHOR } from "@/lib/quoteAnchor";
import { QuoteCta } from "@/components/QuoteCta";

/**
 * Persistent quote bar on small screens. Hidden while the quote form card is on screen
 * so it never covers the thing it's pointing to.
 */
export function MobileStickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(QUOTE_FORM_ANCHOR);
    if (!target) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setVisible(!e.isIntersecting);
      },
      { threshold: 0.05 },
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.35)] backdrop-blur transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-lg">
        <QuoteCta
          location="sticky_bar"
          className="flex min-h-[48px] flex-1 items-center justify-center rounded-full bg-black text-sm font-bold uppercase tracking-[0.12em] text-brand-bright"
        >
          {primaryCta.label}
        </QuoteCta>
      </div>
    </div>
  );
}
