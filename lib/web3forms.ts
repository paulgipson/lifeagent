/** Web3Forms — https://web3forms.com/ (public access key is intended for client-side use). */

export const WEB3FORMS_SUBMIT_URL = "https://api.web3forms.com/submit";

export function getWeb3FormsAccessKey(): string {
  const key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (key && key.length > 0) return key;
  return "f7246ad2-5d90-452c-993b-dc02d3e8c69f";
}

/**
 * Dashboard checklist if submissions fail:
 * - Forms only work from a real browser (not curl/server-side unless Pro + IP allowlist).
 * - If “Restrict to domain” is on, add your site host (e.g. localhost, lifeagentpaul.com) or turn it off while testing.
 */
