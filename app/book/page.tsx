import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { BookingEmbed } from "@/components/thank-you/BookingEmbed";
import { bookingEnabled } from "@/lib/booking";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Book a free 15-minute call",
  description: `Pick a time for a free 15-minute phone consult with ${site.name}. No pressure—just clear answers about your life insurance options.`,
  alternates: { canonical: "/book" },
  openGraph: {
    title: `Book a free call | ${site.name}`,
    description: "Grab a 15-minute slot and I'll call you then—no waiting around for a callback.",
    url: `${site.url}/book`,
  },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

export default async function BookPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const name = first(sp.name)?.trim();
  const email = first(sp.email)?.trim();
  const phone = first(sp.phone)?.trim();
  const notes = first(sp.notes)?.trim();

  return (
    <>
      <SiteHeader />
      <main id="main">
        {bookingEnabled ? (
          <BookingEmbed
            location="book_page"
            asPageHeading
            className="gradient-hero py-12 text-black md:py-16"
            prefill={{ name, email, phone, notes }}
          />
        ) : (
          <section className="gradient-hero py-20 text-center">
            <div className="mx-auto max-w-xl px-[clamp(1rem,4vw,2rem)]">
              <h1 className="font-heading text-3xl font-bold text-black">Booking is temporarily unavailable</h1>
              <p className="mt-4 text-base text-black/80">
                Request a free quote and I&apos;ll reach out {site.responsePromise}.
              </p>
              <Link
                href="/#quote-form"
                className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-full bg-black px-8 text-xs font-bold uppercase tracking-[0.18em] text-brand-bright"
              >
                Get my free quote
              </Link>
            </div>
          </section>
        )}

        <section className="bg-white py-12 md:py-16">
          <div className="mx-auto max-w-2xl px-[clamp(1rem,4vw,2rem)] text-center">
            <p className="text-base text-black/75 sm:text-lg">
              Prefer to start with a quick form first?{" "}
              <Link href="/#quote-form" className="font-semibold text-brand underline underline-offset-2 hover:no-underline">
                Get your free quote
              </Link>{" "}
              and I&apos;ll personally review it before we talk.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileStickyBar />
    </>
  );
}
