import { useState, useEffect, useRef } from "react";
import { Experience } from "@/types";
import { useTranslation } from "@/translations";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ExperienceDetailModalProps {
  experience: Experience;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  language: string;
}

export function ExperienceDetailModal({ 
  experience, 
  isOpen, 
  onClose, 
  onNext, 
  onPrevious,
  language
}: ExperienceDetailModalProps) {
  const t = useTranslation(language as any);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isModalMounted, setIsModalMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const savedScrollY = useRef<number>(0);
  
  // Mount the modal with animation
  useEffect(() => {
    if (isOpen) {
      // Short delay to allow CSS transitions to work
      const timer = setTimeout(() => {
        setIsModalMounted(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsModalMounted(false);
    }
  }, [isOpen]);

  // Setup modal behaviors when opened/closed with scroll locking
  useEffect(() => {
    // Only run this when the modal is actually open
    if (!isOpen) return;
    
    // Save current scroll position before locking
    savedScrollY.current = window.scrollY;
    
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const preventBackgroundScroll = (e: TouchEvent | WheelEvent) => {
      // Allow scrolling within the modal content
      if (modalRef.current && modalRef.current.contains(e.target as Node)) {
        return true;
      }
      // Prevent scrolling of the background
      e.preventDefault();
      return false;
    };

    // Apply scroll lock using position: fixed
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedScrollY.current}px`;
    document.body.style.width = '100%';
    document.body.style.overflowY = 'scroll'; // Keep scrollbar to prevent layout shifts
    
    // Add event listeners
    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('wheel', preventBackgroundScroll, { passive: false });
    document.addEventListener('touchmove', preventBackgroundScroll, { passive: false });

    return () => {
      // Cleanup event listeners
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('wheel', preventBackgroundScroll);
      document.removeEventListener('touchmove', preventBackgroundScroll);

      // Restore scroll position
      if (isOpen) {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflowY = '';
        window.scrollTo(0, savedScrollY.current);
      }
    };
  }, [isOpen, onClose]);

  // Reset active image index when experience changes
  useEffect(() => {
    if (isOpen) {
      setActiveImageIndex(0);
      setIsImageLoading(true);
    }
  }, [experience, isOpen]);

  // Reset loading state on image change
  useEffect(() => {
    if (isOpen) {
      setIsImageLoading(true);
    }
  }, [activeImageIndex, isOpen]);

  // Early exit if not open
  if (!isOpen) return null;

  // Use gallery from experience or provide fallbacks
  const gallery = experience.gallery && experience.gallery.length > 0 
    ? experience.gallery
    : [experience.image];

  // Navigate to next image
  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % gallery.length);
  };

  // Navigate to previous image
  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  // Handle image error with fallbacks
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error("Failed to load modal image:", (e.target as HTMLImageElement).src);
    
    // Try to find a fallback based on experience type
    const title = experience.title.toLowerCase();
    let fallbackPath = "/images/TXA_fallback.jpg";
    
    // Similar fallback logic as the card component
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
  };

  return (
    // Modal Backdrop with fade-in animation
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop bg-black/90 backdrop-blur-sm overflow-y-auto transition-opacity duration-300 ${isModalMounted ? 'opacity-100' : 'opacity-0'}`}
      onClick={(e) => {
        if ((e.target as HTMLElement).classList.contains('modal-backdrop')) {
          e.preventDefault();
          onClose();
        }
      }}
      aria-modal="true"
      role="dialog"
    >
      {/* Modal Content with slide-up animation */}
      <div 
        ref={modalRef}
        className={`bg-card-bg/90 backdrop-blur-md border border-white/20 rounded-xl w-full max-w-5xl p-4 md:p-6 shadow-xl transition-all duration-300 ${
          isModalMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
        style={{ maxHeight: 'calc(100vh - 2rem)', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
          className="absolute right-4 top-4 z-10 text-white p-1 hover:text-accent-color transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Images Gallery */}
          <div className="lg:w-1/2">
            {/* Main Image Container */}
            <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-lg shadow-lg">
              {/* Loading Indicator */}
              {isImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
                  <div className="w-12 h-12 border-t-2 border-b-2 border-accent-color rounded-full animate-spin"></div>
                </div>
              )}

              {/* Main image */}
              <img 
                src={gallery[activeImageIndex]}
                alt={`${experience.title} - Image ${activeImageIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-200"
                style={{ opacity: isImageLoading ? 0.5 : 1 }}
                onLoad={() => setIsImageLoading(false)}
                onError={handleImageError}
              />

              {/* Image navigation buttons */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="bg-black/60 hover:bg-black/80 text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-accent-color"
                  aria-label="Previous image"
                  disabled={gallery.length <= 1}
                  style={{ visibility: gallery.length <= 1 ? 'hidden' : 'visible' }}
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="bg-black/60 hover:bg-black/80 text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-accent-color"
                  aria-label="Next image"
                  disabled={gallery.length <= 1}
                  style={{ visibility: gallery.length <= 1 ? 'hidden' : 'visible' }}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {gallery.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    className={`relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                      idx === activeImageIndex ? 'border-accent-color scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`View image ${idx + 1}`}
                    aria-current={idx === activeImageIndex ? 'true' : 'false'}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/TXA_fallback.jpg';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Experience navigation buttons (for mobile) */}
            <div className="flex justify-between mt-6 mb-4 lg:hidden">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onPrevious();
                }}
                className="flex items-center text-white/80 hover:text-white px-3 py-1.5 rounded-md bg-card-bg/50 hover:bg-card-bg/80 transition-colors"
              >
                <ChevronLeft size={16} className="mr-1" />
                {t.experiences.previousExperience}
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onNext();
                }}
                className="flex items-center text-white/80 hover:text-white px-3 py-1.5 rounded-md bg-card-bg/50 hover:bg-card-bg/80 transition-colors"
              >
                {t.experiences.nextExperience}
                <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </div>

          {/* Right Column - Experience Details */}
          <div className="lg:w-1/2">
            {/* Title and Experience Info */}
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {experience.title}
              </h2>

              {/* Experience Tag */}
              {experience.tag && (
                <span className={`inline-block mb-4 px-3 py-1 rounded-full text-sm font-medium 
                  ${experience.tag.type === 'bestseller' 
                    ? 'bg-yellow-500 text-black' 
                    : experience.tag.type === 'new' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-accent-color text-black'}`
                }>
                  {experience.tag.text}
                </span>
              )}

              {/* Experience Description */}
              <div className="text-white/80 mt-4 overflow-y-auto prose prose-invert max-w-none">
                {experience.fullDescription ? (
                  // Preserve line breaks in the full description
                  <div style={{ whiteSpace: 'pre-line' }}>
                    {experience.fullDescription}
                  </div>
                ) : (
                  <p>{experience.description}</p>
                )}
              </div>
            </div>

            {/* Bottom Action Area */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = `#contact`;
                  onClose();
                }}
                className="flex-1 py-3 px-6 bg-accent-color hover:bg-accent-color/90 text-black font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-color"
              >
                {t.experiences.sendInquiry}
              </button>
              
              {/* Desktop navigation buttons */}
              <div className="hidden lg:flex justify-between gap-4">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onPrevious();
                  }}
                  className="text-white/80 hover:text-white flex items-center"
                >
                  <ChevronLeft size={20} className="mr-1" />
                  {t.experiences.previousExperience}
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onNext();
                  }}
                  className="text-white/80 hover:text-white flex items-center"
                >
                  {t.experiences.nextExperience}
                  <ChevronRight size={20} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}