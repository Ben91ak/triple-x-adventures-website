import { Experience } from "@/types";

// Experience data - based on Triple X Adventures packages
const experiences: Experience[] = [
  {
    id: 1,
    title: "Snowmobile Abenteuer",
    description: "Erleben Sie die Freiheit auf einem Schneemobil durch die verschneite Wildnis von Schwedisch-Lappland. Perfekt für Anfänger und Fortgeschrittene.",
    price: 2495,
    image: "https://images.unsplash.com/photo-1604537466573-5e94508fd243?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tag: {
      text: "Beliebt",
      type: "bestseller"
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
      type: "new"
    }
  }
];

export function ExperiencesSection() {
  return (
    <section id="pakete" className="py-16 md:py-24 bg-midnight text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">UNSERE PAKETE</h2>
          <p className="text-lg max-w-3xl mx-auto opacity-90">Wählen Sie aus unseren Erlebnispaketen oder kombinieren Sie sie für Ihr perfektes Arktisabenteuer</p>
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
                    <span className="block text-sm text-gray-500">Ab</span>
                    <span className="font-bold text-xl">{experience.price.toLocaleString()} SEK</span>
                  </div>
                  <a href="#contact" className="inline-block bg-green-600 text-white font-montserrat font-semibold py-2 px-4 rounded hover:bg-green-700 transition">Details</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="#contact" className="custom-button inline-block font-montserrat text-base uppercase bg-green-600 px-8 py-4 rounded tracking-wide font-semibold hover:bg-green-700 transition">Anfrage Senden</a>
        </div>
      </div>
    </section>
  );
}
