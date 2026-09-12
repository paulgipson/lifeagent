"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { isQuoteFormHash, scrollToQuoteForm } from "@/lib/quoteAnchor";

/** After navigation to `/#quote-form` (or legacy `/#quote`), scroll to the form card once the page is ready. */
export function QuoteFormAnchorScroll() {
  const pathname = usePathname();

  useEffect(() => {
    function run() {
      if (!isQuoteFormHash(window.location.hash)) return;
      // Wait for layout (hero form is below the fold on mobile).
      requestAnimationFrame(() => {
        window.setTimeout(() => scrollToQuoteForm({ focusField: false, updateHash: true }), 50);
      });
    }

    run();
    window.addEventListener("hashchange", run);
    return () => window.removeEventListener("hashchange", run);
  }, [pathname]);

  return null;
}
