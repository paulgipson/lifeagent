"use client";

import { quoteFieldClass, quoteLabelClass, wizardStepDob } from "@/lib/quoteWizardContent";
import type { ContactDobFields } from "@/lib/quoteWizardTypes";

type Props = {
  value: Pick<ContactDobFields, "birthMonth" | "birthDay" | "birthYear">;
  onChange: (patch: Partial<Pick<ContactDobFields, "birthMonth" | "birthDay" | "birthYear">>) => void;
};

export function StepDob({ value, onChange }: Props) {
  function field<K extends keyof Props["value"]>(key: K, v: Props["value"][K]) {
    onChange({ [key]: v } as Partial<Props["value"]>);
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-center font-heading text-2xl font-bold text-brand sm:text-3xl">{wizardStepDob.heading}</h1>
      <p className="mt-3 text-center text-base text-black">{wizardStepDob.sub}</p>
      <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
        <div>
          <label htmlFor="qf-mm" className={quoteLabelClass}>
            {wizardStepDob.monthPh}
          </label>
          <input
            id="qf-mm"
            inputMode="numeric"
            maxLength={2}
            placeholder="MM"
            value={value.birthMonth}
            onChange={(e) => field("birthMonth", e.target.value.replace(/\D/g, "").slice(0, 2))}
            className={quoteFieldClass}
          />
        </div>
        <div>
          <label htmlFor="qf-dd" className={quoteLabelClass}>
            {wizardStepDob.dayPh}
          </label>
          <input
            id="qf-dd"
            inputMode="numeric"
            maxLength={2}
            placeholder="DD"
            value={value.birthDay}
            onChange={(e) => field("birthDay", e.target.value.replace(/\D/g, "").slice(0, 2))}
            className={quoteFieldClass}
          />
        </div>
        <div>
          <label htmlFor="qf-yyyy" className={quoteLabelClass}>
            {wizardStepDob.yearPh}
          </label>
          <input
            id="qf-yyyy"
            inputMode="numeric"
            maxLength={4}
            placeholder="YYYY"
            value={value.birthYear}
            onChange={(e) => field("birthYear", e.target.value.replace(/\D/g, "").slice(0, 4))}
            className={quoteFieldClass}
          />
        </div>
      </div>
    </div>
  );
}
