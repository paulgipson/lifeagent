import { NextResponse } from "next/server";
import type { LeadPayload } from "@/lib/leads";
import { isLicensedState, OTHER_STATE_VALUE } from "@/lib/licenses";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Server-side lead intake. Email delivery happens client-side via Web3Forms; this route
 * validates, logs, and forwards to a CRM / automation webhook when `LEAD_WEBHOOK_URL` is set
 * (Zapier, Make, GoHighLevel inbound webhook, etc.). Optional `LEAD_WEBHOOK_SECRET` is sent
 * as `X-Lead-Secret` so the receiver can verify origin.
 */
export async function POST(request: Request) {
  let body: Partial<LeadPayload> & { website?: string };
  try {
    body = (await request.json()) as Partial<LeadPayload> & { website?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot
  if (body.website) return NextResponse.json({ ok: true }, { status: 200 });

  const firstName = (body.firstName ?? "").trim();
  const lastName = (body.lastName ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const state = (body.state ?? "").trim().toUpperCase();

  if (!firstName || !lastName || !email || !phone || !state) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (!body.consentCalls) {
    return NextResponse.json({ error: "Contact consent required" }, { status: 400 });
  }

  const lead = {
    ...body,
    firstName,
    lastName,
    email,
    phone,
    state,
    licensedState: state !== OTHER_STATE_VALUE && isLicensedState(state),
    receivedAt: new Date().toISOString(),
    ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
    userAgent: request.headers.get("user-agent") ?? null,
  };

  console.info("[lead]", JSON.stringify(lead));

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.LEAD_WEBHOOK_SECRET ? { "X-Lead-Secret": process.env.LEAD_WEBHOOK_SECRET } : {}),
        },
        body: JSON.stringify(lead),
      });
      if (!res.ok) console.error("[lead] webhook responded", res.status);
    } catch (err) {
      console.error("[lead] webhook failed", err);
    }
  }

  return NextResponse.json({ ok: true, licensedState: lead.licensedState }, { status: 200 });
}
