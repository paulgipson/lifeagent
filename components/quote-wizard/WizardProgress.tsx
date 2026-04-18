"use client";

import { wizardProgressSteps } from "@/lib/quoteWizardContent";

type Props = {
  currentStep: number;
};

function StepIcon({ id, active }: { id: string; active: boolean }) {
  const stroke = active ? "var(--brand)" : "var(--muted)";
  const fill = active ? "var(--brand)" : "none";
  const common = { className: "h-6 w-6 shrink-0", stroke, fill: "none" as const, strokeWidth: 1.5 };

  switch (id) {
    case "goal":
      return (
        <svg {...common} viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="4" fill={fill} />
        </svg>
      );
    case "beneficiary":
      return (
        <svg {...common} viewBox="0 0 24 24" aria-hidden>
          <circle cx="8" cy="8" r="2.5" />
          <circle cx="16" cy="8" r="2.5" />
          <path d="M4 19c1.2-2.8 3.5-4 8-4s6.8 1.2 8 4" />
          <path d="M12 11v3M10.5 14h3" strokeLinecap="round" />
        </svg>
      );
    case "budget":
      return (
        <svg {...common} viewBox="0 0 24 24" aria-hidden>
          <rect x="4" y="6" width="16" height="12" rx="2" />
          <path d="M4 10h16" />
          <circle cx="16" cy="12" r="1.5" fill={stroke} />
        </svg>
      );
    case "dob":
      return (
        <svg {...common} viewBox="0 0 24 24" aria-hidden>
          <rect x="4" y="5" width="16" height="16" rx="2" />
          <path d="M4 10h16M9 3v4M15 3v4" />
          <circle cx="12" cy="15" r="1.2" fill={stroke} />
        </svg>
      );
    case "contact":
      return (
        <svg {...common} viewBox="0 0 24 24" aria-hidden>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 8l9 6 9-6" />
        </svg>
      );
    case "health":
      return (
        <svg {...common} viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="10" r="3.5" />
          <path d="M6 20c0-3.5 3-6 6-6s6 2.5 6 6" />
        </svg>
      );
    case "verify":
      return (
        <svg {...common} viewBox="0 0 24 24" aria-hidden>
          <rect x="6" y="10" width="12" height="10" rx="2" />
          <path d="M9 10V7a3 3 0 0 1 6 0v3" />
          <circle cx="12" cy="15" r="1" fill={stroke} />
        </svg>
      );
    default:
      return null;
  }
}

export function WizardProgress({ currentStep }: Props) {
  return (
    <nav aria-label="Quote progress" className="w-full overflow-x-auto border-b border-border/60 bg-white/80">
      <ol className="mx-auto flex min-w-max max-w-5xl items-stretch justify-between gap-1 px-2 py-4 sm:px-4">
        {wizardProgressSteps.map((step, index) => {
          const active = index === currentStep;
          const done = index < currentStep;
          return (
            <li key={step.id} className="flex min-w-[4.5rem] flex-1 flex-col items-center gap-1.5 text-center sm:min-w-[5rem]">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                  active
                    ? "border-brand bg-brand/10"
                    : done
                      ? "border-brand/40 bg-brand/5"
                      : "border-border/70 bg-white"
                }`}
              >
                <StepIcon id={step.id} active={active || done} />
              </span>
              <span
                className={`text-[0.55rem] font-semibold uppercase tracking-[0.12em] sm:text-[0.6rem] ${
                  active ? "text-brand" : done ? "text-foreground/70" : "text-muted"
                }`}
              >
                {step.label}
              </span>
              <span
                className={`h-0.5 w-full max-w-[3rem] rounded-full ${active ? "bg-brand" : done ? "bg-brand/30" : "bg-border/60"}`}
                aria-hidden
              />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
