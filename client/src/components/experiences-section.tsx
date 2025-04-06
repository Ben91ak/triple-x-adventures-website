import { useState, useEffect } from "react";
import { Experience } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Experience data mapped by language
const experiencesByLanguage = {
  en: [
    {
      id: 1,
      title: "Join Us for an Amazing Snowmobile Adventure!",
      description: "Ride across pristine snow in Swedish Lapland with top-of-the-line Ski-doo models. 2hr, 4hr & 6hr tours available.",
      price: 2495,
      image: "/images/Snowmobile/Snowmobile.jpg",
      gallery: [
        "/images/Snowmobile/Snowmobile.jpg",
        "/images/Snowmobile/Snowmobile 2.jpg",
        "/images/Snowmobile/Snowmobile 3.jpg",
        "/images/Snowmobile/Snwomobile 4.jpg"
      ],
      fullDescription: "Feel the excitement as you ride across untouched snow and beautiful winter landscapes. Enjoy the fresh Arctic air and stunning views of Swedish Lapland. Our tours are designed to let you experience the magic of the area with friendly, local guides who love showing you special spots and helping you create great memories. We use the newest Ski-doo Backcountry Adrenalin models, making your ride safe, comfortable, and fun.\n\n━━━ PICK YOUR ADVENTURE ━━━\n\n🔸 2-HOUR BACKCOUNTRY TOUR\nGreat if you're looking for a short, exciting trip into the wild. Includes tea and a tasty snack.\n• One-seater snowmobile\n• Two-seater available on request\n\n🔸 4-HOUR BACKCOUNTRY TOUR\nExplore deeper into nature, with extra time to relax and enjoy the views. Take a break for tea and a sweet snack in beautiful surroundings.\n• One-seater snowmobile\n• Two-seater available on request\n\n🔸 6-HOUR BACKCOUNTRY ADVENTURE\nThe ultimate tour for adventure lovers! Spend the day exploring different terrains and breathtaking sights. This tour includes tea, a sweet snack, and a tasty outdoor lunch.\n• One-seater snowmobile\n• Two-seater available on request\n\n━━━ IMPORTANT INFORMATION ━━━\n\n• Children can join as passengers, making it perfect for family fun\n• Minimum age for drivers: 16 years\n• Valid 125cc driving license required for drivers\n\n━━━━━━━━━━━━━━━━━━━━━━\n\nMore than just a ride—it's about unforgettable moments and exciting adventures in the beautiful Lapland wilderness!",
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
    },
    {
      id: 8,
      title: "Ice Fishing Adventure",
      description: "Try your hand at traditional ice fishing on a frozen lake. Learn techniques from expert guides and enjoy your fresh catch cooked over an open fire.",
      price: 1295,
      image: "/images/Ice-Fishing.jpg",
      gallery: [
        "/images/Ice-Fishing.jpg",
      ],
      fullDescription: "Experience the peaceful tradition of ice fishing in the heart of Lapland's winter wonderland. Your adventure begins with a snowmobile or snowshoe journey to a secluded frozen lake surrounded by pristine forest scenery. Our experienced guides will teach you traditional ice fishing techniques and help you drill holes in the thick ice. As you wait for Arctic fish species like perch and Arctic char to bite, warm yourself by a crackling fire and listen to tales of local fishing traditions. This mindful experience connects you with nature while enjoying the serene beauty of the Arctic wilderness. The highlight of the tour is enjoying your fresh catch, prepared and cooked by your guide over an open fire - the ultimate wild food experience."
    },
    {
      id: 9,
      title: "Side-by-Side Buggy Adventure",
      description: "Navigate snow-covered terrain in a powerful all-terrain buggy. Experience the thrill of drifting and exploring untouched winter landscapes.",
      price: 1895,
      image: "/images/Side-By-Side-Buggy-Drifting.jpg",
      gallery: [
        "/images/Side-By-Side-Buggy-Drifting.jpg",
      ],
      fullDescription: "Experience the ultimate Arctic off-road adventure in our powerful side-by-side buggies. These specialized all-terrain vehicles are designed to conquer the challenging winter landscape with ease, allowing you to access remote areas and enjoy the pristine wilderness. After a comprehensive safety briefing, you'll take the wheel of your own buggy and follow our expert guides along specially designed trails through forests, across frozen lakes, and over snowy hills. Feel the exhilaration as you drift around corners and power through snow drifts in these agile, responsive vehicles. The tour includes stops at scenic viewpoints and a wilderness lunch break. This adventure offers a perfect blend of excitement and natural beauty, suitable for drivers of all skill levels.",
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
      description: "Fahren Sie mit modernen Ski-doo Modellen durch verschneiten Lappland. Touren für 2, 4 & 6 Stunden verfügbar.",
      price: 2495,
      image: "/images/Snowmobile/Snowmobile.jpg",
      gallery: [
        "/images/Snowmobile/Snowmobile.jpg",
        "/images/Snowmobile/Snowmobile 2.jpg",
        "/images/Snowmobile/Snowmobile 3.jpg",
        "/images/Snowmobile/Snwomobile 4.jpg"
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
    },
    {
      id: 8,
      title: "Eisangeln Abenteuer",
      description: "Versuchen Sie sich im traditionellen Eisangeln auf einem gefrorenen See. Lernen Sie Techniken von Experten und genießen Sie Ihren frischen Fang, zubereitet über offenem Feuer.",
      price: 1295,
      image: "/images/Ice-Fishing.jpg",
      gallery: [
        "/images/Ice-Fishing.jpg",
      ]
    },
    {
      id: 9,
      title: "Side-by-Side Buggy Abenteuer",
      description: "Navigieren Sie durch schneebedecktes Gelände in einem leistungsstarken Geländefahrzeug. Erleben Sie den Nervenkitzel des Driftens und erkunden Sie unberührte Winterlandschaften.",
      price: 1895,
      image: "/images/Side-By-Side-Buggy-Drifting.jpg",
      gallery: [
        "/images/Side-By-Side-Buggy-Drifting.jpg",
      ],
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
      description: "Kör genom orörd snö i Svenska Lappland med toppmoderna Ski-doo skotrar. Turer på 2, 4 & 6 timmar finns.",
      price: 2495,
      image: "/images/Snowmobile/Snowmobile.jpg",
      gallery: [
        "/images/Snowmobile/Snowmobile.jpg",
        "/images/Snowmobile/Snowmobile 2.jpg",
        "/images/Snowmobile/Snowmobile 3.jpg",
        "/images/Snowmobile/Snwomobile 4.jpg"
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
    },
    {
      id: 8,
      title: "Pimpelfiske Äventyr",
      description: "Prova på traditionellt pimpelfiske på en frusen sjö. Lär dig tekniker från expertguider och njut av din nyfångade fisk tillagad över öppen eld.",
      price: 1295,
      image: "/images/Ice-Fishing.jpg",
      gallery: [
        "/images/Ice-Fishing.jpg",
      ]
    },
    {
      id: 9,
      title: "Side-by-Side Buggy Äventyr",
      description: "Navigera i snötäckt terräng i en kraftfull terrängbuggy. Upplev spänningen med att drifta och utforska orörda vinterlandskap.",
      price: 1895,
      image: "/images/Side-By-Side-Buggy-Drifting.jpg",
      gallery: [
        "/images/Side-By-Side-Buggy-Drifting.jpg",
      ],
      tag: {
        text: "Ny",
        type: "new" as "new"
      }
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
  
  // Fix image paths if needed
  const fixImagePath = (path: string): string => {
    if (path.startsWith('/')) {
      // Remove leading slash to help with path resolution
      return path.substring(1);
    }
    return path;
  };
  
  // Default gallery to the main image if no gallery is provided
  const gallery = (experience.gallery || [experience.image]).map(fixImagePath);
  
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
              loading="eager"
              decoding="async"
              width="800"
              height="600" 
              onError={(e) => {
                console.error(`Error loading modal image: ${gallery[activeImageIndex]}`);
                e.currentTarget.src = '/images/TXA_fallback.jpg';
                e.currentTarget.onerror = null; // Prevent infinite error loops
              }}
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
            
            {/* Price tag removed as requested */}
            
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
              {/* Check if fullDescription exists and contains structured sections */}
              {experience.fullDescription && experience.fullDescription.includes('PICK YOUR ADVENTURE') ? (
                <div className="leading-relaxed">
                  {/* Introduction text */}
                  <p className="mb-6">
                    {experience.fullDescription.split('━━━ PICK YOUR ADVENTURE ━━━')[0].trim()}
                  </p>
                  
                  {/* Adventure section */}
                  <div className="mb-6">
                    <h3 className="text-white font-bold text-lg flex items-center gap-2 mb-4">
                      <span className="h-px w-6 bg-accent-color"></span>
                      <span>PICK YOUR ADVENTURE</span>
                      <span className="h-px flex-grow bg-accent-color"></span>
                    </h3>
                    
                    <div className="space-y-6">
                      {/* 2-HOUR TOUR */}
                      <div className="bg-card-bg/20 rounded-lg p-4 border border-white/10">
                        <h4 className="text-accent-color font-semibold mb-2 flex items-center gap-2">
                          <span className="inline-block w-4 h-4 bg-accent-color/70 rotate-45"></span>
                          <span>2-HOUR BACKCOUNTRY TOUR</span>
                        </h4>
                        <p className="ml-6 mb-2">Great if you're looking for a short, exciting trip into the wild. Includes tea and a tasty snack.</p>
                        <ul className="ml-6 list-disc list-inside space-y-1 text-sm text-white/90">
                          <li>One-seater snowmobile</li>
                          <li>Two-seater available on request</li>
                        </ul>
                      </div>
                      
                      {/* 4-HOUR TOUR */}
                      <div className="bg-card-bg/20 rounded-lg p-4 border border-white/10">
                        <h4 className="text-accent-color font-semibold mb-2 flex items-center gap-2">
                          <span className="inline-block w-4 h-4 bg-accent-color/90 rotate-45"></span>
                          <span>4-HOUR BACKCOUNTRY TOUR</span>
                        </h4>
                        <p className="ml-6 mb-2">Explore deeper into nature, with extra time to relax and enjoy the views. Take a break for tea and a sweet snack in beautiful surroundings.</p>
                        <ul className="ml-6 list-disc list-inside space-y-1 text-sm text-white/90">
                          <li>One-seater snowmobile</li>
                          <li>Two-seater available on request</li>
                        </ul>
                      </div>
                      
                      {/* 6-HOUR TOUR */}
                      <div className="bg-card-bg/20 rounded-lg p-4 border border-white/10">
                        <h4 className="text-accent-color font-semibold mb-2 flex items-center gap-2">
                          <span className="inline-block w-4 h-4 bg-accent-color rotate-45"></span>
                          <span>6-HOUR BACKCOUNTRY ADVENTURE</span>
                        </h4>
                        <p className="ml-6 mb-2">The ultimate tour for adventure lovers! Spend the day exploring different terrains and breathtaking sights. This tour includes tea, a sweet snack, and a tasty outdoor lunch.</p>
                        <ul className="ml-6 list-disc list-inside space-y-1 text-sm text-white/90">
                          <li>One-seater snowmobile</li>
                          <li>Two-seater available on request</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Important information section */}
                  <div>
                    <h3 className="text-white font-bold text-lg flex items-center gap-2 mb-4">
                      <span className="h-px w-6 bg-accent-color"></span>
                      <span>IMPORTANT INFORMATION</span>
                      <span className="h-px flex-grow bg-accent-color"></span>
                    </h3>
                    
                    <ul className="list-disc list-inside space-y-2 ml-4 text-white/90">
                      <li>Children can join as passengers, making it perfect for family fun</li>
                      <li>Minimum age for drivers: 18 years</li>
                      <li>Valid B driving license required for drivers</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="leading-relaxed">
                  {experience.fullDescription || experience.description}
                </p>
              )}
              
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
        <div className="flex flex-col md:flex-row items-start justify-between mb-16">
          <div className="text-center md:text-left mb-8 md:mb-0 flex-grow">
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
          

        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 will-change-transform transform-gpu contain-layout">
          {experiences.map((experience) => (
            <div 
              key={experience.id} 
              className="group relative will-change-transform transition-all duration-300 hover:translate-y-[-5px] transform-gpu content-visibility-auto"
              style={{ containIntrinsicSize: '0 445px' }} /* Pre-allocate space for better scroll performance */
            >
              {/* Card background glow effect - optimized with reduced blur and transform-gpu */}
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-color/20 to-transparent rounded-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300 blur-md transform-gpu will-change-opacity"></div>
              
              <div className="glass-card relative z-10 overflow-hidden bg-card-bg/70 backdrop-blur-md border border-white/20 rounded-xl hover:shadow-lg hover:border-accent-color/30 hover:shadow-accent-color/10 transition-all duration-300 transform-gpu">
                <div className="relative h-[225px] overflow-hidden">
                  {/* Image with overlay - using loading=lazy for images below the fold */}
                  <img 
                    src={experience.image.startsWith('/') ? experience.image.substring(1) : experience.image} 
                    alt={experience.title} 
                    loading={experience.id > 3 ? "lazy" : "eager"} /* Lazy load images that are likely below the fold */
                    decoding="async" 
                    width="640" 
                    height="480"
                    onError={(e) => {
                      console.error(`Error loading image: ${experience.image}`);
                      // Fall back to our backup image if loading fails
                      e.currentTarget.src = '/images/TXA_fallback.jpg';
                      e.currentTarget.onerror = null; // Prevent infinite error loops
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                  
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
                
                <div className="p-6 flex flex-col h-[220px]">
                  <h3 className="font-bold text-xl mb-3 text-white group-hover:text-accent-color transition-colors">
                    {experience.title}
                  </h3>
                  <div className="mb-4 text-white text-opacity-80 text-sm flex-grow overflow-hidden">
                    <div className="h-full overflow-y-auto pr-2 pb-2">
                      {experience.description}
                    </div>
                  </div>
                  <div className="flex justify-end items-center mt-auto">
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