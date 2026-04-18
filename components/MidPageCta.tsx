import Link from "next/link";

export function MidPageCta() {
  return (
    <section id="get-started" className="gradient-cta py-16 text-center text-white md:py-20">
      <div className="mx-auto max-w-2xl px-[clamp(1rem,4vw,2rem)]">
        <h2 className="text-2xl font-bold leading-snug sm:text-3xl">
          Ready for coverage that fits your life—not a script?
        </h2>
        <p className="mt-4 text-base text-teal-50 sm:text-lg">
          Share a few details—I&apos;ll follow up and schedule time to talk one-on-one, at your pace.
        </p>
        <Link
          href="/#quote"
          className="mt-8 inline-flex rounded-lg bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-brand shadow-lg transition hover:bg-brand-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand"
        >
          Get started
        </Link>
      </div>
    </section>
  );
}
