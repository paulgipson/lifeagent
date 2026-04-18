import { hero } from "@/lib/content";

const platforms = [
  { slug: "tiktok", label: "TikTok" },
  { slug: "instagram", label: "Instagram" },
  { slug: "facebook", label: "Facebook" },
  { slug: "google", label: "Google" },
] as const;

/** Brand marks via Simple Icons CDN — black (#000) on hero gradient. */
export function FeaturedInStrip() {
  return (
    <div className="mt-12 border-t border-black/10 pt-9">
      <p className="text-center text-base font-bold leading-snug tracking-tight text-black sm:text-left sm:text-lg">
        {hero.featuredTitle}
      </p>
      <ul className="mt-6 flex list-none flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:justify-start">
        {platforms.map(({ slug, label }) => (
          <li key={slug} className="flex h-10 items-center justify-center">
            <img
              src={`https://cdn.simpleicons.org/${slug}/000000`}
              alt={`${label} logo`}
              width={120}
              height={32}
              className="h-7 w-auto max-w-[6.5rem] object-contain object-left opacity-90 sm:h-8 sm:max-w-[7.5rem]"
              loading="lazy"
              decoding="async"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
