import { Accommodation } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { User, Hotel, BedDouble, Utensils, MapPin, Snowflake, Truck, Bell } from "lucide-react";

// Accommodation data by language
const accommodationsByLanguage = {
  en: [
    {
      id: 1,
      title: "CABIN HOTEL SAMELAND",
      description: "Experience luxury in our premium Mirror Glass Cabins, featuring floor-to-ceiling glass walls that provide uninterrupted views of the Arctic wilderness and Northern Lights. A truly unforgettable stay in nature.",
      pricePerNight: 5995,
      image: "/images/ood-hotel.jpg",
      featured: true,
      features: [
        { icon: "fas fa-user-group", text: "For 2-4 guests" },
        { icon: "fas fa-hot-tub", text: "13 Cabins" },
        { icon: "fas fa-snowflake", text: "Climate controlled" },
        { icon: "fas fa-bed", text: "Luxury king bed" },
        { icon: "fas fa-utensils", text: "own kitchen" },
        { icon: "fas fa-location-dot", text: "Sameland, Arvidsjaur" }
      ]
    },
    {
      id: 2,
      title: "TXA - CHALET",
      description: "Stay in your own TXA - Chalet and experience the highest level of comfort. Our exclusive chalet offers a perfect mix of rustic charm and modern luxury.",
      pricePerNight: 3995,
      image: "/images/txa-chalet.jpg",
      features: [
        { icon: "fas fa-user-group", text: "Up to 24 guests" },
        { icon: "fas fa-bed", text: "12 bedrooms" },
        { icon: "fas fa-hot-tub", text: "Private sauna" },
        { icon: "fas fa-utensils", text: "Private lounge / restaurant" }
      ]
    },
    {
      id: 3,
      title: "HOTEL LAPONIA",
      description: "A comfortable alternative to our TXA Chalet. Hotel Laponia provides you with a pleasant stay before and after your adventures, with all the amenities you need.",
      pricePerNight: 1495,
      image: "/images/hotel-laponia.jpg",
      features: [
        { icon: "fas fa-location-dot", text: "Central location" },
        { icon: "fas fa-snowflake", text: "Arctic ambiance" },
        { icon: "fas fa-shuttle-van", text: "only 10 km from the Airport" },
        { icon: "fas fa-concierge-bell", text: "Fjälls Pub & Bistro" }
      ]
    }
  ],
  de: [
    {
      id: 1,
      title: "CABIN HOTEL SAMELAND",
      description: "Erleben Sie Luxus in unserem Premium-Mirror-Glass-Cabin-Hotel mit raumhohen Glaswänden, die einen ungehinderten Blick auf die arktische Wildnis und die Nordlichter bieten. Ein wahrhaft unvergesslicher Aufenthalt in der Natur.",
      pricePerNight: 5995,
      image: "/images/ood-hotel.jpg",
      featured: true,
      features: [
        { icon: "fas fa-user-group", text: "Für 2-4 Gäste" },
        { icon: "fas fa-hot-tub", text: "13 Cabins" },
        { icon: "fas fa-snowflake", text: "Klimatisiert" },
        { icon: "fas fa-bed", text: "Luxuriöses Kingsize-Bett" },
        { icon: "fas fa-utensils", text: "eigene Küche" },
        { icon: "fas fa-location-dot", text: "SameLand, Arvidsjaur" }
      ]
    },
    {
      id: 2,
      title: "TXA - CHALET",
      description: "Übernachte im eigenen TXA - Chalet und erlebe ein Höchstmaß an Komfort. Unser exklusives Chalet bietet eine perfekte Mischung aus rustikalem Charme und modernem Luxus.",
      pricePerNight: 3995,
      image: "/images/txa-chalet.jpg",
      features: [
        { icon: "fas fa-user-group", text: "Bis zu 24 Gäste" },
        { icon: "fas fa-bed", text: "12 Schlafzimmer" },
        { icon: "fas fa-hot-tub", text: "Private Sauna" },
        { icon: "fas fa-utensils", text: "Private Lounge / Restaurant" }
      ]
    },
    {
      id: 3,
      title: "HOTEL LAPONIA",
      description: "Eine komfortable Alternative zu unserem TXA Chalet. Das Hotel Laponia bietet Ihnen einen angenehmen Aufenthalt vor und nach Ihren Abenteuern, mit allen Annehmlichkeiten, die Sie benötigen.",
      pricePerNight: 1495,
      image: "/images/hotel-laponia.jpg",
      features: [
        { icon: "fas fa-location-dot", text: "Zentrale Lage" },
        { icon: "fas fa-snowflake", text: "Arktisches Ambiente" },
        { icon: "fas fa-shuttle-van", text: "nur 10km vom Flughafen entfernt" },
        { icon: "fas fa-concierge-bell", text: "Fjälls Pub & Bistro" }
      ]
    }
  ],
  sv: [
    {
      id: 1,
      title: "CABIN HOTEL SAMELAND",
      description: "Upplev lyx i vårt premium Glass Cabin Hotel, med glasväggar från golv till tak som ger obrutna vyer över den arktiska vildmarken och norrskenet. En verkligt oförglömlig vistelse i naturen.",
      pricePerNight: 5995,
      image: "/images/ood-hotel.jpg",
      featured: true,
      features: [
        { icon: "fas fa-user-group", text: "För 2-4 gäster" },
        { icon: "fas fa-hot-tub", text: "13 Cabins" },
        { icon: "fas fa-snowflake", text: "Klimatkontrollerad" },
        { icon: "fas fa-bed", text: "Lyxig kingsize-säng" },
        { icon: "fas fa-utensils", text: "eget kök" },
        { icon: "fas fa-location-dot", text: "SameLand, Arvidsjaur" }
      ]
    },
    {
      id: 2,
      title: "TXA - CHALET",
      description: "Bo i din egen TXA - Chalet och upplev högsta komfort. Vårt exklusiva chalet erbjuder en perfekt blandning av rustik charm och modern lyx.",
      pricePerNight: 3995,
      image: "/images/txa-chalet.jpg",
      features: [
        { icon: "fas fa-user-group", text: "Upp till 24 gäster" },
        { icon: "fas fa-bed", text: "12 sovrum" },
        { icon: "fas fa-hot-tub", text: "Privat bastu" },
        { icon: "fas fa-utensils", text: "Privat lounge / restaurang" }
      ]
    },
    {
      id: 3,
      title: "HOTEL LAPONIA",
      description: "Ett bekvämt alternativ till vårt TXA Chalet. Hotel Laponia erbjuder en bekväm vistelse före och efter dina äventyr, med alla bekvämligheter du behöver.",
      pricePerNight: 1495,
      image: "/images/hotel-laponia.jpg",
      features: [
        { icon: "fas fa-location-dot", text: "Centralt läge" },
        { icon: "fas fa-snowflake", text: "Arktisk atmosfär" },
        { icon: "fas fa-shuttle-van", text: "Endast 10 km från flygplatsen" },
        { icon: "fas fa-concierge-bell", text: "Fjälls Pub & Bistro" }
      ]
    }
  ]
};

