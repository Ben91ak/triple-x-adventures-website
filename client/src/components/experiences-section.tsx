import { useState, useEffect, useRef } from "react";
import { Experience } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// ----- EXPERIENCE CARD COMPONENT -----
interface ExperienceCardProps {
  experience: Experience;
  language: string;
  onOpenDetail: (experience: Experience, e: React.MouseEvent) => void;
}

function ExperienceCard({ experience, language, onOpenDetail }: ExperienceCardProps) {
  const t = useTranslation(language as any);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [fallbackUsed, setFallbackUsed] = useState(false);
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (!fallbackUsed) {
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
          src={experience.image} 
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

// ----- MODAL COMPONENT -----
interface ExperienceDetailModalProps {
  experience: Experience | null;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  language: string;
}

function ExperienceDetailModal({ 
  experience, 
  isOpen, 
  onClose, 
  onNext, 
  onPrevious,
  language
}: ExperienceDetailModalProps) {
  if (!experience) return null;
  
  const t = useTranslation(language as any);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isModalMounted, setIsModalMounted] = useState(false);
  const [fallbackUsed, setFallbackUsed] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Mount the modal with animation
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsModalMounted(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsModalMounted(false);
    }
  }, [isOpen]);

  // Enhanced scroll locking to prevent all jumping
  useEffect(() => {
    if (!isOpen) return;

    // Immediately capture scroll position before any DOM updates
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollX = window.scrollX || window.pageXOffset;
    const htmlStyle = document.documentElement.style;
    
    // Save original styles to restore later
    const originalStyles = {
      html: {
        overflow: htmlStyle.overflow,
        height: htmlStyle.height,
      },
      body: {
        overflow: document.body.style.overflow,
        height: document.body.style.height,
        position: document.body.style.position,
        left: document.body.style.left,
        top: document.body.style.top,
        width: document.body.style.width,
      }
    };
    
    // Calculate scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    // Completely lock all scrolling on the page
    htmlStyle.overflow = 'hidden';
    htmlStyle.height = '100%';
    
    // Fix body in place with exact dimensions
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
    document.body.style.position = 'fixed';
    document.body.style.left = `-${scrollX}px`;
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    
    // Compensate for scrollbar disappearance (prevents content shift)
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    
    // Handle escape key
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    // Handle wheel and touch events correctly
    const preventScrollOutsideModal = (e: TouchEvent | WheelEvent) => {
      if (modalRef.current && modalRef.current.contains(e.target as Node)) {
        // Allow scrolling inside the modal
        e.stopPropagation();
      } else {
        // Prevent any scrolling outside the modal
        e.preventDefault();
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('wheel', preventScrollOutsideModal, { passive: false });
    document.addEventListener('touchmove', preventScrollOutsideModal, { passive: false });
    
    return () => {
      // Restore all original styles
      htmlStyle.overflow = originalStyles.html.overflow;
      htmlStyle.height = originalStyles.html.height;
      
      document.body.style.overflow = originalStyles.body.overflow;
      document.body.style.height = originalStyles.body.height;
      document.body.style.position = originalStyles.body.position;
      document.body.style.left = originalStyles.body.left;
      document.body.style.top = originalStyles.body.top;
      document.body.style.width = originalStyles.body.width;
      document.body.style.paddingRight = '';
      
      // Restore exact scroll position
      window.scrollTo(scrollX, scrollY);
      
      // Clean up event listeners
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('wheel', preventScrollOutsideModal);
      document.removeEventListener('touchmove', preventScrollOutsideModal);
    };
  }, [isOpen, onClose]);

  // Reset active image index when experience changes
  useEffect(() => {
    if (isOpen) {
      setActiveImageIndex(0);
      setIsImageLoading(true);
      setFallbackUsed(false);
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
    if (!fallbackUsed) {
      console.error("Failed to load modal image:", (e.target as HTMLImageElement).src);
      
      // Try to find a fallback based on experience type
      const title = experience.title.toLowerCase();
      let fallbackPath = "/images/TXA_fallback.jpg";
      
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
      (e.target as HTMLImageElement).src = "/images/TXA_fallback.jpg";
    }
  };

  return (
    // Modal Backdrop with fade-in animation
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop bg-black/90 backdrop-blur-sm overflow-y-auto transition-opacity duration-300 ${isModalMounted ? 'opacity-100' : 'opacity-0'}`}
      onClick={(e) => {
        if ((e.target as HTMLElement).classList.contains('modal-backdrop')) {
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
                      onError={handleImageError}
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
                  // First close the modal to restore the scroll position
                  onClose();
                  // Then scroll to contact section with a slight delay
                  setTimeout(() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
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

// ----- MAIN COMPONENT -----
export function ExperiencesSection() {
  const { language } = useLanguage();
  const t = useTranslation(language as any);
  
  // Get experiences from translations
  const experiences: Experience[] = t.experiences.list;
  
  // State for selected experience and modal
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Pre-load images on component mount
  useEffect(() => {
    // Preload all experience images to improve UX
    experiences.forEach(experience => {
      if (experience.image) {
        const img = new Image();
        img.src = experience.image;
      }
      
      // Also preload gallery images
      if (experience.gallery && experience.gallery.length > 0) {
        experience.gallery.forEach(galleryImage => {
          const img = new Image();
          img.src = galleryImage;
        });
      }
    });
  }, [experiences]);
  
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
  
  return (
    <section id="experiences" className="py-24 bg-gradient-to-b from-black to-card-bg relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.experiences.title}
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            {t.experiences.subtitle}
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {experiences.map((experience) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              language={language}
              onOpenDetail={openExperienceDetail}
            />
          ))}
        </div>
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