"use client";

import { useEffect, useState } from "react";
import { primaryCta, site } from "@/lib/content";
import { QUOTE_FORM_ANCHOR } from "@/lib/quoteAnchor";
import { QuoteCta } from "@/components/QuoteCta";
import { track } from "@/lib/analytics";

/**
 * Persistent call / quote bar on small screens. Hidden while the quote form card is on screen
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
      <div className="mx-auto flex max-w-lg gap-3">
        <a
          href={`tel:${site.phoneTel}`}
          onClick={() => track("phone_click", { location: "sticky_bar" })}
          className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full border-2 border-black bg-white text-sm font-bold uppercase tracking-[0.12em] text-black"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M6.6 10.8c1.8 3.6 4.8 6.6 8.4 8.4l2.8-2.8c.4-.4 1-.6 1.6-.4 1 .4 2.1.6 3.2.6.8 0 1.4.6 1.4 1.4V21c0 .8-.6 1.4-1.4 1.4C9.4 22.4 1.6 14.6 1.6 4.4 1.6 3.6 2.2 3 3 3h3.2c.8 0 1.4.6 1.4 1.4 0 1.1.2 2.2.6 3.2.2.6 0 1.2-.4 1.6l-2.8 2.8z" />
          </svg>
          Call Paul
        </a>
        <QuoteCta
          location="sticky_bar"
          className="flex min-h-[48px] flex-1 items-center justify-center rounded-full bg-black text-sm font-bold uppercase tracking-[0.12em] text-brand-bright"
        >
          {primaryCta.shortLabel}
        </QuoteCta>
      </div>
    </div>
  );
}
