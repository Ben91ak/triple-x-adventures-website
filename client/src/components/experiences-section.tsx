import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/use-translation';
import { Experience } from '../types';
import { 
  X, ChevronRight, ArrowRight, 
  Zap, Star, Trees, Sparkles, Mountain,
  Snowflake, Users, Fish, Utensils
} from "lucide-react";
import { useLanguage } from '../contexts/LanguageContext';
import { videoUrls } from '@/config/videoUrls';

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

const ExperienceDetailModal: React.FC<ExperienceDetailModalProps> = memo(({
  experience,
  isOpen,
  onClose,
}) => {
  if (!experience || !isOpen) return null;

  const { t } = useTranslation();

  const hasVideo = !!experience.video;
  const videoUrl = experience.video;

  const modalContentRef = useRef<HTMLDivElement>(null);
  const textPanelRef = useRef<HTMLDivElement>(null);
  const mediaPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const modalElement = modalContentRef.current;
    const textElement = textPanelRef.current;
    const mediaElement = mediaPanelRef.current;

    if (!isOpen || !modalElement || !textElement || !mediaElement) {
      return;
    }

    const handleWheelScroll = (event: WheelEvent) => {
      if (mediaElement.contains(event.target as Node)) {
        // If scroll is over the media panel, prevent default and scroll text panel
        event.preventDefault();
        textElement.scrollTop += event.deltaY;
      } else if (textElement.contains(event.target as Node) || event.target === textElement) {
        // If scroll is directly on text panel, allow native scroll (do nothing here)
        return;
      } else {
        // Optional: If scroll is elsewhere on modal but not media/text, prevent default page scroll
        event.preventDefault(); 
      }
    };

    modalElement.addEventListener('wheel', handleWheelScroll, { passive: false });

    return () => {
      modalElement.removeEventListener('wheel', handleWheelScroll);
    };
  }, [isOpen]);
  
  return (
    <AnimatePresence>
      {isOpen && experience && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <motion.div
            ref={modalContentRef} className="relative w-full max-w-6xl bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: "easeIn" } }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/50 text-white hover:bg-accent-color/90 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            

            
            {/* Media content section */}
            <div ref={mediaPanelRef} className="w-full lg:w-3/5 relative bg-black/50 flex items-center justify-center min-h-[300px] lg:min-h-[500px]">
              {/* Media section */}
              <div className="relative w-full h-64 md:h-96 lg:h-auto overflow-hidden bg-black">
                {/* Video if available */}
                {hasVideo && (
                  <div className="w-full h-full">
                    <video 
                      src={videoUrl} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      controls
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {/* Fallback image if no video */}
                {!hasVideo && (
                  <div className="w-full h-full flex items-center justify-center bg-gray-900">
                    <p className="text-white/70 text-center p-4">No video available for this experience</p>
                  </div>
                )}
              </div>
              
              </div>
              
              {/* Details section */}
              <div ref={textPanelRef} className="w-full lg:w-2/5 p-5 sm:p-6 flex flex-col overflow-y-auto custom-scrollbar flex-grow">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{experience.title}</h2>
                <p className="text-white/80 mb-6">{experience.description}</p>
                
                {/* Full description if available */}
                {experience.fullDescription && (
                  <div className="text-white/80 mb-6">
                    <h4 className="text-lg font-semibold text-white mb-2">About this experience</h4>
                    <p>{experience.fullDescription}</p>
                  </div>
                )}
                
                {/* Features */}
                {experience.features && experience.features.length > 0 && (
                  <div className="bg-white/5 p-4 rounded-lg mb-6">
                    <h4 className="text-lg font-semibold text-white mb-2">Features</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {experience.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-center gap-2 text-white/80">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent-color"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Detailed Info */}
                {experience.detailedInfo && (
                  <div className="mb-6">
                    {experience.detailedInfo.introduction && (
                      <div className="mb-4">
                        <p className="text-white/80">{experience.detailedInfo.introduction}</p>
                      </div>
                    )}
                    
                    {experience.detailedInfo.adventureOptionsTitle && experience.detailedInfo.tours && experience.detailedInfo.tours.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold text-white mb-2">{experience.detailedInfo.adventureOptionsTitle}</h4>
                        <div className="space-y-4">
                          {experience.detailedInfo?.tours?.map((tour: { title?: string; description?: string; details?: string[] }, index: number) => (
                            <div key={index} className="bg-white/5 p-4 rounded-lg">
                              {tour.title && <h5 className="font-medium text-white mb-1">{tour.title}</h5>}
                              {tour.description && <p className="text-white/80 mb-2">{tour.description}</p>}
                              {tour.details && tour.details.length > 0 && (
                                <ul className="space-y-1">
                                  {tour.details.map((detail: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-2 text-white/70">
                                      <div className="w-1.5 h-1.5 rounded-full bg-accent-color mt-2"></div>
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
                      <div className="bg-white/5 p-4 rounded-lg mb-4">
                        <h4 className="text-lg font-semibold text-white mb-2">{experience.detailedInfo.importantInfoTitle}</h4>
                        <ul className="space-y-2">
                          {experience.detailedInfo?.importantInfo?.map((info: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-white/80">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent-color mt-2"></div>
                              <span>{info}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {experience.detailedInfo.closingRemark && (
                      <div className="mt-4">
                        <p className="text-white/80 italic">{experience.detailedInfo.closingRemark}</p>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Action buttons */}
                <div className="mt-auto pt-4 border-t border-white/10">
                  <button
                    onClick={onClose}
                    className="btn-primary w-full inline-flex items-center justify-center text-base px-6 py-2.5 mb-3"
                  >
                    {t('experiences.bookNow')}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            </motion.div>   
          </div>
        )}
      </AnimatePresence>
  )
});

// Experience Card component for displaying individual experiences
const ExperienceCard = ({ experience, onOpenDetail, delay = 0 }: {
  experience: Experience;
  onOpenDetail: (experience: Experience, e: React.MouseEvent) => void;
  delay?: number;
}) => {
  const { t } = useTranslation();
  
  return (
    <motion.div 
      className="relative bg-gradient-to-b from-gray-800 to-black rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
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
            onClick={(e) => onOpenDetail(experience, e)}
            className="w-full bg-white/10 hover:bg-white/20 border border-white/20 py-2 px-4 rounded-lg text-white text-sm font-medium transition-colors"
          >
            {t('experiences.viewDetails')}
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
  
  // State for experiences data
  const [experiences, setExperiences] = useState<Experience[]>([]);
  
  // Load experiences from translation files
  useEffect(() => {
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
            return {
              ...exp,
              video: videoUrls[exp.video as keyof typeof videoUrls]
            };
          }
          return exp;
        });
        
        setExperiences(processedExperiences);
        setIsLoaded(true);
        console.log('Experiences loaded from translations:', processedExperiences.length);
      } else if (propExperiences.length > 0) {
        setExperiences(propExperiences);
        setIsLoaded(true);
        console.log('Experiences loaded from props:', propExperiences.length);
      } else {
        console.log('No experiences found in translations or props');
      }
    }).catch(error => {
      console.error('Error loading translations:', error);
    });
  }, [language, propExperiences]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // State for selected experience and modal
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  // State for showing all activities
  const [showAllActivities, setShowAllActivities] = useState(false);
  
  // We've removed the redundant effect that was checking for propExperiences
  // since we're already handling that in the main useEffect above
  
  // Navigation functions for the experience modal
  // We'll keep these but comment them out for future use if needed
  /*
  const navigateToNext = () => {
    if (selectedExperience && experiences.length > 0) {
      const currentIndex = experiences.findIndex((e) => e.id === selectedExperience.id);
      const nextIndex = (currentIndex + 1) % experiences.length;
      setSelectedExperience(experiences[nextIndex]);
    }
  };
  
  const navigateToPrevious = () => {
    if (selectedExperience && experiences.length > 0) {
      const currentIndex = experiences.findIndex((e) => e.id === selectedExperience.id);
      const prevIndex = (currentIndex - 1 + experiences.length) % experiences.length;
      setSelectedExperience(experiences[prevIndex]);
    }
  };
  */
  
  // Function to open experience detail modal
  const openExperienceDetail = (experience: Experience, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedExperience(experience);
    setModalOpen(true);
  };
  
  // Function to close modal
  const closeModal = () => {
    setModalOpen(false);
  };
  
  // Separate packages from regular activities
  const packageIds = [0, 9, 10];
  const packages = experiences.filter(exp => packageIds.includes(exp.id));
  const activities = experiences.filter(exp => !packageIds.includes(exp.id));
  
  const filteredPackages = packages;
  const filteredActivities = activities;
  
  // Determine which activities to display based on showAllActivities and screen size
  // Use isMobileView to limit the number of experiences shown on mobile
  const displayedActivities = showAllActivities
    ? filteredActivities
    : [];
  
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


