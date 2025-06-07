import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/use-translation';
import { Experience } from '../types';
import { 
  X, ChevronRight, 
  Zap, Star, Trees, Sparkles, Mountain,
  Snowflake, Users, Fish, Utensils
} from "lucide-react";
import { useLanguage } from '../contexts/LanguageContext';
import { videoUrls } from '@/config/videoUrls';
import { disableBodyScroll, enableBodyScroll, cleanupScrollState } from '../utils/scroll-preservation';

interface ExperienceDetailModalProps {
  experience: Experience | null;
  isOpen: boolean;
  onClose: () => void;
}

interface ExperiencesSectionProps {
  experiences?: Experience[];
}

// Define the ExperienceVideoType type
export type ExperienceVideoType = 'buggy' | 'husky' | 'helicopter' | 'drift' | 'snowmobile' | 'icefishing' | 'reindeer' | 'snowshoe' | 'torchwalk' | 'arcticAdventure' | 'icePerformance' | 'sidewayPackage' | 'ice' | 'snow' | 'aurora' | 'northernlights' | 'icehotel' | 'icehotelpackage' | 'aurorapackage' | 'auroratour' | 'northernlightstour' | 'icehoteltour' | 'northernlightspackage';

// Icon mapping for experience tags
const iconMap: Record<string, React.ReactNode> = {
  bestseller: <Star className="w-3 h-3 text-yellow-400" />,
  new: <Sparkles className="w-3 h-3 text-blue-400" />,
  featured: <Star className="w-3 h-3 text-purple-400" />,
  nature: <Trees className="w-3 h-3 text-green-400" />,
  adrenaline: <Zap className="w-3 h-3 text-red-400" />,
  scenic: <Mountain className="w-3 h-3 text-sky-400" />,
  snow: <Snowflake className="w-3 h-3 text-blue-200" />,
  group: <Users className="w-3 h-3 text-indigo-400" />,
  fishing: <Fish className="w-3 h-3 text-cyan-400" />,
  food: <Utensils className="w-3 h-3 text-amber-400" />,
};

