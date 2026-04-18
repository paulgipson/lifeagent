import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument } from "@/components/LegalDocument";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/content";
import { termsOfServiceSections } from "@/lib/legalContent";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms governing use of ${site.name} and submission of quote requests.`,
};

export default function TermsOfServicePage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-2xl px-6 py-16">
        <LegalDocument title="Terms of Service" sections={termsOfServiceSections} />
        <Link href="/" className="mt-12 inline-block text-sm font-semibold text-brand hover:underline">
          ← Back to home
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
