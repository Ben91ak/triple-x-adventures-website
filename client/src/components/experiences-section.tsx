import { Experience } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";

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
    <section id="pakete" className="py-16 md:py-28 relative overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg to-card-bg"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-accent-color text-sm font-medium tracking-wider uppercase mb-2">
            {language === 'de' ? 'Unsere Erlebnisse' : language === 'sv' ? 'Våra Upplevelser' : 'Our Experiences'}
          </span>
          <h2 className="font-bold text-3xl md:text-5xl mb-6 text-primary-text">
            {t.experiences.title}
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-secondary-text">
            {t.experiences.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience) => (
            <div 
              key={experience.id} 
              className="card group transition-all duration-300 hover:shadow-lg hover:shadow-accent-color/10 hover:translate-y-[-5px]"
            >
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
                <div className="absolute top-4 right-4 bg-card-bg/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-divider-color">
                  <span className="font-semibold text-primary-text">{experience.price.toLocaleString()} SEK</span>
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
                <h3 className="font-bold text-xl mb-3 text-primary-text group-hover:text-accent-color transition-colors">
                  {experience.title}
                </h3>
                <p className="mb-5 text-secondary-text text-sm">
                  {experience.description}
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs opacity-70">
                      {language === 'de' ? 'Ab' : language === 'sv' ? 'Från' : 'From'}
                    </span>
                  </div>
                  <a 
                    href="#contact" 
                    className="inline-flex items-center gap-1.5 text-accent-color hover:underline font-medium text-sm"
                  >
                    {language === 'de' ? 'Details ansehen' : language === 'sv' ? 'Visa detaljer' : 'View details'}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
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