const ExperienceDetailModal: React.FC<ExperienceDetailModalProps> = ({
  experience,
  isOpen,
  onClose,
}) => {
  if (!experience || !isOpen) return null;

  const { t } = useTranslation();

  // Check if video exists and determine its format
  const hasVideo = !!experience.video;
  const videoWebmUrl = typeof experience.video === 'string' ? experience.video : experience.video?.webm;
  const videoMp4Url = typeof experience.video === 'string' ? experience.video.replace('.webm', '.mp4') : experience.video?.mp4;

  // References for modal elements - no custom scroll handler needed for better accessibility
  const modalContentRef = useRef<HTMLDivElement>(null);
  const textPanelRef = useRef<HTMLDivElement>(null);
  
  // State for scroll-based fade effect
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [textPanelTransform, setTextPanelTransform] = useState(0);
  
  // Effect to handle modal open/close with scroll position preservation
  useEffect(() => {
    if (isOpen) {
      // Use the utility function to disable body scroll and preserve position
      disableBodyScroll();
    } else {
      // Use the utility function to restore body scroll and position
      enableBodyScroll();
    }
    
    // Cleanup function to restore scrolling when component unmounts
    return () => {
      cleanupScrollState();
    };
  }, [isOpen]);

  // Handle scroll-based effects for text panel
  useEffect(() => {
    const handleScroll = () => {
      if (textPanelRef.current) {
        const scrollTop = textPanelRef.current.scrollTop;
        const scrollHeight = textPanelRef.current.scrollHeight;
        const clientHeight = textPanelRef.current.clientHeight;
        
        // Calculate scroll progress (0 to 1)
        const scrollProgress = scrollTop / (scrollHeight - clientHeight);
        
        // Fade effect for gradient overlay
        const fadeStart = 0.1;
        const fadeEnd = 0.6;
        let opacity = 1;
        if (scrollProgress > fadeStart) {
          opacity = Math.max(0, 1 - ((scrollProgress - fadeStart) / (fadeEnd - fadeStart)));
        }
        setScrollOpacity(opacity);
        
        // Transform effect for text panel (slide up to overlay video)
        // Start sliding when user scrolls, max overlay at 40% scroll
        const transformStart = 0.05;
        const transformEnd = 0.4;
        let transform = 0;
        
        if (scrollProgress > transformStart) {
          const transformProgress = Math.min(1, (scrollProgress - transformStart) / (transformEnd - transformStart));
          // On mobile, move up by 50vh (half the video height), on desktop less
          const maxTransform = window.innerWidth < 768 ? 50 : 30;
          transform = transformProgress * maxTransform;
        }
        
        setTextPanelTransform(transform);
      }
    };

    const textPanel = textPanelRef.current;
    if (textPanel) {
      textPanel.addEventListener('scroll', handleScroll, { passive: true });
      return () => textPanel.removeEventListener('scroll', handleScroll);
    }
  }, [isOpen]);

  // Enhanced close handler to ensure proper cleanup
  const handleClose = () => {
    // Force immediate cleanup of scroll state before closing
    cleanupScrollState();
    enableBodyScroll();
    
    // Small delay to ensure scroll is restored before closing
    setTimeout(() => {
      onClose();
    }, 50);
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);
  
  // Handle backdrop click to close modal - improved for mobile
  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only handle mouse clicks, not touch events
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && experience && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[110] flex items-start md:items-center justify-center overflow-hidden"
          onClick={handleBackdropClick}
          style={{ touchAction: 'none' }} // Prevent default touch behaviors
        >
          <motion.div 
            ref={modalContentRef}
            className="relative w-full max-w-7xl bg-transparent rounded-xl overflow-hidden shadow-2xl flex flex-col min-h-[100vh] md:min-h-[70vh] lg:min-h-[80vh] max-h-[100vh] m-0 md:m-4 lg:m-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: "easeIn" } }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Desktop close button - hidden on mobile */}
            <button
              onClick={handleClose}
              className="hidden md:block absolute top-4 right-4 z-[120] p-2 rounded-full bg-black/70 text-white hover:bg-accent-color/90 transition-colors shadow-lg"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Mobile close button - visible on mobile for better UX */}
            <div className="md:hidden absolute top-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-4 flex justify-between items-center z-[115] border-b border-white/20">
              <h2 className="text-lg font-bold text-white truncate pr-4">{experience.title}</h2>
              <button
                onClick={handleClose}
                className="p-2 rounded-full bg-black/50 text-white hover:bg-accent-color/90 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Video background - full container */}
            <div className="absolute inset-0 mt-16 md:mt-0">
              <div className="relative w-full h-full overflow-hidden bg-black">
                {/* Video if available */}
                {hasVideo && (
                  <div className="w-full h-full">
                    <video 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Video playback error:', e);
                        // Fall back to image if video fails
                        const target = e.target as HTMLVideoElement;
                        target.style.display = 'none';
                      }}
                    >
                      {/* WebM source for Chrome and Firefox */}
                      {videoWebmUrl && <source src={videoWebmUrl} type="video/webm" />}
                      {/* MP4 fallback for Safari */}
                      {videoMp4Url && <source src={videoMp4Url} type="video/mp4" />}
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
                
                {/* Fallback image if no video */}
                {!hasVideo && (
                  <div className="w-full h-full flex items-center justify-center bg-gray-900">
                    <p className="text-white/70 text-center p-4">{t('experiences.noVideoAvailable') || 'No video available for this experience'}</p>
                  </div>
                )}

                {/* Subtle gradient overlay for better video-text contrast */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none transition-opacity duration-300"
                  style={{ opacity: scrollOpacity }}
                />
              </div>
            </div>
            
            {/* Scrollable text panel - starts below video, slides up on scroll */}
            <div 
              ref={textPanelRef} 
              className="relative z-10 w-full flex flex-col overflow-y-auto custom-scrollbar transition-transform duration-300 ease-out"
              style={{ 
                transform: `translateY(-${textPanelTransform}vh)`,
                marginTop: window.innerWidth < 768 ? '60vh' : '50vh', // Start below video
                minHeight: '100vh',
                background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 10%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.95) 100%)',
                touchAction: 'pan-y' // Allow vertical scrolling on touch devices
              }}
            >
              {/* Content container */}
              <div className="p-4 md:p-6 lg:p-8">
                {/* Title for all screen sizes */}
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-lg">{experience.title}</h2>
                <p className="text-white/90 mb-6 text-base md:text-lg drop-shadow-md leading-relaxed">{experience.description}</p>
                
                {/* Full description if available */}
                {experience.fullDescription && (
                  <div className="text-white/90 mb-6">
                    <h4 className="text-xl font-semibold text-white mb-3 drop-shadow-lg">{t('experiences.aboutThisExperience') || 'About this experience'}</h4>
                    <p className="text-base md:text-lg drop-shadow-md leading-relaxed">{experience.fullDescription}</p>
                  </div>
                )}
                
                {/* Features */}
                {experience.features && experience.features.length > 0 && (
                  <div className="bg-black/60 backdrop-blur-sm p-6 rounded-lg mb-6 border border-white/20">
                    <h4 className="text-xl font-semibold text-white mb-4 drop-shadow-lg">{t('experiences.features') || 'Features'}</h4>
                    <ul className="space-y-3">
                      {experience.features.map((feature: string, index: number) => (
                        <li key={index} className="text-white/90 text-base md:text-lg drop-shadow-md flex items-start">
                          <span className="w-2 h-2 bg-accent-color rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Detailed Info */}
                {experience.detailedInfo && (
                  <div className="mb-8">
                    {experience.detailedInfo.introduction && (
                      <div className="mb-6">
                        <p className="text-white/90 text-base md:text-lg drop-shadow-md leading-relaxed">{experience.detailedInfo.introduction}</p>
                      </div>
                    )}
                    
                    {experience.detailedInfo.adventureOptionsTitle && experience.detailedInfo.tours && experience.detailedInfo.tours.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-xl font-semibold text-white mb-4 drop-shadow-lg">{experience.detailedInfo.adventureOptionsTitle}</h4>
                        <div className="space-y-4">
                          {experience.detailedInfo?.tours?.map((tour: { title?: string; description?: string; details?: string[] }, index: number) => (
                            <div key={index} className="bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                              {tour.title && <h5 className="font-semibold text-white mb-2 text-lg drop-shadow-lg">{tour.title}</h5>}
                              {tour.description && <p className="text-white/90 mb-3 text-base md:text-lg drop-shadow-md leading-relaxed">{tour.description}</p>}
                              {tour.details && tour.details.length > 0 && (
                                <ul className="space-y-2">
                                  {tour.details.map((detail: string, idx: number) => (
                                    <li key={idx} className="text-white/80 text-base drop-shadow-md flex items-start">
                                      <span className="w-1.5 h-1.5 bg-accent-color/60 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                      <span>{detail}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {experience.detailedInfo.importantInfoTitle && experience.detailedInfo.importantInfo && experience.detailedInfo.importantInfo.length > 0 && (
                      <div className="bg-black/60 backdrop-blur-sm p-6 rounded-lg mb-6 border border-white/20">
                        <h4 className="text-xl font-semibold text-white mb-4 drop-shadow-lg">{experience.detailedInfo.importantInfoTitle}</h4>
                        <ul className="space-y-3">
                          {experience.detailedInfo?.importantInfo?.map((info: string, index: number) => (
                            <li key={index} className="text-white/90 text-base md:text-lg drop-shadow-md flex items-start">
                              <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span>{info}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {experience.detailedInfo.closingRemark && (
                      <div className="mt-6">
                        <p className="text-white/90 italic text-base md:text-lg drop-shadow-md leading-relaxed">{experience.detailedInfo.closingRemark}</p>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Action buttons - improved mobile layout */}
                <div className="pt-6 border-t border-white/20 space-y-4 pb-8">
                  <button
                    onClick={handleClose}
                    className="w-full bg-[#b5e550] hover:bg-[#a3d340] py-4 px-8 rounded-lg text-black text-lg font-semibold transition-all flex items-center justify-center shadow-lg"
                  >
                    {t('experiences.bookNow')}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  {/* Mobile-specific close button */}
                  <button
                    onClick={handleClose}
                    className="md:hidden w-full bg-white/20 hover:bg-white/30 py-4 px-8 rounded-lg text-white text-lg font-medium transition-all border border-white/30 backdrop-blur-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>   
        </div>
      )}
    </AnimatePresence>
  );
};

// Experience Card component for displaying individual experiences
const ExperienceCard = ({ experience, onOpenDetail, delay = 0 }: {
  experience: Experience;
  onOpenDetail: (experience: Experience) => void;
  delay?: number;
}) => {
  const { t } = useTranslation();
  
  // Create a handler function to prevent event propagation issues
  const handleOpenDetail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Opening detail for experience:', experience.title);
    onOpenDetail(experience);
  };
  
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className={`relative flex flex-col h-full bg-black/40 backdrop-blur-md rounded-xl overflow-hidden shadow-lg transition-transform duration-300 border border-white/10 ${isHovered ? 'scale-[1.02]' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
    >
      {/* Experience image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={experience.image} 
          alt={experience.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        
        {/* Tag if present */}
        {experience.tag && (
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center">
            {iconMap[experience.tag.type] || null}
            <span className="text-xs font-medium text-white ml-1">{experience.tag.text}</span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-white mb-2">{experience.title}</h3>
        <p className="text-white/70 text-sm mb-4 line-clamp-3">{experience.description}</p>
        
        {/* Features section removed from card to keep it simple */}
        
        {/* Action buttons */}
        <div className="mt-auto">
          <button
            onClick={handleOpenDetail}
            className="w-full bg-[#b5e550] hover:bg-[#a3d340] active:bg-[#9bc93a] py-2.5 px-4 rounded-lg text-black text-sm font-medium transition-all flex items-center justify-center"
            aria-label={`${t('experiences.viewDetails')} ${experience.title}`}
          >
            {t('experiences.viewDetails')}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Main component
export const ExperiencesSection = ({ experiences: propExperiences = [] }: ExperiencesSectionProps) => {
  // Get translation function
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Get current language
  const { language } = useLanguage();
  
  // State for experiences data with explicit typing
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Ref to track if experiences have been loaded to prevent duplicate loading
  const experiencesLoadedRef = useRef(false);
  
  // Load experiences from translation files
  useEffect(() => {
    // Prevent duplicate loading of experiences
    if (experiencesLoadedRef.current) {
      return;
    }
    
    // Get the translations directly from the import
    import('@/translations').then(module => {
      const translationData = module.translations[language];
      if (translationData?.experiences?.list && Array.isArray(translationData.experiences.list)) {
        // Use type assertion to ensure compatibility with the Experience interface
        const experiencesList = translationData.experiences.list as unknown as Experience[];
        
        // Process experiences to ensure video URLs are properly set
        const processedExperiences = experiencesList.map(exp => {
          // If the experience has a video field that matches a key in videoUrls, use that URL
          if (exp.video && typeof exp.video === 'string' && exp.video in videoUrls) {
            const videoKey = exp.video as keyof typeof videoUrls;
            const webmUrl = videoUrls[videoKey];
            const mp4Url = webmUrl.replace('.webm', '.mp4');
            
            return {
              ...exp,
              video: {
                webm: webmUrl,
                mp4: mp4Url
              }
            };
          }
          return exp;
        }) as Experience[];
        
        // Ensure the experiences are sorted by their ID to maintain consistent order
        setExperiences(processedExperiences);
        setIsLoaded(true);
        // Only log once when experiences are first loaded
        if (!experiencesLoadedRef.current) {
          console.log('Experiences loaded from translations:', processedExperiences.length);
          experiencesLoadedRef.current = true;
        }
      } else if (propExperiences.length > 0) {
        setExperiences(propExperiences);
        setIsLoaded(true);
        // Only log once when experiences are first loaded
        if (!experiencesLoadedRef.current) {
          console.log('Experiences loaded from props:', propExperiences.length);
          experiencesLoadedRef.current = true;
        }
      } else {
        // Only log once
        if (!experiencesLoadedRef.current) {
          console.log('No experiences found in translations or props');
          experiencesLoadedRef.current = true;
        }
      }
    }).catch(error => {
      console.error('Error loading translations:', error);
    });
  }, [language, propExperiences]);
  
  // State for selected experience and modal with explicit typing
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  // State for showing all activities
  const [showAllActivities, setShowAllActivities] = useState(false);
  
  // We've removed the redundant effect that was checking for propExperiences
  // since we're already handling that in the main useEffect above
  

  // Function to open experience detail modal
  const openExperienceDetail = (experience: Experience) => {
    console.log('Opening modal for:', experience.title);
    // Set both the selected experience and modal state simultaneously
    setSelectedExperience(experience);
    setModalOpen(true);
  };
  
  // Function to close modal
  const closeModal = () => {
    // Close the modal immediately
    setModalOpen(false);
    // Clear the selected experience after animation completes
    setTimeout(() => {
      setSelectedExperience(null);
    }, 200); // Reduced delay to match animation timing
  };
  
  // Define package and activity IDs in the exact order they should appear
  const packageIds = [0, 9, 10]; // Arctic Adventure, Sideways, Ice Performance
  const activityIds = [1, 2, 3, 4, 5, 6, 7, 8, 11]; // Other activities in desired order

  // Filter and sort packages in the exact order of packageIds
  const packages = packageIds
    .map(id => experiences.find(exp => exp.id === id))
    .filter((exp): exp is Experience => exp !== undefined);
  
  // Create a map of activity ID to its position for O(1) lookups
  const activityPositionMap = new Map<number, number>();
  activityIds.forEach((id, index) => {
    activityPositionMap.set(id, index);
  });
  
  // Filter activities, excluding packages, and sort according to activityIds
  const activities = experiences
    .filter(exp => !packageIds.includes(exp.id))
    .sort((a, b) => {
      const aPos = activityPositionMap.get(a.id) ?? Infinity;
      const bPos = activityPositionMap.get(b.id) ?? Infinity;
      return aPos - bPos;
    });
  
  // Log the results for debugging
  console.log('Packages:', packages.map(p => `${p.id}: ${p.title}`));
  console.log('Activities:', activities.map(a => `${a.id}: ${a.title}`));
  
  const filteredPackages = packages;
  const filteredActivities = activities;
  
  // Determine which activities to display based on showAllActivities
  // Show all activities when showAllActivities is true, otherwise show none
  const displayedActivities = showAllActivities ? filteredActivities : [];
  
  return (
    <section 
      id="experiences" 
      className="relative py-16 lg:py-24 overflow-hidden" 
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            {t('experiences.title')}
          </h2>
        </motion.div>

        {/* Spacer for better layout */}
        <div className="mb-12"></div>

        {/* Packages Section - Always visible and prominently displayed */}
        {filteredPackages.length > 0 ? (
          <>
            {/* Packages Header */}
            <motion.div 
              className="text-center mb-8 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white inline-block relative">
                <span className="bg-gradient-to-r from-accent-color to-accent-color/70 px-6 py-2 rounded-lg">
                  {t('experiences.premiumPackagesTitle')}
                </span>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-accent-color/50 rounded-full"></div>
              </h3>
              <p className="text-white/80 mt-4 max-w-2xl mx-auto">
                {t('experiences.premiumPackagesDescription')}
              </p>
            </motion.div>

            {/* Packages Grid - Special styling to make them stand out */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 xl:gap-8 mb-12">
              {filteredPackages.map((experience, index) => (
                <motion.div 
                  key={experience.id} 
                  className="relative"
                  layout 
                  animate={{ opacity: 1 }} 
                  initial={{ opacity: 0 }} 
                  exit={{ opacity: 0 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  {/* Add a glow effect behind the card */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-accent-color/30 to-accent-color/10 rounded-xl blur-lg opacity-75"></div>
                  <div className="relative">
                    <ExperienceCard
                      key={experience.id}
                      experience={experience}
                      onOpenDetail={openExperienceDetail}
                      delay={index}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Explore Activities Button */}
            <div className="flex justify-center mb-16">
              <motion.button
                onClick={() => setShowAllActivities(!showAllActivities)}
                className="group px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center gap-2 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white font-medium">
                  {showAllActivities ? t('experiences.hideActivitiesButton') : t('experiences.exploreActivitiesButton')}
                </span>
                <motion.div
                  animate={{ rotate: showAllActivities ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronRight className="w-5 h-5 text-accent-color group-hover:text-white transition-colors" />
                </motion.div>
              </motion.button>
            </div>

            {/* Activities Section - Shows limited number on mobile */}
            <AnimatePresence>
              {showAllActivities && filteredActivities.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden" 
                >
                  {/* Activities Header */}
                  <motion.div 
                    className="text-center mb-8 mt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }} 
                  >
                    <div className="text-center">
                      <h2 className="text-2xl md:text-3xl font-bold text-white inline-block relative">
                        <span className="bg-white/10 px-6 py-2 rounded-lg">
                          {t('experiences.featuredTitle')}
                        </span>
                      </h2>
                      <p className="text-white/80 mt-4 max-w-2xl mx-auto">
                        {t('experiences.featuredDescription')}
                      </p>
                    </div>
                  </motion.div>

                  {/* Activities Grid - responsive based on screen size */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                    {displayedActivities.map((experience, index) => (
                      <motion.div 
                        key={experience.id} 
                        layout 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }} 
                      >
                        <ExperienceCard
                          experience={experience}
                          onOpenDetail={openExperienceDetail}
                          delay={index} 
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
            <p className="text-white/60">Something went wrong while loading experiences</p>
            <button 
              className="mt-4 px-4 py-2 bg-accent-color text-black rounded-lg font-medium"
              onClick={() => window.location.reload()}
            >
              Refresh page
            </button>
          </motion.div>
        )}
      </div>
      
      {/* Detail Modal */}
      <ExperienceDetailModal
        experience={selectedExperience}
        isOpen={modalOpen}
        onClose={closeModal}
      />
    </section>
  );
}


