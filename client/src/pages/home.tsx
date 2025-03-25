import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/hero-section";
import { IntroductionSection } from "@/components/introduction-section";
import { ExperiencesSection } from "@/components/experiences-section";
import { AccommodationsSection } from "@/components/accommodations-section";
import { RestaurantSection } from "@/components/restaurant-section";
import { PackageBuilder } from "@/components/package-builder";
import { AboutSection } from "@/components/about-section";
import { GallerySection } from "@/components/gallery-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ContactSection } from "@/components/contact-section";
import { CTASection } from "@/components/cta-section";

export default function Home() {
  return (
    <div className="font-opensans text-slate bg-ice">
      <Header />
      <HeroSection />
      <IntroductionSection />
      <ExperiencesSection />
      <AccommodationsSection />
      <RestaurantSection />
      <PackageBuilder />
      <AboutSection />
      <GallerySection />
      <TestimonialsSection />
      <ContactSection />
      <CTASection />
      <Footer />
    </div>
  );
}
