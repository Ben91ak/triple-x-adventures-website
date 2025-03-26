import { Experience } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { WeatherWidget } from "@/components/ui/weather-widget";

// Experience data mapped by language
const experiencesByLanguage = {
  en: [
    {
      id: 1,
      title: "Snowmobile Adventure",
      description: "Experience the freedom on a snowmobile through the snowy wilderness of Swedish Lapland. Perfect for beginners and advanced riders alike.",
      price: 2495,
      image: "https://images.unsplash.com/photo-1604537466573-5e94508fd243?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tag: {
        text: "Bestseller",
        type: "bestseller" as "bestseller"
      }
    },
    {
      id: 2,
      title: "Husky Sledding Tour",
      description: "Lead your own dog sled team through the breathtaking Arctic wilderness. An unforgettable experience with friendly huskies.",
      price: 1895,
      image: "https://images.unsplash.com/photo-1517507654662-23d3b959c13e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Northern Lights Expedition",
      description: "Chase the magical Northern Lights with our experienced guides who know the best viewpoints. Includes warm drinks and snacks.",
      price: 1695,
      image: "https://images.unsplash.com/photo-1607287914173-70adb9a862e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Traditional Ice Fishing",
      description: "Learn the ancient techniques of ice fishing from our local guides and cook your catch over an open fire.",
      price: 995,
      image: "https://images.unsplash.com/photo-1606594689023-61c61cd7dc97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Sauna & Ice Bath Experience",
      description: "Enjoy an authentic Finnish sauna followed by an invigorating ice bath in the frozen lake. A true Nordic tradition.",
      price: 895,
      image: "https://images.unsplash.com/photo-1610566286375-a33f654dc875?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Arctic Survival Course",
      description: "Learn essential winter survival skills, including fire making, shelter building, and navigation in the wilderness.",
      price: 1295,
      image: "https://images.unsplash.com/photo-1517309530578-38066e4589e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tag: {
        text: "New",
        type: "new" as "new"
      }
    }
  ],
  de: [
    {
      id: 1,
      title: "Snowmobile Abenteuer",
      description: "Erleben Sie die Freiheit auf einem Schneemobil durch die verschneite Wildnis von Schwedisch-Lappland. Perfekt für Anfänger und Fortgeschrittene.",
      price: 2495,
      image: "https://images.unsplash.com/photo-1604537466573-5e94508fd243?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tag: {
        text: "Beliebt",
        type: "bestseller" as "bestseller"
      }
    },
    {
      id: 2,
      title: "Husky Schlittentour",
      description: "Führen Sie Ihr eigenes Hundeschlittenteam durch die atemberaubende arktische Wildnis. Ein unvergessliches Erlebnis mit freundlichen Huskies.",
      price: 1895,
      image: "https://images.unsplash.com/photo-1517507654662-23d3b959c13e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Polarlichter Expedition",
      description: "Jagen Sie das magische Nordlicht mit unseren erfahrenen Guides, die die besten Aussichtspunkte kennen. Inklusive warmer Getränke und Snacks.",
      price: 1695,
      image: "https://images.unsplash.com/photo-1607287914173-70adb9a862e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Traditionelles Eisangeln",
      description: "Erlernen Sie die alten Techniken des Eisangelns von unseren lokalen Führern und kochen Sie Ihren Fang über einem offenen Feuer.",
      price: 995,
      image: "https://images.unsplash.com/photo-1606594689023-61c61cd7dc97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Sauna & Eisbad Erlebnis",
      description: "Genießen Sie eine authentische finnische Sauna gefolgt von einem belebenden Eisbad im gefrorenen See. Eine echte nordische Tradition.",
      price: 895,
      image: "https://images.unsplash.com/photo-1610566286375-a33f654dc875?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Arktischer Survival Kurs",
      description: "Lernen Sie wichtige Überlebensfähigkeiten für den Winter, einschließlich Feuermachen, Unterbau und Navigation in der wilden Natur.",
      price: 1295,
      image: "https://images.unsplash.com/photo-1517309530578-38066e4589e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tag: {
        text: "Neu",
        type: "new" as "new"
      }
    }
  ],
  sv: [
    {
      id: 1,
      title: "Snöskoter Äventyr",
      description: "Upplev friheten på en snöskoter genom den snötäckta vildmarken i Svenska Lappland. Perfekt för nybörjare och erfarna åkare.",
      price: 2495,
      image: "https://images.unsplash.com/photo-1604537466573-5e94508fd243?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tag: {
        text: "Mest populär",
        type: "bestseller" as "bestseller"
      }
    },
    {
      id: 2,
      title: "Husky Slädhundstur",
      description: "Led ditt eget hundspann genom den hisnande arktiska vildmarken. En oförglömlig upplevelse med vänliga huskies.",
      price: 1895,
      image: "https://images.unsplash.com/photo-1517507654662-23d3b959c13e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Norrsken Expedition",
      description: "Jaga det magiska norrskenet med våra erfarna guider som känner till de bästa utsiktsplatserna. Inklusive varma drycker och snacks.",
      price: 1695,
      image: "https://images.unsplash.com/photo-1607287914173-70adb9a862e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Traditionellt Pimpelfiske",
      description: "Lär dig de gamla teknikerna för isfiske från våra lokala guider och laga din fångst över öppen eld.",
      price: 995,
      image: "https://images.unsplash.com/photo-1606594689023-61c61cd7dc97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Bastu & Isbad Upplevelse",
      description: "Njut av en autentisk finsk bastu följt av ett uppfriskande isbad i den frusna sjön. En äkta nordisk tradition.",
      price: 895,
      image: "https://images.unsplash.com/photo-1610566286375-a33f654dc875?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Arktisk Överlevnadskurs",
      description: "Lär dig grundläggande vinteröverlevnadskunskaper, inklusive att göra upp eld, bygga skydd och navigera i vildmarken.",
      price: 1295,
      image: "https://images.unsplash.com/photo-1517309530578-38066e4589e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tag: {
        text: "Ny",
        type: "new" as "new"
      }
    }
  ]
};

