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
    <section id="pakete" className="py-16 md:py-24 bg-midnight text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">{t.experiences.title}</h2>
          <p className="text-lg max-w-3xl mx-auto opacity-90">{t.experiences.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience) => (
            <div key={experience.id} className="experience-card bg-white text-midnight rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:scale-105">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={experience.image} 
                  alt={experience.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                
                {experience.tag && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className={`inline-block ${experience.tag.type === 'bestseller' ? 'bg-green-500' : 'bg-blue-500'} text-white text-sm px-3 py-1 rounded-full uppercase font-semibold tracking-wide`}>
                      {experience.tag.text}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="font-montserrat font-bold text-xl mb-3">{experience.title}</h3>
                <p className="mb-4 text-gray-700">{experience.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="block text-sm text-gray-500">{language === 'de' ? 'Ab' : language === 'sv' ? 'Från' : 'From'}</span>
                    <span className="font-bold text-xl">{experience.price.toLocaleString()} SEK</span>
                  </div>
                  <a href="#contact" className="inline-block bg-green-600 text-white font-montserrat font-semibold py-2 px-4 rounded hover:bg-green-700 transition">
                    {language === 'de' ? 'Details' : language === 'sv' ? 'Detaljer' : 'Details'}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="#contact" className="custom-button inline-block font-montserrat text-base uppercase bg-green-600 px-8 py-4 rounded tracking-wide font-semibold hover:bg-green-700 transition">
            {language === 'de' ? 'Anfrage Senden' : language === 'sv' ? 'Skicka Förfrågan' : 'Send Inquiry'}
          </a>
        </div>
      </div>
    </section>
  );
}
