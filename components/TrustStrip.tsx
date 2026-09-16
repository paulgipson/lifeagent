import { hero } from "@/lib/content";

/** Verifiable proof points under the hero copy (licenses, carriers, fees) — no vanity logos. */
export function TrustStrip({ className = "" }: { className?: string }) {
  return (
    <dl className={`grid grid-cols-2 gap-3 sm:grid-cols-4 ${className}`}>
      {hero.trust.map((t) => (
        <div key={t.label} className="flex flex-col rounded-xl border border-black/10 bg-white/40 px-3 py-3 text-center backdrop-blur-sm">
          <dd className="order-1 font-heading text-2xl font-extrabold leading-none tracking-tight text-black">{t.value}</dd>
          <dt className="order-2 mt-1.5 text-[11px] font-semibold uppercase leading-tight tracking-wide text-black/70">{t.label}</dt>
        </div>
      ))}
    </dl>
  );
}
