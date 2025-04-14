import { useState, useEffect } from "react";
import { Experience } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface SimpleModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// A simple modal component that preserves scroll position
function SimpleModal({ isOpen, onClose, children }: SimpleModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    
    // Store the current scroll position
    const scrollY = window.scrollY;
    
    // Prevent scrolling of the background
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    
    return () => {
      // Clean up when component unmounts or modal closes
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Restore scroll position
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div 
        className="relative bg-card-bg p-6 rounded-lg w-full max-w-4xl h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 text-white"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
}

export function ExperiencesSectionFixed() {
  const { language } = useLanguage();
  const t = useTranslation(language as any);
  
  // Get experiences from translations
  const experiences: Experience[] = t.experiences.list;
  
  // State for selected experience and modal
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Function to open modal
  const openModal = (experience: Experience) => {
    setSelectedExperience(experience);
    setModalOpen(true);
  };
  
  // Function to close modal
  const closeModal = () => {
    setModalOpen(false);
  };
  
  return (
    <section id="experiences" className="py-24 bg-gradient-to-b from-black to-card-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.experiences.title}
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            {t.experiences.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((experience) => (
            <div 
              key={experience.id}
              className="bg-card-bg/40 rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative aspect-[4/3]">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Simple direct fallback
                    (e.target as HTMLImageElement).src = "/images/TXA_fallback.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <h3 className="absolute bottom-0 left-0 right-0 p-4 text-white text-xl font-bold">
                  {experience.title}
                </h3>
              </div>
              
              <div className="p-4">
                <p className="text-white/80 mb-4">
                  {experience.description.length > 100 
                    ? `${experience.description.substring(0, 100)}...` 
                    : experience.description}
                </p>
                
                <button
                  onClick={() => openModal(experience)}
                  className="w-full py-2 bg-accent-color hover:bg-accent-color/80 text-black font-medium rounded"
                >
                  {t.experiences.viewDetails}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Simple Detail Modal */}
      <SimpleModal isOpen={modalOpen} onClose={closeModal}>
        {selectedExperience && (
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-4">{selectedExperience.title}</h2>
            
            {/* Main image */}
            <div className="mb-6 rounded-lg overflow-hidden">
              <img
                src={selectedExperience.gallery?.[0] || selectedExperience.image}
                alt={selectedExperience.title}
                className="w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/TXA_fallback.jpg";
                }}
              />
            </div>
            
            {/* Description */}
            <div className="prose prose-invert max-w-none">
              <div style={{ whiteSpace: 'pre-line' }}>
                {selectedExperience.fullDescription || selectedExperience.description}
              </div>
            </div>
            
            {/* Action button */}
            <div className="mt-8">
              <button
                onClick={() => {
                  closeModal();
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100); 
                }}
                className="py-3 px-6 bg-accent-color hover:bg-accent-color/80 text-black font-semibold rounded"
              >
                {t.experiences.sendInquiry}
              </button>
            </div>
          </div>
        )}
      </SimpleModal>
    </section>
  );
}