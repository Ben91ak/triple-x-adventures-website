import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";

// Section content by language
const contentByLanguage = {
  en: {
    title: "ARCTIC MOMENTS",
    subtitle: "Glimpses of the adventures that await you in Swedish Lapland",
    viewGalleryLink: "View Full Gallery"
  },
  de: {
    title: "ARKTISCHE MOMENTE",
    subtitle: "Einblicke in die Abenteuer, die in Schwedisch-Lappland auf Sie warten",
    viewGalleryLink: "Vollständige Galerie ansehen"
  },
  sv: {
    title: "ARKTISKA ÖGONBLICK",
    subtitle: "Glimtar av äventyren som väntar dig i Svenska Lappland",
    viewGalleryLink: "Visa hela galleriet"
  }
};

export function GallerySection() {
  const { language } = useLanguage();
  
  // Get content based on the current language
  const content = contentByLanguage[language];

  return (
    <section id="gallery" className="py-24 md:py-32 relative overflow-hidden">
      {/* Using the global background - no section-specific background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none transform-gpu" style={{ zIndex: 1 }}>
        {/* Enhanced aurora effect for better visibility */}
        <div className="aurora-glow-strong absolute inset-0 opacity-30"></div>
      </div>
      
      {/* Subtle pattern overlay - optimized with transform-gpu */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wNCIgZmlsbC1ydWxlPSJub256ZXJvIj48cGF0aCBkPSJNMjkgNTguNWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1em0wIDFhNi41IDYuNSAwIDEgMCAwIDEzIDYuNSA2LjUgMCAwIDAgMC0xM3ptMS0uMDg3YTcuNSA3LjUgMCAxIDEgMCAxNSA3LjUgNy41IDAgMCAxIDAtMTV6TTIwIDU5LjVhNy41IDcuNSAwIDEgMSAwIDE1IDcuNSA3LjUgMCAwIDEgMC0xNXptMCAxYTYuNSA2LjUgMCAxIDAgMCAxMyA2LjUgNi41IDAgMCAwIDAtMTN6bTAtMWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1eiIvPjwvZz48L2c+PC9zdmc+')]  opacity-60 pointer-events-none transform-gpu" style={{ zIndex: 2 }}></div>
      
      <div className="container mx-auto px-4 relative" style={{ zIndex: 10 }}>
        <div className="text-center mb-16">
          <span className="inline-block text-accent-color text-sm font-medium tracking-wider uppercase mb-2">
            {language === 'de' ? 'Galerie' : language === 'sv' ? 'Galleri' : 'Gallery'}
          </span>
          <h2 className="font-bold text-3xl md:text-5xl mb-6 text-white">
            {content.title}
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-white text-opacity-80">
            {content.subtitle}
          </p>
          <p className="text-white text-opacity-80 mt-8">
            {language === 'de' ? 'Galerie in Wartung.' : language === 'sv' ? 'Galleri under underhåll.' : 'Gallery under maintenance.'}
          </p>
        </div>
      </div>
    </section>
  );
}