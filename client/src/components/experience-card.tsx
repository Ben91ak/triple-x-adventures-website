import { useState } from "react";
import { Experience } from "@/types";
import { useTranslation } from "@/translations";

interface ExperienceCardProps {
  experience: Experience;
  language: string;
  onOpenDetail: (experience: Experience, e: React.MouseEvent) => void;
}

export function ExperienceCard({ experience, language, onOpenDetail }: ExperienceCardProps) {
  const t = useTranslation(language as any);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [fallbackUsed, setFallbackUsed] = useState(false);
  
  // Optimized getExperienceImage function for the card component
  const getImagePath = (): string => {
    // Use the image path directly from the experience object first
    // This should match the paths in the translations file
    return experience.image;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (!fallbackUsed) {
      // Log the error for debugging
      console.error("Failed to load card image, trying fallback:", (e.target as HTMLImageElement).src);
      
      // Try direct fallback based on title
      let fallbackPath = "/images/TXA_fallback.jpg";
      const title = experience.title.toLowerCase();
      
      if (title.includes("snowmobile")) {
        fallbackPath = "/images/Snowmobile/Snowmobile 1_result.webp";
      } else if (title.includes("restaurant") || title.includes("jayjay")) {
        fallbackPath = "/images/JayJays-Restaurant.jpg";
      } else if (title.includes("kart")) {
        fallbackPath = "/images/Ice Kart.jpg";
      } else if (title.includes("reindeer")) {
        fallbackPath = "/images/Reindeers.jpg";
      } else if (title.includes("helicopter") || title.includes("helikopter")) {
        fallbackPath = "/images/Helikopter.jpg";
      } else if (title.includes("drift")) {
        fallbackPath = "/images/Drifting.jpg";
      } else if (title.includes("fishing")) {
        fallbackPath = "/images/Ice-Fishing.jpg";
      } else if (title.includes("buggy") || title.includes("side")) {
        fallbackPath = "/images/Side-By-Side-Buggy-Drifting.jpg";
      } else if (title.includes("husky") || title.includes("dog")) {
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

  return (
    <div className="relative group overflow-hidden rounded-xl bg-card-bg/40 shadow-lg border border-white/5 hover:border-white/20 transition-all duration-300 h-full flex flex-col">
      {/* Card Image Container - Fixed aspect ratio for all cards */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Loading State */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-card-bg/80">
            <div className="w-8 h-8 border-t-2 border-accent-color rounded-full animate-spin"></div>
          </div>
        )}
        
        <img 
          src={getImagePath()} 
          alt={experience.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
          loading="lazy"
        />
        
        {/* Gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        
        {/* Experience title (displayed over the image) */}
        <h3 className="absolute bottom-0 left-0 right-0 p-4 text-white text-xl font-bold">
          {experience.title}
        </h3>
        
        {/* Tag if present */}
        {experience.tag && (
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium
            ${experience.tag.type === 'bestseller' 
              ? 'bg-yellow-500 text-black' 
              : experience.tag.type === 'new' 
                ? 'bg-blue-500 text-white' 
                : 'bg-accent-color text-black'}`
          }>
            {experience.tag.text}
          </div>
        )}
      </div>
      
      {/* Card Content */}
      <div className="p-4 flex-grow flex flex-col">
        {/* Short description */}
        <div className="text-white/80 mb-4 line-clamp-3 flex-grow">
          {experience.description.substring(0, 120)}
          {experience.description.length > 120 ? '...' : ''}
        </div>
        
        {/* Details button */}
        <button
          onClick={(e) => onOpenDetail(experience, e)}
          className="w-full py-2 px-4 bg-accent-color hover:bg-accent-color/80 text-black font-medium rounded-md transition-colors mt-auto"
        >
          {t.experiences.viewDetails}
        </button>
      </div>
    </div>
  );
}