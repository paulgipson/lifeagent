/** Partner logo assets in /public/partners — split across two marquee rows on the homepage. */

export type PartnerLogo = {
  src: string;
  alt: string;
};

/** First scrolling bar (below life insurance block) */
export const partnerLogosRow1: readonly PartnerLogo[] = [
  { src: "/partners/66997a89324fa763cd6ad851_Allstate.svg", alt: "Allstate" },
  { src: "/partners/66997a8a046ab489f4bdb470_aetna.svg", alt: "Aetna" },
  { src: "/partners/66997a8944647b2f779c581d_Americo.svg", alt: "Americo" },
  { src: "/partners/66997a89838d1fd39d467722_national-life-group.svg", alt: "National Life Group" },
];

/** Second scrolling bar (below advanced markets block) */
export const partnerLogosRow2: readonly PartnerLogo[] = [
  { src: "/partners/690441b0f97c529f7df4273a_Cigna.svg", alt: "Cigna" },
  { src: "/partners/66997a892c662b0e66a15749_americas-choice.svg", alt: "America's Choice" },
  { src: "/partners/66997a89d33beb1adf997d37_Manhattan-Life.svg", alt: "Manhattan Life" },
  { src: "/partners/66997a893a2e5967e7a7264a_mutual-of-omaha.svg", alt: "Mutual of Omaha" },
];
