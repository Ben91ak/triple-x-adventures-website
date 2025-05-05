import React, { useState, useEffect, useRef } from "react";
import { Experience } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { 
  X, ChevronLeft, ChevronRight, ArrowRight, Filter, Snowflake, Play, Compass, Tag, 
  Clock, Zap, Star, Sun, Utensils, Mountain, MapPin, Users, Trees, Fish, Check, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Custom hook for parallax effect
function useParallax(speed = 0.03) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      
      const x = (e.clientX - rect.left - rect.width / 2) * speed;
      const y = (e.clientY - rect.top - rect.height / 2) * speed;
      
      setPosition({ x, y });
    };

    const element = ref.current;
    element.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
    };
  }, [speed]);

  return { ref, position };
}

// ----- ICON MAPPING ----- 
const iconMap = {
  duration: <Clock className="w-4 h-4 mr-1.5 text-accent-color/80" />,
  intensity: <Zap className="w-4 h-4 mr-1.5 text-accent-color/80" />,
  highlight: <Star className="w-4 h-4 mr-1.5 text-accent-color/80" />,
  bestseller: <Star className="w-4 h-4 text-yellow-400" />,
  featured: <Sun className="w-4 h-4 text-orange-400" />,
  new: <Sparkles className="w-4 h-4 text-blue-400" />,
  // Category Icons
  winter: <Snowflake className="w-4 h-4 mr-1.5 text-blue-300" />,
  adventure: <Mountain className="w-4 h-4 mr-1.5 text-orange-400" />,
  culture: <Users className="w-4 h-4 mr-1.5 text-purple-400" />,
  water: <Fish className="w-4 h-4 mr-1.5 text-cyan-400" />,
  dining: <Utensils className="w-4 h-4 mr-1.5 text-amber-400" />,
  scenic: <Trees className="w-4 h-4 mr-1.5 text-green-400" />,
  all: <MapPin className="w-4 h-4 mr-1.5" />,
};

// Category types for filtering
type ExperienceCategory = 'all' | 'adventure' | 'winter' | 'culture' | 'water' | 'dining' | 'scenic';

// Function to determine category based on experience title/description
function getCategoryFromExperience(experience: Experience): ExperienceCategory[] {
  const text = (experience.title + ' ' + experience.description).toLowerCase();
  const categories: ExperienceCategory[] = [];
  
  if (text.includes('snowmobile') || text.includes('snow') || text.includes('ice') || 
      text.includes('winter') || text.includes('drift') || text.includes('husky')) {
    categories.push('winter');
  }
  
  if (text.includes('helicopter') || text.includes('adventure') || 
      text.includes('buggy') || text.includes('side') || text.includes('expedition')) {
    categories.push('adventure');
  }
  
  if (text.includes('fishing') || text.includes('boat')) {
    categories.push('water');
  }
  
  if (text.includes('reindeer') || text.includes('sami') || text.includes('culture')) {
    categories.push('culture');
  }
  
  if (text.includes('restaurant') || text.includes('dining') || text.includes('food')) {
    categories.push('dining');
  }
  
  if (text.includes('helicopter') || text.includes('sightseeing') || text.includes('northern lights')) {
    categories.push('scenic');
  }
  
  // Always have at least one category
  if (categories.length === 0) {
    if (text.includes('snow') || text.includes('ice')) categories.push('winter');
    else categories.push('adventure'); 
  }
  
  return Array.from(new Set(categories)); // Ensure unique categories
}

// Helper to get intensity color
const getIntensityColor = (level: Experience['intensityLevel']) => {
  switch (level) {
    case 'Relaxed': return 'text-green-400';
    case 'Moderate': return 'text-yellow-400';
    case 'Thrilling': return 'text-orange-400';
    case 'Extreme': return 'text-red-500';
    default: return 'text-gray-400';
  }
};

// ----- EXPERIENCE CARD COMPONENT -----
interface ExperienceCardProps {
  experience: Experience;
  language: string;
  onOpenDetail: (experience: Experience, e: React.MouseEvent) => void;
  delay?: number;
}

