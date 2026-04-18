import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument } from "@/components/LegalDocument";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/content";
import { privacyPolicySections } from "@/lib/legalContent";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects personal information.`,
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-2xl px-6 py-16">
        <LegalDocument title="Privacy Policy" sections={privacyPolicySections} />
        <Link href="/" className="mt-12 inline-block text-sm font-semibold text-brand hover:underline">
          ← Back to home
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
