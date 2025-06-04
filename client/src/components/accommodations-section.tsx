import { Accommodation } from "@/types";

// Local interface for translation features to avoid module resolution issues
interface TranslationFeature {
  text: string;
  iconKey: string;
}
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { User, Hotel, BedDouble, Utensils, MapPin, Snowflake, Truck, Bell } from "lucide-react";

// Helper function to determine icon based on feature iconKey
function getIconForFeature(iconKey: string): string {
  switch (iconKey.toLowerCase()) {
    case 'capacity':
      return "fas fa-user-group";
    case 'bed':
      return "fas fa-bed";
    case 'hottub': // Covers hot tub, spa, sauna
      return "fas fa-hot-tub";
    case 'kitchen': // Covers restaurant, food, meal, kitchen
      return "fas fa-utensils";
    case 'location':
      return "fas fa-location-dot";
    case 'climate': // Covers AC, climate, air, cool
      return "fas fa-snowflake";
    case 'transport':
      return "fas fa-shuttle-van";
    case 'service': // Covers service, staff, reception
      return "fas fa-concierge-bell";
    default: // Default icon for unrecognized keys or 'default' key
      return "fas fa-concierge-bell";
  }
}

export function AccommodationsSection() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  
  // Create accommodations from translations
  const accommodations: Accommodation[] = [
    {
      id: 1,
      title: t.accommodations.cabinHotel.title,
      description: t.accommodations.cabinHotel.description,
      pricePerNight: 3995,
      image: "images/Accomondation/WhatsApp Image 2025-05-22 at 09.53.38.jpeg",
      featured: true,
      features: t.accommodations.cabinHotel.features.map((featureItem: TranslationFeature) => ({ 
        icon: getIconForFeature(featureItem.iconKey), 
        text: featureItem.text 
      }))
    },
    {
      id: 2,
      title: t.accommodations.txaChalet.title,
      description: t.accommodations.txaChalet.description,
      pricePerNight: 3995,
      image: "/images/txa-chalet.jpg",
      features: t.accommodations.txaChalet.features.map((featureItem: TranslationFeature) => ({ 
        icon: getIconForFeature(featureItem.iconKey), 
        text: featureItem.text 
      }))
    },
    {
      id: 3,
      title: t.accommodations.hotelLaponia.title,
      description: t.accommodations.hotelLaponia.description,
      pricePerNight: 1500,
      image: "/images/hotel-laponia.jpg",
      features: t.accommodations.hotelLaponia.features.map((featureItem: TranslationFeature) => ({ 
        icon: getIconForFeature(featureItem.iconKey), 
        text: featureItem.text 
      }))
    }
  ]
  
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
    <section id="accommodations" className="py-10 md:py-16 relative overflow-hidden">
      {/* Using the global background - no need for section-specific background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 transform-gpu">
        {/* Simple glow effect to complement global background */}
        <div className="aurora-glow absolute inset-0 opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block text-accent-color text-sm font-medium tracking-wider uppercase mb-2">
            {t.accommodations.whereYouWillStay}
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
                    {t.accommodations.comingSoon}
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
                        {t.accommodations.from}
                      </p>
                      <div className="flex items-baseline">
                        <span className="font-bold text-2xl text-white">
                          {accommodation.pricePerNight.toLocaleString()}
                        </span>
                        <span className="text-white text-opacity-70 ml-1 text-sm">
                          SEK/{t.accommodations.night}
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
                    {t.accommodations.registerInterest}
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
                          {t.accommodations.from}
                        </p>
                        <div className="flex items-baseline">
                          <span className="font-bold text-xl text-white">
                            {accommodation.pricePerNight.toLocaleString()}
                          </span>
                          <span className="text-white text-opacity-70 ml-1 text-sm">
                            SEK/{t.accommodations.night}
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
                        t.accommodations.checkAvailability : 
                        t.accommodations.viewOptions}
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
