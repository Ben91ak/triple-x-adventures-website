import { useEffect } from 'react';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AdventureMap } from "@/components/adventure-map";
import { GlobalBackground } from "@/components/layout/background-fixed";
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { adventureLocations } from '@/data/adventureLocations';

export default function AdventureMapPage() {
  const { language } = useLanguage();
  
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Setup animations for page elements with better defaults
  const { ref: headerRef, isVisible: headerInView } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
    initiallyVisible: true // Always show immediately
  });

  const { ref: mapRef, isVisible: mapInView } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
    animationDelay: 300 // Slight delay for staggered effect
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
      en: "Our adventure map showcases all the incredible locations in and around Arvidsjaur where we offer our premium Arctic experiences. From our main office at Storgatan 6F to Sameland restaurant and cabins at Karlavagnen 1, and our premium accommodations at Hotel Laponia - this interactive guide will help you visualize your ultimate Swedish Lapland journey.",
      de: "Unsere Abenteuerkarte zeigt alle unglaublichen Orte in und um Arvidsjaur, an denen wir unsere erstklassigen arktischen Erlebnisse anbieten. Von unserem Hauptbüro in der Storgatan 6F bis zum Sameland Restaurant und den Hütten in der Karlavagnen 1 und unseren Premium-Unterkünften im Hotel Laponia - dieser interaktive Führer hilft Ihnen, Ihre ultimative Reise durch Schwedisch-Lappland zu visualisieren.",
      sv: "Vår äventyrskarta visar alla otroliga platser i och runt Arvidsjaur där vi erbjuder våra förstklassiga arktiska upplevelser. Från vårt huvudkontor på Storgatan 6F till Sameland restaurang och stugor på Karlavagnen 1, och våra förstklassiga boenden på Hotel Laponia - denna interaktiva guide hjälper dig att visualisera din ultimata resa genom svenska Lappland."
    }
  };

  return (
    <div className="min-h-screen font-sans text-primary-text relative">
      {/* Unified animated background for the entire page */}
      <GlobalBackground />
      
      {/* Main content with appropriate z-index */}
      <div className="relative z-10">
        <Header />
        
        <main>
          {/* Hero section */}
          <section className="relative flex items-center justify-center text-primary-text pt-16 pb-12 overflow-hidden">
            {/* TOP LAYER - Content */}
            <div className="container mx-auto px-4 relative py-12 transform-gpu" style={{ zIndex: 50 }}>
              {/* Hero Content with animated entrance - optimized for performance */}
              <div className="text-center max-w-4xl mx-auto transform-gpu">
                <div
                  ref={headerRef}
                  className="transform-gpu"
                >
                  <div 
                    className={`mb-3 text-white text-sm font-medium tracking-wider uppercase text-shadow-lg fade-in transform-gpu ${headerInView ? 'visible' : ''}`}
                    style={{ color: '#FFFFFF', textShadow: '0 4px 8px rgba(0, 0, 0, 0.9)' }}
                  >
                    {language === 'en' ? 'INTERACTIVE' : language === 'de' ? 'INTERAKTIVE' : 'INTERAKTIV'}
                  </div>
                  
                  <h1 
                    className={`font-bold text-4xl sm:text-5xl md:text-6xl mb-4 tracking-tight fade-in transform-gpu ${headerInView ? 'visible' : ''}`}
                    style={{ 
                      color: '#FFFFFF', 
                      textShadow: '0 4px 8px rgba(0, 0, 0, 0.9)',
                      WebkitTextStroke: '1px rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {translations.pageTitle[language]}
                  </h1>
                  
                  <p 
                    className={`text-xl md:text-2xl text-white mb-6 text-shadow-md fade-in transform-gpu ${headerInView ? 'visible' : ''}`}
                    style={{ color: '#FFFFFF', textShadow: '0 4px 8px rgba(0, 0, 0, 0.9)' }}
                  >
                    {translations.pageSubtitle[language]}
                  </p>
                  
                  <div 
                    className={`glass-card p-4 sm:p-6 mb-6 inline-flex items-center backdrop-blur-sm fade-in scale-up transform-gpu ${headerInView ? 'visible' : ''}`}
                    style={{ backgroundColor: 'rgba(26, 29, 31, 0.7)' }}
                  >
                    <span className="font-semibold">{translations.locationCount[language]}</span>
                    <span className="mx-2 text-2xl font-bold text-accent-color">{adventureLocations.length}</span>
                    <span>{translations.locationsText[language]}</span>
                  </div>
                  
                  <div 
                    className={`glass-card p-4 sm:p-6 md:p-8 mb-8 max-w-3xl mx-auto text-left shadow-xl fade-in scale-up transform-gpu ${headerInView ? 'visible' : ''}`}
                    style={{ backgroundColor: 'rgba(26, 29, 31, 0.7)', backdropFilter: 'blur(8px)' }}
                  >
                    <p 
                      className="mb-0 text-white text-sm md:text-base leading-relaxed transform-gpu"
                    >
                      {translations.description[language]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Map section */}
          <section 
            ref={mapRef}
            className={`py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative fade-in transform-gpu ${mapInView ? 'visible' : ''}`}
          >
            {/* Background glow effect for map section */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[600px] aurora-glow opacity-30 pointer-events-none z-0"></div>
            
            <AdventureMap />
            
            <div className="mt-8 glass-card p-4 backdrop-blur-sm border border-white/10 shadow-lg">
              <p className="text-sm text-secondary-text">
                {language === 'en' ? 'Click on any marker to learn more about the location. The color indicates the type of location: green for accommodations, blue for experiences, and purple for points of interest.' : 
                 language === 'de' ? 'Klicken Sie auf einen beliebigen Marker, um mehr über den Ort zu erfahren. Die Farbe gibt die Art des Ortes an: Grün für Unterkünfte, Blau für Erlebnisse und Lila für Sehenswürdigkeiten.' :
                 'Klicka på en markör för att lära dig mer om platsen. Färgen indikerar typen av plats: grön för boenden, blå för upplevelser och lila för intressepunkter.'}
              </p>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}