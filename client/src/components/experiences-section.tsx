import { useState, useEffect } from "react";
import { Experience } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { ExperienceCard } from "./experience-card";
import { ExperienceDetailModal } from "./experience-detail-modal";

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
  
  // Function to open modal with selected experience - preventing page jump
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