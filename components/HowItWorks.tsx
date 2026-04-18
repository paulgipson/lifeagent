import Link from "next/link";
import { IconApplyTap, IconClipboard, IconDocumentsStack } from "@/components/icons";
import { howItWorksSection } from "@/lib/content";

const icons = [IconClipboard, IconDocumentsStack, IconApplyTap] as const;

export function HowItWorks() {
  const { kicker, heading, intro, ctaText, ctaHref, steps } = howItWorksSection;

  return (
    <section id="how-it-works" className="bg-white pb-16 pt-2 md:pb-24 md:pt-0">
      <div className="mx-auto max-w-6xl px-[clamp(1rem,4vw,2rem)]">
        <p className="text-center font-heading text-[10px] font-bold uppercase tracking-[0.26em] text-black md:text-[11px]">
          {kicker}
        </p>
        <h2 className="font-heading mt-4 text-center text-3xl font-bold tracking-tight text-brand sm:text-4xl">
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-black sm:text-lg">
          {intro}{" "}
          <Link
            href={ctaHref}
            className="font-medium text-brand underline decoration-brand/40 underline-offset-[3px] transition hover:decoration-brand"
          >
            {ctaText}
          </Link>
        </p>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <div
                key={step.stepLabel}
                className="flex flex-col items-center rounded-2xl border-2 border-neutral-900 bg-white px-6 py-10 text-center shadow-sm transition hover:shadow-md"
              >
                <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-brand text-white shadow-md shadow-brand/30">
                  <Icon className="h-9 w-9" />
                </div>
                <p className="mt-6 font-heading text-sm font-bold tracking-wide text-black">{step.stepLabel}</p>
                <p className="mt-4 text-sm leading-relaxed text-black sm:text-base">{step.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
