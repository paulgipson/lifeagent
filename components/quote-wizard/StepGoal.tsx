"use client";

import { wizardStepGoal } from "@/lib/quoteWizardContent";

function IconFamily({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <circle cx="18" cy="16" r="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="17" r="4.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8 38v-2a8 8 0 018-8h4a8 8 0 018 8v2M26 38v-2a6 6 0 013.7-5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconGrowth({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M10 34c4-12 12-18 22-20M14 38h28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M28 14l8-6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16" cy="30" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function IconFinalExpense({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M14 36V20h20v16M18 20v-4a6 6 0 0112 0v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M24 28v6M20 34h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconMortgage({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path d="M10 22L24 10l14 12v20H10V22z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M18 38V26h12v12" stroke="currentColor" strokeWidth="2" />
      <path d="M20 32h8M24 28v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

const goalIcons = [IconFamily, IconGrowth, IconFinalExpense, IconMortgage];

type Props = {
  selected: Set<string>;
  onToggle: (id: string) => void;
};

export function StepGoal({ selected, onToggle }: Props) {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-brand sm:text-3xl md:text-[1.85rem]">
        {wizardStepGoal.heading}
      </h1>
      <p className="mt-2 text-base text-black sm:text-lg">{wizardStepGoal.sub}</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:gap-6">
        {wizardStepGoal.options.map((opt, i) => {
          const Icon = goalIcons[i] ?? IconFamily;
          const isOn = selected.has(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onToggle(opt.id)}
              className={`flex w-full gap-4 rounded-2xl border-2 p-5 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 md:p-6 ${
                isOn
                  ? "border-brand bg-brand-muted/50 shadow-md ring-2 ring-brand/30"
                  : "border-brand/40 bg-brand-muted/20 hover:border-brand hover:bg-brand-muted/35"
              }`}
              aria-pressed={isOn}
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center text-brand md:h-16 md:w-16">
                <Icon className="h-12 w-12 md:h-14 md:w-14" />
              </span>
              <span>
                <span className="block font-heading text-base font-bold text-black md:text-lg">{opt.title}</span>
                <span className="mt-2 block text-sm leading-relaxed text-black/85 md:text-[15px]">{opt.description}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
