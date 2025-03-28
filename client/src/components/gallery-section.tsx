import { GalleryImage } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { Camera, ExternalLink } from "lucide-react";

// Gallery data by language
const galleryImagesByLanguage = {
  en: [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1518453047662-8a8d3ffb8c8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      alt: "Northern lights over snowy landscape"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1604537466573-5e94508fd243?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      alt: "Snowmobiling through forest"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1517507654662-23d3b959c13e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      alt: "Dog sledding team"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      alt: "Winter cabin in snow"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      alt: "Cozy fireplace"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1628105541664-ae6ee9dec166?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      alt: "Arctic landscape"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1609081214573-e409272dcd51?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      alt: "Traditional food"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1522775417749-4471cce3631b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      alt: "Husky dogs"
    }
  ],
  de: [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1518453047662-8a8d3ffb8c8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      alt: "Nordlichter über verschneiter Landschaft"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1604537466573-5e94508fd243?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      alt: "Schneemobilfahrt durch den Wald"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1517507654662-23d3b959c13e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      alt: "Hundeschlittenteam"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      alt: "Winterhütte im Schnee"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      alt: "Gemütliches Kaminfeuer"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1628105541664-ae6ee9dec166?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      alt: "Arktische Landschaft"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1609081214573-e409272dcd51?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      alt: "Traditionelles Essen"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1522775417749-4471cce3631b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      alt: "Husky-Hunde"
    }
  ],
  sv: [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1518453047662-8a8d3ffb8c8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      alt: "Norrsken över snöigt landskap"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1604537466573-5e94508fd243?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      alt: "Snöskoter genom skogen"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1517507654662-23d3b959c13e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      alt: "Hundspannsteam"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      alt: "Vinterstuga i snö"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      alt: "Mysig öppen spis"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1628105541664-ae6ee9dec166?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      alt: "Arktiskt landskap"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1609081214573-e409272dcd51?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      alt: "Traditionell mat"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1522775417749-4471cce3631b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      alt: "Huskyhundar"
    }
  ]
};

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
  
  // Get content and gallery images based on the current language
  const content = contentByLanguage[language];
  const galleryImages: GalleryImage[] = galleryImagesByLanguage[language];

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
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 max-w-6xl mx-auto">
          {galleryImages.map((image) => (
            <div 
              key={image.id} 
              className="group relative transition-all duration-300 hover:translate-y-[-5px] transform-gpu"
            >
              {/* Card background glow effect - optimized with reduced blur and transform-gpu */}
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-color/20 to-transparent rounded-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300 blur-md transform-gpu will-change-opacity"></div>
              
              <div className="glass-card relative z-10 overflow-hidden rounded-xl bg-card-bg/40 backdrop-blur-md border border-white/10 hover:border-accent-color/30 transition-all duration-300 transform-gpu">
                {/* Hover overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-4 z-10">
                  <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    {image.alt}
                  </span>
                </div>
                
                {/* Pulse effect on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
                  <div className="w-12 h-12 rounded-full bg-accent-color/20 backdrop-blur-md border border-accent-color/30 flex items-center justify-center transform-gpu scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Camera className="text-accent-color" size={20} />
                  </div>
                </div>
                
                {/* Image with scale effect */}
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-60 md:h-64 object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-accent-color hover:text-accent-hover font-medium border-b border-accent-color/30 hover:border-accent-color pb-1 transition-all duration-300"
          >
            {content.viewGalleryLink} 
            <ExternalLink size={16} className="opacity-70" />
          </a>
        </div>
      </div>
    </section>
  );
}