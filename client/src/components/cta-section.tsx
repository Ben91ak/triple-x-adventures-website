import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/use-translation";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  const { language } = useLanguage();
  const { t } = useTranslation();

  return (
    <section id="cta" className="py-24 md:py-32 relative overflow-hidden">
      {/* Using global background without additional overlays */}
      
      {/* Content */}
      <div className="relative container mx-auto px-4" style={{ zIndex: 10 }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8 inline-flex items-center justify-center">
            <span className="w-12 h-1 bg-accent-color rounded-full mr-3 transform-gpu"></span>
            <span className="text-accent-color uppercase text-sm tracking-wider font-medium text-shadow-sm">
              {t('ctaSection.adventureAwaits')}
            </span>
            <span className="w-12 h-1 bg-accent-color rounded-full ml-3 transform-gpu"></span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white text-shadow-lg" style={{ textShadow: '0 4px 8px rgba(0, 0, 0, 0.9)' }}>
            {t('ctaSection.title')}
          </h2>
          
          <p className="text-lg md:text-xl text-white mb-10 text-shadow-sm" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' }}>
            {t('ctaSection.description')}
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
              <span className="text-shadow-sm relative z-10">{t('ctaSection.buttonText')}</span>
              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
