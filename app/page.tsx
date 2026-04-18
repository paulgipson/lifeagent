import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { ValueBanner } from "@/components/ValueBanner";
import { FeatureSplitLife } from "@/components/FeatureSplitLife";
import { PartnerLogoMarquee } from "@/components/PartnerLogoMarquee";
import { FeatureSplitAdvancedMarkets } from "@/components/FeatureSplitAdvancedMarkets";
import { LifestyleSplit } from "@/components/LifestyleSplit";
import { AgentSpotlight } from "@/components/AgentSpotlight";
import { MidPageCta } from "@/components/MidPageCta";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ValuePillars } from "@/components/ValuePillars";
import { AboutCollage } from "@/components/AboutCollage";
import { StatsBar } from "@/components/StatsBar";
import { HowItWorks } from "@/components/HowItWorks";
import { SiteFooter } from "@/components/SiteFooter";
import { partnerLogosRow1, partnerLogosRow2 } from "@/lib/partnerLogos";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <HeroSection />
        <ValueBanner />
        <FeatureSplitLife />
        <PartnerLogoMarquee id="carriers" logos={partnerLogosRow1} showLabel />
        <FeatureSplitAdvancedMarkets />
        <PartnerLogoMarquee id="carriers-2" logos={partnerLogosRow2} />
        <LifestyleSplit />
        <AgentSpotlight />
        <MidPageCta />
        <TestimonialsSection />
        <ValuePillars />
        <AboutCollage />
        <StatsBar />
        <HowItWorks />
      </main>
      <SiteFooter />
    </>
  );
}
