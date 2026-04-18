import Link from "next/link";
import { AboutLicenses } from "@/components/AboutLicenses";
import { PaulPortraitQuote } from "@/components/PaulPortraitQuote";

export function AboutCollage() {
  return (
    <section id="about" className="bg-surface-soft py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-[clamp(1rem,4vw,2rem)] md:grid-cols-2 md:items-start lg:gap-16">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">About Paul Gipson</h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600">
            I&apos;m Paul Gipson. I built LifeAgentPaul to make insurance feel approachable—I combine licensed
            expertise with clear education so you understand premiums, death benefits, riders, and exclusions
            before you sign.
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Whether you&apos;re covering a mortgage, protecting your income, or building a legacy for your
            family, you get a roadmap from me—not a sales pitch.
          </p>
          <AboutLicenses />
          <Link
            href="/#contact"
            className="mt-8 inline-flex rounded-lg border-2 border-brand px-5 py-3 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            Learn more
          </Link>
        </div>
        <div className="md:pt-2">
          <PaulPortraitQuote />
        </div>
      </div>
    </section>
  );
}
