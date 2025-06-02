import { Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { GlobalBackground } from "@/components/layout/background-fixed";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ContactSection } from "@/components/contact-section";
import SectionLoader from "../components/ui/section-loader";
import { optimizePageImages } from "@/utils/performance-optimizer";

// Helper function to safely access translations with fallbacks
const getTranslationWithFallback = (
  translation: any,
  path: string,
  fallback: string
): string => {
  return path.includes('.') ? 
    path.split('.').reduce((obj, key) => obj?.[key], translation) || fallback :
    translation?.contact?.[path] || fallback;
};

export default function ContactPage() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  // Run image optimization when component mounts
  useEffect(() => {
    optimizePageImages();
  }, [language]);

  return (
    <div className="font-opensans text-slate relative">
      <Helmet>
        <title>{`${getTranslationWithFallback(t, 'contact.title', 'Contact Us')} | Triple X Adventures`}</title>
        <meta name="description" content={getTranslationWithFallback(t, 'contact.subtitle', 'Contact Triple X Adventures for your next adventure in Swedish Lapland')} />
        <meta property="og:title" content={`${getTranslationWithFallback(t, 'contact.title', 'Contact Us')} | Triple X Adventures`} />
        <meta property="og:description" content={getTranslationWithFallback(t, 'contact.subtitle', 'Contact Triple X Adventures for your next adventure in Swedish Lapland')} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Enhanced unified animated background with starry night effect */}
      <GlobalBackground intensity="low" starDensity="medium" />
      
      {/* Main content with appropriate z-index */}
      <div className="relative z-10">
        <Header />
        
        <main className="pt-24 md:pt-32">
          <Suspense fallback={<SectionLoader />}>
            <ContactSection />
          </Suspense>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}