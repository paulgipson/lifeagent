import Image from "next/image";
import { thankYouHero, thankYouVideoYoutubeId } from "@/lib/thankYouPage";

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}

export function ThankYouHero() {
  const yt = thankYouVideoYoutubeId.trim();
  const videoHref = yt ? `https://www.youtube.com/watch?v=${yt}` : null;

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-[clamp(1rem,4vw,2rem)] md:grid-cols-2 md:items-center md:gap-14 lg:gap-16">
        <div>
          <p className="font-heading text-4xl font-black uppercase tracking-[0.08em] text-black sm:text-5xl md:text-[2.75rem]">
            {thankYouHero.title}
          </p>
          <p className="mt-5 text-xl font-semibold leading-snug text-black sm:text-2xl">{thankYouHero.subtitle}</p>
          <p className="mt-6 text-lg font-normal leading-relaxed text-black sm:text-xl">{thankYouHero.body}</p>
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
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/35 via-black/10 to-transparent">
              {videoHref ? (
                <a
                  href={videoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 text-black shadow-xl ring-2 ring-white/80 transition hover:scale-105 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                  aria-label="Play thank you video on YouTube"
                >
                  <PlayIcon className="ml-1 h-9 w-9" />
                </a>
              ) : (
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 text-black/80 shadow-xl ring-2 ring-white/80"
                  role="presentation"
                  aria-hidden
                >
                  <PlayIcon className="ml-1 h-9 w-9" />
                </div>
              )}
            </div>
          </div>
          {videoHref ? (
            <p className="mt-3 text-center text-xs text-slate-500 md:text-left">Watch a quick thank-you from Paul.</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
