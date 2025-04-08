import { useState, useEffect } from 'react';
import { Link } from "wouter";
import { LanguageSelector } from "@/components/ui/language-selector";
import { Menu, X, ChevronRight } from "lucide-react";
import { useTranslation } from "@/translations";
import { Footer } from "@/components/layout/footer";
import { AdventureMap } from "@/components/adventure-map";
import { GlobalBackground } from "@/components/layout/background-fixed";
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { adventureLocations } from '@/data/adventureLocations';

// Custom header component for the map page that correctly links back to home page
function MapHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language } = useLanguage();
  const t = useTranslation(language);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (mobileMenuOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.mobile-menu') && !target.closest('button[aria-label="Toggle mobile menu"]')) {
          setMobileMenuOpen(false);
        }
      };
      
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`fixed w-full z-[90] transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-dark-bg/95 shadow-md shadow-black/10 border-b border-white/5' 
          : 'py-5 bg-gradient-to-b from-black/80 to-transparent'
      }`} 
      id="navbar"
    >
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      
      <nav className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center relative z-20">
              <Link href="/" className="flex-shrink-0 flex items-center group">
                <div className="relative">
                  {/* Logo glow effect */}
                  <div className="absolute -inset-2 rounded-lg bg-accent-color/20 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Logo */}
                  <div className="relative overflow-hidden h-10 transition-all">
                    <img 
                      src="/logo.png" 
                      alt="Triple X Adventures" 
                      className="h-10 object-contain" 
                    />
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Desktop Navigation - using full URLs with hash for home page sections */}
            <div className="hidden lg:flex items-center relative z-20">
              <div className="mr-6 flex items-center flex-wrap justify-center">
                {[
                  { href: "/", label: t.nav.home },
                  { href: "/#about", label: t.nav.about },
                  { href: "/#pakete", label: t.nav.packages },
                  { href: "/#package-builder", label: "Build Your Adventure" },
                  { href: "/#accommodations", label: t.nav.accommodations },
                  { href: "/adventure-map", label: language === 'en' ? "Adventure Map" : language === 'de' ? "Abenteuerkarte" : "Äventyrskarta" },
                  // Gallery section removed per request to improve performance
                  { href: "/#contact", label: t.nav.contact }
                ].map((item, index) => (
                  <Link 
                    key={index}
                    href={item.href} 
                    className="relative px-2 lg:px-4 py-2 text-xs lg:text-sm tracking-wide font-medium text-white whitespace-nowrap transition-all duration-200 hover:text-accent-color rounded-md hover:bg-white/5"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              
              <div className="pl-4 border-l border-white/10">
                <LanguageSelector />
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-3 relative z-20">
              <LanguageSelector className="mr-1" />
              <button 
                type="button" 
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-card-bg/50 border border-white/5 hover:bg-card-bg hover:border-white/10 transition-colors"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? (
                  <X size={18} className="text-accent-color" />
                ) : (
                  <Menu size={18} className="text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu with animation - much higher z-index and positioned overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-dark-bg/80 backdrop-blur-lg z-[100]" onClick={() => setMobileMenuOpen(false)}></div>
        )}
        <div 
          className={`mobile-menu lg:hidden overflow-hidden transition-all duration-300 ease-in-out fixed top-20 left-0 right-0 z-[101] px-4 ${
            mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          style={{ pointerEvents: mobileMenuOpen ? 'auto' : 'none' }}
        >
          <div className="py-5 mx-auto max-w-md rounded-xl space-y-1 bg-dark-bg border border-white/10 shadow-2xl">
            {[
              { href: "/", label: t.nav.home },
              { href: "/#about", label: t.nav.about },
              { href: "/#pakete", label: t.nav.packages },
              { href: "/#package-builder", label: "Build Your Adventure" },
              { href: "/#accommodations", label: t.nav.accommodations },
              { href: "/adventure-map", label: language === 'en' ? "Adventure Map" : language === 'de' ? "Abenteuerkarte" : "Äventyrskarta" },
              // Gallery section removed per request to improve performance
              { href: "/#contact", label: t.nav.contact }
            ].map((item, index) => (
              <Link 
                key={index}
                href={item.href} 
                className="block px-4 py-3 rounded-lg hover:bg-accent-color/10 text-white hover:text-accent-color group transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileMenuOpen(false);
                }}
              >
                <div className="flex items-center">
                  <ChevronRight 
                    size={18} 
                    className="mr-3 text-accent-color group-hover:translate-x-1 transition-transform" 
                  />
                  <span className="font-medium text-base">{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

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
      {/* Enhanced starry night background with blue color scheme */}
      <GlobalBackground intensity="high" colorScheme="blue" starDensity="dense" />
      
      {/* Main content with appropriate z-index */}
      <div className="relative z-10">
        <MapHeader />
        
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