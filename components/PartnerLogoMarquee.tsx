import Image from "next/image";
import type { PartnerLogo } from "@/lib/partnerLogos";

type Props = {
  logos: readonly PartnerLogo[];
  id?: string;
  /** Shown in the white strip above the bar (only the first marquee on the page needs this). */
  showLabel?: boolean;
  label?: string;
};

export function PartnerLogoMarquee({
  logos,
  id,
  showLabel = false,
  label = "Access to 15+ Top Insurance Companies",
}: Props) {
  const loop = [...logos, ...logos];

  return (
    <div id={id}>
      {showLabel ? (
        <div className="bg-white py-3 md:py-4">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.24em] text-black md:text-[11px]">
            {label}
          </p>
        </div>
      ) : null}
      <section
        className="overflow-hidden border-y border-black bg-black py-6 text-slate-300 md:py-7"
        aria-label={label}
      >
        <div className="relative">
          <div className="marquee-track items-center gap-16 px-8 md:gap-24 md:px-10">
            {loop.map((logo, i) => (
              <div
                key={`${logo.src}-${i}`}
                className="flex h-10 shrink-0 items-center justify-center md:h-12"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={200}
                  height={48}
                  className="h-9 w-auto max-w-[9.5rem] object-contain object-center opacity-95 md:h-11 md:max-w-[11rem]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
