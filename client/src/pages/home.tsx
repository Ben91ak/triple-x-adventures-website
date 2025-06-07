import { memo, lazy, Suspense, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/hero-section";
import { GlobalBackground } from "@/components/layout/background-fixed";
import { optimizePageImages } from "@/utils/performance-optimizer";
import { preloadAllCriticalImages } from "@/utils/image-preloader";
import { SEO } from "@/components/seo/SEO";
import { BackToTop } from "@/components/ui/back-to-top";

// Lazy-load non-critical sections for better performance
const IntroductionSection = lazy(() => import("@/components/introduction-section").then(module => ({ default: module.IntroductionSection })));
const ExperiencesSection = lazy(() => import("@/components/experiences-section").then(module => ({ default: module.ExperiencesSection })));
const AccommodationsSection = lazy(() => import("@/components/accommodations-section").then(module => ({ default: module.AccommodationsSection })));
// RestaurantSection removed per user request
// AboutSection removed as it duplicates IntroductionSection content
// Gallery section removed per user request to improve performance
const TestimonialsSection = lazy(() => import("@/components/testimonials-section").then(module => ({ default: module.TestimonialsSection })));
// Use the SectionLoader component from UI components
import SectionLoader from "../components/ui/section-loader";

const ContactSection = lazy(() => import("@/components/contact-section").then(module => ({ default: module.ContactSection })));
const CTASection = lazy(() => import("@/components/cta-section").then(module => ({ default: module.CTASection })));
// Remove BookingSection import since module cannot be found

// Memoize the entire Home component to prevent unnecessary re-renders
const Home = memo(function Home() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  // Run image optimization and preloading when component mounts
  useEffect(() => {
    optimizePageImages();
    preloadAllCriticalImages();
  }, [language]);

  // Enhanced structured data for better SEO with 2025 best practices
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "TouristAttraction",
      "name": "Triple X Adventures Arctic Experience Center",
      "description": "Premium Arctic adventure experiences in Swedish Lapland featuring authentic snowmobile tours, dog sledding expeditions, northern lights viewing, ice fishing, and wilderness survival experiences.",
      "url": "https://triplexadventures.com",
      "image": [
        "https://triplexadventures.com/images/hero-winter.jpg",
        "https://triplexadventures.com/images/snowmobile-tour.jpg",
        "https://triplexadventures.com/images/dog-sledding.jpg",
        "https://triplexadventures.com/images/northern-lights.jpg"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Adventure Base Road 1",
        "addressLocality": "Kiruna",
        "addressRegion": "Norrbotten",
        "addressCountry": "SE",
        "postalCode": "981 00"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "67.8558",
        "longitude": "20.2253"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "20:00"
      },
      "touristType": ["Adventure Tourist", "Nature Lover", "Photography Enthusiast", "Cultural Explorer"],
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "Professional Guides",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Equipment Rental",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Transportation",
          "value": true
        }
      ],
      "publicAccess": true,
      "isAccessibleForFree": false,
      "currenciesAccepted": "SEK, EUR, USD",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer",
      "availableLanguage": ["English", "Swedish", "German", "French"],
      "tourBookingPage": "https://triplexadventures.com/booking",
      "hasMap": "https://goo.gl/maps/triplexadventures"
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Triple X Adventures",
      "image": "https://triplexadventures.com/images/logo.png",
      "priceRange": "$$$",
      "servesCuisine": "Local Arctic Cuisine",
      "hasMenu": "https://triplexadventures.com/restaurant"
    }
  ];

  return (
    <article className="font-opensans text-slate relative" itemScope itemType="https://schema.org/TouristAttraction">
      <SEO 
        title="Arctic Adventures in Swedish Lapland"
        description="Experience authentic Arctic adventures with Triple X Adventures. Premium snowmobile tours, dog sledding, northern lights expeditions, and wilderness experiences in Swedish Lapland. The Real Arctic Deal since 1995."
        keywords="Arctic adventures, Swedish Lapland, snowmobile tours, dog sledding, northern lights tours, aurora borealis, Kiruna, wilderness expeditions, ice fishing, Arctic wildlife, snow activities, winter adventures, Lapland tourism, Arctic Circle tours, husky sledding, snowshoeing, ice hotel, midnight sun, polar experiences, adventure tourism Sweden"
        structuredData={structuredData}
        ogImage="/images/hero-winter-optimized.jpg"
        additionalMetaTags={[
          {
            name: "geo.region",
            content: "SE-BD"
          },
          {
            name: "geo.placename",
            content: "Kiruna, Swedish Lapland"
          },
          {
            property: "business:contact_data:street_address",
            content: "Adventure Base Road 1"
          },
          {
            property: "business:contact_data:locality",
            content: "Kiruna"
          },
          {
            property: "business:contact_data:country_name",
            content: "Sweden"
          },
          {
            property: "business:contact_data:postal_code",
            content: "981 00"
          },
          {
            property: "business:contact_data:website",
            content: "https://triplexadventures.com"
          },
          {
            name: "ai:business_type",
            content: "Adventure Tourism Company"
          },
          {
            name: "ai:services",
            content: "Snowmobile tours, Dog sledding, Northern lights viewing, Ice fishing, Wilderness survival"
          },
          {
            name: "ai:location",
            content: "Arctic Circle, Swedish Lapland"
          }
        ]}
      />
      
      {/* Enhanced unified animated background with starry night effect */}
      <GlobalBackground intensity="high" starDensity="dense" />
      
      {/* Main content with appropriate z-index */}
      <div className="relative z-10">
        {/* Critical path section - load immediately */}
        <Header />
        
        {/* Back to Top button */}
        <BackToTop />
        
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
          
          {/* RestaurantSection removed per user request */}
          
          {/* AboutSection removed as it duplicates IntroductionSection content */}
          
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
          
          <Suspense fallback={<SectionLoader />}>
            {/* Temporarily commenting out BookingSection until it's implemented */}
            {/* <BookingSection /> */}
          </Suspense>
        </main>
        
        {/* Footer with site information and navigation */}
        <Footer />
      </div>
    </article>
  );
});

export default Home;

// Enable Static Site Generation with Incremental Static Regeneration
export async function getStaticProps() {
  // You can fetch any data needed for the home page here
  // For example, fetch testimonials, experiences, etc.
  
  return {
    props: {
      // Any props you want to pass to the Home component
    },
    // Revalidate every 60 seconds (1 minute)
    // Adjust this value based on how frequently your content changes
    revalidate: 60,
  };
}
