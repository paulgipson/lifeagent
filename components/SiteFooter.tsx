import Link from "next/link";
import { primaryNav, site } from "@/lib/content";
import { QuoteCta } from "@/components/QuoteCta";
import { footerBrandDisclaimer, footerLicenseLines, footerRegulatoryDisclaimer } from "@/lib/legalContent";

const legal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();
  const licenseLines = footerLicenseLines();
  return (
    <footer id="contact" className="bg-surface-dark text-slate-300">
      <div className="mx-auto max-w-6xl px-[clamp(1rem,4vw,2rem)] py-14">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/#top" className="inline-flex items-center gap-2 text-lg font-bold text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-bright text-sm font-extrabold text-black">
                P
              </span>
              {site.name}
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed">{footerBrandDisclaimer}</p>
            {licenseLines.length > 0 && (
              <div className="mt-3 max-w-md space-y-1 text-xs leading-relaxed text-slate-400">
                {licenseLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">Quick links</h2>
            <ul className="mt-4 space-y-2">
              {primaryNav.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-300 no-underline visited:text-slate-300 hover:text-white focus:outline-none focus-visible:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {legal.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm hover:text-white focus:outline-none focus-visible:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">Contact</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-white focus:outline-none focus-visible:underline">
                  {site.email}
                </a>
              </li>
              <li>{site.address}</li>
            </ul>
            <QuoteCta
              location="footer"
              className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-full bg-brand-bright px-6 text-xs font-bold uppercase tracking-[0.16em] text-black transition hover:bg-white"
            >
              Get my free quote
            </QuoteCta>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-slate-800 pt-8 text-xs text-slate-500 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <p className="shrink-0">
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="max-w-xl leading-relaxed">{footerRegulatoryDisclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
