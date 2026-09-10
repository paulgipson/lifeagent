/**
 * Lead submission shared by the hero `QuoteForm` and the `/get-quote` wizard.
 *
 * Delivery:
 *  1. Web3Forms (email to Paul) — must be called from the browser.
 *  2. `POST /api/quote` — server-side: validates, logs, and forwards to `LEAD_WEBHOOK_URL`
 *     (CRM / Zapier / GoHighLevel) when configured. Fire-and-forget so it never blocks the user.
 */

import { getWeb3FormsAccessKey, WEB3FORMS_SUBMIT_URL } from "@/lib/web3forms";
import { isLicensedState, OTHER_STATE_VALUE } from "@/lib/licenses";

export type LeadSource = "hero_form" | "bottom_form" | "product_form" | "wizard";

export type LeadPayload = {
  source: LeadSource;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  /** Coverage interest (term-life, whole-life, iul, final-expense, other) */
  coverage?: string;
  /** Wizard-only enrichment */
  goals?: string[];
  beneficiary?: string;
  monthlyBudget?: number;
  dateOfBirth?: string;
  healthConditions?: string;
  tobacco?: string;
  consentCalls: boolean;
  consentSms: boolean;
  /** Landing page path / UTM info for attribution */
  pagePath?: string;
  utm?: Record<string, string>;
};

export type LeadResult = { ok: true; outOfFootprint: boolean } | { ok: false; message: string };

export function isOutOfFootprint(state: string): boolean {
  return state === OTHER_STATE_VALUE || !isLicensedState(state);
}

export function collectUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"]) {
    const v = params.get(key);
    if (v) out[key] = v;
  }
  return out;
}

function parseWeb3FormsJson(text: string): { success?: boolean; message?: string; body?: { message?: string } } | null {
  try {
    return JSON.parse(text) as { success?: boolean; message?: string; body?: { message?: string } };
  } catch {
    return null;
  }
}

function toWeb3FormData(lead: LeadPayload, outOfFootprint: boolean): FormData {
  const fd = new FormData();
  const fullName = `${lead.firstName} ${lead.lastName}`.trim();
  fd.append("access_key", getWeb3FormsAccessKey());
  fd.append(
    "subject",
    `${outOfFootprint ? "[OUT OF STATE] " : ""}LifeAgentPaul — New ${lead.source === "wizard" ? "wizard" : "quote"} lead: ${fullName}`,
  );
  fd.append("from_name", fullName);
  fd.append("name", fullName);
  fd.append("email", lead.email);
  fd.append("phone", lead.phone);
  fd.append("state", lead.state);
  fd.append("source", lead.source);
  if (lead.coverage) fd.append("coverage", lead.coverage);
  if (lead.goals?.length) fd.append("goals", lead.goals.join(", "));
  if (lead.beneficiary) fd.append("beneficiary", lead.beneficiary);
  if (typeof lead.monthlyBudget === "number") fd.append("monthly_budget", `$${lead.monthlyBudget}`);
  if (lead.dateOfBirth) fd.append("date_of_birth", lead.dateOfBirth);
  if (lead.healthConditions) fd.append("health_conditions", lead.healthConditions);
  if (lead.tobacco) fd.append("tobacco", lead.tobacco);
  fd.append("licensed_state", outOfFootprint ? "no" : "yes");
  fd.append("tcpa_consent_calls", lead.consentCalls ? "yes" : "no");
  fd.append("tcpa_consent_sms", lead.consentSms ? "yes" : "no");
  fd.append("tcpa_consent_recorded_at", new Date().toISOString());
  if (lead.pagePath) fd.append("page_path", lead.pagePath);
  if (lead.utm) for (const [k, v] of Object.entries(lead.utm)) fd.append(k, v);
  return fd;
}

export async function submitLead(input: Omit<LeadPayload, "pagePath" | "utm">): Promise<LeadResult> {
  const lead: LeadPayload = {
    ...input,
    pagePath: typeof window !== "undefined" ? window.location.pathname : undefined,
    utm: collectUtm(),
  };
  const outOfFootprint = isOutOfFootprint(lead.state);

  // Server route: webhook/CRM forwarding + logging. Never blocks the visitor.
  void fetch("/api/quote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
    keepalive: true,
  }).catch(() => undefined);

  try {
    const res = await fetch(WEB3FORMS_SUBMIT_URL, { method: "POST", body: toWeb3FormData(lead, outOfFootprint) });
    const raw = await res.text();
    const data = parseWeb3FormsJson(raw);
    if (data?.success === true) return { ok: true, outOfFootprint };
    return {
      ok: false,
      message: data?.message ?? data?.body?.message ?? "We couldn't send your request. Please try again or call me directly.",
    };
  } catch {
    return { ok: false, message: "Network error. Please check your connection and try again, or call me directly." };
  }
}

/** Query string for `/thank-you` so the booking widget can be prefilled. */
export function thankYouQuery(lead: Pick<LeadPayload, "firstName" | "lastName" | "email" | "phone" | "state" | "coverage">): string {
  const p = new URLSearchParams();
  p.set("name", `${lead.firstName} ${lead.lastName}`.trim());
  p.set("email", lead.email);
  p.set("phone", lead.phone);
  if (lead.coverage) p.set("coverage", lead.coverage);
  if (isOutOfFootprint(lead.state)) p.set("oos", "1");
  return `?${p.toString()}`;
}
