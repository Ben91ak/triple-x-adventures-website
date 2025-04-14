import { memo, lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/hero-section";
import { GlobalBackground } from "@/components/layout/background-fixed";
import { optimizePageImages } from "@/utils/performance-optimizer";
import { preloadAllCriticalImages } from "@/utils/image-preloader";

// Lazy-load non-critical sections for better performance
const IntroductionSection = lazy(() => import("@/components/introduction-section").then(module => ({ default: module.IntroductionSection })));
const ExperiencesSection = lazy(() => import("@/components/experiences-section-fixed").then(module => ({ default: module.ExperiencesSectionFixed })));
const AccommodationsSection = lazy(() => import("@/components/accommodations-section").then(module => ({ default: module.AccommodationsSection })));
const RestaurantSection = lazy(() => import("@/components/restaurant-section").then(module => ({ default: module.RestaurantSection })));
const AboutSection = lazy(() => import("@/components/about-section").then(module => ({ default: module.AboutSection })));
// Gallery section removed per user request to improve performance
const TestimonialsSection = lazy(() => import("@/components/testimonials-section").then(module => ({ default: module.TestimonialsSection })));
const ContactSection = lazy(() => import("@/components/contact-section").then(module => ({ default: module.ContactSection })));
const CTASection = lazy(() => import("@/components/cta-section").then(module => ({ default: module.CTASection })));

// Use the SectionLoader component from UI components
import SectionLoader from "../components/ui/section-loader";

// Memoize the entire Home component to prevent unnecessary re-renders
const Home = memo(function Home() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  // Run image optimization and preloading when component mounts
  useEffect(() => {
    optimizePageImages();
    preloadAllCriticalImages();
  }, [language]);

  return (
    <article className="font-opensans text-slate relative" itemScope itemType="https://schema.org/TouristAttraction">
      <Helmet>
        <title>Triple X Adventures | Premium Arctic Experiences</title>
        <meta name="description" content={t.hero.subtitle} />
        <meta property="og:title" content="Triple X Adventures | Premium Arctic Experiences" />
        <meta property="og:description" content={t.hero.subtitle} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://triplexadventures.com" />
      </Helmet>
      
      {/* Enhanced unified animated background with starry night effect */}
      <GlobalBackground intensity="high" starDensity="dense" />
      
      {/* Main content with appropriate z-index */}
      <div className="relative z-10">
        {/* Critical path section - load immediately */}
        <Header />
        
        {/* Main content sections with proper HTML5 structure */}
        <main>
          {/* Hero section - first visible content */}
          <HeroSection />
          
          {/* Non-critical sections - lazy loaded with proper section elements */}
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
            <AboutSection />
          </Suspense>
          
          {/* Gallery section removed per request */}
          
          <Suspense fallback={<SectionLoader />}>
            <TestimonialsSection />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <ContactSection />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <CTASection />
          </Suspense>
        </main>
        
        {/* Footer with site information and navigation */}
        <Footer />
      </div>
      
      {/* Structured data for search engines */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TouristAttraction",
          "name": "Triple X Adventures",
          "description": t.hero.subtitle,
          "url": "https://triplexadventures.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Arvidsjaur",
            "addressRegion": "Swedish Lapland",
            "addressCountry": "Sweden"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "65.5856",
            "longitude": "19.1764"
          },
          "tourBookingPage": "https://triplexadventures.com/booking"
        })
      }} />
    </article>
  );
});

export default Home;
