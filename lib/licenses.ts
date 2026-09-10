/** Life insurance licenses. `src` points to a credential image in /public/licenses (optional). */

import { US_STATES } from "@/lib/us-states";

export type LicensedState = {
  stateCode: string;
  stateName: string;
  /** Credential image served from `public/`. Omit until the image is on file. */
  src?: string;
};

/** Source of truth for every state Paul is licensed in — drives dropdowns, counts, and disclaimers. */
export const licensedStates: readonly LicensedState[] = [
  { stateCode: "CA", stateName: "California", src: "/licenses/CALIFORNIA.png" },
  { stateCode: "IA", stateName: "Iowa", src: "/licenses/IOWA.png" },
  { stateCode: "KS", stateName: "Kansas", src: "/licenses/KANSAS.png" },
  { stateCode: "MD", stateName: "Maryland", src: "/licenses/MARYLAND.png" },
  { stateCode: "MI", stateName: "Michigan" },
  { stateCode: "OH", stateName: "Ohio", src: "/licenses/OHIO.png" },
  { stateCode: "SC", stateName: "South Carolina", src: "/licenses/SOUTHCAROLINA.png" },
  { stateCode: "TX", stateName: "Texas", src: "/licenses/TEXAS.png" },
  { stateCode: "VA", stateName: "Virginia" },
  { stateCode: "WV", stateName: "West Virginia", src: "/licenses/WESTVIRGINIA.png" },
].sort((a, b) => a.stateName.localeCompare(b.stateName));

/** A licensed state that has a credential image available. */
export type LicenseEntry = Required<LicensedState>;

/** Subset shown in the "Licenses by state" image viewer (states with an image on file). */
export const licenseEntries: readonly LicenseEntry[] = licensedStates.filter(
  (s): s is LicenseEntry => Boolean(s.src),
);

export const licensedStateCodes: readonly string[] = licensedStates.map((l) => l.stateCode);

export function isLicensedState(code: string): boolean {
  return licensedStateCodes.includes(code.toUpperCase());
}

/** "CA, IA, KS, …" for disclaimers and trust strips */
export const licensedStateCodeList = licensedStateCodes.join(", ");

/** "California, Iowa, … and West Virginia" */
export const licensedStateNameSentence = (() => {
  const names = licensedStates.map((l) => l.stateName);
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
})();

/** Sentinel value for a visitor outside the licensed footprint. */
export const OTHER_STATE_VALUE = "OTHER";

/**
 * Dropdown options for lead forms: only licensed states plus an explicit "other" choice,
 * so out-of-footprint requests are flagged instead of silently mixed into the pipeline.
 */
export const licensedStateOptions: readonly { value: string; label: string }[] = [
  { value: "", label: "Select Your State" },
  ...US_STATES.filter((s) => s.value && licensedStateCodes.includes(s.value)).map((s) => ({
    value: s.value,
    label: s.label,
  })),
  { value: OTHER_STATE_VALUE, label: "Another state (not listed)" },
];
