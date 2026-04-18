import { stats } from "@/lib/content";

export function StatsBar() {
  return (
    <section id="stats" className="bg-white py-[1.625rem] md:py-[1.95rem]">
      <div className="mx-auto max-w-6xl px-[clamp(1rem,4vw,2rem)]">
        <div className="rounded-[1.75rem] bg-black px-5 py-7 shadow-lg md:rounded-[2rem] md:px-8 md:py-8">
          <h2 className="text-center font-heading text-xl font-bold leading-snug tracking-tight text-brand sm:text-2xl md:text-[1.35rem] md:leading-tight">
            {stats.headline}
          </h2>
          <div
            className="mt-6 grid grid-cols-1 gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-4 md:mt-7"
            role="list"
          >
            {stats.items.map((item) => (
              <div
                key={item.line}
                className="bg-black px-3 py-5 text-center sm:px-4 sm:py-5 md:py-4"
                role="listitem"
              >
                <p className="font-heading text-sm font-semibold leading-snug text-white/95 sm:text-base">
                  {item.line}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
