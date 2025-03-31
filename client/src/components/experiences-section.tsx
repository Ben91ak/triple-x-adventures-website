import { useState, useEffect } from "react";
import { Experience } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { WeatherWidget } from "@/components/ui/weather-widget";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Experience data mapped by language
const experiencesByLanguage = {
  en: [
    {
      id: 1,
      title: "Snowmobile Adventure",
      description: "Experience the freedom on a snowmobile through the snowy wilderness of Swedish Lapland. Perfect for beginners and advanced riders alike.",
      price: 2495,
      image: "/images/Snowmobile.jpg",
      gallery: [
        "/images/Snowmobile.jpg",
        "https://images.unsplash.com/photo-1604537466573-5e94508fd243?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1603475215943-7ef1fe62ad19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1574985734577-6339de6b0a7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ],
      fullDescription: "Experience the exhilaration of speeding through pristine snowscapes on your own powerful snowmobile. Our expert guides will lead you through breathtaking Arctic terrain, across frozen lakes and through ancient forests. The tour includes professional instruction, all necessary safety equipment, and warm winter clothing if needed. Stop midway for a traditional Swedish fika with hot beverages and snacks around a crackling fire. This adventure is suitable for all skill levels, with special trails for beginners and more challenging routes for experienced riders. Capture unforgettable memories as you navigate through one of Europe's last great wildernesses.",
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
      image: "/images/Husky.jpg",
      gallery: [
        "/images/Husky.jpg",
        "https://images.unsplash.com/photo-1517507654662-23d3b959c13e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1583614749616-4c27737e1f8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      ],
      fullDescription: "Experience the thrill of mushing your own dog sled team across pristine snowy landscapes. Our friendly Siberian and Alaskan huskies are eager to take you on an unforgettable journey through the stunning Arctic wilderness. After a thorough introduction and safety briefing, you'll learn how to handle your own team of 4-6 dogs. Feel the excitement as the dogs bark in anticipation, then the sudden silence as they focus on running through the breathtaking winter landscape. Halfway through, we'll stop for a warming wilderness lunch around an open fire, where you can also spend time bonding with the dogs. This authentic Arctic experience connects you with nature in a unique and memorable way.",
      tag: {
        text: "Popular",
        type: "bestseller" as "bestseller"
      }
    },
    {
      id: 3,
      title: "JayJay's Restaurant",
      description: "Enjoy authentic Lapland cuisine in a cozy atmosphere with views of the Northern Lights. Our restaurant offers a unique dining experience with local ingredients.",
      price: 1695,
      image: "/images/JayJays-Restaurant.jpg",
      gallery: [
        "/images/JayJays-Restaurant.jpg",
      ],
      fullDescription: "JayJay's Restaurant offers an unforgettable culinary experience in the heart of Swedish Lapland. Located in a traditional wooden cabin with panoramic windows, you can enjoy gourmet meals while watching the Northern Lights dance across the night sky. Our talented chefs create exquisite dishes using fresh, locally-sourced ingredients including Arctic char, reindeer, wild berries, and forest mushrooms. The intimate, candle-lit atmosphere combines rustic charm with elegant dining, making it perfect for both casual meals and special occasions. Our menu changes seasonally to showcase the best flavors of Lapland, and each dish tells a story of the region's rich culinary heritage. Complete your dining experience with our selection of fine wines and craft cocktails featuring local spirits."
    },
    {
      id: 4,
      title: "Ice Karting Experience",
      description: "Race specially designed karts on a frozen lake track with expert instruction. An adrenaline-filled winter driving experience.",
      price: 1495,
      image: "/images/Ice Kart.jpg",
      gallery: [
        "/images/Ice Kart.jpg",
      ],
      fullDescription: "Experience the unique thrill of racing on ice with our specialized Ice Karting Adventure. Our professional instructors will teach you the techniques of driving on a slippery surface before you take to our specially prepared ice track on a frozen lake. Feel the excitement as you drift around corners and master the art of controlling a vehicle in challenging winter conditions. This experience is suitable for all skill levels, from complete beginners to experienced drivers looking to test their skills. All necessary equipment is provided, including helmets, racing suits, and gloves. Compete against friends and family for the fastest lap time in this unforgettable Arctic motorsport experience."
    },
    {
      id: 5,
      title: "Reindeer Farm Visit",
      description: "Meet the iconic reindeer of Lapland, learn about Sami culture, and enjoy a traditional meal in an authentic setting.",
      price: 1095,
      image: "/images/Reindeers.jpg",
      gallery: [
        "/images/Reindeers.jpg",
      ],
      fullDescription: "Step into the world of the Sami people and their most cherished animal - the reindeer. Visit a traditional reindeer farm where you'll learn about these magnificent creatures and their importance to the indigenous Sami culture. Get up close with the reindeer, feed them, and learn about their seasonal migration and adaptation to the harsh Arctic climate. Your Sami host will share stories and traditions passed down through generations while you enjoy a traditional meal in an authentic lavvu (Sami tent). This cultural experience provides valuable insight into a way of life that has survived for thousands of years in the Arctic region."
    },
    {
      id: 6,
      title: "Helicopter Scenic Flight",
      description: "Soar above the Arctic landscape for a breathtaking aerial perspective of mountains, forests, and frozen lakes.",
      price: 3295,
      image: "/images/Helikopter.jpg",
      gallery: [
        "/images/Helikopter.jpg",
      ],
      fullDescription: "Take to the skies for an unforgettable perspective of Swedish Lapland's breathtaking landscapes on our scenic helicopter flight. From your privileged vantage point, you'll witness the vastness of the Arctic wilderness stretching to the horizon - snow-covered forests, frozen lakes, mountain ranges, and perhaps even wildlife. Your pilot will provide informative commentary through your headset, pointing out notable landmarks and sharing interesting facts about the region. This exclusive experience offers unparalleled photo opportunities and a sense of the true scale and beauty of Lapland that cannot be appreciated from the ground. Each flight path is carefully planned to showcase the most spectacular scenery while ensuring minimal environmental impact.",
      tag: {
        text: "New",
        type: "new" as "new"
      }
    },
    {
      id: 7,
      title: "Ice Drifting Experience",
      description: "Master the art of controlled drifting on a frozen lake in a performance car with professional instructors.",
      price: 2295,
      image: "/images/Drifting.jpg",
      gallery: [
        "/images/Drifting.jpg",
      ],
      fullDescription: "Feel the exhilaration of sliding sideways on ice in our Ice Drifting Experience. Under the guidance of professional driving instructors, you'll learn the techniques of controlling a vehicle in extreme winter conditions. Using specially prepared performance cars equipped with studded tires, you'll practice drifting techniques on our purpose-built ice course. Start with basic exercises and progress to more complex maneuvers as your confidence grows. This experience is perfect for driving enthusiasts looking to improve their winter driving skills in a safe and controlled environment. All drivers receive thorough instruction and have the opportunity for multiple driving sessions to perfect their technique."
    }
  ],
  de: [
    {
      id: 1,
      title: "Snowmobile Abenteuer",
      description: "Erleben Sie die Freiheit auf einem Schneemobil durch die verschneite Wildnis von Schwedisch-Lappland. Perfekt für Anfänger und Fortgeschrittene.",
      price: 2495,
      image: "/images/Snowmobile.jpg",
      gallery: [
        "/images/Snowmobile.jpg",
      ],
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
      image: "/images/Husky.jpg",
      gallery: [
        "/images/Husky.jpg",
      ]
    },
    {
      id: 3,
      title: "JayJay's Restaurant",
      description: "Genießen Sie authentische Lappländische Küche in gemütlicher Atmosphäre mit Blick auf die Nordlichter. Unser Restaurant bietet ein einzigartiges Speisenerlebnis mit lokalen Zutaten.",
      price: 1695,
      image: "/images/JayJays-Restaurant.jpg",
      gallery: [
        "/images/JayJays-Restaurant.jpg",
      ]
    },
    {
      id: 4,
      title: "Eiskart Erlebnis",
      description: "Fahren Sie speziell entworfene Karts auf einer gefrorenen Seestrecke mit fachkundiger Anleitung. Ein adrenalingeladenes Winterfahrerlebnis.",
      price: 1495,
      image: "/images/Ice Kart.jpg",
      gallery: [
        "/images/Ice Kart.jpg",
      ]
    },
    {
      id: 5,
      title: "Rentier Farm Besuch",
      description: "Treffen Sie die ikonischen Rentiere Lapplands, lernen Sie über die Sami-Kultur und genießen Sie eine traditionelle Mahlzeit in authentischer Umgebung.",
      price: 1095,
      image: "/images/Reindeers.jpg",
      gallery: [
        "/images/Reindeers.jpg",
      ]
    },
    {
      id: 6,
      title: "Hubschrauber Panoramaflug",
      description: "Schweben Sie über die arktische Landschaft für eine atemberaubende Luftperspektive von Bergen, Wäldern und gefrorenen Seen.",
      price: 3295,
      image: "/images/Helikopter.jpg",
      gallery: [
        "/images/Helikopter.jpg",
      ],
      tag: {
        text: "Neu",
        type: "new" as "new"
      }
    },
    {
      id: 7,
      title: "Eisdrifting Erlebnis",
      description: "Meistern Sie die Kunst des kontrollierten Driftens auf einem gefrorenen See in einem Leistungsfahrzeug mit professionellen Instruktoren.",
      price: 2295,
      image: "/images/Drifting.jpg",
      gallery: [
        "/images/Drifting.jpg",
      ]
    }
  ],
  sv: [
    {
      id: 1,
      title: "Snöskoter Äventyr",
      description: "Upplev friheten på en snöskoter genom den snötäckta vildmarken i Svenska Lappland. Perfekt för nybörjare och erfarna åkare.",
      price: 2495,
      image: "/images/Snowmobile.jpg",
      gallery: [
        "/images/Snowmobile.jpg",
      ],
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
      image: "/images/Husky.jpg",
      gallery: [
        "/images/Husky.jpg",
      ]
    },
    {
      id: 3,
      title: "JayJay's Restaurant",
      description: "Njut av äkta lappländsk mat i en mysig atmosfär med utsikt över norrskenet. Vår restaurang erbjuder en unik matupplevelse med lokala råvaror.",
      price: 1695,
      image: "/images/JayJays-Restaurant.jpg",
      gallery: [
        "/images/JayJays-Restaurant.jpg",
      ]
    },
    {
      id: 4,
      title: "Iskart Upplevelse",
      description: "Kör specialdesignade karts på en frusen sjöbana med expertvägledning. En adrenalinfylld vinterupplevelse.",
      price: 1495,
      image: "/images/Ice Kart.jpg",
      gallery: [
        "/images/Ice Kart.jpg",
      ]
    },
    {
      id: 5,
      title: "Renbesök",
      description: "Träffa Lapplands ikoniska renar, lär dig om samisk kultur och njut av en traditionell måltid i en autentisk miljö.",
      price: 1095,
      image: "/images/Reindeers.jpg",
      gallery: [
        "/images/Reindeers.jpg",
      ]
    },
    {
      id: 6,
      title: "Helikopter Sightseeingtur",
      description: "Sväva över det arktiska landskapet för ett hisnande flygperspektiv över berg, skogar och frusna sjöar.",
      price: 3295,
      image: "/images/Helikopter.jpg",
      gallery: [
        "/images/Helikopter.jpg",
      ],
      tag: {
        text: "Ny",
        type: "new" as "new"
      }
    },
    {
      id: 7,
      title: "Isdrift Upplevelse",
      description: "Bemästra konsten att kontrollera driften på en frusen sjö i en prestandabil med professionella instruktörer.",
      price: 2295,
      image: "/images/Drifting.jpg",
      gallery: [
        "/images/Drifting.jpg",
      ]
    }
  ]
};

// Experience Detail Modal component
function ExperienceDetailModal({ 
  experience, 
  isOpen, 
  onClose, 
  onNext, 
  onPrevious,
  language
}: { 
  experience: Experience, 
  isOpen: boolean, 
  onClose: () => void,
  onNext: () => void,
  onPrevious: () => void,
  language: string
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);
  
  // Reset active image index when experience changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [experience]);
  
  if (!isOpen) return null;
  
  // Default gallery to the main image if no gallery is provided
  const gallery = experience.gallery || [experience.image];
  
  // Navigation for next/previous image
  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % gallery.length);
  };
  
  const previousImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop with blur effect */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose}
      ></div>
      
      {/* Modal content */}
      <div 
        className="relative max-w-6xl w-full mx-3 max-h-[90vh] overflow-y-auto glass-card bg-card-bg/95 rounded-xl border border-white/10 shadow-2xl fade-in transform-gpu transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-accent-color transition-colors duration-200"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        
        {/* Modal header */}
        <div className="flex flex-col md:flex-row md:h-[500px]">
          {/* Gallery section */}
          <div className="md:flex-1 relative overflow-hidden h-64 md:h-full">
            {/* Main image */}
            <img 
              src={gallery[activeImageIndex]} 
              alt={experience.title} 
              className="w-full h-full object-cover"
            />
            
            {/* Image navigation left/right */}
            <button 
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-accent-color transition-colors"
              onClick={previousImage}
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-accent-color transition-colors"
              onClick={nextImage}
            >
              <ChevronRight size={24} />
            </button>
            
            {/* Gallery thumbnails */}
            {gallery.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {gallery.map((img, index) => (
                  <button 
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === activeImageIndex 
                        ? 'bg-accent-color' 
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  />
                ))}
              </div>
            )}
            
            {/* Price tag */}
            <div className="absolute top-4 right-16 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-accent-color/30">
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
          
          {/* Content section */}
          <div className="md:flex-1 p-6 md:p-8 md:overflow-y-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {experience.title}
            </h2>
            
            <div className="text-white/80 space-y-4">
              <p className="leading-relaxed">
                {experience.fullDescription || experience.description}
              </p>
              
              {/* Additional details */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3">
                  {language === 'de' ? 'Informationen' : language === 'sv' ? 'Information' : 'Details'}
                </h3>
                
                <ul className="space-y-2">
                  <li className="flex">
                    <span className="text-accent-color mr-2">•</span> 
                    <span>
                      {language === 'de' ? 'Preis' : language === 'sv' ? 'Pris' : 'Price'}: <strong>{experience.price.toLocaleString()} SEK</strong> {language === 'de' ? 'pro Person' : language === 'sv' ? 'per person' : 'per person'}
                    </span>
                  </li>
                  <li className="flex">
                    <span className="text-accent-color mr-2">•</span> 
                    <span>
                      {language === 'de' ? 'Dauer' : language === 'sv' ? 'Varaktighet' : 'Duration'}: <strong>3-4 {language === 'de' ? 'Stunden' : language === 'sv' ? 'timmar' : 'hours'}</strong>
                    </span>
                  </li>
                  <li className="flex">
                    <span className="text-accent-color mr-2">•</span> 
                    <span>
                      {language === 'de' ? 'Gruppengröße' : language === 'sv' ? 'Gruppstorlek' : 'Group size'}: <strong>{language === 'de' ? 'Min. 2, Max. 8 Personen' : language === 'sv' ? 'Min. 2, Max. 8 personer' : 'Min. 2, Max. 8 persons'}</strong>
                    </span>
                  </li>
                  <li className="flex">
                    <span className="text-accent-color mr-2">•</span> 
                    <span>
                      {language === 'de' ? 'Schwierigkeitsgrad' : language === 'sv' ? 'Svårighetsnivå' : 'Difficulty level'}: <strong>{language === 'de' ? 'Einfach bis Mittel' : language === 'sv' ? 'Lätt till medel' : 'Easy to medium'}</strong>
                    </span>
                  </li>
                </ul>
              </div>
              
              {/* CTA button */}
              <div className="mt-8 flex flex-col md:flex-row md:items-center gap-4">
                <a 
                  href="#contact" 
                  onClick={onClose}
                  className="btn-primary inline-flex items-center justify-center gap-2 font-medium text-sm py-3"
                >
                  {language === 'de' ? 'Jetzt Buchen' : language === 'sv' ? 'Boka nu' : 'Book Now'}
                </a>
                
                <div className="flex space-x-3">
                  <button 
                    onClick={onPrevious}
                    className="btn-secondary inline-flex items-center justify-center gap-1 font-medium text-sm py-3 px-4"
                  >
                    <ChevronLeft size={18} />
                    {language === 'de' ? 'Vorheriges' : language === 'sv' ? 'Föregående' : 'Previous'}
                  </button>
                  
                  <button 
                    onClick={onNext}
                    className="btn-secondary inline-flex items-center justify-center gap-1 font-medium text-sm py-3 px-4"
                  >
                    {language === 'de' ? 'Nächstes' : language === 'sv' ? 'Nästa' : 'Next'}
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExperiencesSection() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  
  // Get experiences based on the current language
  const experiences: Experience[] = experiencesByLanguage[language];
  
  // State for the selected experience and modal visibility
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Functions to navigate between experiences
  const navigateToNext = () => {
    if (!selectedExperience) return;
    
    const currentIndex = experiences.findIndex(exp => exp.id === selectedExperience.id);
    const nextIndex = (currentIndex + 1) % experiences.length;
    setSelectedExperience(experiences[nextIndex]);
  };
  
  const navigateToPrevious = () => {
    if (!selectedExperience) return;
    
    const currentIndex = experiences.findIndex(exp => exp.id === selectedExperience.id);
    const previousIndex = (currentIndex - 1 + experiences.length) % experiences.length;
    setSelectedExperience(experiences[previousIndex]);
  };
  
  // Function to open modal with selected experience
  const openExperienceDetail = (experience: Experience) => {
    setSelectedExperience(experience);
    setModalOpen(true);
  };
  
  // Function to close modal
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section id="pakete" className="py-16 md:py-28 relative overflow-hidden">
      {/* Using the global background - no need for section-specific background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 transform-gpu">
        {/* Simple glow effect instead */}
        <div className="aurora-glow absolute inset-0 opacity-30"></div>
        <div className="absolute inset-0 transform-gpu">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-accent-color/5 to-transparent opacity-30 transform-gpu"></div>
        </div>
        
        {/* Stars background effect - added for more depth */}
        <div className="stars absolute inset-0 z-1 opacity-40 transform-gpu will-change-opacity"></div>
      </div>
      
      {/* Subtle pattern overlay - optimized with transform-gpu */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wNCIgZmlsbC1ydWxlPSJub256ZXJvIj48cGF0aCBkPSJNMjkgNTguNWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1em0wIDFhNi41IDYuNSAwIDEgMCAwIDEzIDYuNSA2LjUgMCAwIDAgMC0xM3ptMS0uMDg3YTcuNSA3LjUgMCAxIDEgMCAxNSA3LjUgNy41IDAgMCAxIDAtMTV6TTIwIDU5LjVhNy41IDcuNSAwIDEgMSAwIDE1IDcuNSA3LjUgMCAwIDEgMC0xNXptMCAxYTYuNSA2LjUgMCAxIDAgMCAxMyA2LjUgNi41IDAgMCAwIDAtMTN6bTAtMWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1eiIvPjwvZz48L2c+PC9zdmc+')]  opacity-60 pointer-events-none transform-gpu"></div>
      
{/* Removed background gradient for consistency */}
      
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
                    <button 
                      onClick={() => openExperienceDetail(experience)}
                      className="inline-flex items-center gap-1.5 text-accent-color hover:text-white transition-colors font-medium text-sm"
                    >
                      {language === 'de' ? 'Details ansehen' : language === 'sv' ? 'Visa detaljer' : 'View details'}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
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
      
      {/* Experience Detail Modal */}
      {selectedExperience && (
        <ExperienceDetailModal
          experience={selectedExperience}
          isOpen={modalOpen}
          onClose={closeModal}
          onNext={navigateToNext}
          onPrevious={navigateToPrevious}
          language={language}
        />
      )}
    </section>
  );
}