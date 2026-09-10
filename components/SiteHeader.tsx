"use client";

import { useState } from "react";
import Link from "next/link";
import { primaryCta, primaryNav, site } from "@/lib/content";
import { QuoteCta } from "@/components/QuoteCta";
import { track } from "@/lib/analytics";

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.6 10.8c1.8 3.6 4.8 6.6 8.4 8.4l2.8-2.8c.4-.4 1-.6 1.6-.4 1 .4 2.1.6 3.2.6.8 0 1.4.6 1.4 1.4V21c0 .8-.6 1.4-1.4 1.4C9.4 22.4 1.6 14.6 1.6 4.4 1.6 3.6 2.2 3 3 3h3.2c.8 0 1.4.6 1.4 1.4 0 1.1.2 2.2.6 3.2.2.6 0 1.2-.4 1.6l-2.8 2.8z"
        fill="currentColor"
      />
    </svg>
  );
}

function LogoLockup() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-bright rounded-md"
    >
      <div
        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-brand-bright to-brand shadow-sm ring-1 ring-white/30 md:h-11 md:w-11"
        aria-hidden
      >
        <span className="text-xl font-black leading-none text-black">P</span>
      </div>
      <div className="leading-none">
        <p className="hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-white sm:block">Life insurance</p>
        <p className="font-heading text-[1rem] font-extrabold tracking-tight text-white sm:mt-1 md:text-lg">
          LIFE<span className="text-brand-bright">AGENT</span>PAUL
        </p>
      </div>
    </Link>
  );
}

function PhoneBlock({ className, onClick, compact = false }: { className?: string; onClick?: () => void; compact?: boolean }) {
  return (
    <a
      href={`tel:${site.phoneTel}`}
      className={`flex items-center gap-3 ${className ?? ""}`}
      data-analytics="phone_click"
      aria-label={`Call ${site.phone}`}
      onClick={() => {
        track("phone_click", { location: "header" });
        onClick?.();
      }}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-bright text-black shadow-inner md:h-11 md:w-11">
        <PhoneIcon className="h-5 w-5" />
      </span>
      {!compact && (
        <div className="min-w-0 text-left">
          <p className="text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-white">Call or text</p>
          <p className="mt-1.5 whitespace-nowrap text-sm font-bold leading-none tracking-tight text-white tabular-nums md:text-base">
            {site.phone}
          </p>
        </div>
      )}
    </a>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header
      id="top"
      className="sticky top-0 z-50 border-b border-brand bg-black text-white shadow-md shadow-black/40"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-[clamp(1rem,3vw,2rem)] py-3 md:gap-4 md:py-3.5">
        <div className="min-w-0 shrink-0">
          <LogoLockup />
        </div>

        <nav
          className="hidden min-w-0 items-center justify-center gap-4 xl:gap-6 lg:flex"
          aria-label="Primary"
        >
          {primaryNav.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="whitespace-nowrap rounded-sm text-[11px] font-semibold uppercase tracking-wide text-white no-underline transition-colors visited:text-white visited:no-underline hover:text-brand-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-bright focus-visible:ring-offset-2 focus-visible:ring-offset-black xl:text-xs"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3">
          <PhoneBlock className="hidden md:flex" />
          <PhoneBlock className="md:hidden" compact />
          <QuoteCta
            location="header"
            className="hidden items-center justify-center whitespace-nowrap rounded-full bg-brand-bright px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-black shadow-sm transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:inline-flex md:text-xs"
          >
            {primaryCta.label}
          </QuoteCta>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-white/20 p-2.5 text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  d="M18 6L6 18M6 6l12 12"
                />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
                <path fill="currentColor" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-white/10 bg-black px-[clamp(1rem,3vw,2rem)] py-5 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile primary">
            {primaryNav.map((item) => (
              <Link
                key={`${item.id}-m`}
                href={item.href}
                className="rounded-md py-3 text-sm font-semibold uppercase tracking-wide text-white no-underline visited:text-white hover:text-brand-bright"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <QuoteCta
              location="mobile_nav"
              onActivate={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-brand-bright px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-black"
            >
              {primaryCta.label}
            </QuoteCta>
            <PhoneBlock
              className="mt-3 rounded-md border border-white/15 px-3 py-3"
              onClick={() => setOpen(false)}
            />
          </nav>
        </div>
      )}
    </header>
  );
}
