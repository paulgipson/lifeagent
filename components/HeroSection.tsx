import Image from "next/image";
import { hero, paul, site } from "@/lib/content";
import { nationalProducerNumber } from "@/lib/legalContent";
import { IconCheck } from "@/components/icons";
import { QuoteForm } from "@/components/QuoteForm";
import { TrustStrip } from "@/components/TrustStrip";

type Props = {
  kicker?: string;
  title?: string;
  sub?: string;
  bullets?: readonly string[];
  /** Product pages preselect coverage and hide the select */
  defaultCoverage?: string;
  hideCoverage?: boolean;
  source?: "hero_form" | "product_form";
};

export function HeroSection({
  kicker = hero.kicker,
  title = hero.title,
  sub = hero.sub,
  bullets = hero.bullets,
  defaultCoverage,
  hideCoverage,
  source = "hero_form",
}: Props) {
  return (
    <section id="quote" className="gradient-hero w-full scroll-mt-20 text-black md:scroll-mt-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-[clamp(1rem,4vw,2rem)] py-10 md:grid-cols-[1.1fr_0.9fr] md:items-start md:gap-12 md:py-16 lg:gap-16 lg:py-20">
        <div>
          <p className="font-heading text-[11px] font-bold uppercase tracking-[0.26em] text-black/80 md:text-xs">{kicker}</p>
          <h1 className="mt-4 font-heading text-[2.1rem] font-bold leading-[1.1] tracking-[-0.03em] text-black sm:text-5xl sm:leading-[1.08] lg:text-[3.25rem] xl:text-[3.5rem]">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg font-normal leading-relaxed text-black sm:text-xl lg:text-[1.3rem]">{sub}</p>
          <ul className="mt-8 space-y-3.5">
            {bullets.map((item) => (
              <li key={item} className="flex items-start gap-3 text-base font-semibold leading-snug text-black sm:text-lg">
                <IconCheck className="mt-0.5 h-6 w-6 shrink-0 text-black" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-4 rounded-2xl bg-white/70 p-3 pr-5 shadow-sm ring-1 ring-black/5 backdrop-blur-sm sm:inline-flex">
            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-black/10">
              <Image src="/paul-gipson.png" alt={`${paul.displayName}, licensed life insurance agent`} fill className="object-cover object-top" sizes="56px" priority />
            </span>
            <span className="min-w-0 text-sm leading-snug">
              <span className="block font-heading font-bold text-black">{paul.displayName}</span>
              <span className="block text-black/75">
                Licensed life insurance producer · NPN {nationalProducerNumber} · {site.address}
              </span>
            </span>
          </div>

          <TrustStrip className="mt-8" />
        </div>

        <div className="w-full min-w-0 rounded-[20px] bg-white px-5 py-7 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.25)] sm:px-7 sm:py-8 md:ml-auto md:max-w-[28rem]">
          <h2 className="text-center font-heading text-[clamp(1.2rem,2.8vw,1.6rem)] font-extrabold uppercase leading-tight tracking-[0.06em] text-black">
            <span className="text-black">Get your </span>
            <span className="text-brand">free quote</span>
          </h2>
          <p className="mt-2 text-center text-sm text-black/70">{hero.formSub}</p>
          <div className="mt-6">
            <QuoteForm source={source} defaultCoverage={defaultCoverage} hideCoverage={hideCoverage} idPrefix={`${source}`} />
          </div>
        </div>
      </div>
    </section>
  );
}
