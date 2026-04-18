import { hero } from "@/lib/content";
import { IconCheck } from "@/components/icons";
import { QuoteForm } from "@/components/QuoteForm";
import { FeaturedInStrip } from "@/components/FeaturedInStrip";

export function HeroSection() {
  return (
    <section id="quote" className="gradient-hero w-full text-black">
      <div className="mx-auto grid max-w-7xl gap-10 px-[clamp(1rem,4vw,2rem)] py-12 md:grid-cols-2 md:items-start md:gap-12 md:py-16 lg:gap-16 lg:py-20">
        <div>
          <h1 className="font-heading text-4xl font-bold leading-[1.12] tracking-[-0.03em] text-black sm:text-5xl sm:leading-[1.1] lg:text-[3.25rem] lg:leading-[1.08] xl:text-[3.5rem]">
            {hero.title}
          </h1>
          <p className="mt-7 max-w-xl text-lg font-normal leading-relaxed text-black sm:text-xl lg:text-[1.35rem] lg:leading-relaxed">
            {hero.sub}
          </p>
          <ul className="mt-10 space-y-4">
            {hero.bullets.map((item) => (
              <li key={item} className="flex items-start gap-3.5 text-lg font-semibold leading-snug text-black sm:text-xl">
                <IconCheck className="mt-1 h-6 w-6 shrink-0 text-black" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <FeaturedInStrip />
        </div>

        <div className="w-[70%] min-w-0 rounded-[20px] bg-white px-6 py-8 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.2)] max-md:mx-auto md:ml-auto md:max-w-[min(26rem,100%)]">
          <h2 className="text-center font-heading text-[clamp(1.15rem,2.8vw,1.65rem)] font-extrabold uppercase leading-tight tracking-[0.08em] text-black">
            <span className="text-black">Get your </span>
            <span className="text-brand">free quote</span>
          </h2>
          <div className="mt-7">
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}
