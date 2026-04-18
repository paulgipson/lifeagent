"use client";

import Link from "next/link";
import { quoteFieldClass, quoteLabelClass, wizardStepContact } from "@/lib/quoteWizardContent";
import type { ContactDobFields } from "@/lib/quoteWizardTypes";
import { tcpaConsentCallsText, tcpaConsentSmsText } from "@/lib/legalContent";
import { US_STATES } from "@/lib/us-states";

type Props = {
  value: Pick<
    ContactDobFields,
    "firstName" | "lastName" | "email" | "phone" | "state" | "consentCalls" | "consentSms"
  >;
  onChange: (patch: Partial<Props["value"]>) => void;
};

export function StepContact({ value, onChange }: Props) {
  function field<K extends keyof Props["value"]>(key: K, v: Props["value"][K]) {
    onChange({ [key]: v } as Partial<Props["value"]>);
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-center font-heading text-2xl font-bold text-brand sm:text-3xl">{wizardStepContact.heading}</h1>
      <p className="mt-3 text-center text-base text-black sm:text-lg">{wizardStepContact.sub}</p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="qf-first" className={quoteLabelClass}>
            First name
          </label>
          <input
            id="qf-first"
            autoComplete="given-name"
            value={value.firstName}
            onChange={(e) => field("firstName", e.target.value)}
            className={quoteFieldClass}
          />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="qf-last" className={quoteLabelClass}>
            Last name
          </label>
          <input
            id="qf-last"
            autoComplete="family-name"
            value={value.lastName}
            onChange={(e) => field("lastName", e.target.value)}
            className={quoteFieldClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="qf-email" className={quoteLabelClass}>
            Email address
          </label>
          <input
            id="qf-email"
            type="email"
            autoComplete="email"
            value={value.email}
            onChange={(e) => field("email", e.target.value)}
            className={quoteFieldClass}
          />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="qf-phone" className={quoteLabelClass}>
            Phone number
          </label>
          <input
            id="qf-phone"
            type="tel"
            autoComplete="tel"
            inputMode="numeric"
            value={value.phone}
            onChange={(e) => field("phone", e.target.value)}
            className={quoteFieldClass}
          />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="qf-state" className={quoteLabelClass}>
            State
          </label>
          <select
            id="qf-state"
            value={value.state}
            onChange={(e) => field("state", e.target.value)}
            className={quoteFieldClass}
          >
            {US_STATES.map((s) => (
              <option key={s.value || "placeholder"} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 rounded-md border-2 border-brand/25 bg-white/80 p-4">
            <input
              type="checkbox"
              checked={value.consentCalls}
              onChange={(e) => field("consentCalls", e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 rounded border-brand text-brand focus:ring-brand"
            />
            <span className="text-sm leading-snug text-black/90">{tcpaConsentCallsText}</span>
          </label>
        </div>

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 rounded-md border-2 border-slate-200 bg-white/80 p-4">
            <input
              type="checkbox"
              checked={value.consentSms}
              onChange={(e) => field("consentSms", e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 rounded border-brand text-brand focus:ring-brand"
            />
            <span className="text-sm leading-snug text-black/80">
              {tcpaConsentSmsText}{" "}
              <Link href="/privacy" className="font-semibold text-brand underline underline-offset-2 hover:no-underline">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
