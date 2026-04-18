import { thankYouExpect } from "@/lib/thankYouPage";

export function ThankYouExpect() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-[clamp(1rem,4vw,2rem)]">
        <h2 className="font-heading text-center text-2xl font-bold leading-tight text-brand sm:text-3xl md:text-[1.85rem]">
          {thankYouExpect.heading}
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
          {thankYouExpect.steps.map((step) => (
            <div
              key={step.label}
              className="overflow-hidden rounded-xl border-2 border-neutral-900 bg-white shadow-sm"
            >
              <div className="bg-brand py-3 text-center font-heading text-sm font-bold uppercase tracking-[0.15em] text-white">
                {step.label}
              </div>
              <p className="p-6 text-base leading-relaxed text-black">{step.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center text-lg font-bold text-black">{thankYouExpect.closing}</p>
      </div>
    </section>
  );
}
