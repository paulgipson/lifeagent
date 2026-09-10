"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { ContactDobFields } from "@/lib/quoteWizardTypes";
import { StepBeneficiary } from "@/components/quote-wizard/StepBeneficiary";
import { StepBudget } from "@/components/quote-wizard/StepBudget";
import { StepConditions } from "@/components/quote-wizard/StepConditions";
import { StepContact } from "@/components/quote-wizard/StepContact";
import { StepDob } from "@/components/quote-wizard/StepDob";
import { StepGoal } from "@/components/quote-wizard/StepGoal";
import { WizardProgress } from "@/components/quote-wizard/WizardProgress";
import { validateContact, validateDob } from "@/lib/quoteWizardValidate";
import { quoteWizardMeta, wizardProgressSteps, wizardStepBudget } from "@/lib/quoteWizardContent";
import { submitLead, thankYouQuery } from "@/lib/leads";
import { track } from "@/lib/analytics";
import { site } from "@/lib/content";

/** Last wizard step index (contact). Successful submit → `/thank-you`. */
const CONTACT_STEP = wizardProgressSteps.length - 1;

function ContinueIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" />
    </svg>
  );
}

const emptyContactDob = (): ContactDobFields => ({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  state: "",
  birthMonth: "",
  birthDay: "",
  birthYear: "",
  consentCalls: false,
  consentSms: false,
});

/** Map wizard goals to the coverage taxonomy used by the short form / product pages. */
function coverageFromGoals(goals: Set<string>): string {
  if (goals.size === 1 && goals.has("final-expenses")) return "final-expense";
  if (goals.has("grow-wealth-tax-free")) return "iul";
  if (goals.has("final-expenses")) return "final-expense";
  if (goals.has("protect-mortgage-assets") || goals.has("protect-loved-ones")) return "term-life";
  return "other";
}

