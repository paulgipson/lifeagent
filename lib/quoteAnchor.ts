/** Scroll target: the white “Get your free quote” card (not the whole hero). */
export const QUOTE_FORM_ANCHOR = "quote-form";

/** Legacy hash — still supported for old links. */
export const LEGACY_QUOTE_SECTION_ANCHOR = "quote";

export function isQuoteFormHash(hash: string): boolean {
  const id = hash.replace(/^#/, "").trim();
  return id === QUOTE_FORM_ANCHOR || id === LEGACY_QUOTE_SECTION_ANCHOR;
}

export type ScrollToQuoteFormOptions = {
  focusField?: boolean;
  updateHash?: boolean;
};

/** Scroll so the quote form card sits just below the sticky header. Returns false if no form on this page. */
export function scrollToQuoteForm(options: ScrollToQuoteFormOptions = {}): boolean {
  if (typeof document === "undefined") return false;
  const el = document.getElementById(QUOTE_FORM_ANCHOR);
  if (!el) return false;

  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });

  if (options.focusField) {
    const field = el.querySelector<HTMLElement>("input, select, textarea");
    field?.focus({ preventScroll: true });
  }
  if (options.updateHash !== false) {
    history.replaceState(null, "", `#${QUOTE_FORM_ANCHOR}`);
  }
  return true;
}
