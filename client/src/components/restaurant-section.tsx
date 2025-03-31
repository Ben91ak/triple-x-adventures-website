import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { Utensils, Wine, Award } from "lucide-react";

// Restaurant content by language
const restaurantContentByLanguage = {
  en: {
    title: "TRIPLE X TASTE",
    subtitle: "Enjoy authentic Arctic cuisine in our cozy live-cooking restaurant",
    heading: "A CULINARY JOURNEY THROUGH LAPLAND",
    description1: "End your evening at our own live-cooking restaurant, where delicious dishes are prepared for you in a unique atmosphere.",
    description2: "We celebrate the flavors of Swedish Lapland with a menu that focuses on local, seasonal ingredients. From freshly caught Arctic char to wild berries and game meats, our dishes tell the story of our region's rich culinary heritage.",
    specialtiesHeading: "OUR SPECIALTIES:",
    specialties: [
      "Traditional Sami cuisine with a modern twist",
      "Wilderness dinner experiences under the Northern Lights",
      "Locally brewed beers and craft cocktails with Arctic ingredients"
    ],
    reserveButton: "Reserve a table",
    imageAlt1: "Rustic restaurant interior with fireplace",
    imageAlt2: "Traditional Swedish cuisine",
    imageAlt3: "Candlelight dinner"
  },
  de: {
    title: "TRIPLE X TASTE",
    subtitle: "Genießen Sie authentische arktische Küche in unserem gemütlichen Live-Cooking-Restaurant",
    heading: "EINE KULINARISCHE REISE DURCH LAPPLAND",
    description1: "Lass den Abend in unserem eigenen Live-Cooking-Restaurant ausklingen, wo köstliche Gerichte in einer einzigartigen Atmosphäre für dich zubereitet werden.",
    description2: "Wir feiern die Aromen Schwedisch-Lapplands mit einem Menü, das sich auf lokale, saisonale Zutaten konzentriert. Von frisch gefangenem arktischen Saibling bis hin zu Wildbeeren und Wildfleisch erzählen unsere Gerichte die Geschichte des reichen kulinarischen Erbes unserer Region.",
    specialtiesHeading: "UNSERE SPEZIALITÄTEN:",
    specialties: [
      "Traditionelle samische Küche mit modernem Twist",
      "Wilderness-Dinner-Erlebnisse unter Nordlichtern",
      "Lokal gebraute Biere und Craft-Cocktails mit arktischen Zutaten"
    ],
    reserveButton: "Tisch reservieren",
    imageAlt1: "Rustikales Restaurant-Interieur mit Kamin",
    imageAlt2: "Traditionelle schwedische Küche",
    imageAlt3: "Abendessen bei Kerzenschein"
  },
  sv: {
    title: "TRIPLE X TASTE",
    subtitle: "Njut av autentisk arktisk mat i vår mysiga live-cooking restaurang",
    heading: "EN KULINARISK RESA GENOM LAPPLAND",
    description1: "Avsluta kvällen på vår egen live-cooking restaurang, där läckra rätter tillagas för dig i en unik atmosfär.",
    description2: "Vi firar smakerna från Svenska Lappland med en meny som fokuserar på lokala, säsongsbetonade ingredienser. Från nyligen fångad röding till vilda bär och viltkött, berättar våra rätter historien om vår regions rika kulinariska arv.",
    specialtiesHeading: "VÅRA SPECIALITETER:",
    specialties: [
      "Traditionell samisk mat med modern twist",
      "Vildmarksmiddagsupplevelser under norrskenet",
      "Lokalt bryggda öl och hantverkscocktails med arktiska ingredienser"
    ],
    reserveButton: "Reservera ett bord",
    imageAlt1: "Rustik restauranginteriör med öppen spis",
    imageAlt2: "Traditionell svensk mat",
    imageAlt3: "Middag i levande ljus"
  }
};

