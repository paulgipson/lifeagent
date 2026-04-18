import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { QuoteWizard } from "@/components/quote-wizard/QuoteWizard";
import { quoteWizardMeta } from "@/lib/quoteWizardContent";

export const metadata: Metadata = {
  title: quoteWizardMeta.title,
  description: quoteWizardMeta.description,
};

export default function GetQuotePage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="min-h-[60vh] bg-white">
        <QuoteWizard />
      </main>
      <SiteFooter />
    </>
  );
}
