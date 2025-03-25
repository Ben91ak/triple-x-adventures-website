import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";

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
    <section className="py-16 md:py-20 bg-forest text-white relative">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="font-montserrat font-bold text-3xl md:text-5xl mb-6">{content.title}</h2>
        <p className="text-lg max-w-2xl mx-auto mb-10 opacity-90">{content.description}</p>
        <a href="#contact" className="custom-button inline-block font-montserrat text-base uppercase bg-fire px-10 py-4 rounded tracking-wide font-semibold hover:bg-opacity-90 transition">
          {content.buttonText}
        </a>
      </div>
    </section>
  );
}
