import { Accommodation } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { User, Hotel, BedDouble, Utensils, MapPin, Snowflake, Truck, Bell } from "lucide-react";

// Accommodation data by language
const accommodationsByLanguage = {
  en: [
    {
      id: 1,
      title: "TXA - CHALET",
      description: "Stay in your own TXA - Chalet and experience the highest level of comfort. Our exclusive chalet offers a perfect mix of rustic charm and modern luxury.",
      pricePerNight: 3995,
      image: "https://images.unsplash.com/photo-1517600585934-41e19605986d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      features: [
        { icon: "fas fa-user-group", text: "Up to 8 guests" },
        { icon: "fas fa-bed", text: "4 bedrooms" },
        { icon: "fas fa-hot-tub", text: "Private sauna" },
        { icon: "fas fa-utensils", text: "Fully equipped kitchen" }
      ]
    },
    {
      id: 2,
      title: "HOTEL LAPONIA",
      description: "A comfortable alternative to our TXA Chalet. Hotel Laponia provides you with a pleasant stay before and after your adventures, with all the amenities you need.",
      pricePerNight: 1495,
      image: "https://images.unsplash.com/photo-1505692795793-20f543407193?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      features: [
        { icon: "fas fa-location-dot", text: "Central location" },
        { icon: "fas fa-snowflake", text: "Arctic ambiance" },
        { icon: "fas fa-shuttle-van", text: "Transfer included" },
        { icon: "fas fa-concierge-bell", text: "Concierge service" }
      ]
    }
  ],
  de: [
    {
      id: 1,
      title: "TXA - CHALET",
      description: "Übernachte im eigenen TXA - Chalet und erlebe ein Höchstmaß an Komfort. Unser exklusives Chalet bietet eine perfekte Mischung aus rustikalem Charme und modernem Luxus.",
      pricePerNight: 3995,
      image: "https://images.unsplash.com/photo-1517600585934-41e19605986d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      features: [
        { icon: "fas fa-user-group", text: "Bis zu 8 Gäste" },
        { icon: "fas fa-bed", text: "4 Schlafzimmer" },
        { icon: "fas fa-hot-tub", text: "Private Sauna" },
        { icon: "fas fa-utensils", text: "Voll ausgestattete Küche" }
      ]
    },
    {
      id: 2,
      title: "HOTEL LAPONIA",
      description: "Eine komfortable Alternative zu unserem TXA Chalet. Das Hotel Laponia bietet Ihnen einen angenehmen Aufenthalt vor und nach Ihren Abenteuern, mit allen Annehmlichkeiten, die Sie benötigen.",
      pricePerNight: 1495,
      image: "https://images.unsplash.com/photo-1505692795793-20f543407193?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      features: [
        { icon: "fas fa-location-dot", text: "Zentrale Lage" },
        { icon: "fas fa-snowflake", text: "Arktisches Ambiente" },
        { icon: "fas fa-shuttle-van", text: "Transfer inklusive" },
        { icon: "fas fa-concierge-bell", text: "Concierge-Service" }
      ]
    }
  ],
  sv: [
    {
      id: 1,
      title: "TXA - CHALET",
      description: "Bo i din egen TXA - Chalet och upplev högsta komfort. Vårt exklusiva chalet erbjuder en perfekt blandning av rustik charm och modern lyx.",
      pricePerNight: 3995,
      image: "https://images.unsplash.com/photo-1517600585934-41e19605986d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      features: [
        { icon: "fas fa-user-group", text: "Upp till 8 gäster" },
        { icon: "fas fa-bed", text: "4 sovrum" },
        { icon: "fas fa-hot-tub", text: "Privat bastu" },
        { icon: "fas fa-utensils", text: "Fullt utrustat kök" }
      ]
    },
    {
      id: 2,
      title: "HOTEL LAPONIA",
      description: "Ett bekvämt alternativ till vårt TXA Chalet. Hotel Laponia erbjuder en bekväm vistelse före och efter dina äventyr, med alla bekvämligheter du behöver.",
      pricePerNight: 1495,
      image: "https://images.unsplash.com/photo-1505692795793-20f543407193?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      features: [
        { icon: "fas fa-location-dot", text: "Centralt läge" },
        { icon: "fas fa-snowflake", text: "Arktisk atmosfär" },
        { icon: "fas fa-shuttle-van", text: "Transfer ingår" },
        { icon: "fas fa-concierge-bell", text: "Concierge-tjänst" }
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
    <section id="accommodations" className="py-24 md:py-32 relative">
      {/* Background with diagonal gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-card-bg to-dark-bg opacity-95 z-0"></div>
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wNCIgZmlsbC1ydWxlPSJub256ZXJvIj48cGF0aCBkPSJNMjkgNTguNWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1em0wIDFhNi41IDYuNSAwIDEgMCAwIDEzIDYuNSA2LjUgMCAwIDAgMC0xM3ptMS0uMDg3YTcuNSA3LjUgMCAxIDEgMCAxNSA3LjUgNy41IDAgMCAxIDAtMTV6TTIwIDU5LjVhNy41IDcuNSAwIDEgMSAwIDE1IDcuNSA3LjUgMCAwIDEgMC0xNXptMCAxYTYuNSA2LjUgMCAxIDAgMCAxMyA2LjUgNi41IDAgMCAwIDAtMTN6bTAtMWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1eiIvPjwvZz48L2c+PC9zdmc+')]  opacity-60 z-0 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <span className="inline-block text-accent-color text-sm font-medium tracking-wider uppercase mb-2">
            {language === 'de' ? 'Wo Sie Übernachten' : language === 'sv' ? 'Ditt Boende' : 'Where You Will Stay'}
          </span>
          <h2 className="font-bold text-3xl md:text-5xl mb-6 text-primary-text">
            {t.accommodations.title}
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-secondary-text">
            {t.accommodations.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {accommodations.map((accommodation) => (
            <div key={accommodation.id} className="group relative">
              {/* Decorative background element */}
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-color/40 to-purple-600/40 rounded-xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-700"></div>
              
              {/* Card */}
              <div className="card relative overflow-hidden h-full bg-card-bg flex flex-col transition-all duration-300 group-hover:shadow-accent-color/20 group-hover:shadow-lg z-10">
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
                      <p className="text-sm text-secondary-text">
                        {language === 'de' ? 'Ab' : language === 'sv' ? 'Från' : 'From'}
                      </p>
                      <div className="flex items-baseline">
                        <span className="font-bold text-xl text-primary-text">
                          {accommodation.pricePerNight.toLocaleString()}
                        </span>
                        <span className="text-secondary-text ml-1 text-sm">
                          SEK/{language === 'de' ? 'Nacht' : language === 'sv' ? 'natt' : 'night'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="font-bold text-2xl mb-3 text-primary-text group-hover:text-accent-color transition-colors">
                    {accommodation.title}
                  </h3>
                  <p className="mb-6 text-secondary-text flex-grow">
                    {accommodation.description}
                  </p>
                  
                  {/* Features grid with modern styling */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {accommodation.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-accent-color/10 flex items-center justify-center mr-3 text-accent-color">
                          {iconMap[feature.icon]}
                        </div>
                        <span className="text-secondary-text text-sm">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                  
                  <a 
                    href="#contact" 
                    className="btn-primary text-center w-full inline-flex items-center justify-center"
                  >
                    {accommodation.id === 1 ? 
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
    </section>
  );
}
