"use client";

import { wizardStepConditions } from "@/lib/quoteWizardContent";

type Props = {
  value: string;
  onChange: (id: string) => void;
  tobacco: string;
  onTobaccoChange: (id: string) => void;
};

export function StepConditions({ value, onChange, tobacco, onTobaccoChange }: Props) {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-center font-heading text-2xl font-bold text-brand sm:text-3xl">{wizardStepConditions.heading}</h1>
      <p className="mt-4 text-center text-base text-black sm:text-lg">{wizardStepConditions.question}</p>
      <fieldset className="mt-10">
        <legend className="sr-only">Pre-existing conditions</legend>
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-4">
          {wizardStepConditions.options.map((opt) => (
            <label
              key={opt.id}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 px-4 py-3 transition ${
                value === opt.id ? "border-brand bg-brand-muted/30" : "border-brand/35 bg-white hover:border-brand/60"
              }`}
            >
              <input
                type="radio"
                name="conditions"
                value={opt.id}
                checked={value === opt.id}
                onChange={() => onChange(opt.id)}
                className="h-4 w-4 shrink-0 accent-brand"
              />
              <span className="font-medium text-black">{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-10">
        <legend className="text-center text-base font-semibold text-black sm:text-lg">{wizardStepConditions.tobaccoQuestion}</legend>
        <div className="mt-4 flex justify-center gap-3">
          {wizardStepConditions.tobaccoOptions.map((opt) => (
            <label
              key={opt.id}
              className={`flex min-w-[7rem] cursor-pointer items-center justify-center gap-2 rounded-lg border-2 px-5 py-3 transition ${
                tobacco === opt.id ? "border-brand bg-brand-muted/30" : "border-brand/35 bg-white hover:border-brand/60"
              }`}
            >
              <input
                type="radio"
                name="tobacco"
                value={opt.id}
                checked={tobacco === opt.id}
                onChange={() => onTobaccoChange(opt.id)}
                className="h-4 w-4 shrink-0 accent-brand"
              />
              <span className="font-medium text-black">{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
