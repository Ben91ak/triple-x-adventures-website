import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { ArrowRight } from "lucide-react";

// CTA content by language
const ctaContentByLanguage = {
  en: {
    title: "READY FOR A REAL ARCTIC ADVENTURE?",
    description: "Join us in Swedish Lapland for an experience that goes beyond tourism—a journey that will stay with you forever.",
    buttonText: "Let's Make Winter Legendary"
  },
  de: {
    title: "BEREIT FÜR EIN ECHTES ARKTISCHES ABENTEUER?",
    description: "Begleiten Sie uns nach Schwedisch-Lappland für ein Erlebnis, das über Tourismus hinausgeht – eine Reise, die für immer bei Ihnen bleiben wird.",
    buttonText: "Machen wir den Winter legendär"
  },
  sv: {
    title: "REDO FÖR ETT ÄKTA ARKTISKT ÄVENTYR?",
    description: "Följ med oss till Svenska Lappland för en upplevelse som går bortom turism – en resa som kommer att stanna hos dig för alltid.",
    buttonText: "Låt oss göra vintern legendarisk"
  }
};

export function CTASection() {
  const { language } = useLanguage();
  
  // Get content based on the current language
  const content = ctaContentByLanguage[language];

  return (
    <section id="cta" className="py-24 md:py-32 relative overflow-hidden">
      {/* Using the global background - no section-specific background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none transform-gpu" style={{ zIndex: 1 }}>
        {/* Enhanced aurora effect for better visibility instead of image */}
        <div className="aurora-glow-strong absolute inset-0 opacity-50"></div>
      </div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4" style={{ zIndex: 10 }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8 inline-flex items-center justify-center">
            <span className="w-12 h-1 bg-accent-color rounded-full mr-3 transform-gpu"></span>
            <span className="text-accent-color uppercase text-sm tracking-wider font-medium text-shadow-sm">
              {language === 'de' ? 'Dein Abenteuer wartet' : language === 'sv' ? 'Ditt äventyr väntar' : 'Your Adventure Awaits'}
            </span>
            <span className="w-12 h-1 bg-accent-color rounded-full ml-3 transform-gpu"></span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white text-shadow-lg" style={{ textShadow: '0 4px 8px rgba(0, 0, 0, 0.9)' }}>
            {content.title}
          </h2>
          
          <p className="text-lg md:text-xl text-white mb-10 text-shadow-sm" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' }}>
            {content.description}
          </p>
          
          <div className="group relative inline-block transform-gpu overflow-hidden rounded-lg">
            {/* Northern Lights static gradient overlay (always visible) */}
            <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-[rgba(45,212,191,0.1)] via-[rgba(74,222,128,0.15)] to-[rgba(56,189,248,0.1)]"></span>
            
            {/* Northern Lights animated gradient - visible on hover */}
            <span 
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(90deg, rgba(74,222,128,0.3), rgba(74,222,128,0.6), rgba(45,212,191,0.5), rgba(74,222,128,0.3))',
                backgroundSize: '300% 100%',
                animation: 'aurora 3s ease infinite'
              }}
            ></span>
            
            <a 
              href="#contact" 
              className="glass-button inline-flex items-center gap-2 px-10 py-4 relative transition-all duration-300 transform-gpu z-10"
              style={{
                boxShadow: '0 0 0 1px rgba(164, 210, 51, 0.6)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 1px rgba(164, 210, 51, 0), 0 0 12px 2px rgba(164, 210, 51, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 1px rgba(164, 210, 51, 0.6)';
              }}
            >
              <span className="text-shadow-sm relative z-10">{content.buttonText}</span>
              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
