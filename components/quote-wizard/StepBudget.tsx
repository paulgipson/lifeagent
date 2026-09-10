"use client";

import { quoteFieldClass, quoteLabelClass, wizardStepBudget } from "@/lib/quoteWizardContent";

type Props = {
  value: number;
  onChange: (n: number) => void;
  /** Override upper bound (e.g. final-expense shoppers) */
  max?: number;
};

export function StepBudget({ value, onChange, max = wizardStepBudget.max }: Props) {
  const { min } = wizardStepBudget;

  function clamp(n: number) {
    return Math.min(max, Math.max(min, Math.round(n)));
  }

  return (
    <div className="mx-auto max-w-xl text-center">
      <h1 className="font-heading text-2xl font-bold text-brand sm:text-3xl">{wizardStepBudget.heading}</h1>
      <p className="mt-4 text-base leading-relaxed text-black sm:text-lg">{wizardStepBudget.sub}</p>
      <div className="mt-10 text-left">
        <label htmlFor="budget-amount" className={quoteLabelClass}>
          {wizardStepBudget.amountLabel}
        </label>
        <input
          id="budget-amount"
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={value}
          onChange={(e) => {
            const v = e.target.value === "" ? min : Number(e.target.value);
            if (Number.isNaN(v)) return;
            onChange(clamp(v));
          }}
          className={quoteFieldClass}
        />
        <div className="relative mt-10 px-1 pt-2">
          <div
            className="pointer-events-none absolute bottom-full mb-1 -translate-x-1/2 rounded-md bg-brand px-2 py-1 text-xs font-bold text-white shadow-sm"
            style={{
              left: `${max <= min ? 50 : ((value - min) / (max - min)) * 100}%`,
            }}
          >
            ${value}
          </div>
          <input
            type="range"
            min={min}
            max={max}
            step={5}
            value={value}
            onChange={(e) => onChange(clamp(Number(e.target.value)))}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-black/10 accent-brand"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
          />
          <div className="mt-2 flex justify-between text-xs font-medium text-muted">
            <span>${min}</span>
            <span>${max.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
