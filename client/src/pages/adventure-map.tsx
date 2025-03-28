import { useEffect } from 'react';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AdventureMap } from "@/components/adventure-map";
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { adventureLocations } from '@/data/adventureLocations';

export default function AdventureMapPage() {
  const { language } = useLanguage();
  
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Setup animations for page elements
  const { ref: headerRef, isVisible: headerInView } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true
  });

  const { ref: mapRef, isVisible: mapInView } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true
  });
  
  // Translations
  const translations = {
    pageTitle: {
      en: "Adventure Map",
      de: "Abenteuerkarte",
      sv: "Äventyrskarta"
    },
    pageSubtitle: {
      en: "Explore the Arctic wilderness with our interactive map",
      de: "Erkunden Sie die arktische Wildnis mit unserer interaktiven Karte",
      sv: "Utforska den arktiska vildmarken med vår interaktiva karta"
    },
    locationCount: {
      en: "Discover all",
      de: "Entdecken Sie alle",
      sv: "Upptäck alla"
    },
    locationsText: {
      en: "adventure locations",
      de: "Abenteuerorte",
      sv: "äventyrsplatser"
    },
    description: {
      en: "Our adventure map showcases all the incredible locations where we offer our premium Arctic experiences. From the best Northern Lights viewing spots to our luxury accommodations and thrilling activity sites, this interactive guide will help you visualize your ultimate Swedish Lapland journey.",
      de: "Unsere Abenteuerkarte zeigt alle unglaublichen Orte, an denen wir unsere erstklassigen arktischen Erlebnisse anbieten. Von den besten Aussichtspunkten für Nordlichter bis hin zu unseren Luxusunterkünften und aufregenden Aktivitätsorten - dieser interaktive Führer hilft Ihnen, Ihre ultimative Reise durch Schwedisch-Lappland zu visualisieren.",
      sv: "Vår äventyrskarta visar alla otroliga platser där vi erbjuder våra förstklassiga arktiska upplevelser. Från de bästa platserna för att se norrsken till våra lyxiga boenden och spännande aktivitetsplatser - denna interaktiva guide hjälper dig att visualisera din ultimata resa genom svenska Lappland."
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Northern lights-inspired background effect */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 via-purple-900/20 to-gray-950" />
            <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3)_0%,rgba(0,0,0,0)_60%)]" />
            <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_70%_60%,rgba(78,152,235,0.2)_0%,rgba(0,0,0,0)_60%)]" />
          </div>
          
          <div 
            ref={headerRef}
            className={`relative z-10 max-w-5xl mx-auto text-center transition-all duration-1000 ease-out ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              {translations.pageTitle[language]}
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-8">
              {translations.pageSubtitle[language]}
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 backdrop-blur-sm rounded-full text-blue-200 mb-12">
              <span className="font-semibold">{translations.locationCount[language]}</span>
              <span className="mx-2 text-2xl font-bold text-white">{adventureLocations.length}</span>
              <span>{translations.locationsText[language]}</span>
            </div>
            <p className="max-w-3xl mx-auto text-gray-300 text-lg">
              {translations.description[language]}
            </p>
          </div>
        </section>
        
        {/* Map section */}
        <section 
          ref={mapRef}
          className={`py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto transition-all duration-1000 ease-out ${mapInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <AdventureMap />
          
          <div className="mt-8 p-4 bg-gray-900/40 backdrop-blur-sm rounded-lg border border-white/10">
            <p className="text-sm text-gray-400">
              {language === 'en' ? 'Click on any marker to learn more about the location. The color indicates the type of location: green for accommodations, blue for experiences, and purple for natural landmarks.' : 
               language === 'de' ? 'Klicken Sie auf einen beliebigen Marker, um mehr über den Ort zu erfahren. Die Farbe gibt die Art des Ortes an: Grün für Unterkünfte, Blau für Erlebnisse und Lila für natürliche Wahrzeichen.' :
               'Klicka på en markör för att lära dig mer om platsen. Färgen indikerar typen av plats: grön för boenden, blå för upplevelser och lila för naturliga landmärken.'}
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}