function ExperienceCard({ 
  experience, 
  language, 
  onOpenDetail, 
  delay = 0
}: ExperienceCardProps) {
  const t = useTranslation(language as any);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [fallbackUsed, setFallbackUsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { ref, position } = useParallax(0.03);
  
  // Get experience categories for display
  const categories = getCategoryFromExperience(experience);
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (!fallbackUsed) {
      console.error("Failed to load card image, trying fallback:", (e.target as HTMLImageElement).src);
      
      // Try direct fallback based on title
      let fallbackPath = "/images/TXA_fallback.jpg"; // Default fallback
      const title = experience.title.toLowerCase();
      
      if (title.includes("snowmobile")) {
        // Assumes specific image inside directory exists
        fallbackPath = "/images/Snowmobile/Snowmobile 1_result.webp"; 
      } else if (title.includes("restaurant") || title.includes("jayjay")) {
        // Keep this specific restaurant image reference
        fallbackPath = "/images/JayJays-Restaurant.jpg"; 
      } else if (title.includes("kart")) {
        fallbackPath = "/images/ice-kart.jpg"; // Use correct filename casing
      } else if (title.includes("reindeer")) {
        fallbackPath = "/images/Reindeers.jpg"; // Use correct filename
      } else if (title.includes("helicopter") || title.includes("helikopter")) {
        fallbackPath = "/images/Helikopter.jpg"; // Use correct filename
      } else if (title.includes("drift")) {
        fallbackPath = "/images/Drifting.jpg"; // Use correct filename
      } else if (title.includes("fishing")) {
        fallbackPath = "/images/Ice-Fishing.jpg"; // Use correct filename
      } else if (title.includes("buggy") || title.includes("side")) {
        fallbackPath = "/images/Side-By-Side-Buggy-Drifting.jpg"; // Use correct filename
      } else if (title.includes("husky") || title.includes("dog")) {
        // Assumes specific image inside directory exists
        fallbackPath = "/images/Huskys/Husky 1_result.webp"; 
      }
      
      (e.target as HTMLImageElement).src = fallbackPath;
      setFallbackUsed(true);
    } else {
      // If even the fallback fails, use ultimate fallback
      console.error("Fallback image also failed, using final fallback");
      (e.target as HTMLImageElement).src = "/images/TXA_fallback.jpg";
    }
  };

  // Get icon for category
  const getCategoryIcon = (category: ExperienceCategory) => {
    switch(category) {
      case 'winter': return <Snowflake className="w-4 h-4" />;
      case 'adventure': return <Compass className="w-4 h-4" />;
      case 'water': return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
      case 'culture': return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>;
      default: return <Tag className="w-4 h-4" />;
    }
  };

  return (
    <motion.div 
      ref={ref}
      className="flex flex-col h-full group"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="glass-card relative overflow-hidden flex flex-col flex-grow border border-white/10 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          {/* Loading State */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-card-bg/80 z-10">
              <div className="w-8 h-8 border-t-2 border-accent-color rounded-full animate-spin"></div>
            </div>
          )}
          {/* Parallax Image */}
          <motion.img 
            src={experience.image} 
            alt={experience.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out"
            style={{
              scale: isHovered ? 1.05 : 1,
              x: isHovered ? position.x : 0,
              y: isHovered ? position.y : 0,
            }}
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
            loading="lazy"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          
          {/* Tag */}
          {experience.tag && (
            <div className={`absolute top-3 right-3 z-20 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center shadow-lg backdrop-blur-sm
              ${experience.tag.type === 'bestseller' ? 'bg-yellow-500/95 text-black' : 
               experience.tag.type === 'new' ? 'bg-blue-500/95 text-white' : 
               'bg-accent-color/95 text-black'}
            `}>
              {iconMap[experience.tag.type]}
              <span className="ml-1 font-bold">{experience.tag.text}</span>
            </div>
          )}
        </div>
        
        {/* Content Section */}
        <div className="p-5 flex flex-col flex-grow bg-gradient-to-b from-black/70 to-black/90 backdrop-blur-sm">
          <h3 className="font-bold text-lg mb-2 text-white group-hover:text-accent-color transition-colors duration-200 drop-shadow-md">
            {experience.title}
          </h3>
          
          {/* Key Info Row */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-white mb-3">
            {experience.duration && (
              <span className="flex items-center bg-white/10 backdrop-blur-sm px-2 py-1 rounded-md"> 
                {iconMap.duration} {experience.duration} 
              </span>
            )}
            {experience.intensityLevel && (
              <span className={`flex items-center bg-white/10 backdrop-blur-sm px-2 py-1 rounded-md ${getIntensityColor(experience.intensityLevel)}`}>
                {iconMap.intensity}
                {experience.intensityLevel}
              </span>
            )}
          </div>

          {/* Short Description */}
          <p className="text-sm text-white/90 mb-4 line-clamp-3 flex-grow">
            {experience.description}
          </p>
          
          {/* Key Highlights (optional) */}
          {experience.keyHighlights && experience.keyHighlights.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-3">
              {experience.keyHighlights.slice(0, 2).map((highlight, idx) => (
                <span key={idx} className="flex items-center text-xs text-white/80">
                  {iconMap.highlight}
                  {highlight}
                </span>
              ))}
            </div>
          )}

          {/* Action Button */}
          <motion.button
            onClick={(e) => onOpenDetail(experience, e)}
            className="btn-primary text-center w-full inline-flex items-center justify-center text-sm py-3 mt-auto font-bold shadow-lg"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            aria-label={`View details for ${experience.title}`}
          >
            {t.experiences.viewDetails}
            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ----- MODAL COMPONENT (ADJUSTED FOR NEW FIELDS) ----- 
interface ExperienceDetailModalProps {
  experience: Experience | null;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  language: string;
}

const ExperienceDetailModal = React.memo(function ExperienceDetailModal({ 
  experience, 
  isOpen, 
  onClose, 
  onNext, 
  onPrevious,
  language
}: ExperienceDetailModalProps) {
  if (!experience || !isOpen) return null;
  
  const t = useTranslation(language as any);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [fallbackUsed, setFallbackUsed] = useState(false);
  const [showFullGallery, setShowFullGallery] = useState(false);
  
  const galleryLength = experience.gallery?.length || 0;
  const hasGallery = galleryLength > 0;
  const categories = getCategoryFromExperience(experience);
  
  useEffect(() => {
    if (isOpen && experience) {
      setCurrentImageIndex(0);
      setImageLoaded(false);
      setFallbackUsed(false);
      setShowFullGallery(false);
    }
  }, [isOpen, experience]);

  // Define types for the fallback image mapping
  type ExperienceType = 'snowmobile' | 'husky' | 'snowshoe' | 'fishing' | 'reindeer' | 'helicopter' | 'drift' | 'buggy' | 'restaurant' | 'kart' | 'aurora';

  type FallbackImageConfig = {
    patterns: string[];
    paths: string[];
    default: string;
  };

  type FallbackImageMap = {
    [key in ExperienceType]: FallbackImageConfig;
  };

  const fallbackImageMap: FallbackImageMap = {
    snowmobile: {
      patterns: ["Snowmobile 1_result.webp", "Snowmobile 2_result.webp", "Snowmobile 3_result.webp", "Snowmobile 4_result.webp"],
      paths: ["/images/Snowmobile/Snowmobile 1_result.webp", "/images/Snowmobile/Snowmobile 2_result.webp", "/images/Snowmobile/Snowmobile 3_result.webp", "/images/Snowmobile/Snowmobile 4_result.webp"],
      default: "/images/Snowmobile/Snowmobile 1_result.webp"
    },
    husky: {
      patterns: ["Husky 1_result.webp", "Husky 2_result.webp", "Husky 3_result.webp", "Husky 4_result.webp"],
      paths: ["/images/Huskys/Husky 1_result.webp", "/images/Huskys/Husky 2_result.webp", "/images/Huskys/Husky 3_result.webp", "/images/Huskys/Husky 4_result.webp"],
      default: "/images/Huskys/Husky 1_result.webp"
    },
    snowshoe: {
      patterns: ["snowtorch1.webp", "snowtorch2.webp", "snowtorch3webp.webp", "snowtorch4.webp"],
      paths: ["/images/Snowshoe_Torchwalk/snowtorch1.webp", "/images/Snowshoe_Torchwalk/snowtorch2.webp", "/images/Snowshoe_Torchwalk/snowtorch3webp.webp", "/images/Snowshoe_Torchwalk/snowtorch4.webp"],
      default: "/images/Snowshoe_Torchwalk/snowtorch1.webp"
    },
    fishing: {
      patterns: ["Icefish 1_result.webp", "Icefish 2_result.webp", "Shoot 3_result.webp", "Shoot 4_result.webp"],
      paths: ["/images/Ice Fishing/Icefish 1_result.webp", "/images/Ice Fishing/Icefish 2_result.webp", "/images/Ice Fishing/Shoot 3_result.webp", "/images/Ice Fishing/Shoot 4_result.webp"],
      default: "/images/Ice-Fishing.jpg"
    },
    reindeer: {
      patterns: ["Reindeers 1_result.webp", "Reindeers 2_result.webp", "Reindeers 3_result.webp", "Reindeers 5_result.webp"],
      paths: ["/images/Reindeers/Reindeers 1_result.webp", "/images/Reindeers/Reindeers 2_result.webp", "/images/Reindeers/Reindeers 3_result.webp", "/images/Reindeers/Reindeers 5_result.webp"],
      default: "/images/Reindeers.jpg"
    },
    helicopter: {
      patterns: ["Helikopter.jpg", "Helikopter 2.jpg", "Helikopter 3.jpg", "Helicopter 1_result.webp", "Helicopter 2_result.webp", "Helicopter 3_result.webp", "Helicopter 4_result.webp"],
      paths: ["/images/Helikopter.jpg", "/images/Helicopter/Helicopter 1_result.webp", "/images/Helicopter/Helicopter 2_result.webp", "/images/Helicopter/Helicopter 1_result.webp", "/images/Helicopter/Helicopter 2_result.webp", "/images/Helicopter/Helicopter 3_result.webp", "/images/Helicopter/Helicopter 4_result.webp"],
      default: "/images/Helikopter.jpg"
    },
    drift: {
      patterns: ["Drifting.jpg", "Cars 1_result.webp", "Cars 2_result.webp", "Cars 3_result.webp"],
      paths: ["/images/Drifting.jpg", "/images/Ice Drift/Cars 1_result.webp", "/images/Ice Drift/Cars 2_result.webp", "/images/Ice Drift/Cars 3_result.webp"],
      default: "/images/Drifting.jpg"
    },
    buggy: {
      patterns: ["SBS 1_result.webp", "SBS 2_result.webp", "SBS 3_result.webp", "Buggy 1.jpg", "Buggy 2.jpg", "Buggy 3.jpg", "Buggy 4.jpg"],
      paths: ["/images/Side by Side/SBS 1_result.webp", "/images/Side by Side/SBS 2_result.webp", "/images/Side by Side/SBS 3_result.webp", "/images/Buggy/Buggy 1.jpg", "/images/Buggy/Buggy 2.jpg", "/images/Buggy/Buggy 3.jpg", "/images/Buggy/Buggy 4.jpg"],
      default: "/images/Side-By-Side-Buggy-Drifting.jpg"
    },
    restaurant: {
      patterns: ["JayJays-Restaurant.jpg", "Restaurant Interior.jpg", "Restaurant Food.jpg"],
      paths: ["/images/JayJays-Restaurant.jpg", "/images/JayJays Restaurant/Restaurant 1_result.webp", "/images/JayJays Restaurant/Restaurant 2_result.webp"],
      default: "/images/JayJays-Restaurant.jpg"
    },
    kart: {
      patterns: ["Ice Kart.jpg"],
      paths: ["/images/Ice Kart.jpg"],
      default: "/images/Ice Kart.jpg"
    },
    aurora: {
      patterns: ["Aurora 1.jpg", "Aurora 2.jpg", "Aurora 3.jpg", "Aurora 4.jpg"],
      paths: ["/images/Aurora/Aurora 1.jpg", "/images/Aurora/Aurora 2.jpg", "/images/Aurora/Aurora 3.jpg", "/images/Aurora/Aurora 4.jpg"],
      default: "/images/Aurora/Aurora 1.jpg"
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (!fallbackUsed) {
      console.error("Failed to load modal image:", (e.target as HTMLImageElement).src);
      let fallbackPath = "/images/TXA_fallback.jpg"; // Default fallback
      const title = experience.title.toLowerCase();
      const currentSrc = (e.target as HTMLImageElement).src;
      
      // Determine experience type based on title keywords
      let experienceType: ExperienceType | null = null;
      if (title.includes("snowmobile")) {
        experienceType = "snowmobile";
      } else if (title.includes("husky") || title.includes("dog")) {
        experienceType = "husky";
      } else if (title.includes("snowshoe") || title.includes("torch")) {
        experienceType = "snowshoe";
      } else if (title.includes("fishing")) {
        experienceType = "fishing";
      } else if (title.includes("reindeer")) {
        experienceType = "reindeer";
      } else if (title.includes("helicopter") || title.includes("helikopter")) {
        experienceType = "helicopter";
      } else if (title.includes("drift")) {
        experienceType = "drift";
      } else if (title.includes("buggy") || title.includes("side")) {
        experienceType = "buggy";
      } else if (title.includes("restaurant") || title.includes("jayjay")) {
        experienceType = "restaurant";
      } else if (title.includes("kart")) {
        experienceType = "kart";
      } else if (title.includes("aurora") || title.includes("northern lights")) {
        experienceType = "aurora";
      }
      
      // If we have a mapping for this experience type, use it to find the appropriate fallback
      if (experienceType) {
        const mapping = fallbackImageMap[experienceType];
        
        // Find matching pattern
        const index = mapping.patterns.findIndex((pattern: string) => currentSrc.includes(pattern));
        
        // Use corresponding path or default
        fallbackPath = index !== -1 ? mapping.paths[index] : mapping.default;
      }
      
      // Set the fallback image
      (e.target as HTMLImageElement).src = fallbackPath;
      setFallbackUsed(true);
    } else {
      // If even the fallback fails, use ultimate fallback
      (e.target as HTMLImageElement).src = "/images/TXA_fallback.jpg";
    }
  };

  const handleNext = () => {
    if (!hasGallery || galleryLength <= 1) return;
    setCurrentImageIndex((prev) => (prev + 1) % galleryLength);
    setImageLoaded(false);
    setFallbackUsed(false);
  };

  const handlePrevious = () => {
    if (!hasGallery || galleryLength <= 1) return;
    setCurrentImageIndex((prev) => (prev - 1 + galleryLength) % galleryLength);
    setImageLoaded(false);
    setFallbackUsed(false);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
    setImageLoaded(false);
    setFallbackUsed(false);
  };

  const currentImage = hasGallery ? experience.gallery![currentImageIndex] : experience.image;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div 
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>

          {/* Modal */}
          <motion.div 
            className="glass-card relative max-w-6xl w-full max-h-[90vh] overflow-hidden rounded-xl border border-white/10 shadow-2xl flex flex-col lg:flex-row"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close button */} 
            <motion.button
              onClick={onClose}
              className="absolute top-3 right-3 z-50 p-2 rounded-full bg-black/60 hover:bg-accent-color transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-white" />
            </motion.button>

            {/* Full gallery overlay (remains the same) */}
            {showFullGallery && hasGallery && galleryLength > 1 && (
              <motion.div 
                className="absolute inset-0 z-40 bg-black/95 p-6 sm:p-10 flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* ... Gallery overlay content ... */}
                 <div className="flex justify-between items-center mb-4 sm:mb-6">
                   <h3 className="text-lg sm:text-xl text-white font-semibold">Gallery</h3>
                   <motion.button
                     onClick={() => setShowFullGallery(false)}
                     className="p-1.5 sm:p-2 rounded-full bg-black/70 hover:bg-accent-color transition-colors"
                     whileHover={{ scale: 1.1 }}
                     whileTap={{ scale: 0.9 }}
                   >
                     <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                   </motion.button>
                 </div>
                 
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 flex-grow overflow-auto custom-scrollbar">
                   {experience.gallery!.map((image, idx) => (
                     <motion.div 
                       key={idx}
                       className={`relative overflow-hidden rounded-lg cursor-pointer aspect-video
                         ${idx === currentImageIndex ? 'ring-2 ring-accent-color' : ''}
                       `}
                       whileHover={{ scale: 1.02 }}
                       onClick={() => {
                         handleThumbnailClick(idx);
                         setShowFullGallery(false);
                       }}
                     >
                       <img 
                         src={image} 
                         alt={`${experience.title} - Image ${idx + 1}`}
                         className="w-full h-full object-cover"
                         onError={handleImageError}
                       />
                       <div className="absolute inset-0 bg-black/10 hover:bg-black/30 transition-colors"></div>
                     </motion.div>
                   ))}
                 </div>
              </motion.div>
            )}

            {/* Left: Image section (slightly adjusted for better space) */}
            <div className="relative w-full lg:w-3/5 h-64 lg:h-auto flex-shrink-0">
              {/* Loading state */} 
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-card-bg/80 z-10">
                  <div className="w-10 h-10 border-t-2 border-accent-color rounded-full animate-spin"></div>
                </div>
              )}
              {/* Main Image */} 
              <motion.div className="relative h-full overflow-hidden">
                <motion.img
                  src={currentImage}
                  alt={`${experience.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  onLoad={() => setImageLoaded(true)}
                  onError={handleImageError}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  key={currentImage}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                
                {/* Navigation Buttons */} 
                {hasGallery && galleryLength > 1 && (
                  <>
                    <motion.button /* Previous */
                      onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-accent-color/80 transition-colors z-20"
                      whileHover={{ scale: 1.1, x: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft className="w-5 h-5 text-white" />
                    </motion.button>
                    <motion.button /* Next */
                      onClick={(e) => { e.stopPropagation(); handleNext(); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-accent-color/80 transition-colors z-20"
                      whileHover={{ scale: 1.1, x: 2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight className="w-5 h-5 text-white" />
                    </motion.button>
                  </>
                )}
                
                {/* Counter & View All */} 
                {hasGallery && galleryLength > 1 && (
                  <div className="absolute bottom-3 right-3 flex items-center z-30 space-x-2">
                    <motion.button
                      onClick={() => setShowFullGallery(true)}
                      className="px-3 py-1 bg-black/70 text-white text-xs rounded-md hover:bg-accent-color/90 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View All
                    </motion.button>
                    <div className="bg-black/70 text-white text-xs px-2.5 py-1 rounded-md">
                      {currentImageIndex + 1} / {galleryLength}
                    </div>
                  </div>
                )}
                
                {/* Thumbnails */}
                {hasGallery && galleryLength > 1 && (
                  <div className="absolute bottom-12 left-3 right-3 overflow-x-auto scrollbar-hide z-20">
                    <motion.div className="flex space-x-2 p-1">
                      {experience.gallery!.map((thumb, idx) => (
                        <motion.div
                          key={idx}
                          className={`flex-shrink-0 w-14 h-14 rounded-md overflow-hidden cursor-pointer border-2 transition-all duration-200
                            ${idx === currentImageIndex ? 'border-accent-color opacity-100 scale-105' : 'border-transparent opacity-60 hover:opacity-90'}
                          `}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleThumbnailClick(idx)}
                        >
                          <img src={thumb} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" onError={handleImageError}/>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Right: Details section - Reworked for structured data */}
            <div className="w-full lg:w-2/5 p-5 sm:p-6 flex flex-col overflow-y-auto custom-scrollbar flex-grow">
              {/* Title & Basic Info */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{experience.title}</h2>
                {/* Categories & Tag */} 
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {categories.map((category, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-black/30 border border-white/10 rounded-full text-xs text-white/80 flex items-center">
                      {iconMap[category]} <span className="ml-1 capitalize">{category}</span>
                    </span>
                  ))}
                  {experience.tag && (
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center ml-auto
                      ${experience.tag.type === 'bestseller' ? 'bg-yellow-500/90 text-black' : 
                      experience.tag.type === 'new' ? 'bg-blue-500/90 text-white' : 
                      'bg-accent-color/90 text-black'}
                    `}>
                      {iconMap[experience.tag.type]} <span className="ml-1">{experience.tag.text}</span>
                    </span>
                  )}
                </div>
                
                {/* Structured Key Info */} 
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-5 border-y border-white/10 py-4">
                  {experience.duration && (
                    <div className="flex items-center text-sm text-white/90">
                      {iconMap.duration}
                      <div>
                        <span className="block text-xs text-white/60">Duration</span>
                        {experience.duration}
                      </div>
                    </div>
                  )}
                  {experience.intensityLevel && (
                    <div className="flex items-center text-sm text-white/90">
                      {iconMap.intensity}
                      <div>
                        <span className="block text-xs text-white/60">Intensity</span>
                        <span className={getIntensityColor(experience.intensityLevel)}>{experience.intensityLevel}</span>
                      </div>
                    </div>
                  )}
                   {/* Add Price display if available */}
                   {experience.price && (
                    <div className="flex items-center text-sm text-white/90">
                      <span className="text-accent-color/80 mr-1.5">€</span>
                      <div>
                        <span className="block text-xs text-white/60">Starting Price</span>
                        {experience.price}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
              
              {/* Key Highlights & Description */} 
              <motion.div 
                className="text-white/90 mb-6 flex-grow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {experience.keyHighlights && experience.keyHighlights.length > 0 && (
                  <div className="mb-5">
                    <h3 className="text-md font-semibold text-white mb-2 flex items-center">
                      <Star className="w-4 h-4 mr-2 text-accent-color"/> Key Highlights
                    </h3>
                    <ul className="space-y-1.5 pl-1">
                      {experience.keyHighlights.map((highlight, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <Check className="w-3.5 h-3.5 mr-2 mt-0.5 text-accent-color flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="prose prose-sm prose-invert max-w-none text-white/80 leading-relaxed">
                  {/* Render detailedInfo if available, otherwise fallback to description */}
                  {experience.detailedInfo ? (
                    <>
                      {/* Introduction */}
                      {experience.detailedInfo.introduction && <p>{experience.detailedInfo.introduction}</p>}
                      
                      {/* Adventure Options / Tours */}
                      {experience.detailedInfo.tours && experience.detailedInfo.tours.length > 0 && (
                        <div className="mt-4">
                          {experience.detailedInfo.adventureOptionsTitle && (
                            <h4 className="font-semibold text-white mb-2 text-base">{experience.detailedInfo.adventureOptionsTitle}</h4>
                          )}
                          <div className="space-y-3">
                            {experience.detailedInfo.tours.map((tour: { title: string; description?: string; details?: string[] }, index: number) => (
                              <div key={index} className="pl-2 border-l-2 border-white/10 py-1">
                                <h5 className="font-semibold text-white mb-0.5">{tour.title}</h5>
                                {tour.description && <p className="text-sm text-white/70 my-0.5">{tour.description}</p>}
                                {tour.details && tour.details.length > 0 && (
                                  <ul className="list-disc list-outside pl-5 mt-1 space-y-0.5 text-xs text-white/70">
                                    {tour.details.map((detail: string, detailIndex: number) => (
                                      <li key={detailIndex}>{detail}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Important Information */}
                      {experience.detailedInfo.importantInfo && experience.detailedInfo.importantInfo.length > 0 && (
                         <div className="mt-4">
                          {experience.detailedInfo.importantInfoTitle && (
                            <h4 className="font-semibold text-white mb-2 text-base">{experience.detailedInfo.importantInfoTitle}</h4>
                          )}
                          <ul className="list-disc list-outside pl-5 space-y-0.5 text-sm text-white/70">
                            {experience.detailedInfo.importantInfo.map((info: string, index: number) => (
                              <li key={index}>{info}</li>
                            ))}
                          </ul>
                         </div>
                      )}
                      
                      {/* Closing Remark */}
                      {experience.detailedInfo.closingRemark && <p className="mt-4 text-sm italic text-white/70">{experience.detailedInfo.closingRemark}</p>}
                    </>
                  ) : (
                    // Fallback for experiences without detailedInfo
                    <p>{experience.description}</p>
                  )}
                </div>
              </motion.div>

              {/* Action Buttons - Placed at the bottom */} 
              <motion.div 
                className="mt-auto pt-4 border-t border-white/10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button
                  onClick={() => { console.log('Book now clicked:', experience.title); alert('Booking coming soon!'); onClose(); }}
                  className="btn-primary w-full inline-flex items-center justify-center text-base px-6 py-2.5 mb-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t.experiences.bookNow}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
                
                {/* Next/Previous Buttons */} 
                <div className="flex justify-between text-xs">
                  <motion.button 
                    onClick={onPrevious}
                    className="p-1.5 rounded-md text-white/70 hover:bg-white/10 hover:text-white transition-colors flex items-center"
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" /> Prev
                  </motion.button>
                  <motion.button 
                    onClick={onNext}
                    className="p-1.5 rounded-md text-white/70 hover:bg-white/10 hover:text-white transition-colors flex items-center"
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Next <ChevronRight className="w-4 h-4 ml-1" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

// ----- MAIN COMPONENT -----
export function ExperiencesSection() {
  const { language } = useLanguage();
  const t = useTranslation(language as any);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // State for experience data and UI interaction
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ExperienceCategory>('all');
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredExperience, setHoveredExperience] = useState<number | null>(null);
  
  // Get experiences from translations
  const experiences: Experience[] = t.experiences.list.map((exp: any) => ({ // Use 'any' temporarily if types mismatch during transition
    ...exp,
    tag: exp.tag ? {
      ...exp.tag,
      type: exp.tag.type as "bestseller" | "featured" | "new"
    } : undefined,
    // Ensure new fields are present, even if undefined
    duration: exp.duration,
    intensityLevel: exp.intensityLevel,
    keyHighlights: exp.keyHighlights,
  }));
  
  // Filter experiences based on active category and search
  const filteredExperiences = experiences.filter(experience => {
    // First apply category filter
    if (activeCategory !== 'all') {
      const categories = getCategoryFromExperience(experience);
      if (!categories.includes(activeCategory)) {
        return false;
      }
    }
    
    // Then apply search filter if there's a query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchTitle = experience.title.toLowerCase().includes(query);
      const matchDesc = experience.description.toLowerCase().includes(query);
      const matchKeyHighlights = experience.keyHighlights?.some(h => h.toLowerCase().includes(query));
      return matchTitle || matchDesc || matchKeyHighlights;
    }
    
    return true;
  });

  // Get all unique categories from experiences
  const allCategories = ['all', ...Array.from(new Set(
    experiences.flatMap(exp => getCategoryFromExperience(exp))
  ))] as ExperienceCategory[];
  
  // Count experiences per category for the filter
  const categoryCounts = allCategories.reduce((acc, category) => {
    if (category === 'all') {
      acc[category] = experiences.length;
    } else {
      acc[category] = experiences.filter(exp => 
        getCategoryFromExperience(exp).includes(category)
      ).length;
    }
    return acc;
  }, {} as Record<string, number>);
  
  // Pre-load images on component mount
  useEffect(() => {
    // Preload all experience images to improve UX
    const preloadPromises = experiences.map(experience => {
      return new Promise<void>((resolve) => {
        if (experience.image) {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Resolve even on error
          img.src = experience.image;
        } else {
          resolve();
        }
      });
    });
    
    // Mark as loaded after all images are preloaded
    Promise.all(preloadPromises).then(() => {
      setIsLoaded(true);
    });
  }, [experiences]);
  
  // Intersection observer for section animation
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(sectionRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  // Navigate to the next experience
  const navigateToNext = () => {
    if (!selectedExperience) return;
    
    const currentIndex = experiences.findIndex(e => e.id === selectedExperience.id);
    const nextIndex = (currentIndex + 1) % experiences.length;
    setSelectedExperience(experiences[nextIndex]);
  };
  
  // Navigate to the previous experience
  const navigateToPrevious = () => {
    if (!selectedExperience) return;
    
    const currentIndex = experiences.findIndex(e => e.id === selectedExperience.id);
    const prevIndex = (currentIndex - 1 + experiences.length) % experiences.length;
    setSelectedExperience(experiences[prevIndex]);
  };
  
  // Function to open modal with selected experience
  const openExperienceDetail = (experience: Experience, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior
    e.stopPropagation(); // Stop event propagation
    setSelectedExperience(experience);
    setModalOpen(true);
  };
  
  // Function to close modal
  const closeModal = () => {
    setModalOpen(false);
  };
  
  // Function to get icon for category
  const getCategoryIcon = (category: ExperienceCategory) => {
    switch(category) {
      case 'all': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>;
      case 'winter': return <Snowflake className="w-5 h-5" />;
      case 'adventure': return <Compass className="w-5 h-5" />;
      case 'water': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
      case 'culture': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>;
      default: return <Tag className="w-5 h-5" />;
    }
  };
  
  return (
    <section 
      id="experiences" 
      className="relative py-24 lg:py-32 overflow-hidden" 
      aria-labelledby="experiences-title"
      ref={sectionRef}
    >
      {/* Background parallax effect */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -right-24 top-10 w-96 h-96 bg-accent-color/40 rounded-full blur-3xl"></div>
        <div className="absolute -left-24 bottom-10 w-96 h-96 bg-accent-color/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Animated section header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t.experiences.title}
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            {t.experiences.subtitle}
          </p>
        </motion.div>

        {/* Filter and search controls */}
        <motion.div 
          className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Category filters */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide w-full md:w-auto">
            {allCategories.map((category, index) => (
              categoryCounts[category] > 0 && (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium 
                    flex items-center whitespace-nowrap
                    transition-colors duration-300
                    ${activeCategory === category 
                      ? 'bg-accent-color text-black' 
                      : 'bg-black/40 text-white hover:bg-black/60'}
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                >
                  {getCategoryIcon(category)}
                  <span className="ml-2 capitalize">{category}</span>
                  <span className="ml-1.5 bg-black/20 px-1.5 py-0.5 rounded-full text-xs">
                    {categoryCounts[category]}
                  </span>
                </motion.button>
              )
            ))}
          </div>
          
          {/* Search input */}
          <motion.div 
            className="relative w-full md:w-72"
            initial={{ opacity: 0, x: 20 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-color"
              placeholder="Search experiences..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                onClick={() => setSearchQuery('')}
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </motion.div>
        </motion.div>

        {/* Experience Grid with featured items */}
        {filteredExperiences.length > 0 ? (
          <>
            {/* Main grid for all experiences */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
              {/* If we have 8 items (which means 2 in the last row), show only the first 6 */}
              {(filteredExperiences.length === 8) ? 
                filteredExperiences.slice(0, 6).map((experience, index) => (
                  <motion.div key={experience.id} layout animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }}>
                    <ExperienceCard
                      experience={experience}
                      language={language}
                      onOpenDetail={openExperienceDetail}
                      delay={index}
                    />
                  </motion.div>
                )) : 
                // Otherwise show all experiences normally
                filteredExperiences.map((experience, index) => (
                  <motion.div key={experience.id} layout animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }}>
                    <ExperienceCard
                      experience={experience}
                      language={language}
                      onOpenDetail={openExperienceDetail}
                      delay={index}
                    />
                  </motion.div>
                ))
              }
            </div>
            
            {/* Special centered container just for the last 2 cards when we have 8 total */}
            {filteredExperiences.length === 8 && (
              <div className="mt-6 xl:mt-8 flex justify-center gap-6 xl:gap-8">
                {filteredExperiences.slice(6).map((experience, index) => (
                  <motion.div 
                    key={experience.id} 
                    className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                    layout 
                    animate={{ opacity: 1 }} 
                    initial={{ opacity: 0 }} 
                    exit={{ opacity: 0 }}
                  >
                    <ExperienceCard
                      experience={experience}
                      language={language}
                      onOpenDetail={openExperienceDetail}
                      delay={index + 6}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </>
        ) : (
          // No results state
          <motion.div 
            className="text-center py-12 border border-white/10 rounded-xl bg-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <svg className="w-16 h-16 mx-auto text-white/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="text-xl text-white mb-2">No experiences found</h3>
            <p className="text-white/60">Try adjusting your search or filter criteria</p>
            <button 
              className="mt-4 px-4 py-2 bg-accent-color text-black rounded-lg font-medium"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
            >
              Reset filters
            </button>
          </motion.div>
        )}
      </div>
      
      {/* Detail Modal */}
      <ExperienceDetailModal
        experience={selectedExperience}
        isOpen={modalOpen}
        onClose={closeModal}
        onNext={navigateToNext}
        onPrevious={navigateToPrevious}
        language={language}
      />
    </section>
  );
}