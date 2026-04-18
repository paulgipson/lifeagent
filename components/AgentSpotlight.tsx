import { agentDifference } from "@/lib/content";

export function AgentSpotlight() {
  return (
    <section id="agent" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-[clamp(1rem,4vw,2rem)]">
        <p className="text-center font-heading text-[10px] font-bold uppercase tracking-[0.28em] text-black md:text-[11px]">
          {agentDifference.kicker}
        </p>
        <h2 className="font-heading mt-4 text-center text-3xl font-bold leading-[1.15] tracking-tight text-brand sm:text-4xl lg:text-[2.35rem]">
          {agentDifference.heading}
        </h2>
        <div className="mt-8 space-y-5 text-center text-base leading-relaxed text-black sm:text-lg">
          {agentDifference.paragraphs.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
