import { IconConsultation, IconDocumentSeal, IconMonitorShield } from "@/components/icons";
import { servicesHighlight } from "@/lib/content";

const icons = [IconDocumentSeal, IconConsultation, IconMonitorShield] as const;

export function ValuePillars() {
  return (
    <section id="benefits" className="bg-white pb-16 pt-4 md:pb-24 md:pt-2">
      <div className="mx-auto max-w-6xl px-[clamp(1rem,4vw,2rem)]">
        <p className="text-center font-heading text-[10px] font-bold uppercase tracking-[0.26em] text-black md:text-[11px]">
          {servicesHighlight.kicker}
        </p>
        <h2 className="font-heading mt-4 text-center text-3xl font-bold tracking-tight text-brand sm:text-4xl">
          {servicesHighlight.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-black sm:text-lg">
          {servicesHighlight.intro}
        </p>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {servicesHighlight.cards.map((card, i) => {
            const Icon = icons[i];
            return (
              <div
                key={card.title}
                className="flex flex-col items-center rounded-2xl border-2 border-neutral-900 bg-white px-6 py-10 text-center shadow-sm transition hover:shadow-md"
              >
                <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-brand text-white shadow-md shadow-brand/30">
                  <Icon className="h-9 w-9" />
                </div>
                <h3 className="mt-6 font-heading text-lg font-bold text-black">{card.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-black sm:text-base">{card.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
