"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { coverageOptions, hero } from "@/lib/content";
import { tcpaConsentCallsText, tcpaConsentSmsText } from "@/lib/legalContent";
import { licensedStateOptions, OTHER_STATE_VALUE } from "@/lib/licenses";
import { submitLead, thankYouQuery, type LeadSource } from "@/lib/leads";
import { ageFromIsoDate, isValidUsPhone, validateIsoDob } from "@/lib/quoteWizardValidate";
import { track } from "@/lib/analytics";
import { IconShieldKeyhole } from "@/components/icons";

type FieldKey =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "state"
  | "coverage"
  | "dateOfBirth"
  | "sex"
  | "tobacco"
  | "tcpaCalls";
type FieldErrors = Partial<Record<FieldKey, string>>;

const fieldBase =
  "w-full rounded-md border border-brand bg-white px-3 py-3 text-base text-black placeholder:text-slate-500 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30 sm:text-sm";

type Props = {
  /** Where this form instance lives — used for attribution */
  source?: LeadSource;
  /** Preselect coverage (product pages) */
  defaultCoverage?: string;
  /** Hide the coverage select (product pages already know the answer) */
  hideCoverage?: boolean;
  submitLabel?: string;
  idPrefix?: string;
};

export function QuoteForm({
  source = "hero_form",
  defaultCoverage = "",
  hideCoverage = false,
  submitLabel = hero.submitLabel,
  idPrefix = "qf",
}: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [apiMessage, setApiMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [coverage, setCoverage] = useState(defaultCoverage);
  const [state, setState] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [sex, setSex] = useState("");
  const [tobacco, setTobacco] = useState("");
  const started = useRef(false);

  // Allow `?coverage=iul` deep links (e.g. from ads) to preselect the product.
  useEffect(() => {
    if (defaultCoverage) return;
    const fromUrl = new URLSearchParams(window.location.search).get("coverage");
    if (!fromUrl || !coverageOptions.some((o) => o.value === fromUrl)) return;
    // Deferred so the select hydrates with the server value first, then adopts the deep-link.
    const raf = requestAnimationFrame(() => setCoverage(fromUrl));
    return () => cancelAnimationFrame(raf);
  }, [defaultCoverage]);

  const id = (k: string) => `${idPrefix}-${k}`;

  function onFirstInteraction() {
    if (started.current) return;
    started.current = true;
    track("form_start", { source });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const form = e.currentTarget;
    const fd = new FormData(form);
    const firstName = String(fd.get("firstName") ?? "").trim();
    const lastName = String(fd.get("lastName") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const stateVal = String(fd.get("state") ?? "").trim();
    const coverageVal = hideCoverage ? defaultCoverage : String(fd.get("coverage") ?? "").trim();
    const dateOfBirth = String(fd.get("dateOfBirth") ?? "").trim();
    const sex = String(fd.get("sex") ?? "").trim();
    const tobacco = String(fd.get("tobacco") ?? "").trim();
    const tcpaCalls = fd.get("tcpa_calls") === "yes";
    const tcpaSms = fd.get("tcpa_sms") === "yes";
    const website = String(fd.get("website") ?? "").trim();
    if (website) return; // honeypot

    const next: FieldErrors = {};
    if (!firstName) next.firstName = "Enter your first name.";
    if (!lastName) next.lastName = "Enter your last name.";
    if (!email) next.email = "Enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email.";
    if (!phone) next.phone = "Enter your phone number.";
    else if (!isValidUsPhone(phone)) next.phone = "Enter a valid 10-digit U.S. phone number.";
    if (!stateVal) next.state = "Select your state.";
    if (!coverageVal) next.coverage = "Pick the closest option—“Not sure” is fine.";
    const dobErr = validateIsoDob(dateOfBirth);
    if (dobErr) next.dateOfBirth = dobErr;
    if (sex !== "male" && sex !== "female") next.sex = "Select male or female.";
    if (tobacco !== "yes" && tobacco !== "no") next.tobacco = "Select smoker or non-smoker.";
    if (!tcpaCalls) next.tcpaCalls = "Please check the box so I'm allowed to call or text you back.";

    if (Object.keys(next).length) {
      setErrors(next);
      track("form_error", { source, fields: Object.keys(next).join(",") });
      return;
    }

    setApiMessage(null);
    setStatus("submitting");
    track("form_submit", { source, coverage: coverageVal, state: stateVal });

    const age = ageFromIsoDate(dateOfBirth) ?? undefined;
    const lead = {
      source,
      firstName,
      lastName,
      email,
      phone,
      state: stateVal,
      coverage: coverageVal,
      dateOfBirth,
      age,
      sex: sex as "male" | "female",
      tobacco,
      consentCalls: true,
      consentSms: tcpaSms,
    };
    const result = await submitLead(lead);

    if (!result.ok) {
      setApiMessage(result.message);
      setStatus("error");
      return;
    }

    track("lead", { source, coverage: coverageVal, out_of_footprint: result.outOfFootprint });
    form.reset();
    setDateOfBirth("");
    setSex("");
    setTobacco("");
    setState("");
    if (!defaultCoverage) setCoverage("");
    router.push(`/thank-you${thankYouQuery(lead)}`);
  }

  const showOutOfState = state === OTHER_STATE_VALUE;

  return (
    <form onSubmit={handleSubmit} onFocusCapture={onFirstInteraction} className="flex flex-col gap-3 text-left" noValidate>
      {status === "error" && (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-3 text-sm text-red-800" role="alert">
          <p className="font-medium">{apiMessage ?? "Something went wrong. Please try again in a moment."}</p>
        </div>
      )}

      <div className="hidden" aria-hidden>
        <label htmlFor={id("website")}>Company</label>
        <input type="text" id={id("website")} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor={id("firstName")} className="sr-only">
            First name
          </label>
          <input
            id={id("firstName")}
            name="firstName"
            type="text"
            autoComplete="given-name"
            placeholder="First name*"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? id("err-firstName") : undefined}
            className={fieldBase}
          />
          {errors.firstName && (
            <p id={id("err-firstName")} className="mt-1 text-xs text-red-700" role="alert">
              {errors.firstName}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={id("lastName")} className="sr-only">
            Last name
          </label>
          <input
            id={id("lastName")}
            name="lastName"
            type="text"
            autoComplete="family-name"
            placeholder="Last name*"
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? id("err-lastName") : undefined}
            className={fieldBase}
          />
          {errors.lastName && (
            <p id={id("err-lastName")} className="mt-1 text-xs text-red-700" role="alert">
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor={id("phone")} className="sr-only">
          Phone number
        </label>
        <input
          id={id("phone")}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="Mobile phone*"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? id("err-phone") : undefined}
          className={fieldBase}
        />
        {errors.phone && (
          <p id={id("err-phone")} className="mt-1 text-xs text-red-700" role="alert">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={id("email")} className="sr-only">
          Email
        </label>
        <input
          id={id("email")}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Email*"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? id("err-email") : undefined}
          className={fieldBase}
        />
        {errors.email && (
          <p id={id("err-email")} className="mt-1 text-xs text-red-700" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div className={hideCoverage ? "" : "grid gap-3 sm:grid-cols-2"}>
        <div>
          <label htmlFor={id("state")} className="sr-only">
            State
          </label>
          <select
            id={id("state")}
            name="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            aria-invalid={!!errors.state}
            aria-describedby={errors.state ? id("err-state") : undefined}
            className={`${fieldBase} cursor-pointer ${state ? "text-black" : "text-slate-500"}`}
          >
            {licensedStateOptions.map((opt) => (
              <option key={opt.value || "empty"} value={opt.value} disabled={opt.value === ""}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.state && (
            <p id={id("err-state")} className="mt-1 text-xs text-red-700" role="alert">
              {errors.state}
            </p>
          )}
        </div>

        {!hideCoverage && (
          <div>
            <label htmlFor={id("coverage")} className="sr-only">
              Insurance type
            </label>
            <select
              id={id("coverage")}
              name="coverage"
              value={coverage}
              onChange={(e) => setCoverage(e.target.value)}
              aria-invalid={!!errors.coverage}
              aria-describedby={errors.coverage ? id("err-coverage") : undefined}
              className={`${fieldBase} cursor-pointer ${coverage ? "text-black" : "text-slate-500"}`}
            >
              {coverageOptions.map((opt) => (
                <option key={opt.value || "empty"} value={opt.value} disabled={opt.value === ""}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.coverage && (
              <p id={id("err-coverage")} className="mt-1 text-xs text-red-700" role="alert">
                {errors.coverage}
              </p>
            )}
          </div>
        )}
      </div>

      <div>
        <label htmlFor={id("dateOfBirth")} className="sr-only">
          Date of birth
        </label>
        <input
          id={id("dateOfBirth")}
          name="dateOfBirth"
          type="date"
          autoComplete="bday"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          aria-invalid={!!errors.dateOfBirth}
          aria-describedby={errors.dateOfBirth ? id("err-dateOfBirth") : undefined}
          className={`${fieldBase} ${dateOfBirth ? "text-black" : "text-slate-500"}`}
        />
        {errors.dateOfBirth && (
          <p id={id("err-dateOfBirth")} className="mt-1 text-xs text-red-700" role="alert">
            {errors.dateOfBirth}
          </p>
        )}
        {!errors.dateOfBirth && (
          <p className="mt-1 text-[11px] text-black/55">Date of birth — needed for an accurate quote.</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor={id("sex")} className="sr-only">
            Sex
          </label>
          <select
            id={id("sex")}
            name="sex"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            aria-invalid={!!errors.sex}
            aria-describedby={errors.sex ? id("err-sex") : undefined}
            className={`${fieldBase} cursor-pointer ${sex ? "text-black" : "text-slate-500"}`}
          >
            <option value="" disabled>
              Male or Female*
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.sex && (
            <p id={id("err-sex")} className="mt-1 text-xs text-red-700" role="alert">
              {errors.sex}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={id("tobacco")} className="sr-only">
            Tobacco use
          </label>
          <select
            id={id("tobacco")}
            name="tobacco"
            value={tobacco}
            onChange={(e) => setTobacco(e.target.value)}
            aria-invalid={!!errors.tobacco}
            aria-describedby={errors.tobacco ? id("err-tobacco") : undefined}
            className={`${fieldBase} cursor-pointer ${tobacco ? "text-black" : "text-slate-500"}`}
          >
            <option value="" disabled>
              Smoker or Non-smoker*
            </option>
            <option value="no">Non-smoker</option>
            <option value="yes">Smoker</option>
          </select>
          {errors.tobacco && (
            <p id={id("err-tobacco")} className="mt-1 text-xs text-red-700" role="alert">
              {errors.tobacco}
            </p>
          )}
        </div>
      </div>

      {showOutOfState && (
        <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-snug text-amber-900">
          I&apos;m not licensed in your state yet. Send your request anyway and I&apos;ll personally connect you with a trusted
          agent who is.
        </p>
      )}

      <div className="space-y-2 pt-1">
        <label className="flex cursor-pointer items-start gap-3 rounded-md border border-slate-200 bg-white p-3 text-left">
          <input
            type="checkbox"
            name="tcpa_calls"
            value="yes"
            aria-invalid={!!errors.tcpaCalls}
            aria-describedby={errors.tcpaCalls ? id("err-tcpaCalls") : undefined}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-brand text-brand focus:ring-brand"
          />
          <span className="text-[11px] leading-snug text-black/80">{tcpaConsentCallsText}</span>
        </label>
        {errors.tcpaCalls && (
          <p id={id("err-tcpaCalls")} className="text-xs text-red-700" role="alert">
            {errors.tcpaCalls}
          </p>
        )}
        <label className="flex cursor-pointer items-start gap-3 px-3 py-1 text-left">
          <input
            type="checkbox"
            name="tcpa_sms"
            value="yes"
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-brand text-brand focus:ring-brand"
          />
          <span className="text-[11px] leading-snug text-black/70">
            {tcpaConsentSmsText}{" "}
            <Link href="/privacy" className="font-semibold text-brand underline underline-offset-2 hover:no-underline">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-1 min-h-[52px] w-full rounded-full bg-black py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-brand-bright transition hover:bg-neutral-900 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : submitLabel}
      </button>

      <div className="flex items-start justify-center gap-2 pt-1 text-center">
        <IconShieldKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
        <span className="text-xs font-semibold leading-snug text-black/80">
          Your info goes to Paul only—never sold or shared with other agents.
        </span>
      </div>

      <p className="text-center text-[11px] leading-snug text-black/60">
        By submitting you agree to our{" "}
        <Link href="/terms" className="font-semibold text-brand underline underline-offset-2 hover:no-underline">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="font-semibold text-brand underline underline-offset-2 hover:no-underline">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
