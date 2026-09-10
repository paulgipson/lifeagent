"use client";

import { useEffect, useMemo, useRef } from "react";
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
    if (ar[0] === "init" && typeof ar[1] === "string") {
      const api: CalApi = function (this: unknown) {
        // eslint-disable-next-line prefer-rest-params
        push(api, arguments);
      };
      api.q = api.q ?? [];
      cal.ns![ar[1]] = cal.ns![ar[1]] ?? api;
      push(cal.ns![ar[1]], ar);
      push(cal, ["initNamespace", ar[1]] as unknown as IArguments);
      return;
    }
    push(cal, ar);
  };
  window.Cal = Cal;
  return Cal;
}

/**
 * Inline Cal.com booker prefilled from the lead's form answers.
 * Renders nothing when NEXT_PUBLIC_CAL_LINK is not configured.
 */
export function BookingEmbed({ prefill }: { prefill: BookingPrefill }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialised = useRef(false);
  const href = useMemo(() => bookingUrl(prefill), [prefill]);

  useEffect(() => {
    if (!bookingEnabled || initialised.current || !containerRef.current) return;
    initialised.current = true;
    const Cal = ensureCal();
    Cal("init", { origin: "https://cal.com" });
    Cal("inline", {
      elementOrSelector: containerRef.current,
      calLink: CAL_LINK,
      layout: "month_view",
      config: {
        name: prefill.name ?? "",
        email: prefill.email ?? "",
        attendeePhoneNumber: prefill.phone ?? "",
        notes: prefill.notes ?? "",
      },
    });
    Cal("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
      cssVarsPerTheme: { light: { "cal-brand": "#00c4c9" } },
    });
    Cal("on", {
      action: "bookingSuccessful",
      callback: () => track("booking_complete", { location: "thank_you" }),
    });
    track("booking_open", { location: "thank_you" });
  }, [prefill]);

  if (!bookingEnabled) return null;

  return (
    <section className="bg-surface-soft py-12 md:py-16" id="book">
      <div className="mx-auto max-w-5xl px-[clamp(1rem,4vw,2rem)]">
        <h2 className="text-center font-heading text-2xl font-bold text-brand sm:text-3xl">{bookingCopy.heading}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base text-black/80 sm:text-lg">{bookingCopy.sub}</p>
        <p className="mt-2 text-center text-xs font-semibold uppercase tracking-[0.18em] text-black/60">{bookingCopy.durationLabel}</p>

        <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5">
          <div ref={containerRef} className="min-h-[560px] w-full" />
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
