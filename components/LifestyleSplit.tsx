import Image from "next/image";
import Link from "next/link";
import { lifestyleStory } from "@/lib/content";

export function LifestyleSplit() {
  return (
    <section id="why-us" className="bg-white py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-[clamp(1rem,4vw,2rem)] md:grid-cols-2 md:gap-14 lg:gap-16">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl bg-slate-200 shadow-lg shadow-black/5 sm:max-w-lg md:mx-0 md:max-w-none md:aspect-[2/3] lg:rounded-3xl">
          <Image
            src="/father.png"
            alt="Father at home with his daughter—protecting family is what life insurance is about"
            fill
            className="object-cover object-[center_25%]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 45vw, 40vw"
            priority={false}
          />
        </div>
        <div>
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.28em] text-black md:text-[11px]">
            {lifestyleStory.kicker}
          </p>
          <h2 className="font-heading mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-brand sm:text-4xl lg:text-[2.35rem]">
            {lifestyleStory.heading}
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-black sm:text-lg">
            {lifestyleStory.paragraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
          <Link
            href="/#quote"
            className="mt-10 inline-flex min-h-[48px] items-center justify-center rounded border-2 border-black bg-white px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            Get your free quote
          </Link>
        </div>
      </div>
    </section>
  );
}
