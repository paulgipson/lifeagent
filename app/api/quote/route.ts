import { NextResponse } from "next/server";

type QuotePayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  coverage: string;
  website?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: QuotePayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const firstName = (body.firstName ?? "").trim();
  const lastName = (body.lastName ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const state = (body.state ?? "").trim();
  const coverage = (body.coverage ?? "").trim();

  if (!firstName || !lastName || !email || !phone || !state || !coverage) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const name = `${firstName} ${lastName}`.trim();

  // Stub: connect to CRM, email (Resend), or database (see build.md §6).
  console.info("[quote]", { name, email, phone, state, coverage });

  return NextResponse.json({ ok: true }, { status: 200 });
}
