"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { coverageOptions } from "@/lib/content";
import { tcpaConsentCallsText, tcpaConsentSmsText } from "@/lib/legalContent";
import { getWeb3FormsAccessKey, WEB3FORMS_SUBMIT_URL } from "@/lib/web3forms";
import { US_STATES } from "@/lib/us-states";
import { IconShieldKeyhole } from "@/components/icons";

type FieldKey = "firstName" | "lastName" | "email" | "phone" | "state" | "coverage" | "tcpaCalls";
type FieldErrors = Partial<Record<FieldKey, string>>;

const fieldBase =
  "w-full rounded-sm border border-brand bg-white px-3 py-2.5 text-sm text-black placeholder:text-slate-500 outline-none transition focus:border-brand focus:ring-1 focus:ring-brand";

function parseWeb3FormsJson(text: string): { success?: boolean; message?: string; body?: { message?: string } } | null {
  try {
    return JSON.parse(text) as { success?: boolean; message?: string; body?: { message?: string } };
  } catch {
    return null;
  }
}

export function QuoteForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [apiMessage, setApiMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const firstName = String(fd.get("firstName") ?? "").trim();
    const lastName = String(fd.get("lastName") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const state = String(fd.get("state") ?? "").trim();
    const coverage = String(fd.get("coverage") ?? "").trim();
    const tcpaCalls = fd.get("tcpa_calls");
    const website = String(fd.get("website") ?? "").trim();
    if (website) return;

    const next: FieldErrors = {};
    if (!firstName) next.firstName = "Enter your first name.";
    if (!lastName) next.lastName = "Enter your last name.";
    if (!email) next.email = "Enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email.";
    if (!phone) next.phone = "Enter your phone number.";
    if (!state) next.state = "Select your state.";
    if (!coverage) next.coverage = "Select an insurance type.";
    if (tcpaCalls !== "yes") next.tcpaCalls = "Please confirm consent to be contacted by phone or text about your request.";

    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }

    setApiMessage(null);
    setStatus("submitting");
    try {
      // Quick-start style: browser FormData to api.web3forms.com (same as Web3Forms React example).
      const formData = new FormData(e.currentTarget);
      formData.append("access_key", getWeb3FormsAccessKey());
      formData.append("subject", "LifeAgentPaul - New quote request");
      formData.append("from_name", `${firstName} ${lastName}`.trim());
      formData.append("name", `${firstName} ${lastName}`.trim());
      formData.append("tcpa_consent_calls", "yes");
      formData.append(
        "tcpa_consent_sms",
        String(fd.get("tcpa_sms") ?? "") === "yes" ? "yes" : "no",
      );
      formData.append("tcpa_consent_recorded_at", new Date().toISOString());

      const res = await fetch(WEB3FORMS_SUBMIT_URL, {
        method: "POST",
        body: formData,
      });

      const raw = await res.text();
      const data = parseWeb3FormsJson(raw);
      const msg =
        data?.message ??
        data?.body?.message ??
        (!data && raw.startsWith("<") ? "Form service returned an unexpected page (check network / ad blockers)." : null);

      const ok = data?.success === true;
      if (!ok) {
        setApiMessage(
          msg ??
            "Submission was not accepted. In Web3Forms, confirm the access key, turn off “Restrict to domain” for testing (or add this site’s hostname), and try again.",
        );
        setStatus("error");
        return;
      }

      e.currentTarget.reset();
      router.push("/get-quote");
    } catch {
      setApiMessage("Network error. Check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-left" noValidate>
      {status === "error" && (
        <div className="rounded-sm border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
          <p className="font-medium">{apiMessage ?? "Something went wrong. Please try again in a moment."}</p>
          <p className="mt-2 text-xs leading-snug text-red-900/90">
            Tip: Web3Forms must run in a normal browser session. If you use “Restrict to domain,” add{" "}
            <code className="rounded bg-red-100 px-1">localhost</code> (dev) and your live domain in the form settings.
          </p>
          <Link
            href="/get-quote"
            className="mt-3 inline-block text-sm font-semibold text-brand underline underline-offset-2 hover:no-underline"
          >
            Continue to the full quote questionnaire
          </Link>
        </div>
      )}

      <div className="hidden" aria-hidden>
        <label htmlFor="website">Company</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="firstName" className="sr-only">
          First name
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          autoComplete="given-name"
          placeholder="First Name*"
          aria-invalid={!!errors.firstName}
          aria-describedby={errors.firstName ? "err-firstName" : undefined}
          className={fieldBase}
        />
        {errors.firstName && (
          <p id="err-firstName" className="mt-1 text-xs text-red-700" role="alert">
            {errors.firstName}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="lastName" className="sr-only">
          Last name
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          autoComplete="family-name"
          placeholder="Last Name*"
          aria-invalid={!!errors.lastName}
          aria-describedby={errors.lastName ? "err-lastName" : undefined}
          className={fieldBase}
        />
        {errors.lastName && (
          <p id="err-lastName" className="mt-1 text-xs text-red-700" role="alert">
            {errors.lastName}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email*"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "err-email" : undefined}
          className={fieldBase}
        />
        {errors.email && (
          <p id="err-email" className="mt-1 text-xs text-red-700" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="sr-only">
          Phone number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="Phone Number*"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "err-phone" : undefined}
          className={fieldBase}
        />
        {errors.phone && (
          <p id="err-phone" className="mt-1 text-xs text-red-700" role="alert">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="state" className="sr-only">
          State
        </label>
        <select
          id="state"
          name="state"
          defaultValue=""
          aria-invalid={!!errors.state}
          aria-describedby={errors.state ? "err-state" : undefined}
          className={`${fieldBase} cursor-pointer text-slate-700`}
        >
          {US_STATES.map((opt) => (
            <option key={opt.value || "empty"} value={opt.value} disabled={opt.value === ""}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.state && (
          <p id="err-state" className="mt-1 text-xs text-red-700" role="alert">
            {errors.state}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="coverage" className="sr-only">
          Insurance type
        </label>
        <select
          id="coverage"
          name="coverage"
          defaultValue=""
          aria-invalid={!!errors.coverage}
          aria-describedby={errors.coverage ? "err-coverage" : undefined}
          className={`${fieldBase} cursor-pointer text-slate-700`}
        >
          {coverageOptions.map((opt) => (
            <option key={opt.value || "empty"} value={opt.value} disabled={opt.value === ""}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.coverage && (
          <p id="err-coverage" className="mt-1 text-xs text-red-700" role="alert">
            {errors.coverage}
          </p>
        )}
      </div>

      <div className="space-y-3 pt-2">
        <label className="flex cursor-pointer items-start gap-3 rounded-sm border border-slate-200 bg-white p-3 text-left">
          <input
            type="checkbox"
            name="tcpa_calls"
            value="yes"
            aria-invalid={!!errors.tcpaCalls}
            aria-describedby={errors.tcpaCalls ? "err-tcpaCalls" : undefined}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-brand text-brand focus:ring-brand"
          />
          <span className="text-xs leading-snug text-black/90">{tcpaConsentCallsText}</span>
        </label>
        {errors.tcpaCalls && (
          <p id="err-tcpaCalls" className="text-xs text-red-700" role="alert">
            {errors.tcpaCalls}
          </p>
        )}
        <label className="flex cursor-pointer items-start gap-3 rounded-sm border border-slate-200 bg-slate-50/80 p-3 text-left">
          <input
            type="checkbox"
            name="tcpa_sms"
            value="yes"
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-brand text-brand focus:ring-brand"
          />
          <span className="text-xs leading-snug text-black/80">
            {tcpaConsentSmsText}{" "}
            <Link href="/privacy" className="font-semibold text-brand underline underline-offset-2 hover:no-underline">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
      </div>

      <div className="flex items-start justify-center gap-2.5 pt-2 text-center">
        <IconShieldKeyhole className="mt-0.5 h-6 w-6 shrink-0 text-brand" aria-hidden />
        <span className="text-sm font-bold leading-snug text-black">
          We do not sell or share your personal info
        </span>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-1 w-full rounded-full bg-black py-3.5 text-sm font-bold uppercase tracking-[0.2em] text-brand transition hover:bg-neutral-900 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Get started"}
      </button>

      <p className="text-center text-[11px] leading-snug text-black/75">
        *Please make sure all information is accurate so I can reach you. By submitting, you also agree to our{" "}
        <Link href="/terms" className="font-semibold text-brand underline underline-offset-2 hover:no-underline">
          Terms of Service
        </Link>
        .
      </p>
    </form>
  );
}
