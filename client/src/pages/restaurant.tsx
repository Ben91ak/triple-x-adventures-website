import { Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { GlobalBackground } from "@/components/layout/background-fixed";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
// Restaurant section removed per user request
import { CTASection } from "@/components/cta-section";
import SectionLoader from "../components/ui/section-loader";
import { optimizePageImages } from "@/utils/performance-optimizer";

export default function RestaurantPage() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  // Run image optimization when component mounts
  useEffect(() => {
    optimizePageImages();
  }, [language]);

  return (
    <div className="font-opensans text-slate relative">
      <Helmet>
        <title>{`${t.restaurant.title} | Triple X Adventures`}</title>
        <meta name="description" content={t.restaurant.subtitle} />
        <meta property="og:title" content={`${t.restaurant.title} | Triple X Adventures`} />
        <meta property="og:description" content={t.restaurant.subtitle} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Enhanced unified animated background with starry night effect */}
      <GlobalBackground intensity="medium" starDensity="medium" />
      
      {/* Main content with appropriate z-index */}
      <div className="relative z-10">
        <Header />
        
        <main className="pt-24 md:pt-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t.restaurant?.title || 'Restaurant'}
            </h2>
            <p className="text-slate-200 mb-6 max-w-2xl mx-auto">
              Restaurant section has been removed per user request.
            </p>
          </div>
          
          <Suspense fallback={<SectionLoader />}>
            <CTASection />
          </Suspense>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}