export function RestaurantSection() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  
  // Get content based on the current language
  const content = restaurantContentByLanguage[language];

  // Specialties icons
  const specialtyIcons = [
    <Utensils size={18} />,
    <Award size={18} />,
    <Wine size={18} />
  ];

  return (
    <section id="restaurant" className="py-24 md:py-32 relative overflow-hidden">
      {/* Using the global background - no need for section-specific background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 transform-gpu">
        {/* Simple glow effect to complement global background */}
        <div className="aurora-glow absolute inset-0 opacity-30"></div>
      </div>
      
      {/* Subtle texture overlay - optimized with transform-gpu */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wNCIgZmlsbC1ydWxlPSJub256ZXJvIj48cGF0aCBkPSJNMjkgNTguNWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1em0wIDFhNi41IDYuNSAwIDEgMCAwIDEzIDYuNSA2LjUgMCAwIDAgMC0xM3ptMS0uMDg3YTcuNSA3LjUgMCAxIDEgMCAxNSA3LjUgNy41IDAgMCAxIDAtMTV6TTIwIDU5LjVhNy41IDcuNSAwIDEgMSAwIDE1IDcuNSA3LjUgMCAwIDEgMC0xNXptMCAxYTYuNSA2LjUgMCAxIDAgMCAxMyA2LjUgNi41IDAgMCAwIDAtMTN6bTAtMWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1eiIvPjwvZz48L2c+PC9zdmc+')]  opacity-60 z-0 pointer-events-none transform-gpu"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <span className="inline-block text-accent-color text-sm font-medium tracking-wider uppercase mb-2 text-shadow-sm">
            {language === 'de' ? 'Arktische Kulinarik' : language === 'sv' ? 'Arktisk Matlagning' : 'Arctic Cuisine'}
          </span>
          <h2 className="font-bold text-3xl md:text-5xl mb-6 text-white text-shadow-lg">
            {content.title}
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-white text-opacity-80 text-shadow-sm">
            {content.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left column - Images with glass effect borders - optimized for performance */}
          <div className="group relative transform-gpu h-full flex flex-col">
            {/* Decorative background element - optimized with reduced blur and transform-gpu */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-color/20 to-transparent rounded-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 transform-gpu"></div>
            
            <div className="relative z-10 transform-gpu h-full glass-card border border-white/10 shadow-lg rounded-xl overflow-hidden flex flex-col">
              <div className="overflow-hidden flex-grow-0">
                <img 
                  src="/images/restaurant/dining-area.jpg" 
                  alt={content.imageAlt1} 
                  className="w-full h-[380px] object-cover object-center transition-transform duration-500 group-hover:scale-105 transform-gpu"
                  loading="eager"
                  width="600"
                  height="400"
                />
              </div>
              <div className="flex gap-4 p-6">
                <div className="overflow-hidden rounded-xl glass-card border border-white/10 shadow-lg transform-gpu flex-1 h-44">
                  <img 
                    src="/images/restaurant/dish.jpg" 
                    alt={content.imageAlt2} 
                    className="w-full h-full object-cover object-center rounded-lg transition-transform duration-500 hover:scale-105 transform-gpu"
                    loading="lazy"
                    width="300"
                    height="200"
                  />
                </div>
                <div className="overflow-hidden rounded-xl glass-card border border-white/10 shadow-lg transform-gpu flex-1 h-44">
                  <img 
                    src="/images/restaurant/meat-preparation.jpg" 
                    alt={content.imageAlt3} 
                    className="w-full h-full object-cover object-center rounded-lg transition-transform duration-500 hover:scale-105 transform-gpu"
                    loading="lazy"
                    width="300"
                    height="200"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Content with glass card effect - optimized for performance */}
          <div className="relative group transform-gpu h-full">
            {/* Glass card effect - optimized with reduced blur and transform-gpu */}
            <div className="absolute -inset-1 bg-gradient-to-l from-accent-color/10 to-transparent rounded-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 transform-gpu"></div>
            
            <div className="glass-card relative z-10 p-8 rounded-xl shadow-lg transform-gpu h-full flex flex-col">
              <h3 className="font-bold text-2xl mb-6 text-white group-hover:text-accent-color transition-colors duration-300 text-shadow-sm">
                {content.heading}
              </h3>
              <p className="mb-6 text-white text-opacity-80 text-shadow-sm">
                {content.description1}
              </p>
              <p className="mb-8 text-white text-opacity-80 text-shadow-sm">
                {content.description2}
              </p>
              
              <div className="mb-8 flex-grow">
                <h4 className="font-medium text-lg mb-5 text-white text-shadow-sm">
                  {content.specialtiesHeading}
                </h4>
                <ul className="space-y-4">
                  {content.specialties.map((specialty, index) => (
                    <li key={index} className="flex items-start transform-gpu">
                      <div className="w-8 h-8 rounded-full bg-accent-color/10 flex items-center justify-center mr-3 text-accent-color transform-gpu">
                        {specialtyIcons[index]}
                      </div>
                      <span className="text-white text-opacity-80 text-shadow-sm">{specialty}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <a 
                href="#contact" 
                className="glass-button text-center inline-flex items-center justify-center transition-colors duration-300 mt-auto"
              >
                <span className="text-shadow-sm">{content.reserveButton}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