export function AccommodationsSection() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  
  // Get accommodations based on the current language
  const accommodations: Accommodation[] = accommodationsByLanguage[language];
  
  // Map the font awesome icons to Lucide icons
  const iconMap: Record<string, React.ReactNode> = {
    "fas fa-user-group": <User size={18} />,
    "fas fa-bed": <BedDouble size={18} />,
    "fas fa-hot-tub": <Hotel size={18} />,
    "fas fa-utensils": <Utensils size={18} />,
    "fas fa-location-dot": <MapPin size={18} />,
    "fas fa-snowflake": <Snowflake size={18} />,
    "fas fa-shuttle-van": <Truck size={18} />,
    "fas fa-concierge-bell": <Bell size={18} />
  };

  return (
    <section id="accommodations" className="py-24 md:py-32 relative overflow-hidden">
      {/* Using the global background - no need for section-specific background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 transform-gpu">
        {/* Simple glow effect to complement global background */}
        <div className="aurora-glow absolute inset-0 opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <span className="inline-block text-accent-color text-sm font-medium tracking-wider uppercase mb-2">
            {language === 'de' ? 'Wo Sie Übernachten' : language === 'sv' ? 'Ditt Boende' : 'Where You Will Stay'}
          </span>
          <h2 className="font-bold text-3xl md:text-5xl mb-6 text-white">
            {t.accommodations.title}
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-white text-opacity-80">
            {t.accommodations.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-10 max-w-6xl mx-auto">
          {/* Featured accommodation (ÖÖD Hotel) */}
          {accommodations.filter(a => a.featured).map((accommodation) => (
            <div key={accommodation.id} className="group relative">
              {/* Decorative background element - enhanced for featured property */}
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-color/60 to-purple-600/60 rounded-xl blur-xl opacity-20 group-hover:opacity-80 transition-all duration-700"></div>
              
              {/* Coming Soon badge - moved to left corner on the image */}
              <div className="absolute top-6 left-6 z-20">
                <div className="relative">
                  <span className="flex items-center gap-2 bg-gradient-to-r from-accent-color to-purple-600 text-white px-5 py-3 rounded-full font-bold text-sm uppercase tracking-widest shadow-xl border border-white/20 backdrop-blur-sm animate-pulse">
                    <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                    {language === 'de' ? 'Demnächst' : language === 'sv' ? 'Kommer snart' : 'Coming Soon'}
                  </span>
                  <span className="absolute inset-0 bg-accent-color/20 rounded-full blur-lg -z-10"></span>
                </div>
              </div>
              
              {/* Card - larger for featured property */}
              <div className="glass-card relative overflow-hidden flex flex-col md:flex-row transition-all duration-300 group-hover:shadow-accent-color/30 group-hover:shadow-lg z-10 border-2 border-accent-color/20">
                <div className="relative h-96 md:h-auto md:w-3/5 overflow-hidden">
                  {/* Image with overlay gradient */}
                  <img 
                    src={accommodation.image} 
                    alt={`${accommodation.title} exterior`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
                  
                  {/* Price badge */}
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                    <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
                      <p className="text-sm text-white text-opacity-70">
                        {language === 'de' ? 'Ab' : language === 'sv' ? 'Från' : 'From'}
                      </p>
                      <div className="flex items-baseline">
                        <span className="font-bold text-2xl text-white">
                          {accommodation.pricePerNight.toLocaleString()}
                        </span>
                        <span className="text-white text-opacity-70 ml-1 text-sm">
                          SEK/{language === 'de' ? 'Nacht' : language === 'sv' ? 'natt' : 'night'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 md:p-10 flex-1 flex flex-col">
                  <h3 className="font-bold text-3xl mb-4 text-white group-hover:text-accent-color transition-colors">
                    {accommodation.title}
                  </h3>
                  <p className="mb-6 text-lg text-white text-opacity-90 flex-grow">
                    {accommodation.description}
                  </p>
                  
                  {/* Features grid with modern styling - 3 columns for featured property */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    {accommodation.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="flex-shrink-0 w-9 h-9 rounded-full border border-gray-700 bg-gray-900/90 flex items-center justify-center mr-3 text-white/80 shadow-sm">
                          <div className="flex items-center justify-center w-5 h-5">
                            {iconMap[feature.icon]}
                          </div>
                        </div>
                        <span className="text-white text-opacity-90 text-sm">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                  
                  <a 
                    href="#contact" 
                    className="btn-primary text-center w-full inline-flex items-center justify-center text-base px-8 py-4"
                  >
                    {language === 'de' ? 'Vormerken' : language === 'sv' ? 'Intresseanmälan' : 'Register Interest'}
                  </a>
                </div>
              </div>
            </div>
          ))}
          
          {/* Regular accommodations (TXA Chalet and Hotel Laponia) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
            {accommodations.filter(a => !a.featured).map((accommodation) => (
              <div key={accommodation.id} className="group relative">
                {/* Decorative background element */}
                <div className="absolute -inset-1 bg-gradient-to-r from-accent-color/40 to-purple-600/40 rounded-xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-700"></div>
                
                {/* Card */}
                <div className="glass-card relative overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:shadow-accent-color/20 group-hover:shadow-lg z-10">
                  <div className="relative h-72 overflow-hidden">
                    {/* Image with overlay gradient */}
                    <img 
                      src={accommodation.image} 
                      alt={`${accommodation.title} exterior`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    
                    {/* Price badge */}
                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                      <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
                        <p className="text-sm text-white text-opacity-70">
                          {language === 'de' ? 'Ab' : language === 'sv' ? 'Från' : 'From'}
                        </p>
                        <div className="flex items-baseline">
                          <span className="font-bold text-xl text-white">
                            {accommodation.pricePerNight.toLocaleString()}
                          </span>
                          <span className="text-white text-opacity-70 ml-1 text-sm">
                            SEK/{language === 'de' ? 'Nacht' : language === 'sv' ? 'natt' : 'night'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="font-bold text-2xl mb-3 text-white group-hover:text-accent-color transition-colors">
                      {accommodation.title}
                    </h3>
                    <p className="mb-6 text-white text-opacity-80 flex-grow">
                      {accommodation.description}
                    </p>
                    
                    {/* Features grid with modern styling */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {accommodation.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full border border-gray-700 bg-gray-900/90 flex items-center justify-center mr-3 text-white/80 shadow-sm">
                            <div className="flex items-center justify-center w-4 h-4">
                              {iconMap[feature.icon]}
                            </div>
                          </div>
                          <span className="text-white text-opacity-80 text-sm">{feature.text}</span>
                        </div>
                      ))}
                    </div>
                    
                    <a 
                      href="#contact" 
                      className="btn-primary text-center w-full inline-flex items-center justify-center"
                    >
                      {accommodation.id === 2 ? 
                        (language === 'de' ? 'Verfügbarkeit prüfen' : 
                         language === 'sv' ? 'Kontrollera tillgänglighet' : 
                         'Check availability') : 
                        (language === 'de' ? 'Optionen anzeigen' : 
                         language === 'sv' ? 'Visa alternativ' : 
                         'View options')}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
