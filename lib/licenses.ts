/** Life insurance license images in /public/licenses — add rows when you add files. */

export type LicenseEntry = {
  stateCode: string;
  stateName: string;
  /** Served from `public/` */
  src: string;
};

export const licenseEntries: readonly LicenseEntry[] = [
  { stateCode: "CA", stateName: "California", src: "/licenses/CALIFORNIA.png" },
  { stateCode: "IA", stateName: "Iowa", src: "/licenses/IOWA.png" },
  { stateCode: "KS", stateName: "Kansas", src: "/licenses/KANSAS.png" },
  { stateCode: "MD", stateName: "Maryland", src: "/licenses/MARYLAND.png" },
  { stateCode: "OH", stateName: "Ohio", src: "/licenses/OHIO.png" },
  { stateCode: "SC", stateName: "South Carolina", src: "/licenses/SOUTHCAROLINA.png" },
  { stateCode: "TX", stateName: "Texas", src: "/licenses/TEXAS.png" },
  { stateCode: "WV", stateName: "West Virginia", src: "/licenses/WESTVIRGINIA.png" },
].sort((a, b) => a.stateName.localeCompare(b.stateName));
