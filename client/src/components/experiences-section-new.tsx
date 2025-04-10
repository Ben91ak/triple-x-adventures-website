import { useState, useEffect } from "react";
import { Experience } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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
  
  // Exit early if the modal is not open
  if (!isOpen) return null;
  
  // Get the correct gallery images based on experience type
  const getGalleryImages = (): string[] => {
    const title = experience.title.toLowerCase();
    
    if (title.includes('husky')) {
      return [
        '/images/Huskys/Husky 1_result.webp',
        '/images/Huskys/Husky 2_result.webp',
        '/images/Huskys/Husky 3_result.webp',
        '/images/Huskys/Husky 4_result.webp'
      ];
    } 
    else if (title.includes('snowmobile')) {
      return [
        '/images/Snowmobile/Snowmobile.jpg',
        '/images/Snowmobile/Snowmobile 1_result.webp',
        '/images/Snowmobile/Snowmobile 2_result.webp',
        '/images/Snowmobile/Snowmobile 3_result.webp'
      ];
    } 
    else if (title.includes('restaurant') || title.includes('jayjay')) {
      return [
        '/images/restaurant/jayjays-exterior.jpg',
        '/images/JayJays Restaurant/Food 1_result.webp',
        '/images/JayJays Restaurant/Food 2_result.webp',
        '/images/JayJays Restaurant/Food 3_result.webp'
      ];
    } 
    else if (title.includes('kart')) {
      return [
        '/images/ice-kart.jpg',
        '/images/Ice Kart/Icekart 1_result.webp',
        '/images/Ice Kart/Icekart 2_result.webp',
        '/images/Ice Kart/Icekart 3_result.webp'
      ];
    } 
    else if (title.includes('reindeer')) {
      return [
        '/images/Reindeers.jpg',
        '/images/Reindeers/Reindeers 1_result.webp',
        '/images/Reindeers/Reindeers 2_result.webp',
        '/images/Reindeers/Reindeers 3_result.webp'
      ];
    } 
    else if (title.includes('helicopter') || title.includes('helikopter')) {
      return [
        '/images/Helikopter.jpg',
        '/images/Helicopter/Helikopter 1_result.webp',
        '/images/Helicopter/Helikopter 2_result.webp',
        '/images/Helicopter/Helikopter 3_result.webp'
      ];
    } 
    else if (title.includes('drift')) {
      return [
        '/images/Drifting.jpg',
        '/images/Ice Drift/Cars 1_result.webp',
        '/images/Ice Drift/Cars 2_result.webp',
        '/images/Ice Drift/Cars 3_result.webp'
      ];
    } 
    else if (title.includes('fishing')) {
      return [
        '/images/Ice-Fishing.jpg',
        '/images/Ice Fishing/Icefish 1_result.webp',
        '/images/Ice Fishing/Icefish 2_result.webp',
        '/images/Ice Fishing/Shoot 3_result.webp'
      ];
    } 
    else if (title.includes('buggy') || title.includes('side')) {
      return [
        '/images/Side-By-Side-Buggy-Drifting.jpg',
        '/images/Side by Side/SBS 1_result.webp',
        '/images/Side by Side/SBS 2_result.webp',
        '/images/Side by Side/SBS 3_result.webp'
      ];
    }
    
    // Fallback to the experience's gallery or just the main image
    return experience.gallery && experience.gallery.length > 0 
      ? experience.gallery 
      : [experience.image];
  };
  
  const gallery = getGalleryImages();
  
  return (
    // Modal Container - Full screen with background overlay
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop bg-black/75 backdrop-blur-sm overflow-y-auto transform-gpu"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-title-${experience.id}`}
    >
      {/* Modal Content */}
      <div 
        className="bg-card-bg/90 backdrop-blur-md border border-white/20 rounded-xl w-full max-w-5xl p-4 md:p-6 shadow-xl transform-gpu"
        style={{ maxHeight: 'calc(100vh - 40px)', overflowY: 'auto' }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
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
                onError={(e) => {
                  console.error("Failed to load detail image:", (e.target as HTMLImageElement).src);
                  // Fallback to a default image if gallery image fails
                  (e.target as HTMLImageElement).src = '/images/TXA_fallback.jpg';
                  setIsImageLoading(false);
                }}
              />
              
              {/* Navigation Arrows - Only show if we have more than 1 image */}
              {gallery.length > 1 && (
                <>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-accent-color/70 transition-colors z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-accent-color/70 transition-colors z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
              
              {/* Image Counter */}
              {gallery.length > 1 && (
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 text-white text-xs rounded-full">
                  {activeImageIndex + 1} / {gallery.length}
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative aspect-square rounded overflow-hidden border-2 transition-all ${
                      activeImageIndex === index ? 'border-accent-color ring-2 ring-accent-color/50' : 'border-transparent'
                    }`}
                    aria-label={`View image ${index + 1}`}
                    aria-current={activeImageIndex === index ? 'true' : 'false'}
                  >
                    <img 
                      src={img}
                      alt={`${experience.title} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        console.error("Failed to load thumbnail:", (e.target as HTMLImageElement).src);
                        (e.target as HTMLImageElement).src = '/images/TXA_fallback.jpg';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Right Column - Experience Details */}
          <div className="lg:w-1/2">
            <h2 
              id={`modal-title-${experience.id}`}
              className="text-3xl font-bold mb-4 text-white"
            >
              {experience.title}
            </h2>
            
            {/* Different layouts based on experience type */}
            {experience.fullDescription && experience.fullDescription.includes('snowmobile') ? (
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
                    
                    {/* ALL-DAY ADVENTURE */}
                    <div className="bg-card-bg/20 rounded-lg p-4 border border-white/10">
                      <h4 className="text-accent-color font-semibold mb-2 flex items-center gap-2">
                        <span className="inline-block w-4 h-4 bg-accent-color/70 rotate-45"></span>
                        <span>ALL-DAY ADVENTURE</span>
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
                      <p className="ml-6">Sit back, relax, and enjoy the ride! Up to 4 guests comfortably seated in one sled driven by an experienced musher.</p>
                    </div>
                    
                    {/* Active Tour */}
                    <div className="bg-card-bg/20 rounded-lg p-4 border border-white/10">
                      <h4 className="text-accent-color font-semibold mb-2 flex items-center gap-2">
                        <span className="inline-block w-4 h-4 bg-accent-color/70 rotate-45"></span>
                        <span>ACTIVE TOUR</span>
                      </h4>
                      <p className="ml-6">Take turns driving! Two guests per sled, with one driving and one riding. Swap places during the tour to fully enjoy both experiences.</p>
                    </div>
                  </div>
                </div>
                
                {/* Tour Details section */}
                <div className="mb-6">
                  <h3 className="text-white font-bold text-lg flex items-center gap-2 mb-4">
                    <span className="h-px w-6 bg-accent-color"></span>
                    <span>TOUR DETAILS</span>
                    <span className="h-px flex-grow bg-accent-color"></span>
                  </h3>
                  
                  <ul className="list-disc list-inside space-y-2 ml-4 text-white/90">
                    <li>Routes: Customized 10-15 km trails</li>
                    <li>Duration: 1.5-2 hours</li>
                    <li>Difficulty: Suitable for all skill levels</li>
                    <li>Equipment: Winter clothing and boots provided</li>
                  </ul>
                </div>
                
                <p className="italic text-white/80">
                  An authentic Arctic adventure that connects you deeply with nature and leaves you with unforgettable memories!
                </p>
              </div>
            ) : (
              <div className="prose prose-invert max-w-none">
                <div className="text-white text-opacity-90 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                  {experience.fullDescription || experience.description}
                </div>
              </div>
            )}
            
            {/* Experience Navigation */}
            <div className="flex justify-between mt-8 pt-4 border-t border-white/10">
              <button 
                onClick={onPrevious}
                className="flex items-center text-white/80 hover:text-accent-color transition-colors"
                aria-label="View previous experience"
              >
                <ChevronLeft size={20} />
                <span className="ml-1">{t.experiences.previousExperience}</span>
              </button>
              
              <button 
                onClick={onNext}
                className="flex items-center text-white/80 hover:text-accent-color transition-colors"
                aria-label="View next experience"
              >
                <span className="mr-1">{t.experiences.nextExperience}</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Experiences Section component
export function ExperiencesSection() {
  const { language } = useLanguage();
  const t = useTranslation(language as any);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Get experiences from the translation
  const experiences = t.experiences.list as Experience[];
  
  // Navigation handlers
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

  // Helper function to get the correct image path for each experience
  const getExperienceImage = (experience: Experience): string => {
    const title = experience.title.toLowerCase();
    
    if (title.includes('husky')) {
      return '/images/Huskys/Husky 1_result.webp';
    } 
    else if (title.includes('snowmobile')) {
      return '/images/Snowmobile/Snowmobile.jpg';
    } 
    else if (title.includes('restaurant') || title.includes('jayjay')) {
      return '/images/restaurant/jayjays-exterior.jpg';
    } 
    else if (title.includes('kart')) {
      return '/images/ice-kart.jpg';
    } 
    else if (title.includes('reindeer')) {
      return '/images/Reindeers.jpg';
    } 
    else if (title.includes('helicopter') || title.includes('helikopter')) {
      return '/images/Helikopter.jpg';
    } 
    else if (title.includes('drift')) {
      return '/images/Drifting.jpg';
    } 
    else if (title.includes('fishing')) {
      return '/images/Ice-Fishing.jpg';
    } 
    else if (title.includes('buggy') || title.includes('side')) {
      return '/images/Side-By-Side-Buggy-Drifting.jpg';
    }
    
    // If no specific image was found, use the one from the translation file
    return experience.image;
  };

  return (
    <section id="pakete" className="py-16 md:py-28 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 transform-gpu">
        <div className="aurora-glow absolute inset-0 opacity-30"></div>
        <div className="absolute inset-0 transform-gpu">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-accent-color/5 to-transparent opacity-30 transform-gpu"></div>
        </div>
        <div className="stars absolute inset-0 z-1 opacity-40 transform-gpu will-change-opacity"></div>
      </div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wNCIgZmlsbC1ydWxlPSJub256ZXJvIj48cGF0aCBkPSJNMjkgNTguNWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1em0wIDFhNi41IDYuNSAwIDEgMCAwIDEzIDYuNSA2LjUgMCAwIDAgMC0xM3ptMS0uMDg3YTcuNSA3LjUgMCAxIDEgMCAxNSA3LjUgNy41IDAgMCAxIDAtMTV6TTIwIDU5LjVhNy41IDcuNSAwIDEgMSAwIDE1IDcuNSA3LjUgMCAwIDEgMC0xNXptMCAxYTYuNSA2LjUgMCAxIDAgMCAxMyA2LjUgNi41IDAgMCAwIDAtMTN6bTAtMWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1eiIvPjwvZz48L2c+PC9zdmc+')]  opacity-60 pointer-events-none transform-gpu"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
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
        
        {/* Experience cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 will-change-transform transform-gpu">
          {experiences.map((experience) => (
            <div 
              key={experience.id} 
              className="group relative will-change-transform transition-all duration-300 hover:translate-y-[-5px] transform-gpu"
            >
              {/* Card glow effect on hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-color/20 to-transparent rounded-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300 blur-md transform-gpu will-change-opacity"></div>
              
              {/* Card content */}
              <div className="glass-card relative z-10 overflow-hidden bg-card-bg/70 backdrop-blur-md border border-white/20 rounded-xl hover:shadow-lg hover:border-accent-color/30 hover:shadow-accent-color/10 transition-all duration-300 transform-gpu">
                {/* Card image section */}
                <div className="relative h-[225px] overflow-hidden">
                  <img 
                    src={getExperienceImage(experience)}
                    alt={experience.title} 
                    loading={experience.id > 3 ? "lazy" : "eager"}
                    decoding="async"
                    width="640" 
                    height="480"
                    onError={(e) => {
                      console.warn(`Error loading image for: ${experience.title}`);
                      (e.target as HTMLImageElement).src = '/images/TXA_fallback.jpg';
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                  
                  {/* Tag (bestseller/new) */}
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
                
                {/* Card text content */}
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
                      className="inline-flex items-center gap-1.5 text-accent-color hover:text-white transition-colors font-medium text-sm px-3 py-2"
                      aria-label={`View details for ${experience.title}`}
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
        
        {/* Call to action */}
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