export function QuoteWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [goals, setGoals] = useState<Set<string>>(new Set());
  const [beneficiary, setBeneficiary] = useState("");
  const [beneficiaryOther, setBeneficiaryOther] = useState("");
  const [budget, setBudget] = useState(100);
  const [contactDob, setContactDob] = useState<ContactDobFields>(emptyContactDob);
  const [preExisting, setPreExisting] = useState("");
  const [tobacco, setTobacco] = useState("");

  useEffect(() => {
    track("wizard_step", { step, step_id: wizardProgressSteps[step]?.id });
  }, [step]);

  const finalExpenseOnly = goals.size === 1 && goals.has("final-expenses");
  const budgetMax = finalExpenseOnly ? wizardStepBudget.finalExpenseMax : wizardStepBudget.max;

  const toggleGoal = useCallback((id: string) => {
    setGoals((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setFormError(null);
  }, []);

  const patchContactDob = useCallback((patch: Partial<ContactDobFields>) => {
    setContactDob((prev) => ({ ...prev, ...patch }));
    setFormError(null);
  }, []);

  function validationMessageForStep(s: number): string | null {
    switch (s) {
      case 0:
        return goals.size < 1 ? "Please select at least one goal." : null;
      case 1:
        if (!beneficiary) return "Please select who your beneficiaries are.";
        if (beneficiary === "other" && beneficiaryOther.trim().length < 2) {
          return 'Please describe who matters most in the "Other" field.';
        }
        return null;
      case 2:
        return null;
      case 3:
        return validateDob(contactDob.birthMonth, contactDob.birthDay, contactDob.birthYear);
      case 4:
        if (!preExisting) return "Please select an option for pre-existing conditions.";
        if (!tobacco) return "Please answer the tobacco question.";
        return null;
      case 5:
        return validateContact(contactDob);
      default:
        return null;
    }
  }

  async function handleContinue() {
    const err = validationMessageForStep(step);
    if (err) {
      setFormError(err);
      return;
    }
    setFormError(null);

    if (step !== CONTACT_STEP) {
      if (step === 2) setBudget((b) => Math.min(b, budgetMax));
      setStep((prev) => prev + 1);
      return;
    }

    setSubmitting(true);
    const coverage = coverageFromGoals(goals);
    const lead = {
      source: "wizard" as const,
      firstName: contactDob.firstName.trim(),
      lastName: contactDob.lastName.trim(),
      email: contactDob.email.trim(),
      phone: contactDob.phone.trim(),
      state: contactDob.state,
      coverage,
      goals: [...goals],
      beneficiary: beneficiary === "other" ? `other: ${beneficiaryOther.trim()}` : beneficiary,
      monthlyBudget: budget,
      dateOfBirth: `${contactDob.birthYear}-${contactDob.birthMonth.padStart(2, "0")}-${contactDob.birthDay.padStart(2, "0")}`,
      healthConditions: preExisting,
      tobacco,
      consentCalls: contactDob.consentCalls,
      consentSms: contactDob.consentSms,
    };
    track("form_submit", { source: "wizard", coverage, state: lead.state });
    const result = await submitLead(lead);
    setSubmitting(false);
    if (!result.ok) {
      setFormError(`${result.message} You can also call me at ${site.phone}.`);
      return;
    }
    track("wizard_complete", { coverage });
    track("lead", { source: "wizard", coverage, out_of_footprint: result.outOfFootprint });
    router.push(`/thank-you${thankYouQuery(lead)}`);
  }

  function handleBack() {
    setFormError(null);
    if (step > 0) setStep((s) => s - 1);
  }

  const isLast = step === CONTACT_STEP;

  return (
    <>
      <p className="bg-brand-muted/40 py-2 text-center text-xs font-semibold uppercase tracking-[0.18em] text-black/70">
        {quoteWizardMeta.timeHint} · Step {step + 1} of {wizardProgressSteps.length}
      </p>
      <WizardProgress currentStep={step} />
      <div className="mx-auto max-w-5xl px-[clamp(1rem,4vw,2rem)] py-12 md:py-16">
        {step === 0 && <StepGoal selected={goals} onToggle={toggleGoal} />}
        {step === 1 && (
          <StepBeneficiary
            value={beneficiary}
            otherText={beneficiaryOther}
            onChange={(id) => {
              setBeneficiary(id);
              setFormError(null);
            }}
            onOtherText={(t) => {
              setBeneficiaryOther(t);
              setFormError(null);
            }}
          />
        )}
        {step === 2 && <StepBudget value={Math.min(budget, budgetMax)} onChange={setBudget} max={budgetMax} />}
        {step === 3 && (
          <StepDob
            value={{
              birthMonth: contactDob.birthMonth,
              birthDay: contactDob.birthDay,
              birthYear: contactDob.birthYear,
            }}
            onChange={patchContactDob}
          />
        )}
        {step === 4 && (
          <StepConditions
            value={preExisting}
            onChange={(id) => {
              setPreExisting(id);
              setFormError(null);
            }}
            tobacco={tobacco}
            onTobaccoChange={(id) => {
              setTobacco(id);
              setFormError(null);
            }}
          />
        )}
        {step === 5 && (
          <StepContact
            value={{
              firstName: contactDob.firstName,
              lastName: contactDob.lastName,
              email: contactDob.email,
              phone: contactDob.phone,
              state: contactDob.state,
              consentCalls: contactDob.consentCalls,
              consentSms: contactDob.consentSms,
            }}
            onChange={patchContactDob}
          />
        )}
        {formError && (
          <p className="mt-8 text-center text-sm font-medium text-red-700" role="alert">
            {formError}
          </p>
        )}

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          {step > 0 && (
            <button
              type="button"
              onClick={handleBack}
              disabled={submitting}
              className="order-2 min-h-[48px] w-full min-w-[160px] rounded-lg border-2 border-black bg-white px-8 py-3 text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-50 sm:order-1 sm:w-auto"
            >
              Back
            </button>
          )}

          <button
            type="button"
            onClick={handleContinue}
            disabled={submitting || (step === 0 && goals.size < 1)}
            className="order-1 flex min-h-[48px] w-full min-w-[200px] items-center justify-center gap-2 rounded-lg bg-black px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] text-brand-bright transition hover:bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45 sm:order-2 sm:w-auto"
          >
            {submitting ? "Sending…" : isLast ? "Get my free quote" : "Continue"}
            {!submitting && <ContinueIcon />}
          </button>
        </div>

        {isLast && (
          <p className="mt-6 text-center text-xs text-black/60">
            Prefer to talk now?{" "}
            <a href={`tel:${site.phoneTel}`} className="font-semibold text-brand underline underline-offset-2" onClick={() => track("phone_click", { location: "wizard" })}>
              Call {site.phone}
            </a>
          </p>
        )}
      </div>
    </>
  );
}
