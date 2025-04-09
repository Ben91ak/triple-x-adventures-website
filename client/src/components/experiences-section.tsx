import { useState, useEffect } from "react";
import { Experience } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { getOptimizedImageSrc, optimizePageImages } from "@/utils/image-optimizer";

// Type for translated experience data
type ExperienceTranslation = {
  id: number;
  title: string;
  description: string;
  image: string;
  gallery: string[];
  fullDescription?: string;
  tag?: {
    text: string;
    type: "bestseller" | "new";
  };
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
  const t = useTranslation(language as any);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  
  // Setup modal behaviors when opened/closed
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    // Add a click handler for iOS/mobile to ensure modal can be closed
    const handleBackdropClick = (e: MouseEvent) => {
      // Only handle clicks on the backdrop (outside the modal)
      if ((e.target as HTMLElement).classList.contains('modal-backdrop')) {
        onClose();
      }
    };
    
    // Handle touch events for iOS devices where click events might be problematic
    const handleTouchEnd = (e: TouchEvent) => {
      // If touch ends on the backdrop class, treat it as a close action
      const target = document.elementFromPoint(
        e.changedTouches[0].clientX, 
        e.changedTouches[0].clientY
      ) as HTMLElement;
      
      if (target && target.classList.contains('modal-backdrop')) {
        e.preventDefault();
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.addEventListener('click', handleBackdropClick);
      document.addEventListener('touchend', handleTouchEnd);
      
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
      
      // For iOS - prevent bouncing/scrolling
      document.documentElement.style.position = 'fixed';
      document.documentElement.style.width = '100%';
      document.documentElement.style.height = '100%';
      document.documentElement.style.overflowY = 'scroll';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('click', handleBackdropClick);
      document.removeEventListener('touchend', handleTouchEnd);
      
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = '';
      
      // Reset iOS fixes
      document.documentElement.style.position = '';
      document.documentElement.style.width = '';
      document.documentElement.style.height = '';
      document.documentElement.style.overflowY = '';
    };
  }, [isOpen, onClose]);
  
  // Declare variables and functions that will be used if the modal is open
  // Important: All hooks must be called unconditionally, before any early returns
  
  // Reset active image index when experience changes
  useEffect(() => {
    if (isOpen) {
      setActiveImageIndex(0);
      setIsImageLoading(true); // Reset loading state for new experience
    }
  }, [experience, isOpen]);
  
  // Reset loading state on image change
  useEffect(() => {
    if (isOpen) {
      setIsImageLoading(true);
    }
  }, [activeImageIndex, isOpen]);
  
  // Preload gallery images for smoother transitions
  // This hook needs to be before any early returns
  useEffect(() => {
    // Preload all gallery images immediately when modal opens
    if (isOpen && experience.gallery && experience.gallery.length > 0) {
      const galleryToUse = experience.gallery;
      
      galleryToUse.forEach((imagePath, index) => {
        // Skip the active image since it's already loaded in the visible DOM
        if (index !== activeImageIndex) {
          const img = new Image();
          img.src = imagePath;
        }
      });
    }
  }, [isOpen, experience.gallery, activeImageIndex]);
  
  // Exit early if the modal is not open
  if (!isOpen) return null;
  
  // Fix image paths if needed
  const fixImagePath = (path: string): string => {
    // Handle Husky images specifically to use the new WebP format
    if (path.includes('Husky') && path.includes('Huskys')) {
      let imageNumber = 1;
      
      // Extract image number from filename if available
      if (path.includes('Husky.jpg')) {
        imageNumber = 1;
      } else if (path.includes('Husky 2.jpg')) {
        imageNumber = 2;
      } else if (path.includes('Husky 3.jpg')) {
        imageNumber = 3;
      } else if (path.includes('Husky 4.jpg')) {
        imageNumber = 4;
      }
      
      return `images/Huskys/Husky ${imageNumber}_result.webp`;
    }
    
    if (path.startsWith('/')) {
      // Remove leading slash to help with path resolution
      return path.substring(1);
    }
    return path;
  };
  
  // For specific experiences, directly use the WebP files we know exist
  let gallery: string[] = [];
  if (experience.title.toLowerCase().includes('husky')) {
    // Use new Husky.jpg and existing WebP files
    gallery = [
      '/images/Huskys/Husky.jpg', // Use the new Husky.jpg as primary image
      '/images/Huskys/Husky 1_result.webp',
      '/images/Huskys/Husky 2_result.webp',
      '/images/Huskys/Husky 3_result.webp'
    ];
    console.log('Using updated gallery for Husky:', gallery);
  } else if (experience.title.toLowerCase().includes('snowmobile')) {
    // Skip path resolution and directly use WebP files for snowmobile
    gallery = [
      '/images/Snowmobile/Snowmobile 1_result.webp',
      '/images/Snowmobile/Snowmobile 2_result.webp',
      '/images/Snowmobile/Snowmobile 3_result.webp',
      '/images/Snowmobile/Snowmobile 4_result.webp'
    ];
    console.log('Using hardcoded WebP gallery for Snowmobile:', gallery);
  } else if (experience.title.toLowerCase().includes('jayjays') || experience.title.toLowerCase().includes('restaurant')) {
    // Skip path resolution and directly use WebP files for JayJays Restaurant
    gallery = [
      '/images/JayJays Restaurant/Food 1_result.webp',
      '/images/JayJays Restaurant/Food 2_result.webp',
      '/images/JayJays Restaurant/Food 3_result.webp',
      '/images/JayJays Restaurant/Food 4_result.webp'
    ];
    console.log('Using hardcoded WebP gallery for JayJays Restaurant:', gallery);
  } else if (experience.title.toLowerCase().includes('ice kart') || experience.title.toLowerCase().includes('icekart') || experience.title.toLowerCase().includes('kart')) {
    // Skip path resolution and directly use WebP files for Ice Kart
    gallery = [
      '/images/Ice Kart/Icekart 1_result.webp',
      '/images/Ice Kart/Icekart 2_result.webp',
      '/images/Ice Kart/Icekart 3_result.webp',
      '/images/Ice Kart/Icekart 4_result.webp'
    ];
    console.log('Using hardcoded WebP gallery for Ice Kart:', gallery);
  } else if (experience.title.toLowerCase().includes('helicopter') || experience.title.toLowerCase().includes('helikopter')) {
    // Skip path resolution and directly use WebP files for Helicopter
    gallery = [
      '/images/Helicopter/Helikopter 1_result.webp',
      '/images/Helicopter/Helikopter 2_result.webp',
      '/images/Helicopter/Helikopter 3_result.webp',
      '/images/Helicopter/Helikopter 4_result.webp'
    ];
    console.log('Using hardcoded WebP gallery for Helicopter:', gallery);
  } else if (experience.title.toLowerCase().includes('ice drift') || experience.title.toLowerCase().includes('drift')) {
    // Skip path resolution and directly use WebP files for Ice Drift
    gallery = [
      '/images/Ice Drift/Cars 1_result.webp',
      '/images/Ice Drift/Cars 2_result.webp',
      '/images/Ice Drift/Cars 3_result.webp',
      '/images/Ice Drift/Cars 4_result.webp'
    ];
    console.log('Using hardcoded WebP gallery for Ice Drift:', gallery);
  } else if (experience.title.toLowerCase().includes('ice fishing') || experience.title.toLowerCase().includes('fishing')) {
    // Skip path resolution and directly use WebP files for Ice Fishing
    gallery = [
      '/images/Ice Fishing/Icefish 1_result.webp',
      '/images/Ice Fishing/Icefish 2_result.webp',
      '/images/Ice Fishing/Shoot 3_result.webp',
      '/images/Ice Fishing/Shoot 4_result.webp'
    ];
    console.log('Using hardcoded WebP gallery for Ice Fishing:', gallery);
  } else if (experience.title.toLowerCase().includes('side by side') || experience.title.toLowerCase().includes('buggy') || experience.title.toLowerCase().includes('sbs')) {
    // Skip path resolution and directly use WebP files for Side by Side
    gallery = [
      '/images/Side by Side/SBS 1_result.webp',
      '/images/Side by Side/SBS 2_result.webp',
      '/images/Side by Side/SBS 3_result.webp',
      '/images/Side by Side/SBS 4_result.webp'
    ];
    console.log('Using hardcoded WebP gallery for Side by Side:', gallery);
  } else if (experience.title.toLowerCase().includes('reindeer') || experience.title.toLowerCase().includes('reindeers')) {
    // Skip path resolution and directly use WebP files for Reindeers
    gallery = [
      '/images/Reindeers/Reindeers 1_result.webp',
      '/images/Reindeers/Reindeers 2_result.webp',
      '/images/Reindeers/Reindeers 3_result.webp',
      '/images/Reindeers/Reindeers 5_result.webp'
    ];
    console.log('Using hardcoded WebP gallery for Reindeers:', gallery);
  } else {
    // Default gallery to the main image if no gallery is provided
    const galleryPaths = experience.gallery || [experience.image];
    gallery = galleryPaths.map(fixImagePath);
  }
  
  // Navigation for next/previous image
  const nextImage = () => {
    setIsImageLoading(true); // Reset loading state before changing image
    console.log(`Navigating to next image from index ${activeImageIndex}`);
    setActiveImageIndex((prev) => {
      const newIndex = (prev + 1) % gallery.length;
      console.log(`New image index: ${newIndex}, src: ${gallery[newIndex]}`);
      return newIndex;
    });
  };
  
  const previousImage = () => {
    setIsImageLoading(true); // Reset loading state before changing image
    console.log(`Navigating to previous image from index ${activeImageIndex}`);
    setActiveImageIndex((prev) => {
      const newIndex = (prev - 1 + gallery.length) % gallery.length;
      console.log(`New image index: ${newIndex}, src: ${gallery[newIndex]}`);
      return newIndex;
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start md:items-center justify-center overflow-y-auto py-10 md:py-0">
      {/* Backdrop with blur effect - added modal-backdrop class for iOS touch handling */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300 modal-backdrop" 
        onClick={onClose}
        style={{ touchAction: 'manipulation' }}
      ></div>
      
      {/* Modal content */}
      <div 
        className="relative max-w-6xl w-[90%] mx-auto my-4 md:my-auto max-h-full overflow-visible glass-card bg-card-bg/95 rounded-xl border border-white/10 shadow-2xl fade-in transform-gpu transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button - enhanced for mobile touchability */}
        <button 
          className="absolute top-4 right-4 z-10 p-3 rounded-full bg-black/70 text-white hover:bg-accent-color transition-colors duration-200"
          onClick={onClose}
          style={{ touchAction: 'manipulation' }}
          aria-label="Close details"
        >
          <X size={24} />
        </button>
        
        {/* Modal header */}
        <div className="flex flex-col md:flex-row md:h-[500px] overflow-visible md:overflow-hidden">
          {/* Gallery section */}
          <div className="md:flex-1 relative overflow-hidden h-[300px] md:h-full">
            {/* Loading spinner */}
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
                <div className="w-12 h-12 border-t-2 border-b-2 border-accent-color rounded-full animate-spin"></div>
              </div>
            )}
            
            {/* Main image */}
            <img 
              src={experience.title.toLowerCase().includes('husky') || 
                   experience.title.toLowerCase().includes('snowmobile') ||
                   experience.title.toLowerCase().includes('jayjays') ||
                   experience.title.toLowerCase().includes('restaurant') ||
                   experience.title.toLowerCase().includes('ice kart') ||
                   experience.title.toLowerCase().includes('icekart') ||
                   experience.title.toLowerCase().includes('kart') ||
                   experience.title.toLowerCase().includes('helicopter') ||
                   experience.title.toLowerCase().includes('helikopter') ||
                   experience.title.toLowerCase().includes('ice drift') ||
                   experience.title.toLowerCase().includes('drift') ||
                   experience.title.toLowerCase().includes('ice fishing') ||
                   experience.title.toLowerCase().includes('fishing') ||
                   experience.title.toLowerCase().includes('reindeer') ||
                   experience.title.toLowerCase().includes('buggy') ||
                   experience.title.toLowerCase().includes('side by side') ||
                   experience.title.toLowerCase().includes('sbs')
                ? gallery[activeImageIndex] // For specialized experiences, use the direct WebP file paths
                : getOptimizedImageSrc(gallery[activeImageIndex], { 
                    quality: 'high',
                    forceFormat: window.hasOwnProperty('webpSupported') && (window as any).webpSupported ? 'webp' : 'jpeg'
                  })
              } 
              alt={experience.title}
              loading="eager"
              decoding="async"
              width="800"
              height="600"
              className={`w-full h-full object-cover object-center transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setIsImageLoading(false)}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                const originalSrc = gallery[activeImageIndex];
                console.warn(`Error loading modal image: ${gallery[activeImageIndex]}`);
                
                // Determine screen size for responsive images - high quality for modals
                const screenWidth = window.innerWidth;
                const size = screenWidth < 768 ? 'medium' : 'large'; // Use higher quality for modal
                
                // Special case handling for common experience images with WebP optimized versions
                if (originalSrc.toLowerCase().includes('husky')) {
                  console.log('Husky image failed to load:', originalSrc);
                  // First try the new Husky.jpg as the primary fallback
                  target.src = `/images/Huskys/Husky.jpg`;
                  console.log('Fallback to primary image:', `/images/Huskys/Husky.jpg`);
                  
                  // Add an onerror handler to this image as well for a secondary fallback
                  target.onerror = () => {
                    // Extract the husky number or default to 1
                    let huskyNum = 1;
                    const match = originalSrc.match(/Husky\s*(\d+)/i);
                    if (match && match[1]) {
                      huskyNum = parseInt(match[1], 10);
                    }
                    // Force to a known valid husky file that exists
                    if (huskyNum < 1 || huskyNum > 4) huskyNum = 1;
                    
                    target.src = `/images/Huskys/Husky ${huskyNum}_result.webp`;
                    console.log('Secondary fallback to:', `/images/Huskys/Husky ${huskyNum}_result.webp`);
                  };
                } else if (originalSrc.toLowerCase().includes('snowmobile')) {
                  console.log('Snowmobile image failed to load:', originalSrc);
                  // Extract the snowmobile number or default to 1
                  let snowmobileNum = 1;
                  const match = originalSrc.match(/Snowmobile\s*(\d+)/i);
                  if (match && match[1]) {
                    snowmobileNum = parseInt(match[1], 10);
                  }
                  // Force to a known valid snowmobile file that exists
                  if (snowmobileNum < 1 || snowmobileNum > 4) snowmobileNum = 1;
                  
                  target.src = `/images/Snowmobile/Snowmobile ${snowmobileNum}_result.webp`;
                  console.log('Fallback to:', `/images/Snowmobile/Snowmobile ${snowmobileNum}_result.webp`);
                } else if (originalSrc.toLowerCase().includes('ice kart') || originalSrc.toLowerCase().includes('icekart') || originalSrc.toLowerCase().includes('kart')) {
                  console.log('Ice Kart image failed to load:', originalSrc);
                  // Extract the kart number or default to 1
                  let kartNum = 1;
                  const match = originalSrc.match(/(?:Ice)?kart\s*(\d+)/i);
                  if (match && match[1]) {
                    kartNum = parseInt(match[1], 10);
                  }
                  // Force to a known valid kart file that exists
                  if (kartNum < 1 || kartNum > 4) kartNum = 1;
                  
                  target.src = `/images/Ice Kart/Icekart ${kartNum}_result.webp`;
                  console.log('Fallback to:', `/images/Ice Kart/Icekart ${kartNum}_result.webp`);
                } else if (originalSrc.toLowerCase().includes('ice fishing') || (originalSrc.toLowerCase().includes('fishing') && (originalSrc.toLowerCase().includes('icefish') || originalSrc.toLowerCase().includes('shoot')))) {
                  console.log('Ice Fishing image failed to load:', originalSrc);
                  
                  // Check if it's an Icefish or Shoot image
                  if (originalSrc.toLowerCase().includes('icefish')) {
                    // Extract the fish number or default to 1
                    let fishNum = 1;
                    const match = originalSrc.match(/Icefish\s*(\d+)/i);
                    if (match && match[1]) {
                      fishNum = parseInt(match[1], 10);
                    }
                    // Force to a known valid fish file that exists
                    if (fishNum < 1 || fishNum > 2) fishNum = 1;
                    
                    target.src = `/images/Ice Fishing/Icefish ${fishNum}_result.webp`;
                    console.log('Fallback to:', `/images/Ice Fishing/Icefish ${fishNum}_result.webp`);
                  } else if (originalSrc.toLowerCase().includes('shoot')) {
                    // Extract the shoot number or default to 3
                    let shootNum = 3;
                    const match = originalSrc.match(/Shoot\s*(\d+)/i);
                    if (match && match[1]) {
                      shootNum = parseInt(match[1], 10);
                    }
                    // Force to a known valid shoot file that exists
                    if (shootNum < 3 || shootNum > 4) shootNum = 3;
                    
                    target.src = `/images/Ice Fishing/Shoot ${shootNum}_result.webp`;
                    console.log('Fallback to:', `/images/Ice Fishing/Shoot ${shootNum}_result.webp`);
                  } else {
                    // Default to first icefish image
                    target.src = `/images/Ice Fishing/Icefish 1_result.webp`;
                    console.log('Fallback to default:', `/images/Ice Fishing/Icefish 1_result.webp`);
                  }
                } else if (originalSrc.toLowerCase().includes('fishing')) {
                  // Generic fishing image fallback (for backwards compatibility)
                  // Try WebP if supported
                  if (window.hasOwnProperty('webpSupported') && (window as any).webpSupported) {
                    target.src = `/images/Ice Fishing/Icefish 1_result.webp`;
                  } else {
                    target.src = `/images/optimized/Ice-Fishing-${size}.jpg`;
                  }
                } else if (originalSrc.toLowerCase().includes('buggy') || originalSrc.toLowerCase().includes('side by side') || originalSrc.toLowerCase().includes('sbs')) {
                  console.log('Side by Side image failed to load:', originalSrc);
                  // Extract the SBS number or default to 1
                  let sbsNum = 1;
                  const match = originalSrc.match(/SBS\s*(\d+)/i);
                  if (match && match[1]) {
                    sbsNum = parseInt(match[1], 10);
                  }
                  // Force to a known valid SBS file that exists
                  if (sbsNum < 1 || sbsNum > 4) sbsNum = 1;
                  
                  target.src = `/images/Side by Side/SBS ${sbsNum}_result.webp`;
                  console.log('Fallback to:', `/images/Side by Side/SBS ${sbsNum}_result.webp`);
                } else if (originalSrc.toLowerCase().includes('ice drift') || (originalSrc.toLowerCase().includes('drift') && originalSrc.toLowerCase().includes('cars'))) {
                  console.log('Ice Drift image failed to load:', originalSrc);
                  // Extract the car number or default to 1
                  let carNum = 1;
                  const match = originalSrc.match(/Cars\s*(\d+)/i);
                  if (match && match[1]) {
                    carNum = parseInt(match[1], 10);
                  }
                  // Force to a known valid car file that exists
                  if (carNum < 1 || carNum > 4) carNum = 1;
                  
                  target.src = `/images/Ice Drift/Cars ${carNum}_result.webp`;
                  console.log('Fallback to:', `/images/Ice Drift/Cars ${carNum}_result.webp`);
                } else if (originalSrc.toLowerCase().includes('drift')) {
                  // Try WebP if supported
                  if (window.hasOwnProperty('webpSupported') && (window as any).webpSupported) {
                    target.src = `/images/optimized/drifting-${size}.webp`;
                  } else {
                    target.src = `/images/optimized/drifting-${size}.jpg`;
                  }
                } else if (originalSrc.toLowerCase().includes('jayjays') || originalSrc.toLowerCase().includes('restaurant')) {
                  console.log('Restaurant image failed to load:', originalSrc);
                  // Extract the food number or default to 1
                  let foodNum = 1;
                  const match = originalSrc.match(/Food\s*(\d+)/i);
                  if (match && match[1]) {
                    foodNum = parseInt(match[1], 10);
                  }
                  // Force to a known valid food file that exists
                  if (foodNum < 1 || foodNum > 4) foodNum = 1;
                  
                  target.src = `/images/JayJays Restaurant/Food ${foodNum}_result.webp`;
                  console.log('Fallback to:', `/images/JayJays Restaurant/Food ${foodNum}_result.webp`);
                } else if (originalSrc.toLowerCase().includes('helicopter') || originalSrc.toLowerCase().includes('helikopter')) {
                  console.log('Helicopter image failed to load:', originalSrc);
                  // Extract the helicopter number or default to 1
                  let helicopterNum = 1;
                  const match = originalSrc.match(/[Hh]elikopter\s*(\d+)/i);
                  if (match && match[1]) {
                    helicopterNum = parseInt(match[1], 10);
                  }
                  // Force to a known valid helicopter file that exists
                  if (helicopterNum < 1 || helicopterNum > 4) helicopterNum = 1;
                  
                  target.src = `/images/Helicopter/Helikopter ${helicopterNum}_result.webp`;
                  console.log('Fallback to:', `/images/Helicopter/Helikopter ${helicopterNum}_result.webp`);
                } else if (originalSrc.toLowerCase().includes('reindeer')) {
                  console.log('Reindeer image failed to load:', originalSrc);
                  // Extract the reindeer number or default to 1
                  let reindeerNum = 1;
                  const match = originalSrc.match(/Reindeers?\s*(\d+)/i);
                  if (match && match[1]) {
                    reindeerNum = parseInt(match[1], 10);
                  }
                  // Force to a known valid reindeer file that exists (1, 2, 3, or 5)
                  if (![1, 2, 3, 5].includes(reindeerNum)) reindeerNum = 1;
                  
                  target.src = `/images/Reindeers/Reindeers ${reindeerNum}_result.webp`;
                  console.log('Fallback to:', `/images/Reindeers/Reindeers ${reindeerNum}_result.webp`);
                } else {
                  // If original fails too, use fallback
                  target.src = '/images/TXA_fallback.jpg';
                }
                target.onerror = null; // Prevent infinite error loops
              }}
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
                    onClick={() => {
                      console.log(`Setting active image to index ${index}: ${gallery[index]}`);
                      setActiveImageIndex(index);
                      setIsImageLoading(true); // Reset loading state for new image
                    }}
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
          <div className="md:flex-1 p-6 md:p-8 overflow-y-auto h-auto md:max-h-full">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {experience.title}
            </h2>
            
            <div className="text-white/80 space-y-4">
              {/* Check which type of structured content we have */}
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
              ) : experience.fullDescription && experience.fullDescription.includes('CHOOSE YOUR HUSKY ADVENTURE') ? (
                <div className="leading-relaxed">
                  {/* Introduction text */}
                  <p className="mb-6">
                    {experience.fullDescription.split('━━━ CHOOSE YOUR HUSKY ADVENTURE ━━━')[0].trim()}
                  </p>
                  
                  {/* Husky Adventure section */}
                  <div className="mb-6">
                    <h3 className="text-white font-bold text-lg flex items-center gap-2 mb-4">
                      <span className="h-px w-6 bg-accent-color"></span>
                      <span>CHOOSE YOUR HUSKY ADVENTURE</span>
                      <span className="h-px flex-grow bg-accent-color"></span>
                    </h3>
                    
                    <div className="space-y-6">
                      {/* Passive Tour */}
                      <div className="bg-card-bg/20 rounded-lg p-4 border border-white/10">
                        <h4 className="text-accent-color font-semibold mb-2 flex items-center gap-2">
                          <span className="inline-block w-4 h-4 bg-accent-color/70 rotate-45"></span>
                          <span>PASSIVE TOUR</span>
                        </h4>
                        <p className="ml-6 mb-2">Sit back, relax, and enjoy the ride! Up to 4 guests comfortably seated in one sled driven by an experienced musher.</p>
                      </div>
                      
                      {/* Active Tour */}
                      <div className="bg-card-bg/20 rounded-lg p-4 border border-white/10">
                        <h4 className="text-accent-color font-semibold mb-2 flex items-center gap-2">
                          <span className="inline-block w-4 h-4 bg-accent-color/90 rotate-45"></span>
                          <span>ACTIVE TOUR</span>
                        </h4>
                        <p className="ml-6 mb-2">Take turns driving! Two guests per sled, with one driving and one riding. Swap places during the tour to fully enjoy both experiences.</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tour Details section */}
                  <div>
                    <h3 className="text-white font-bold text-lg flex items-center gap-2 mb-4">
                      <span className="h-px w-6 bg-accent-color"></span>
                      <span>TOUR DETAILS</span>
                      <span className="h-px flex-grow bg-accent-color"></span>
                    </h3>
                    
                    <div className="bg-card-bg/20 rounded-lg p-4 border border-white/10">
                      <ul className="ml-6 list-disc list-inside space-y-2 text-sm text-white/90">
                        <li>Routes: Customized 10-15 km trails</li>
                        <li>Duration: 1.5-2 hours</li>
                        <li>Difficulty: Suitable for all skill levels</li>
                        <li>Equipment: Winter clothing and boots provided</li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Final note */}
                  <p className="mt-6 text-center text-accent-color font-medium">
                    An authentic Arctic adventure that connects you deeply with nature and leaves you with unforgettable memories!
                  </p>
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
                  {t.experiences.bookNow}
                </a>
                
                <div className="flex space-x-3 mt-4 md:mt-0 w-full justify-between md:justify-start md:w-auto">
                  <button 
                    onClick={onPrevious}
                    className="btn-secondary inline-flex items-center justify-center gap-1 font-medium text-sm py-3 px-3 md:px-4 flex-1 md:flex-initial"
                  >
                    <ChevronLeft size={18} />
                    <span className="hidden md:inline">{t.experiences.previousExperience}</span>
                    <span className="md:hidden">Prev</span>
                  </button>
                  
                  <button 
                    onClick={onNext}
                    className="btn-secondary inline-flex items-center justify-center gap-1 font-medium text-sm py-3 px-3 md:px-4 flex-1 md:flex-initial"
                  >
                    <span className="hidden md:inline">{t.experiences.nextExperience}</span>
                    <span className="md:hidden">Next</span>
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
  
  // Get experiences data from translations
  const experiences: Experience[] = t.experiences.list.map(exp => ({
    ...exp,
    // Add empty fullDescription if not provided in translations
    fullDescription: exp.fullDescription || exp.description
  }));
  
  // State for the selected experience and modal visibility
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Run image optimization when component mounts
  useEffect(() => {
    // Apply image optimizations for better loading performance
    optimizePageImages();
    
    // Prefetch important images (first 3 experiences)
    const imagesToPrefetch = experiences
      .slice(0, 3)
      .flatMap(exp => [exp.image, ...(exp.gallery || [])])
      .filter(Boolean)
      .map(img => img.startsWith('/') ? img.substring(1) : img);
      
    // Adding a small delay to allow critical resources to load first
    const timer = setTimeout(() => {
      import('@/utils/image-optimizer').then(({ prefetchImages }) => {
        prefetchImages(imagesToPrefetch);
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [language]);
  
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
                    src={getOptimizedImageSrc(experience.image.startsWith('/') ? experience.image.substring(1) : experience.image, { 
                      quality: 'medium',
                      forceFormat: window.hasOwnProperty('webpSupported') && (window as any).webpSupported ? 'webp' : 'jpeg'
                    })}
                    alt={experience.title} 
                    loading={experience.id > 3 ? "lazy" : "eager"} /* Lazy load images that are likely below the fold */
                    decoding="async"
                    width="640" 
                    height="480"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const originalSrc = experience.image;
                      console.warn(`Error loading experience image: ${originalSrc}`);
                      
                      // Determine screen size for responsive images
                      const screenWidth = window.innerWidth;
                      const size = screenWidth < 768 ? 'small' : 'medium';
                      
                      // Special case handling for common experience images with WebP optimized versions
                      if (originalSrc.toLowerCase().includes('husky')) {
                        // Use the new Husky.jpg as the main image
                        console.log('Husky card image fallback', originalSrc);
                        target.src = `/images/Huskys/Husky.jpg`;
                        
                        // Add a secondary fallback
                        target.onerror = () => {
                          if (window.hasOwnProperty('webpSupported') && (window as any).webpSupported) {
                            target.src = `/images/Huskys/Husky 1_result.webp`;
                          } else {
                            target.src = `/images/Huskys/Husky.jpg`;
                          }
                        };
                      } else if (originalSrc.toLowerCase().includes('snowmobile')) {
                        // Try WebP if supported
                        if (window.hasOwnProperty('webpSupported') && (window as any).webpSupported) {
                          target.src = `/images/Snowmobile/optimized/Snowmobile-${size}.webp`;
                        } else {
                          target.src = `/images/Snowmobile/optimized/Snowmobile-${size}.jpeg`;
                        }
                      } else if (originalSrc.toLowerCase().includes('ice kart') || originalSrc.toLowerCase().includes('kart')) {
                        // Try WebP if supported
                        if (window.hasOwnProperty('webpSupported') && (window as any).webpSupported) {
                          target.src = `/images/optimized/ice-kart-${size}.webp`;
                        } else {
                          target.src = `/images/optimized/ice-kart-${size}.jpg`;
                        }
                      } else if (originalSrc.toLowerCase().includes('ice fishing') || originalSrc.toLowerCase().includes('fishing')) {
                        // Always use direct WebP files for Ice Fishing to ensure consistency
                        console.log('Ice Fishing card image fallback', originalSrc);
                        if (window.hasOwnProperty('webpSupported') && (window as any).webpSupported) {
                          target.src = `/images/Ice Fishing/Icefish 1_result.webp`;
                        } else {
                          // Fall back to JPG if WebP not supported
                          target.src = `/images/Ice-Fishing.jpg`;
                        }
                      } else if (originalSrc.toLowerCase().includes('buggy') || originalSrc.toLowerCase().includes('side by side') || originalSrc.toLowerCase().includes('sbs')) {
                        // Always use direct WebP files for Side by Side
                        console.log('Side by Side card image fallback', originalSrc);
                        if (window.hasOwnProperty('webpSupported') && (window as any).webpSupported) {
                          target.src = `/images/Side by Side/SBS 1_result.webp`;
                        } else {
                          // Fall back to JPG if WebP not supported
                          target.src = `/images/Side-By-Side-Buggy-Drifting.jpg`;
                        }
                      } else if (originalSrc.toLowerCase().includes('helicopter') || originalSrc.toLowerCase().includes('helikopter')) {
                        // Use WebP if supported, otherwise use JPG
                        console.log('Helicopter card image fallback', originalSrc);
                        if (window.hasOwnProperty('webpSupported') && (window as any).webpSupported) {
                          target.src = `/images/Helicopter/Helikopter 1_result.webp`;
                        } else {
                          target.src = `/images/Helikopter.jpg`;
                        }
                      } else if (originalSrc.toLowerCase().includes('ice drift') || (originalSrc.toLowerCase().includes('drift') && originalSrc.toLowerCase().includes('cars'))) {
                        // Use WebP if supported, otherwise use JPG
                        console.log('Ice Drift card image fallback', originalSrc);
                        if (window.hasOwnProperty('webpSupported') && (window as any).webpSupported) {
                          target.src = `/images/Ice Drift/Cars 1_result.webp`;
                        } else {
                          target.src = `/images/Drifting.jpg`;
                        }
                      } else if (originalSrc.toLowerCase().includes('drift')) {
                        // Try WebP if supported
                        if (window.hasOwnProperty('webpSupported') && (window as any).webpSupported) {
                          target.src = `/images/optimized/drifting-${size}.webp`;
                        } else {
                          target.src = `/images/optimized/drifting-${size}.jpg`;
                        }
                      } else if (originalSrc.toLowerCase().includes('jayjays') || originalSrc.toLowerCase().includes('restaurant')) {
                        // Try WebP if supported
                        if (window.hasOwnProperty('webpSupported') && (window as any).webpSupported) {
                          target.src = `/images/restaurant/optimized/jayjays-exterior-${size}.webp`;
                        } else {
                          target.src = `/images/restaurant/optimized/jayjays-exterior-${size}.jpg`;
                        }
                      } else {
                        // If original fails too, use fallback
                        target.src = '/images/TXA_fallback.jpg';
                      }
                      target.onerror = null; // Prevent infinite error loops
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
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openExperienceDetail(experience);
                      }}
                      className="inline-flex items-center gap-1.5 text-accent-color hover:text-white transition-colors font-medium text-sm px-3 py-2 touch-manipulation"
                      aria-label={`View details for ${experience.title}`}
                      style={{ touchAction: 'manipulation' }}
                    >
                      {t.experiences.viewDetails}
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
            {t.experiences.sendInquiry}
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