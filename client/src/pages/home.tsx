import { memo, lazy, Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/hero-section";
import { GlobalBackground } from "@/components/layout/background";

// Lazy-load non-critical sections for better performance
const IntroductionSection = lazy(() => import("@/components/introduction-section").then(module => ({ default: module.IntroductionSection })));
const ExperiencesSection = lazy(() => import("@/components/experiences-section").then(module => ({ default: module.ExperiencesSection })));
const AccommodationsSection = lazy(() => import("@/components/accommodations-section").then(module => ({ default: module.AccommodationsSection })));
const RestaurantSection = lazy(() => import("@/components/restaurant-section").then(module => ({ default: module.RestaurantSection })));
const PackageBuilder = lazy(() => import("@/components/package-builder").then(module => ({ default: module.PackageBuilder })));
const AboutSection = lazy(() => import("@/components/about-section").then(module => ({ default: module.AboutSection })));
const GallerySection = lazy(() => import("@/components/gallery-section").then(module => ({ default: module.GallerySection })));
const TestimonialsSection = lazy(() => import("@/components/testimonials-section").then(module => ({ default: module.TestimonialsSection })));
const ContactSection = lazy(() => import("@/components/contact-section").then(module => ({ default: module.ContactSection })));
const CTASection = lazy(() => import("@/components/cta-section").then(module => ({ default: module.CTASection })));

// Enhanced loading component for lazy-loaded sections
const SectionLoader = () => (
  <div className="flex justify-center items-center py-12">
    <div className="relative">
      <div className="absolute inset-0 bg-accent-color/20 blur-xl rounded-full"></div>
      <div className="w-10 h-10 border-4 border-accent-color rounded-full border-t-transparent animate-spin relative z-10"></div>
    </div>
  </div>
);

// Memoize the entire Home component to prevent unnecessary re-renders
const Home = memo(function Home() {
  return (
    <div className="font-opensans text-slate relative">
      {/* Unified animated background for the entire page */}
      <GlobalBackground />
      
      {/* Main content with appropriate z-index */}
      <div className="relative z-10">
        {/* Critical path section - load immediately */}
        <Header />
        <HeroSection />
        
        {/* Non-critical sections - lazy loaded */}
        <Suspense fallback={<SectionLoader />}>
          <IntroductionSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ExperiencesSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <AccommodationsSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <RestaurantSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <PackageBuilder />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <GallerySection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <TestimonialsSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <CTASection />
        </Suspense>
        
        <Footer />
      </div>
    </div>
  );
});

export default Home;
