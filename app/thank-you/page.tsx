import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BookingEmbed } from "@/components/thank-you/BookingEmbed";
import { ThankYouExpect } from "@/components/thank-you/ThankYouExpect";
import { ThankYouFaq } from "@/components/thank-you/ThankYouFaq";
import { ThankYouHero } from "@/components/thank-you/ThankYouHero";
import { ThankYouPreFooter } from "@/components/thank-you/ThankYouPreFooter";
import { ThankYouTestimonialBlock } from "@/components/thank-you/ThankYouTestimonialBlock";
import { coverageOptions, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Thank you",
  description: `Thank you for contacting ${site.name}. Here's what happens next.`,
  robots: { index: false, follow: true },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

export default async function ThankYouPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const name = first(sp.name)?.trim();
  const email = first(sp.email)?.trim();
  const phone = first(sp.phone)?.trim();
  const coverage = first(sp.coverage);
  const outOfState = first(sp.oos) === "1";
  const coverageLabel = coverageOptions.find((c) => c.value === coverage)?.label;
  const firstName = name?.split(" ")[0];

  return (
    <>
      <SiteHeader />
      <main id="main">
        <ThankYouHero firstName={firstName} outOfState={outOfState} />
        <BookingEmbed
          prefill={{
            name,
            email,
            phone,
            notes: coverageLabel ? `Interested in: ${coverageLabel}` : undefined,
          }}
        />
        <ThankYouExpect />
        <ThankYouTestimonialBlock />
        <ThankYouFaq />
        <ThankYouPreFooter />
      </main>
      <SiteFooter />
    </>
  );
}
