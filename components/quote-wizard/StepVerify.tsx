"use client";

import { useCallback, useRef } from "react";
import { quoteFieldClass, quoteLabelClass, wizardStepVerify } from "@/lib/quoteWizardContent";

type Props = {
  phoneDisplay: string;
  digits: [string, string, string, string];
  onDigitsChange: (next: [string, string, string, string]) => void;
  onEditPhone: () => void;
};

export function StepVerify({ phoneDisplay, digits, onDigitsChange, onEditPhone }: Props) {
  const r0 = useRef<HTMLInputElement>(null);
  const r1 = useRef<HTMLInputElement>(null);
  const r2 = useRef<HTMLInputElement>(null);
  const r3 = useRef<HTMLInputElement>(null);
  const refs = [r0, r1, r2, r3];

  const setAt = useCallback(
    (index: number, raw: string) => {
      const d = raw.replace(/\D/g, "").slice(-1);
      const next = [...digits] as [string, string, string, string];
      next[index] = d;
      onDigitsChange(next);
      if (d && index < 3) refs[index + 1].current?.focus();
    },
    [digits, onDigitsChange],
  );

  const onKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) refs[index - 1].current?.focus();
  };

  return (
    <div className="mx-auto max-w-xl text-center">
      <h1 className="font-heading text-2xl font-bold text-brand sm:text-3xl">{wizardStepVerify.heading}</h1>
      <p className="mt-6 text-left text-base leading-relaxed text-black sm:text-lg">{wizardStepVerify.intro(phoneDisplay)}</p>

      <div className="mt-10 text-left">
        <p className={quoteLabelClass}>{wizardStepVerify.codeLabel}</p>
        <div className="flex justify-center gap-3 sm:gap-4">
          {[0, 1, 2, 3].map((i) => (
            <input
              key={i}
              ref={refs[i]}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={digits[i]}
              onChange={(e) => setAt(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              className={quoteFieldClass + " aspect-square max-w-[3.5rem] text-center text-xl font-semibold tabular-nums"}
              aria-label={`Digit ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <p className="mt-8 text-sm text-black/70">{wizardStepVerify.resendHint}</p>
      <button type="button" onClick={onEditPhone} className="mt-4 text-sm font-semibold text-brand underline underline-offset-4 hover:no-underline">
        {wizardStepVerify.updatePhone}
      </button>
    </div>
  );
}
