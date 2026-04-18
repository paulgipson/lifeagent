"use client";

import { quoteFieldClass, quoteLabelClass, wizardStepBeneficiary } from "@/lib/quoteWizardContent";

type Props = {
  value: string;
  otherText: string;
  onChange: (id: string) => void;
  onOtherText: (text: string) => void;
};

export function StepBeneficiary({ value, otherText, onChange, onOtherText }: Props) {
  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-center font-heading text-2xl font-bold text-brand sm:text-3xl">{wizardStepBeneficiary.heading}</h1>
      <fieldset className="mt-10 space-y-4">
        <legend className="sr-only">Beneficiary</legend>
        {wizardStepBeneficiary.choices.map((c) => (
          <label
            key={c.id}
            className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 px-4 py-3 transition ${
              value === c.id ? "border-brand bg-brand-muted/30" : "border-brand/35 bg-white hover:border-brand/60"
            }`}
          >
            <input
              type="radio"
              name="beneficiary"
              value={c.id}
              checked={value === c.id}
              onChange={() => onChange(c.id)}
              className="h-4 w-4 shrink-0 accent-brand"
            />
            <span className="font-medium text-black">{c.label}</span>
          </label>
        ))}
      </fieldset>
      {value === "other" && (
        <div className="mt-6">
          <label htmlFor="beneficiary-other" className={quoteLabelClass}>
            Other
          </label>
          <textarea
            id="beneficiary-other"
            rows={3}
            value={otherText}
            onChange={(e) => onOtherText(e.target.value)}
            placeholder={wizardStepBeneficiary.otherPlaceholder}
            className={quoteFieldClass + " resize-y"}
          />
        </div>
      )}
    </div>
  );
}
