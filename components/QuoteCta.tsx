"use client";

import { track, type AnalyticsEvent } from "@/lib/analytics";
import { QUOTE_FORM_ANCHOR, scrollToQuoteForm } from "@/lib/quoteAnchor";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Analytics location label (e.g. "header", "footer", "sticky_bar") */
  location?: string;
  /** Analytics event name (defaults to cta_click) */
  event?: AnalyticsEvent;
  /** Extra side effect on click (e.g. close the mobile menu) */
  onActivate?: () => void;
};

/**
 * Every quote CTA scrolls to the white “Get your free quote” card (`#quote-form`),
 * not the top of the hero section or the page.
 */
export function QuoteCta({ children, className, location, event = "cta_click", onActivate }: Props) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (location) track(event, { location });
    onActivate?.();

    if (scrollToQuoteForm({ focusField: true, updateHash: true })) {
      e.preventDefault();
      return;
    }
    // No form on this page — follow href to home `/#quote-form` (QuoteFormAnchorScroll handles scroll).
  }

  return (
    <a href={`/#${QUOTE_FORM_ANCHOR}`} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
