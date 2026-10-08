"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { bookingCopy, bookingEnabled, bookingUrl, CAL_LINK, type BookingPrefill } from "@/lib/booking";
import { track } from "@/lib/analytics";

type CalApi = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  q?: unknown[];
  ns?: Record<string, CalApi>;
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

const EMBED_SRC = "https://app.cal.com/embed/embed.js";

/** Official Cal.com loader shim — queues calls until embed.js is ready. */
function ensureCal(): CalApi {
  if (window.Cal) return window.Cal;
  const push = (api: CalApi, args: IArguments) => {
    (api.q = api.q ?? []).push(args);
  };
  const Cal: CalApi = function (this: unknown) {
    const cal = window.Cal as CalApi;
    // eslint-disable-next-line prefer-rest-params
    const ar = arguments;
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q ?? [];
      const s = document.createElement("script");
      s.src = EMBED_SRC;
      s.async = true;
      document.head.appendChild(s);
      cal.loaded = true;
    }
    if (ar[0] === "init") {
      const namespace = typeof ar[1] === "string" ? ar[1] : undefined;
      if (namespace) {
        const api: CalApi = function (this: unknown) {
          // eslint-disable-next-line prefer-rest-params
          push(api, arguments);
        };
        api.q = api.q ?? [];
        cal.ns![namespace] = cal.ns![namespace] ?? api;
        push(cal.ns![namespace], ar);
        push(cal, ["initNamespace", namespace] as unknown as IArguments);
        return;
      }
    }
    push(cal, ar);
  };
  window.Cal = Cal;
  return Cal;
}

function buildConfig(prefill: BookingPrefill): Record<string, string> {
  const config: Record<string, string> = { layout: "month_view" };
  if (prefill.name?.trim()) config.name = prefill.name.trim();
  if (prefill.email?.trim()) config.email = prefill.email.trim();
  if (prefill.phone?.trim()) config.attendeePhoneNumber = prefill.phone.trim();
  if (prefill.notes?.trim()) config.notes = prefill.notes.trim();
  return config;
}

type Props = {
  prefill?: BookingPrefill;
  /** Analytics location label */
  location?: string;
  /** Use h1 for standalone /book page */
  asPageHeading?: boolean;
  className?: string;
};

/**
 * Inline Cal.com booker (optional prefill from form answers).
 * Renders nothing when NEXT_PUBLIC_CAL_LINK is not configured.
 */
export function BookingEmbed({
  prefill = {},
  location = "thank_you",
  asPageHeading = false,
  className = "bg-surface-soft py-12 md:py-16",
}: Props) {
  const reactId = useId().replace(/:/g, "");
  const namespace = `booker_${reactId}`;
  const containerId = `cal-inline-${reactId}`;
  const trackedOpen = useRef(false);
  const [useIframeFallback, setUseIframeFallback] = useState(false);
  const href = useMemo(() => bookingUrl(prefill), [prefill]);
  const embedSrc = useMemo(() => {
    const url = new URL(`https://app.cal.com/${CAL_LINK}`);
    url.searchParams.set("embed", "true");
    if (prefill.name?.trim()) url.searchParams.set("name", prefill.name.trim());
    if (prefill.email?.trim()) url.searchParams.set("email", prefill.email.trim());
    if (prefill.phone?.trim()) url.searchParams.set("attendeePhoneNumber", prefill.phone.trim());
    if (prefill.notes?.trim()) url.searchParams.set("notes", prefill.notes.trim());
    return url.toString();
  }, [prefill]);

  useEffect(() => {
    if (!bookingEnabled || useIframeFallback) return;

    const Cal = ensureCal();
    Cal("init", namespace, { origin: "https://cal.com" });
    const api = window.Cal?.ns?.[namespace];
    if (!api) return;

    api("inline", {
      elementOrSelector: `#${containerId}`,
      calLink: CAL_LINK,
      layout: "month_view",
      config: buildConfig(prefill),
    });
    api("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
      cssVarsPerTheme: { light: { "cal-brand": "#00c4c9" } },
    });
    api("on", {
      action: "bookingSuccessful",
      callback: () => track("booking_complete", { location }),
    });

    if (!trackedOpen.current) {
      trackedOpen.current = true;
      track("booking_open", { location });
    }

    // If Cal never unhides the iframe (common after Strict Mode remounts), fall back.
    const timer = window.setTimeout(() => {
      const iframe = document.querySelector(`#${containerId} iframe.cal-embed`) as HTMLIFrameElement | null;
      if (!iframe) {
        setUseIframeFallback(true);
        return;
      }
      const hidden = getComputedStyle(iframe).visibility === "hidden" || iframe.offsetHeight < 100;
      if (hidden) setUseIframeFallback(true);
    }, 4500);

    return () => {
      window.clearTimeout(timer);
      const el = document.getElementById(containerId);
      if (el) el.innerHTML = "";
    };
  }, [containerId, namespace, prefill, location, useIframeFallback]);

  if (!bookingEnabled) return null;

  const HeadingTag = asPageHeading ? "h1" : "h2";

  return (
    <section className={className} id="book">
      <div className="mx-auto max-w-5xl px-[clamp(1rem,4vw,2rem)]">
        <HeadingTag className="text-center font-heading text-2xl font-bold text-brand sm:text-3xl">
          {bookingCopy.heading}
        </HeadingTag>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base text-black/80 sm:text-lg">{bookingCopy.sub}</p>
        <p className="mt-2 text-center text-xs font-semibold uppercase tracking-[0.18em] text-black/60">{bookingCopy.durationLabel}</p>

        <div className="mt-8 rounded-2xl bg-white shadow-lg ring-1 ring-black/5">
          {useIframeFallback ? (
            <iframe
              title="Book a call with Paul"
              src={embedSrc}
              className="w-full rounded-2xl border-0"
              style={{ minHeight: 720, height: "75vh" }}
              loading="lazy"
            />
          ) : (
            <div
              id={containerId}
              className="w-full"
              style={{ width: "100%", height: "100%", minHeight: 680, overflow: "auto" }}
            />
          )}
        </div>
        <p className="mt-3 text-center text-xs text-black/60">
          Calendar not loading?{" "}
          <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline underline-offset-2">
            Open my booking page in a new tab
          </a>
        </p>
      </div>
    </section>
  );
}
