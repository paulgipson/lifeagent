/** Partner logo assets in /public/partners — shown in a single marquee under the hero. */

export type PartnerLogo = {
  src: string;
  alt: string;
};

export const partnerLogos: readonly PartnerLogo[] = [
  { src: "/partners/66997a893a2e5967e7a7264a_mutual-of-omaha.svg", alt: "Mutual of Omaha" },
  { src: "/partners/66997a8944647b2f779c581d_Americo.svg", alt: "Americo" },
  { src: "/partners/66997a89838d1fd39d467722_national-life-group.svg", alt: "National Life Group" },
  { src: "/partners/66997a89324fa763cd6ad851_Allstate.svg", alt: "Allstate" },
  { src: "/partners/66997a8a046ab489f4bdb470_aetna.svg", alt: "Aetna" },
  { src: "/partners/690441b0f97c529f7df4273a_Cigna.svg", alt: "Cigna" },
  { src: "/partners/66997a892c662b0e66a15749_americas-choice.svg", alt: "America's Choice" },
  { src: "/partners/66997a89d33beb1adf997d37_Manhattan-Life.svg", alt: "Manhattan Life" },
];
