/**
 * Lightweight analytics helper — forwards events to whichever tags are present
 * (GA4 `gtag`, GTM `dataLayer`, Meta Pixel `fbq`). Safe to call on the server (no-op).
 *
 * Configure IDs via env: NEXT_PUBLIC_GA_MEASUREMENT_ID, NEXT_PUBLIC_META_PIXEL_ID (see `components/Analytics.tsx`).
 */

export type AnalyticsEvent =
  | "form_start"
  | "form_submit"
  | "form_error"
  | "wizard_step"
  | "wizard_complete"
  | "phone_click"
  | "sms_click"
  | "cta_click"
  | "booking_open"
  | "booking_complete"
  | "lead";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: AnalyticsEvent, params: Params = {}): void {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer?.push({ event, ...params });
    window.gtag?.("event", event, params);
    if (window.fbq) {
      if (event === "lead" || event === "booking_complete") {
        window.fbq("track", event === "lead" ? "Lead" : "Schedule", params);
      } else {
        window.fbq("trackCustom", event, params);
      }
    }
  } catch {
    // never let analytics break the UI
  }
}
