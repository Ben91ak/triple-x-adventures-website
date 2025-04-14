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

    // Prevent background page movement
    const handleBackdropClick = (e: MouseEvent) => {
      // Check if clicked element has the modal-backdrop class
      if ((e.target as HTMLElement).classList.contains('modal-backdrop')) {
        e.preventDefault(); // Prevent default to stop page jumping
        e.stopPropagation(); // Stop event propagation
        onClose();
      }
    };

    // Improved touch handling for mobile devices
    const handleTouchEnd = (e: TouchEvent) => {
      const target = document.elementFromPoint(
        e.changedTouches[0].clientX, 
        e.changedTouches[0].clientY
      ) as HTMLElement;

      if (target && target.classList.contains('modal-backdrop')) {
        e.preventDefault(); // Prevent default to stop page jumping
        e.stopPropagation(); // Stop event propagation
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.addEventListener('click', handleBackdropClick, { passive: false });
      document.addEventListener('touchend', handleTouchEnd, { passive: false });

      // IMPORTANT: Fix for scrolling issue when modal opens
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('click', handleBackdropClick);
      document.removeEventListener('touchend', handleTouchEnd);

      // IMPORTANT: Restore scroll position when modal closes
      if (isOpen) {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
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

  // Exit early if the modal is not open
  if (!isOpen) return null;

  // Get the correct gallery images based on experience type
  const getGalleryImages = (): string[] => {
    const title = experience.title.toLowerCase();

    // Define gallery mappings with correct paths
    const galleryMappings: Record<string, string[]> = {
      'snowmobile': [
        '/images/Snowmobile/Snowmobile 1_result.webp',
        '/images/Snowmobile/Snowmobile 2_result.webp',
        '/images/Snowmobile/Snowmobile 3_result.webp',
        '/images/Snowmobile/Snowmobile 4_result.webp'
      ],
      'restaurant': [
        '/images/JayJays-Restaurant.jpg',
        '/images/restaurant/jayjays-exterior.jpg',
        '/images/restaurant/dish.jpg',
        '/images/restaurant/dining-area.jpg'
      ],
      'jayjay': [
        '/images/JayJays-Restaurant.jpg',
        '/images/restaurant/jayjays-exterior.jpg',
        '/images/restaurant/dish.jpg',
        '/images/restaurant/dining-area.jpg'
      ],
      'kart': [
        '/images/Ice Kart.jpg',
        '/images/Ice Kart/Icekart 1_result.webp',
        '/images/Ice Kart/Icekart 2_result.webp',
        '/images/Ice Kart/Icekart 3_result.webp'
      ],
      'reindeer': [
        '/images/Reindeers.jpg',
        '/images/Reindeers/Reindeers 1_result.webp',
        '/images/Reindeers/Reindeers 2_result.webp',
        '/images/Reindeers/Reindeers 3_result.webp'
      ],
      'helicopter': [
        '/images/Helikopter.jpg',
        '/images/Helicopter/Helikopter 1_result.webp',
        '/images/Helicopter/Helikopter 2_result.webp',
        '/images/Helicopter/Helikopter 3_result.webp'
      ],
      'helikopter': [
        '/images/Helikopter.jpg',
        '/images/Helicopter/Helikopter 1_result.webp',
        '/images/Helicopter/Helikopter 2_result.webp',
        '/images/Helicopter/Helikopter 3_result.webp'
      ],
      'drift': [
        '/images/Drifting.jpg',
        '/images/Ice Drift/Cars 1_result.webp',
        '/images/Ice Drift/Cars 2_result.webp',
        '/images/Ice Drift/Cars 3_result.webp'
      ],
      'fishing': [
        '/images/Ice-Fishing.jpg',
        '/images/Ice Fishing/Icefish 1_result.webp',
        '/images/Ice Fishing/Icefish 2_result.webp',
        '/images/Ice Fishing/Shoot 3_result.webp'
      ],
      'buggy': [
        '/images/Side-By-Side-Buggy-Drifting.jpg',
        '/images/Side by Side/SBS 1_result.webp',
        '/images/Side by Side/SBS 2_result.webp',
        '/images/Side by Side/SBS 3_result.webp'
      ],
      'side': [
        '/images/Side-By-Side-Buggy-Drifting.jpg',
        '/images/Side by Side/SBS 1_result.webp',
        '/images/Side by Side/SBS 2_result.webp',
        '/images/Side by Side/SBS 3_result.webp'
      ],
      'husky': [
        '/images/Huskys/Husky 1_result.webp',
        '/images/Huskys/Husky 2_result.webp',
        '/images/Huskys/Husky 3_result.webp',
        '/images/Huskys/Husky 4_result.webp'
      ],
      'dog': [
        '/images/Huskys/Husky 1_result.webp',
        '/images/Huskys/Husky 2_result.webp',
        '/images/Huskys/Husky 3_result.webp',
        '/images/Huskys/Husky 4_result.webp'
      ]
    };

    // Find the matching gallery
    for (const [keyword, gallery] of Object.entries(galleryMappings)) {
      if (title.includes(keyword)) {
        return gallery;
      }
    }

    // Fallback to the experience's gallery or just the main image
    return experience.gallery && experience.gallery.length > 0 
      ? experience.gallery 
      : [experience.image];
  };

  const gallery = getGalleryImages();

  // Standardized experience content display function
  const renderExperienceContent = () => {
    // Create a consistent experience presentation structure
    const title = experience.title.toLowerCase();

    // Extract potential sections from description
    const description = experience.fullDescription || experience.description;

    // Determine if the experience has different sections (like "PICK YOUR ADVENTURE" for snowmobile)
    const hasSections = description.includes('━━━');

    if (hasSections) {
      // For experiences with sections, split and format them properly
      const sections = description.split('━━━').map(section => section.trim());
      const introduction = sections[0];

      // Extract section titles and content
      const sectionTitles = sections.slice(1).map(section => {
        const titleMatch = section.match(/^(.*?)(?:\n|$)/);
        return titleMatch ? titleMatch[1].trim() : '';
      });

      const sectionContents = sections.slice(1).map(section => {
        const contentMatch = section.match(/^.*?\n([\s\S]*)/);
        return contentMatch ? contentMatch[1].trim() : section;
      });

      return (
        <div className="leading-relaxed">
          {/* Introduction text */}
          <p className="mb-6">{introduction}</p>

          {/* Render each section */}
          {sectionTitles.map((sectionTitle, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-white font-bold text-lg flex items-center gap-2 mb-4">
                <span className="h-px w-6 bg-accent-color"></span>
                <span>{sectionTitle}</span>
                <span className="h-px flex-grow bg-accent-color"></span>
              </h3>

              <div className="space-y-4">
                {/* Parse section content into cards if it contains subsections */}
                {renderSectionContent(sectionContents[index], title)}
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      // For experiences without sections, present in a simple format
      return (
        <div className="prose prose-invert max-w-none">
          <div className="text-white text-opacity-90 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
            {description}
          </div>
        </div>
      );
    }
  };

  // Helper function to render section content
  const renderSectionContent = (content: string, experienceType: string) => {
    // Check if content has subsections (denoted by specific format)
    const hasSubsections = content.includes('★') || 
                           content.includes('•') || 
                           experienceType.includes('snowmobile');

    if (hasSubsections) {
      // Split by common subsection indicators
      let subsections: string[] = [];

      if (experienceType.includes('snowmobile')) {
        // Special handling for snowmobile experience
        return (
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
        );
      } else if (content.includes('★')) {
        subsections = content.split('★').filter(s => s.trim().length > 0);

        return (
          <div className="space-y-4">
            {subsections.map((subsection, idx) => (
              <div key={idx} className="bg-card-bg/20 rounded-lg p-4 border border-white/10">
                <h4 className="text-accent-color font-semibold mb-2 flex items-center gap-2">
                  <span className="inline-block w-4 h-4 bg-accent-color/70 rotate-45"></span>
                  <span>{subsection.split('\n')[0].trim()}</span>
                </h4>
                <div className="ml-6">
                  {subsection.split('\n').slice(1).map((line, lineIdx) => (
                    <p key={lineIdx} className="mb-2">{line.trim()}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      } else if (content.includes('•')) {
        // Format bullet point lists
        return (
          <div>
            <ul className="list-disc list-inside space-y-2 ml-4 text-white/90">
              {content.split('•').filter(item => item.trim().length > 0).map((item, idx) => (
                <li key={idx}>{item.trim()}</li>
              ))}
            </ul>
          </div>
        );
      }
    }

    // Default rendering for simple text content
    return (
      <div className="space-y-2">
        {content.split('\n').map((paragraph, idx) => (
          <p key={idx} className="text-white/90">{paragraph.trim()}</p>
        ))}
      </div>
    );
  };

  return (
    // Modal Container with improved mobile handling
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop bg-black/80 backdrop-blur-sm overflow-y-auto will-change-transform"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-title-${experience.id}`}
      onClick={(e) => {
        // Only close if clicking directly on the backdrop
        if ((e.target as HTMLElement).classList.contains('modal-backdrop')) {
          e.preventDefault();
          onClose();
        }
      }}
    >
      {/* Modal Content with improved mobile handling */}
      <div 
        className="bg-card-bg/90 backdrop-blur-md border border-white/20 rounded-xl w-full max-w-5xl p-4 md:p-6 shadow-xl will-change-transform"
        style={{ maxHeight: 'calc(100vh - 40px)', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
      >
        {/* Close Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
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
                      e.preventDefault();
                      e.stopPropagation();
                      const newIndex = (activeImageIndex - 1 + gallery.length) % gallery.length;
                      setActiveImageIndex(newIndex);
                    }} 
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const newIndex = (activeImageIndex + 1) % gallery.length;
                      setActiveImageIndex(newIndex);
                    }} 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative aspect-[4/3] overflow-hidden rounded-md ${
                      index === activeImageIndex ? 'ring-2 ring-accent-color' : 'opacity-70 hover:opacity-100'
                    }`}
                    aria-label={`View image ${index + 1}`}
                    aria-current={index === activeImageIndex ? 'true' : 'false'}
                  >
                    <img 
                      src={image} 
                      alt={`${experience.title} thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover"
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
            {/* Experience Title */}
            <h2 
              id={`modal-title-${experience.id}`}
              className="text-2xl md:text-3xl font-bold text-white mb-4"
            >
              {experience.title}
            </h2>
            
            {/* Experience Content */}
            <div className="space-y-6">
              {renderExperienceContent()}
            </div>
            
            {/* Bottom Navigation for browsing experiences */}
            <div className="flex justify-between items-center mt-8 pt-4 border-t border-white/10">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onPrevious();
                }}
                className="text-white hover:text-accent-color transition-colors flex items-center"
                aria-label="Previous experience"
              >
                <ChevronLeft size={20} />
                <span className="ml-1">{t.experiences.previousExperience}</span>
              </button>
              
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onNext();
                }}
                className="text-white hover:text-accent-color transition-colors flex items-center"
                aria-label="Next experience"
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

  // Get all experiences from the translation
  let experienceList = t.experiences.list as Experience[];

  // Include all experiences - don't filter out husky anymore
  let experiences: Experience[] = experienceList.map(exp => {
    // Create a new experience with updated properties
    const updatedExp = {
      ...exp,
      // Add empty fullDescription if not provided in translations
      fullDescription: exp.fullDescription || exp.description
    };

    // Override image path based on title for consistent image loading
    const title = updatedExp.title.toLowerCase();

    // Map titles to correct image paths
    if (title.includes('snowmobile')) {
      updatedExp.image = '/images/Snowmobile/Snowmobile 1_result.webp';
      updatedExp.gallery = [
        '/images/Snowmobile/Snowmobile 1_result.webp',
        '/images/Snowmobile/Snowmobile 2_result.webp',
        '/images/Snowmobile/Snowmobile 3_result.webp',
        '/images/Snowmobile/Snowmobile 4_result.webp'
      ];
    } else if (title.includes('restaurant') || title.includes('jayjay')) {
      updatedExp.image = '/images/JayJays-Restaurant.jpg';
      updatedExp.gallery = [
        '/images/JayJays-Restaurant.jpg',
        '/images/restaurant/jayjays-exterior.jpg',
        '/images/restaurant/dish.jpg',
        '/images/restaurant/dining-area.jpg'
      ];
    } else if (title.includes('kart')) {
      updatedExp.image = '/images/Ice Kart.jpg';
      updatedExp.gallery = [
        '/images/Ice Kart.jpg',
        '/images/Ice Kart/Icekart 1_result.webp',
        '/images/Ice Kart/Icekart 2_result.webp',
        '/images/Ice Kart/Icekart 3_result.webp'
      ];
    } else if (title.includes('reindeer')) {
      updatedExp.image = '/images/Reindeers.jpg';
      updatedExp.gallery = [
        '/images/Reindeers.jpg',
        '/images/Reindeers/Reindeers 1_result.webp',
        '/images/Reindeers/Reindeers 2_result.webp',
        '/images/Reindeers/Reindeers 3_result.webp'
      ];
    } else if (title.includes('helicopter') || title.includes('helikopter')) {
      updatedExp.image = '/images/Helikopter.jpg';
      updatedExp.gallery = [
        '/images/Helikopter.jpg',
        '/images/Helicopter/Helikopter 1_result.webp',
        '/images/Helicopter/Helikopter 2_result.webp',
        '/images/Helicopter/Helikopter 3_result.webp'
      ];
    } else if (title.includes('drift')) {
      updatedExp.image = '/images/Drifting.jpg';
      updatedExp.gallery = [
        '/images/Drifting.jpg',
        '/images/Ice Drift/Cars 1_result.webp',
        '/images/Ice Drift/Cars 2_result.webp',
        '/images/Ice Drift/Cars 3_result.webp'
      ];
    } else if (title.includes('fishing')) {
      updatedExp.image = '/images/Ice-Fishing.jpg';
      updatedExp.gallery = [
        '/images/Ice-Fishing.jpg',
        '/images/Ice Fishing/Icefish 1_result.webp',
        '/images/Ice Fishing/Icefish 2_result.webp',
        '/images/Ice Fishing/Shoot 3_result.webp'
      ];
    } else if (title.includes('buggy') || title.includes('side')) {
      updatedExp.image = '/images/Side-By-Side-Buggy-Drifting.jpg';
      updatedExp.gallery = [
        '/images/Side-By-Side-Buggy-Drifting.jpg',
        '/images/Side by Side/SBS 1_result.webp',
        '/images/Side by Side/SBS 2_result.webp',
        '/images/Side by Side/SBS 3_result.webp'
      ];
    } else if (title.includes('husky') || title.includes('dog')) {
      updatedExp.image = '/images/Huskys/Husky 1_result.webp';
      updatedExp.gallery = [
        '/images/Huskys/Husky 1_result.webp',
        '/images/Huskys/Husky 2_result.webp',
        '/images/Huskys/Husky 3_result.webp',
        '/images/Huskys/Husky 4_result.webp'
      ];
    }

    return updatedExp;
  });

  // Custom order to display cards in desired sequence with Husky after Side-by-Side
  // Create a custom ordered array that will explicitly place the husky card after the side-by-side
  // Specifically place husky card (ID 10) right after side-by-side card (ID 9)
  const customOrder: Record<number, number> = { 10: 9.5 };

  // Sort using the custom order
  experiences = experiences.sort((a, b) => {
    return (customOrder[a.id] || a.id) - (customOrder[b.id] || b.id);
  });

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

  // FIXED: Function to open modal with selected experience - preventing page jump
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

  // Improved helper function to get the correct image path for each experience
  const getExperienceImage = (experience: Experience): string => {
    const title = experience.title.toLowerCase();

    // Mapping of experience types to correct image paths
    const imageMappings = {
      'snowmobile': '/images/Snowmobile/Snowmobile 1_result.webp',
      'restaurant': '/images/restaurant/jayjays-exterior.jpg',
      'jayjay': '/images/restaurant/jayjays-exterior.jpg',
      'kart': '/images/Ice Kart/Icekart 1_result.webp',
      'reindeer': '/images/Reindeers/Reindeers 1_result.webp',
      'helicopter': '/images/Helicopter/Helikopter 1_result.webp',
      'helikopter': '/images/Helicopter/Helikopter 1_result.webp',
      'drift': '/images/Ice Drift/Cars 1_result.webp',
      'fishing': '/images/Ice Fishing/Icefish 1_result.webp',
      'buggy': '/images/Side by Side/SBS 3_result.webp',
      'side': '/images/Side by Side/SBS 3_result.webp',
      'husky': '/images/Huskys/Husky 1_result.webp',
      'dog': '/images/Huskys/Husky 1_result.webp'
    };

    // Find the matching image path
    for (const [keyword, path] of Object.entries(imageMappings)) {
      if (title.includes(keyword)) {
        return path;
      }
    }

    // If no specific image was found, use the one from the translation file
    return experience.image;
  };

  // Return the component JSX
  return (
    <section id="experiences" className="py-24 bg-gradient-to-b from-black to-card-bg relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.experiences.title}
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            {t.experiences.description}
          </p>
        </div>

        {/* FIXED: Standardized Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {experiences.map((experience) => (
            <div 
              key={experience.id} 
              className="relative group overflow-hidden rounded-xl bg-card-bg/40 shadow-lg border border-white/5 hover:border-white/20 transition-all duration-300 h-full flex flex-col"
            >
              {/* Card Image Container - Fixed aspect ratio for all cards */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={getExperienceImage(experience)} 
                  alt={experience.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    console.error("Failed to load card image:", (e.target as HTMLImageElement).src);
                    (e.target as HTMLImageElement).src = '/images/TXA_fallback.jpg';
                  }}
                />
                
                {/* Gradient overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                
                {/* Experience title (displayed over the image) */}
                <h3 className="absolute bottom-0 left-0 right-0 p-4 text-white text-xl font-bold">
                  {experience.title}
                </h3>
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
                  onClick={(e) => openExperienceDetail(experience, e)}
                  className="w-full py-2 px-4 bg-accent-color hover:bg-accent-color/80 text-black font-medium rounded-md transition-colors mt-auto"
                >
                  {t.experiences.viewDetailsButton}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Detail Modal */}
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