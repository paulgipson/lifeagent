/** Multi-step quote wizard — `/get-quote`. */

/** Shared input styling (teal border, matches reference forms). */
export const quoteFieldClass =
  "w-full rounded-md border-2 border-brand/45 bg-white px-3 py-3 text-base text-black outline-none transition placeholder:text-black/40 focus:border-brand focus:ring-2 focus:ring-brand/20 sm:text-sm";

export const quoteLabelClass = "mb-1.5 block text-sm font-semibold text-black/85";

export const quoteWizardMeta = {
  title: "Get your free life insurance quote",
  description: "Answer a few quick questions and I'll match term, whole life, IUL, or final expense options to your goals and budget.",
  /** Shown above the progress bar to set expectations */
  timeHint: "Takes about 60 seconds · No obligation",
} as const;

/** Progress bar — order: goal → beneficiary → budget → DOB → health → contact (submit → `/thank-you`). */
export const wizardProgressSteps = [
  { id: "goal", label: "Goal" },
  { id: "beneficiary", label: "Beneficiary" },
  { id: "budget", label: "Budget" },
  { id: "dob", label: "Birth" },
  { id: "health", label: "Health" },
  { id: "contact", label: "Contact" },
] as const;

/** Step — Goal (multi-select). */
export const wizardStepGoal = {
  heading: "What is your goal?",
  sub: "Please select all that apply.",
  options: [
    {
      id: "protect-loved-ones",
      title: "Protect my loved ones",
      description:
        "Make sure your loved ones have financial stability for everyday needs and long-term plans.",
    },
    {
      id: "grow-wealth-tax-free",
      title: "Grow my wealth tax-free",
      description:
        "Accumulate cash value that grows tax-advantaged, giving you financial security for retirement or future goals.",
    },
    {
      id: "final-expenses",
      title: "Take care of final expenses",
      description: "Ensure funeral and burial costs are covered, giving your family peace of mind.",
    },
    {
      id: "protect-mortgage-assets",
      title: "Protect my mortgage and assets",
      description:
        "Pay off the mortgage, settle debts, and cover taxes so your family keeps their home and financial stability.",
    },
  ],
} as const;

/** Step — Beneficiary */
export const wizardStepBeneficiary = {
  heading: "Who are your beneficiaries?",
  choices: [
    { id: "spouse", label: "My Spouse" },
    { id: "children", label: "My Children" },
    { id: "multiple", label: "More Than One Person" },
    { id: "other", label: "Other" },
  ],
  otherPlaceholder: "Who is most important to you?",
} as const;

/** Step — Budget */
export const wizardStepBudget = {
  heading: "What is your monthly budget?",
  sub: "Pick a monthly amount that feels comfortable. This just helps me shortlist the right carriers—nothing is locked in.",
  min: 0,
  max: 1000,
  /** Final-expense-only shoppers see a tighter, more realistic range */
  finalExpenseMax: 300,
  amountLabel: "Amount:",
} as const;

/** Step — Contact */
export const wizardStepContact = {
  heading: "Where should I send your options?",
  sub: "Last step. I'll personally review your answers and reach out—no call center, no pressure.",
} as const;

/** Step — Date of birth */
export const wizardStepDob = {
  heading: "What is your date of birth?",
  sub: "Age is the biggest factor in pricing, so this keeps your quote accurate.",
  monthPh: "Month",
  dayPh: "Day",
  yearPh: "Year",
} as const;

/** Step — Underwriting / health (life insurance application) */
export const wizardStepConditions = {
  heading: "A little about your health",
  question: "Any conditions I should know about so I pick carriers that treat them well?",
  options: [
    { id: "diabetes", label: "Diabetes" },
    { id: "mental-health", label: "Mental Health" },
    { id: "asthma", label: "Asthma / COPD" },
    { id: "high-bp", label: "High Blood Pressure" },
    { id: "heart", label: "Heart Condition" },
    { id: "other", label: "Other" },
    { id: "none", label: "No Pre-Existing Conditions" },
  ],
  tobaccoQuestion: "Have you used tobacco or nicotine in the last 12 months?",
  tobaccoOptions: [
    { id: "no", label: "No" },
    { id: "yes", label: "Yes" },
  ],
} as const;