export function ExperiencesSection() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  
  // Get experiences based on the current language
  const experiences: Experience[] = experiencesByLanguage[language];

  return (
    <section id="pakete" className="py-16 md:py-28 relative overflow-hidden premium-dark-gradient">
      {/* Northern lights glow effect - enhanced and optimized for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 transform-gpu">
        {/* Main aurora glow */}
        <div className="aurora-glow absolute inset-0 opacity-20 transform-gpu will-change-transform will-change-opacity"></div>
        
        {/* Aurora pillars - optimized with transform-gpu for better performance */}
        <div className="aurora-pillar absolute h-full w-16 left-1/4 bg-gradient-to-t from-transparent via-accent-color/5 to-transparent animate-aurora-slow transform-gpu will-change-transform"></div>
        <div className="aurora-pillar absolute h-full w-24 left-2/3 bg-gradient-to-t from-transparent via-accent-color/10 to-transparent animate-aurora-medium transform-gpu will-change-transform"></div>
        
        {/* Additional top glow */}
        <div className="absolute inset-0 transform-gpu">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-accent-color/5 to-transparent opacity-30 transform-gpu"></div>
        </div>
        
        {/* Stars background effect - added for more depth */}
        <div className="stars absolute inset-0 z-1 opacity-40 transform-gpu will-change-opacity"></div>
      </div>
      
      {/* Subtle pattern overlay - optimized with transform-gpu */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wNCIgZmlsbC1ydWxlPSJub256ZXJvIj48cGF0aCBkPSJNMjkgNTguNWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1em0wIDFhNi41IDYuNSAwIDEgMCAwIDEzIDYuNSA2LjUgMCAwIDAgMC0xM3ptMS0uMDg3YTcuNSA3LjUgMCAxIDEgMCAxNSA3LjUgNy41IDAgMCAxIDAtMTV6TTIwIDU5LjVhNy41IDcuNSAwIDEgMSAwIDE1IDcuNSA3LjUgMCAwIDEgMC0xNXptMCAxYTYuNSA2LjUgMCAxIDAgMCAxMyA2LjUgNi41IDAgMCAwIDAtMTN6bTAtMWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1eiIvPjwvZz48L2c+PC9zdmc+')]  opacity-60 pointer-events-none transform-gpu"></div>
      
      {/* Background with enhanced diagonal gradient - optimized with transform-gpu */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-card-bg/80 to-dark-bg opacity-95 z-0 transform-gpu"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div className="text-center md:text-left mb-8 md:mb-0">
            <span className="inline-block text-accent-color text-sm font-medium tracking-wider uppercase mb-2">
              {language === 'de' ? 'Unsere Erlebnisse' : language === 'sv' ? 'Våra Upplevelser' : 'Our Experiences'}
            </span>
            <h2 className="font-bold text-3xl md:text-5xl mb-6 text-white">
              {t.experiences.title}
            </h2>
            <p className="text-lg md:max-w-2xl text-white text-opacity-80">
              {t.experiences.subtitle}
            </p>
          </div>
          
          {/* Weather widget */}
          <div className="w-full md:w-auto">
            <WeatherWidget className="w-full md:w-64" location="Kiruna,se" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience) => (
            <div 
              key={experience.id} 
              className="group relative transition-all duration-300 hover:translate-y-[-5px] transform-gpu"
            >
              {/* Card background glow effect - optimized with reduced blur and transform-gpu */}
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-color/20 to-transparent rounded-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300 blur-md transform-gpu will-change-opacity"></div>
              
              <div className="glass-card relative z-10 overflow-hidden bg-card-bg/70 backdrop-blur-md border border-white/20 rounded-xl hover:shadow-lg hover:border-accent-color/30 hover:shadow-accent-color/10 transition-all duration-300 transform-gpu">
                <div className="relative h-64 overflow-hidden">
                  {/* Image with overlay */}
                  <img 
                    src={experience.image} 
                    alt={experience.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                  
                  {/* Price tag */}
                  <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-accent-color/30">
                    <span className="font-semibold text-white">{experience.price.toLocaleString()} SEK</span>
                  </div>
                  
                  {/* Bestseller/New tag */}
                  {experience.tag && (
                    <div className="absolute top-4 left-4">
                      <span 
                        className={`inline-block px-3 py-1.5 rounded-full text-xs uppercase font-semibold tracking-wide backdrop-blur-sm ${
                          experience.tag.type === 'bestseller' 
                            ? 'bg-success-color/90 text-white' 
                            : 'bg-accent-color/90 text-white'
                        }`}
                      >
                        {experience.tag.text}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-3 text-white group-hover:text-accent-color transition-colors">
                    {experience.title}
                  </h3>
                  <p className="mb-5 text-white text-opacity-80 text-sm">
                    {experience.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs text-white text-opacity-70">
                        {language === 'de' ? 'Ab' : language === 'sv' ? 'Från' : 'From'}
                      </span>
                    </div>
                    <a 
                      href="#contact" 
                      className="inline-flex items-center gap-1.5 text-accent-color hover:text-white transition-colors font-medium text-sm"
                    >
                      {language === 'de' ? 'Details ansehen' : language === 'sv' ? 'Visa detaljer' : 'View details'}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <a 
            href="#contact" 
            className="btn-primary inline-flex items-center justify-center gap-2 font-medium text-sm uppercase tracking-wide"
          >
            {language === 'de' ? 'Anfrage Senden' : language === 'sv' ? 'Skicka Förfrågan' : 'Send Inquiry'}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17l9.2-9.2M17 17V7H7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}