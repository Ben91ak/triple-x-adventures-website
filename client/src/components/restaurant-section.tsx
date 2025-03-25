import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";

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

  return (
    <section id="restaurant" className="py-16 md:py-24 bg-midnight text-white relative">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">{content.title}</h2>
          <p className="text-lg opacity-90">{content.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="aspect-w-4 aspect-h-3 mb-6">
              <img 
                src="https://images.unsplash.com/photo-1528659882437-b89a74bc157f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt={content.imageAlt1} 
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1617196123643-bab924c7a9f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt={content.imageAlt2} 
                className="w-full h-40 object-cover rounded-lg shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1563245440-ad2c9507d76e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt={content.imageAlt3} 
                className="w-full h-40 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-2xl mb-6">{content.heading}</h3>
            <p className="mb-6 leading-relaxed">{content.description1}</p>
            <p className="mb-8 leading-relaxed">{content.description2}</p>
            
            <div className="mb-8">
              <h4 className="font-montserrat font-semibold text-lg mb-3">{content.specialtiesHeading}</h4>
              <ul className="space-y-2">
                {content.specialties.map((specialty, index) => (
                  <li key={index} className="flex items-start">
                    <i className="fas fa-utensils mt-1 mr-3 text-green-400"></i>
                    <span>{specialty}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <a href="#contact" className="inline-block bg-green-600 text-white font-montserrat font-semibold py-3 px-6 rounded hover:bg-green-700 transition">
              {content.reserveButton}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
