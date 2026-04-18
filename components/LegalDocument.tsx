import type { LegalSection } from "@/lib/legalContent";
import { legalMeta } from "@/lib/legalContent";

type Props = {
  title: string;
  sections: readonly LegalSection[];
};

export function LegalDocument({ title, sections }: Props) {
  return (
    <article>
      <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">{title}</h1>
      <p className="mt-2 text-sm text-slate-500">{legalMeta.lastUpdatedLabel}</p>
      <div className="mt-10 space-y-10">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-xl font-bold text-foreground">{s.heading}</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-600">
              {s.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
