import { SiteLayout } from "../SiteLayout";
import { Hero } from "../sections/Hero";
import { TrustSection } from "../sections/TrustSection";
import { ServicesSection } from "../sections/ServicesSection";
import { AboutSection } from "../sections/AboutSection";
import { PortfolioSection } from "../sections/PortfolioSection";
import { ProcessSection } from "../sections/ProcessSection";
import { TestimonialsSection } from "../sections/TestimonialsSection";
import { FinalCtaSection } from "../sections/FinalCtaSection";

export function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <TrustSection />
      <ServicesSection />
      <AboutSection />
      <PortfolioSection />
      <ProcessSection />
      <TestimonialsSection />
      <FinalCtaSection />
    </SiteLayout>
  );
}
