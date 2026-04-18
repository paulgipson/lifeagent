/** Multi-step quote wizard — `/get-quote`. */

/** Shared input styling (teal border, matches reference forms). */
export const quoteFieldClass =
  "w-full rounded-md border-2 border-brand/45 bg-white px-3 py-3 text-sm text-black outline-none transition placeholder:text-black/40 focus:border-brand focus:ring-2 focus:ring-brand/20";

export const quoteLabelClass = "mb-1.5 block text-sm font-semibold text-black/85";

export const quoteWizardMeta = {
  title: "Find your plan",
  description: "Answer a few questions so we can match life insurance options to your goals.",
} as const;

/** Progress bar — order: goal → beneficiary → budget → DOB → health → contact → verify (then `/thank-you`). */
export const wizardProgressSteps = [
  { id: "goal", label: "Goal" },
  { id: "beneficiary", label: "Beneficiary" },
  { id: "budget", label: "Budget" },
  { id: "dob", label: "Birth" },
  { id: "health", label: "Health" },
  { id: "contact", label: "Contact" },
  { id: "verify", label: "Verify" },
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
        "Accumulate cash value that grows tax-free, giving you financial security for retirement or future goals.",
    },
    {
      id: "final-expenses",
      title: "Take Care of Final Expenses",
      description: "Ensure funeral and burial costs are covered, giving your family peace of mind.",
    },
    {
      id: "protect-mortgage-assets",
      title: "Protect my mortgage and assets",
      description:
        "Life insurance can help pay off your mortgage, settle debts, and cover taxes, ensuring your family keeps their home and financial stability.",
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
  sub: "Select a monthly payment amount that feels manageable for you, even in the event of an unexpected incident.",
  min: 0,
  max: 1000,
  amountLabel: "Amount:",
} as const;

/** Step — Contact */
export const wizardStepContact = {
  heading: "Please fill out your contact information.",
  sub: "Enter your contact information to get your FREE quote.",
} as const;

/** Step — Date of birth */
export const wizardStepDob = {
  heading: "What is your date of birth?",
  sub: "Please enter your date of birth.",
  monthPh: "Month",
  dayPh: "Day",
  yearPh: "Year",
} as const;

/** Step — Underwriting / health (life insurance application) */
export const wizardStepConditions = {
  heading: "Pre-existing conditions",
  question: "Any pre-existing conditions that we need to make sure are covered?",
  options: [
    { id: "diabetes", label: "Diabetes" },
    { id: "mental-health", label: "Mental Health" },
    { id: "asthma", label: "Asthma" },
    { id: "high-bp", label: "High Blood Pressure" },
    { id: "other", label: "Other" },
    { id: "none", label: "No Pre-Existing Conditions" },
  ],
} as const;

/** Step — Phone verification (UI only; wire SMS in production). */
export const wizardStepVerify = {
  heading: "Verify Your Code to Continue!",
  intro: (phoneDisplay: string) =>
    `We've sent a one-time code to ${phoneDisplay}. Enter it below to confirm it's really you—this helps keep your information secure.`,
  codeLabel: "Enter 4-digit code",
  resendHint: "Didn't receive a code? Try again in a moment or contact Paul directly.",
  updatePhone: "Entered the wrong number? Go back to update your phone number.",
} as const;

