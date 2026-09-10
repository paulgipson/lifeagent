"use client";

import Image from "next/image";
import { site } from "@/lib/content";
import { thankYouHero, thankYouVideoYoutubeId } from "@/lib/thankYouPage";
import { bookingEnabled } from "@/lib/booking";
import { track } from "@/lib/analytics";

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.6 10.8c1.8 3.6 4.8 6.6 8.4 8.4l2.8-2.8c.4-.4 1-.6 1.6-.4 1 .4 2.1.6 3.2.6.8 0 1.4.6 1.4 1.4V21c0 .8-.6 1.4-1.4 1.4C9.4 22.4 1.6 14.6 1.6 4.4 1.6 3.6 2.2 3 3 3h3.2c.8 0 1.4.6 1.4 1.4 0 1.1.2 2.2.6 3.2.2.6 0 1.2-.4 1.6l-2.8 2.8z" />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 5h16v11H8l-4 4V5z" strokeLinejoin="round" />
    </svg>
  );
}

export function ThankYouHero({ firstName, outOfState }: { firstName?: string; outOfState?: boolean }) {
  const yt = thankYouVideoYoutubeId.trim();
  const videoHref = yt ? `https://www.youtube.com/watch?v=${yt}` : null;
  const smsHref = `sms:${site.phoneTel}?&body=${encodeURIComponent(site.smsBody)}`;

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-[clamp(1rem,4vw,2rem)] md:grid-cols-2 md:items-center md:gap-14 lg:gap-16">
        <div>
          <p className="font-heading text-4xl font-black tracking-[-0.02em] text-black sm:text-5xl md:text-[2.75rem]">
            {firstName ? `${firstName}, you're in.` : thankYouHero.title}
          </p>
          <p className="mt-5 text-xl font-semibold leading-snug text-black sm:text-2xl">{thankYouHero.subtitle}</p>
          <p className="mt-5 text-lg leading-relaxed text-black sm:text-xl">{thankYouHero.body}</p>

          {outOfState && (
            <p className="mt-5 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-snug text-amber-900">
              {thankYouHero.outOfStateNotice}
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {bookingEnabled && (
              <a
                href="#book"
                onClick={() => track("cta_click", { location: "thank_you_book" })}
                className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-black px-7 text-sm font-bold uppercase tracking-[0.14em] text-brand-bright transition hover:bg-neutral-900"
              >
                Pick a time
              </a>
            )}
            <a
              href={`tel:${site.phoneTel}`}
              onClick={() => track("phone_click", { location: "thank_you" })}
              className={`inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-7 text-sm font-bold uppercase tracking-[0.14em] transition ${
                bookingEnabled ? "border-2 border-black bg-white text-black hover:bg-slate-50" : "bg-black text-brand-bright hover:bg-neutral-900"
              }`}
            >
              <PhoneIcon className="h-4 w-4" />
              {thankYouHero.callLabel}
            </a>
            <a
              href={smsHref}
              onClick={() => track("sms_click", { location: "thank_you" })}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border-2 border-black bg-white px-7 text-sm font-bold uppercase tracking-[0.14em] text-black transition hover:bg-slate-50"
            >
              <ChatIcon className="h-4 w-4" />
              {thankYouHero.textLabel}
            </a>
          </div>
          <p className="mt-3 text-sm text-black/60">{site.phone} · Save this number so you know it&apos;s me calling.</p>

          <blockquote className="mt-8 border-l-4 border-brand pl-5 text-base italic leading-relaxed text-slate-700 sm:text-lg">
            &ldquo;{thankYouHero.personalQuote}&rdquo;
          </blockquote>
        </div>

        <div className="relative mx-auto w-full max-w-lg md:max-w-none">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-200 shadow-lg ring-1 ring-black/5 md:rounded-3xl">
            <Image
              src="/paul-gipson.png"
              alt="Paul Gipson, life insurance agent"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 45vw"
              priority
            />
            {videoHref && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/35 via-black/10 to-transparent">
                <a
                  href={videoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 text-black shadow-xl ring-2 ring-white/80 transition hover:scale-105 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                  aria-label="Play thank you video on YouTube"
                >
                  <PlayIcon className="ml-1 h-9 w-9" />
                </a>
              </div>
            )}
          </div>
          {videoHref ? (
            <p className="mt-3 text-center text-xs text-slate-500 md:text-left">Watch a quick thank-you from Paul.</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
