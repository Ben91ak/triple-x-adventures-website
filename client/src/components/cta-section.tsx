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
      {/* Using the global background - no need for section-specific background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 transform-gpu">
        {/* Simple glow effect to complement global background */}
        <div className="aurora-glow absolute inset-0 opacity-30"></div>
      </div>
      
      {/* Subtle image overlay that won't conflict with the global background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15 z-5 transform-gpu"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1517299321609-52687d1bc55a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80')"
        }}
      ></div>
      
      {/* Removed gradient overlay for consistency */}
      
      {/* Content */}
      <div className="relative z-50 container mx-auto px-4" style={{ zIndex: 50 }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8 inline-flex items-center justify-center">
            <span className="w-12 h-1 bg-accent-color rounded-full mr-3 transform-gpu"></span>
            <span className="text-accent-color uppercase text-sm tracking-wider font-medium text-shadow-sm">
              {language === 'de' ? 'Dein Abenteuer wartet' : language === 'sv' ? 'Ditt äventyr väntar' : 'Your Adventure Awaits'}
            </span>
            <span className="w-12 h-1 bg-accent-color rounded-full ml-3 transform-gpu"></span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-text via-accent-color to-primary-text text-shadow-lg">
            {content.title}
          </h2>
          
          <p className="text-lg md:text-xl text-secondary-text mb-10 text-shadow-sm">
            {content.description}
          </p>
          
          <div className="group relative inline-block transform-gpu">
            {/* Pulse effect - optimized with transform-gpu */}
            <span className="absolute inset-0 rounded-full bg-accent-color/20 animate-pulse group-hover:animate-none transition-opacity duration-300 transform-gpu"></span>
            
            <a 
              href="#contact" 
              className="glass-button inline-flex items-center gap-2 px-10 py-4 relative border border-accent-color/20 group-hover:border-accent-color/50 transition-colors duration-300 transform-gpu"
            >
              <span className="text-shadow-sm">{content.buttonText}</span>
              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
