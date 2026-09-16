import type { Metadata } from "next";
import { DM_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import { paul, site } from "@/lib/content";
import { licensedStates } from "@/lib/licenses";
import { Analytics } from "@/components/Analytics";
import { QuoteFormAnchorScroll } from "@/components/QuoteFormAnchorScroll";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const ogTitle = `${site.seoTitle} | ${site.name}`;
const ogImageAlt = `${paul.displayName} — ${site.name} life insurance`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: ogTitle,
    template: `%s | ${site.name}`,
  },
  description: site.tagline,
  alternates: { canonical: "/" },
  openGraph: {
    title: ogTitle,
    description: site.tagline,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.jpg",
        width: 1024,
        height: 690,
        alt: ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: site.tagline,
    images: ["/og.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: `${site.name} (${paul.displayName})`,
  description: site.tagline,
  url: site.url,
  email: site.email,
  image: `${site.url}/paul-gipson.png`,
  priceRange: "Free consultation",
  address: {
    "@type": "PostalAddress",
    addressLocality: site.addressLocality,
    addressRegion: site.addressRegion,
    addressCountry: site.addressCountry,
  },
  areaServed: licensedStates.map((l) => ({ "@type": "State", name: l.stateName })),
  founder: { "@type": "Person", name: paul.displayName },
  knowsAbout: ["Term life insurance", "Whole life insurance", "Indexed universal life insurance", "Final expense insurance"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans text-base text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <QuoteFormAnchorScroll />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
