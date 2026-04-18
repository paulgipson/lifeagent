"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { licenseEntries, type LicenseEntry } from "@/lib/licenses";

export function AboutLicenses() {
  const [selected, setSelected] = useState<LicenseEntry | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const close = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [selected, close]);

  return (
    <div className="mt-10 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm md:p-7">
      <h3 className="font-heading text-lg font-bold tracking-tight text-foreground md:text-xl">
        Licenses by state
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-[15px]">
        I&apos;m licensed for life insurance in the states below. Select a state to view the credential
        image.
      </p>
      <ul className="mt-5 flex flex-wrap gap-2.5" role="list">
        {licenseEntries.map((lic) => (
          <li key={lic.stateCode} role="listitem">
            <button
              type="button"
              onClick={() => setSelected(lic)}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/80 px-3.5 py-2 text-left text-sm font-semibold text-foreground shadow-sm transition hover:border-brand/40 hover:bg-brand-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <span>{lic.stateName}</span>
              <span className="font-medium text-slate-500">{lic.stateCode}</span>
            </button>
          </li>
        ))}
      </ul>

      {selected ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px] transition-opacity"
            aria-label="Close license viewer"
            onClick={close}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 flex max-h-[min(92vh,900px)] w-full max-w-4xl flex-col rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
          >
            <header className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-6 sm:py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">License on file</p>
                <h4 id={titleId} className="font-heading mt-1 text-xl font-bold text-foreground sm:text-2xl">
                  {selected.stateName}
                  <span className="ml-2 font-medium text-slate-500">({selected.stateCode})</span>
                </h4>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                Close
              </button>
            </header>
            <div className="min-h-0 flex-1 overflow-auto bg-slate-100/80 px-4 py-5 sm:px-8 sm:py-8">
              <div className="mx-auto flex max-h-[min(72vh,760px)] items-center justify-center rounded-xl bg-white p-3 shadow-inner ring-1 ring-slate-200/80">
                <Image
                  src={selected.src}
                  alt={`Life insurance license — ${selected.stateName} (${selected.stateCode})`}
                  width={1400}
                  height={1800}
                  className="h-auto max-h-[min(72vh,760px)] w-auto max-w-full object-contain"
                  sizes="(max-width: 896px) 100vw, 56rem"
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
