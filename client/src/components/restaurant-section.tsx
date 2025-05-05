import { useLanguage } from "@/contexts/LanguageContext";
import { Utensils, Wine, Award, ChefHat, Star, Clock } from "lucide-react";
import { translations } from "@/translations";

// Define types for Menu Item and Specialty if needed
interface MenuItem {
  name: string;
  description: string;
  price: string;
}

interface Specialty {
  text: string; // Assuming specialties are just strings now
  // Add icon property if icons are part of translations
}

export function RestaurantSection() {
  const { language } = useLanguage();
  
  // Select the correct translation object based on the current language
  const currentTranslations = translations[language];
  const content = (currentTranslations as any)?.restaurantSection;

  // Provide fallbacks for content fields
  const tagline = content?.tagline ?? 'Arctic Cuisine';
  const title = content?.title ?? "JAYJAY'S RESTAURANT";
  const subtitle = content?.subtitle ?? "Enjoy authentic Arctic cuisine...";
  const heading = content?.heading ?? "A CULINARY JOURNEY...";
  const description1 = content?.description1 ?? "";
  const description2 = content?.description2 ?? "";
  const specialtiesHeading = content?.specialtiesHeading ?? "OUR SPECIALTIES:";
  const specialties: string[] = content?.specialties || []; // Expecting array of strings
  const reserveButton = content?.reserveButton ?? "Reserve a table";
  const imageAlt1 = content?.imageAlt1 ?? "Restaurant interior";
  const imageAlt2 = content?.imageAlt2 ?? "Swedish cuisine";
  const imageAlt3 = content?.imageAlt3 ?? "Candlelight dinner";
  const hours = content?.hours ?? "Opening Hours";
  const openingTimes: string[] = content?.openingTimes || [];
  const menuHighlights = content?.menuHighlights ?? "Menu Highlights";
  const menuItems: MenuItem[] = content?.menuItems || [];
  const fullMenuDescription = content?.fullMenuDescription ?? "";

  // Specialties icons (keep hardcoded or move to translations if needed)
  const specialtyIcons = [
    <ChefHat size={18} />,
    <Award size={18} />,
    <Wine size={18} />
  ];

  return (
    <section id="restaurant" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/90 via-dark-bg to-dark-bg/90 opacity-95"></div>
        <div className="absolute inset-0 bg-[url('/images/pattern-dots.png')] opacity-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-accent-color/5 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block bg-accent-color/20 text-accent-color text-sm font-medium tracking-wider uppercase mb-2 py-1 px-3 rounded-full">
            {tagline}
          </span>
          <h2 className="font-bold text-3xl md:text-5xl mb-6 text-white">
            {title}
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-white/80">
            {subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* Left column - Images with glass effect borders */}
          <div className="lg:col-span-5 group relative transform-gpu h-full flex flex-col">
            {/* Decorative background element */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-color/20 to-transparent rounded-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 transform-gpu"></div>
            
            <div className="relative z-10 transform-gpu h-full glass-card border border-white/10 shadow-lg rounded-xl overflow-hidden flex flex-col">
              <div className="overflow-hidden flex-grow-0">
                <img 
                  src="/images/restaurant/Restaurant 1_result.webp" 
                  alt={imageAlt1} 
                  className="w-full h-[280px] object-cover object-center transition-transform duration-500 group-hover:scale-105 transform-gpu"
                  loading="eager"
                  width="600"
                  height="400"
                />
              </div>
              <div className="flex gap-4 p-6">
                <div className="overflow-hidden rounded-xl glass-card border border-white/10 shadow-lg transform-gpu flex-1 h-36">
                  <img 
                    src="/images/restaurant/Restaurant 2_result.webp" 
                    alt={imageAlt2} 
                    className="w-full h-full object-cover object-center rounded-lg transition-transform duration-500 hover:scale-105 transform-gpu"
                    loading="lazy"
                    width="300"
                    height="200"
                  />
                </div>
                <div className="overflow-hidden rounded-xl glass-card border border-white/10 shadow-lg transform-gpu flex-1 h-36">
                  <img 
                    src="/images/restaurant/Restaurant 3_result.webp" 
                    alt={imageAlt3} 
                    className="w-full h-full object-cover object-center rounded-lg transition-transform duration-500 hover:scale-105 transform-gpu"
                    loading="lazy"
                    width="300"
                    height="200"
                  />
                </div>
              </div>
              
              {/* Hours section */}
              <div className="p-6 pt-2">
                <div className="bg-dark-bg/50 border border-white/5 rounded-lg p-4">
                  <h4 className="flex items-center text-lg font-medium mb-3 text-white">
                    <Clock size={18} className="mr-2 text-accent-color" />
                    {hours}
                  </h4>
                  <ul className="space-y-2">
                    {openingTimes.map((time, index) => (
                      <li key={index} className="text-sm text-white/70">{time}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column with text content and menu highlights */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Main restaurant description */}
            <div className="relative group transform-gpu mb-8">
              <div className="glass-card relative p-8 rounded-xl shadow-lg transform-gpu flex flex-col bg-card-bg border border-white/10 h-full">
                <h3 className="font-bold text-2xl mb-6 text-white group-hover:text-accent-color transition-colors duration-300">
                  {heading}
                </h3>
                <p className="mb-6 text-white/80">
                  {description1}
                </p>
                <p className="mb-8 text-white/80">
                  {description2}
                </p>
                
                <div className="mb-8">
                  <h4 className="font-medium text-lg mb-5 text-white">
                    {specialtiesHeading}
                  </h4>
                  <ul className="space-y-4">
                    {specialties.map((specialty, index) => (
                      <li key={index} className="flex items-start transform-gpu">
                        <div className="w-8 h-8 rounded-full bg-accent-color/10 flex items-center justify-center mr-3 text-accent-color transform-gpu">
                          {specialtyIcons[index]}
                        </div>
                        <span className="text-white/80">{specialty}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <a 
                  href="#contact" 
                  className="mt-auto self-start px-6 py-3 bg-accent-color hover:bg-accent-color/90 text-white font-medium rounded-lg transition-all duration-300 flex items-center shadow-glow-sm"
                >
                  <Utensils size={18} className="mr-2" />
                  <span>{reserveButton}</span>
                </a>
              </div>
            </div>
            
            {/* Menu highlights card */}
            <div className="relative group transform-gpu">
              <div className="glass-card relative p-8 rounded-xl shadow-lg transform-gpu flex flex-col bg-card-bg border border-white/10 h-full">
                <h3 className="font-bold text-2xl mb-6 text-white flex items-center">
                  <Star size={20} className="mr-3 text-accent-color" />
                  {menuHighlights}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {menuItems.map((item, index) => (
                    <div 
                      key={index} 
                      className="p-4 border border-white/10 rounded-lg hover:border-accent-color/30 transition-colors bg-dark-bg/30 backdrop-blur-sm"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-white">{item.name}</h4>
                        <span className="font-medium text-accent-color">{item.price}</span>
                      </div>
                      <p className="text-sm text-white/70">{item.description}</p>
                    </div>
                  ))}
                  
                  <div className="md:col-span-2 p-4 border border-white/10 rounded-lg bg-dark-bg/30 backdrop-blur-sm text-center">
                    <p className="text-white/70 text-sm italic">{fullMenuDescription}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
