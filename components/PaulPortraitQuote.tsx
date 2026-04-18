import Image from "next/image";
import { agentDifference } from "@/lib/content";

/** Portrait + overlapping quote card — shared copy from `agentDifference` */
export function PaulPortraitQuote() {
  return (
    <div className="relative mx-auto mb-24 w-full max-w-lg sm:mb-28 md:mb-32 md:max-w-none">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-slate-200 shadow-lg shadow-black/10 sm:aspect-[3/4]">
        <Image
          src="/paul-gipson.png"
          alt="Paul Gipson, life insurance agent"
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 42vw"
          priority={false}
        />
      </div>
      <figure className="absolute bottom-0 left-1/2 z-20 w-[88%] max-w-[calc(100%-1.5rem)] -translate-x-1/2 translate-y-[60%] rounded-lg border-2 border-brand-bright bg-black px-7 py-8 text-center shadow-xl sm:w-[90%] sm:px-9 sm:py-10 md:px-10 md:py-10">
        <blockquote className="font-heading text-sm font-normal leading-relaxed text-brand sm:text-[0.95rem] md:text-base">
          &ldquo;{agentDifference.quote}&rdquo;
        </blockquote>
        <figcaption className="mt-5 font-heading text-base font-bold text-brand sm:text-lg">
          {agentDifference.quoteAttribution}
        </figcaption>
      </figure>
    </div>
  );
}
