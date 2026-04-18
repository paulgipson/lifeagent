"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import type { ContactDobFields } from "@/lib/quoteWizardTypes";
import { StepBeneficiary } from "@/components/quote-wizard/StepBeneficiary";
import { StepBudget } from "@/components/quote-wizard/StepBudget";
import { StepConditions } from "@/components/quote-wizard/StepConditions";
import { StepContact } from "@/components/quote-wizard/StepContact";
import { StepDob } from "@/components/quote-wizard/StepDob";
import { StepGoal } from "@/components/quote-wizard/StepGoal";
import { StepVerify } from "@/components/quote-wizard/StepVerify";
import { WizardProgress } from "@/components/quote-wizard/WizardProgress";
import { formatPhoneDisplay, validateContact, validateDob } from "@/lib/quoteWizardValidate";

/** Last wizard step index (verify). Successful Continue → `/thank-you`. */
const VERIFY_STEP = 6;

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

export function QuoteWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formError, setFormError] = useState<string | null>(null);

  const [goals, setGoals] = useState<Set<string>>(new Set());
  const [beneficiary, setBeneficiary] = useState("");
  const [beneficiaryOther, setBeneficiaryOther] = useState("");
  const [budget, setBudget] = useState(100);
  const [contactDob, setContactDob] = useState<ContactDobFields>(emptyContactDob);
  const [preExisting, setPreExisting] = useState("");
  const [verifyDigits, setVerifyDigits] = useState<[string, string, string, string]>(["", "", "", ""]);

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
        return !preExisting ? "Please select an option for pre-existing conditions." : null;
      case 5:
        return validateContact(contactDob);
      case 6:
        return verifyDigits.every((d) => d.length === 1 && /\d/.test(d))
          ? null
          : "Please enter the 4-digit verification code.";
      default:
        return null;
    }
  }

  function handleContinue() {
    const err = validationMessageForStep(step);
    if (err) {
      setFormError(err);
      return;
    }
    setFormError(null);
    if (step === VERIFY_STEP) {
      router.push("/thank-you");
      return;
    }
    setStep((prev) => prev + 1);
  }

  function handleBack() {
    setFormError(null);
    if (step > 0) setStep((s) => s - 1);
  }

  const phoneDisplay = formatPhoneDisplay(contactDob.phone);

  return (
    <>
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
        {step === 2 && <StepBudget value={budget} onChange={setBudget} />}
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
        {step === 4 && <StepConditions value={preExisting} onChange={(id) => { setPreExisting(id); setFormError(null); }} />}
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
        {step === 6 && (
          <StepVerify
            phoneDisplay={phoneDisplay}
            digits={verifyDigits}
            onDigitsChange={(d) => {
              setVerifyDigits(d);
              setFormError(null);
            }}
            onEditPhone={() => {
              setStep(5);
              setFormError(null);
            }}
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
              className="order-2 min-h-[48px] w-full min-w-[160px] rounded-lg border-2 border-black bg-white px-8 py-3 text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:order-1 sm:w-auto"
            >
              Back
            </button>
          )}

          <button
            type="button"
            onClick={handleContinue}
            disabled={step === 0 && goals.size < 1}
            className="order-1 flex min-h-[48px] w-full min-w-[200px] items-center justify-center gap-2 rounded-lg bg-black px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] text-brand transition hover:bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45 sm:order-2 sm:w-auto"
          >
            Continue
            <ContinueIcon />
          </button>
        </div>
      </div>
    </>
  );
}
