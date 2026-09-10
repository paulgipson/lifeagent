import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { ValueBanner } from "@/components/ValueBanner";
import { HowItWorks } from "@/components/HowItWorks";
import { CoverageGrid } from "@/components/CoverageGrid";
import { PartnerLogoMarquee } from "@/components/PartnerLogoMarquee";
import { LifestyleSplit } from "@/components/LifestyleSplit";
import { AgentSpotlight } from "@/components/AgentSpotlight";
import { AboutCollage } from "@/components/AboutCollage";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { StatsBar } from "@/components/StatsBar";
import { HomeFaq } from "@/components/HomeFaq";
import { BottomCta } from "@/components/BottomCta";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { partnerLogos } from "@/lib/partnerLogos";

/**
 * Conversion-ordered homepage:
 * hero + form → proof → how it works → products → carriers → why Paul → about/licenses → reviews → FAQ → final form
 */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <HeroSection />
        <PartnerLogoMarquee id="carriers" logos={partnerLogos} showLabel />
        <ValueBanner />
        <HowItWorks />
        <CoverageGrid />
        <LifestyleSplit />
        <AgentSpotlight />
        <AboutCollage />
        <TestimonialsSection />
        <StatsBar />
        <HomeFaq />
        <BottomCta />
      </main>
      <SiteFooter />
      <MobileStickyBar />
    </>
  );
}
