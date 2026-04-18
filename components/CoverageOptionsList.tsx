export type CoverageOptionItem = {
  title: string;
  description: string;
};

type Props = {
  items: readonly CoverageOptionItem[];
  /** Column label above the list (default: Coverage options) */
  listLabel?: string;
};

export function CoverageOptionsList({ items, listLabel = "Coverage options" }: Props) {
  return (
    <div>
      <p className="font-heading text-[11px] font-bold uppercase tracking-[0.24em] text-brand md:text-xs">
        {listLabel}
      </p>
      <ul className="mt-6 space-y-6 md:mt-8 md:space-y-7">
        {items.map((item) => (
          <li key={item.title}>
            <p className="font-heading text-base font-bold text-black">{item.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
