"use client";

import { track, type AnalyticsEvent } from "@/lib/analytics";

const QUOTE_SECTION_ID = "quote";

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
 * Canonical "Get a quote" button. Every quote CTA on the site uses this so behavior is consistent:
 * - If the current page has the hero form (`#quote`), smooth-scroll to it (respecting scroll-margin).
 * - Otherwise fall back to navigating home to `/#quote`.
 * This guarantees each button reaches a "Get your free quote" section no matter what page it's on.
 */
export function QuoteCta({ children, className, location, event = "cta_click", onActivate }: Props) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (location) track(event, { location });
    onActivate?.();
    if (typeof document === "undefined") return;
    const el = document.getElementById(QUOTE_SECTION_ID);
    if (!el) return; // no local quote section → let the browser follow href to /#quote

    e.preventDefault();
    const prefersReduced =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
    // Focus the first field for keyboard users without another jump.
    const field = el.querySelector<HTMLElement>("input, select, textarea");
    field?.focus({ preventScroll: true });
    history.replaceState(null, "", `#${QUOTE_SECTION_ID}`);
  }

  return (
    <a href={`/#${QUOTE_SECTION_ID}`} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
