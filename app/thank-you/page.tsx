import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ThankYouExpect } from "@/components/thank-you/ThankYouExpect";
import { ThankYouFaq } from "@/components/thank-you/ThankYouFaq";
import { ThankYouHero } from "@/components/thank-you/ThankYouHero";
import { ThankYouPreFooter } from "@/components/thank-you/ThankYouPreFooter";
import { ThankYouTestimonialBlock } from "@/components/thank-you/ThankYouTestimonialBlock";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Thank you",
  description: `Thank you for contacting ${site.name}. Here's what happens next.`,
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <ThankYouHero />
        <ThankYouExpect />
        <ThankYouTestimonialBlock />
        <ThankYouFaq />
        <ThankYouPreFooter />
      </main>
      <SiteFooter />
    </>
  );
}
