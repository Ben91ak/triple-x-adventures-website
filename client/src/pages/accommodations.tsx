import { Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { GlobalBackground } from "@/components/layout/background-fixed";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AccommodationsSection } from "@/components/accommodations-section";
import { CTASection } from "@/components/cta-section";
import SectionLoader from "../components/ui/section-loader";
import { optimizePageImages } from "@/utils/performance-optimizer";

export default function AccommodationsPage() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  // Run image optimization when component mounts
  useEffect(() => {
    optimizePageImages();
  }, [language]);

  return (
    <div className="font-opensans text-slate relative">
      <Helmet>
        <title>{`${t.accommodations.title} | Triple X Adventures`}</title>
        <meta name="description" content={t.accommodations.subtitle} />
        <meta property="og:title" content={`${t.accommodations.title} | Triple X Adventures`} />
        <meta property="og:description" content={t.accommodations.subtitle} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Enhanced unified animated background with starry night effect */}
      <GlobalBackground intensity="medium" starDensity="medium" />
      
      {/* Main content with appropriate z-index */}
      <div className="relative z-10">
        <Header />
        
        <main className="pt-24 md:pt-32">
          <Suspense fallback={<SectionLoader />}>
            <AccommodationsSection />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <CTASection />
          </Suspense>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}