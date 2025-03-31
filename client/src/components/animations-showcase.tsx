import React, { useState } from 'react';
import { 
  AnimatedElement, 
  FadeIn, 
  SlideUp, 
  PopIn, 
  Float,
  StaggeredContainer
} from '../components/ui/animated-element';
import { HoverCard, HoverEffect } from '../components/ui/hover-card';
import { combineAnimationClasses, animationClasses } from '../lib/animations';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

export function AnimationsShowcase() {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  // Simple translate function
  const t = (key: string): string => {
    const keys = key.split('.');
    // @ts-ignore - We know this will work since we control the translations
    let result: any = translations[language];
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return key;
      }
    }
    return typeof result === 'string' ? result : key;
  };
  
  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <SlideUp className="mb-10">
        <h2 className="text-3xl font-bold mb-6 text-center">{t('animationsShowcase.title')}</h2>
        <p className="text-center mb-8 text-lg max-w-3xl mx-auto">
          {t('animationsShowcase.description')}
        </p>
      </SlideUp>
      
      {/* Animation Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {/* Entrance Animations */}
        <AnimatedCard
          title={t('animationsShowcase.entranceAnimations')}
          isActive={activeSection === 'entrance'}
          onClick={() => toggleSection('entrance')}
        >
          <div className="space-y-6 pt-4">
            <FadeIn className="p-4 bg-background/50 rounded-lg border border-border">
              <h4 className="font-medium mb-2">Fade In</h4>
              <p className="text-sm opacity-70">Smoothly fades elements into view</p>
            </FadeIn>
            
            <SlideUp className="p-4 bg-background/50 rounded-lg border border-border">
              <h4 className="font-medium mb-2">Slide Up</h4>
              <p className="text-sm opacity-70">Elements slide up into position</p>
            </SlideUp>
            
            <PopIn className="p-4 bg-background/50 rounded-lg border border-border">
              <h4 className="font-medium mb-2">Pop In</h4>
              <p className="text-sm opacity-70">Elements pop into view with a slight bounce</p>
            </PopIn>
          </div>
        </AnimatedCard>
        
        {/* Hover Animations */}
        <AnimatedCard
          title={t('animationsShowcase.hoverAnimations')}
          isActive={activeSection === 'hover'}
          onClick={() => toggleSection('hover')}
        >
          <div className="space-y-6 pt-4">
            <HoverEffect 
              animation="hover-scale" 
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <h4 className="font-medium mb-2">Hover Scale</h4>
              <p className="text-sm opacity-70">Grows slightly on hover</p>
            </HoverEffect>
            
            <HoverEffect 
              animation="hover-lift" 
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <h4 className="font-medium mb-2">Hover Lift</h4>
              <p className="text-sm opacity-70">Lifts slightly on hover</p>
            </HoverEffect>
            
            <HoverEffect 
              animation="hover-glow" 
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <h4 className="font-medium mb-2">Hover Glow</h4>
              <p className="text-sm opacity-70">Adds a subtle glow effect on hover</p>
            </HoverEffect>
          </div>
        </AnimatedCard>
        
        {/* Continuous Animations */}
        <AnimatedCard
          title={t('animationsShowcase.continuousAnimations')}
          isActive={activeSection === 'continuous'}
          onClick={() => toggleSection('continuous')}
        >
          <div className="space-y-6 pt-4">
            <Float className="p-4 bg-background/50 rounded-lg border border-border">
              <h4 className="font-medium mb-2">Float</h4>
              <p className="text-sm opacity-70">Continuous gentle floating motion</p>
            </Float>
            
            <AnimatedElement 
              animation="pulse-soft" 
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <h4 className="font-medium mb-2">Pulse</h4>
              <p className="text-sm opacity-70">Soft pulsing effect to draw attention</p>
            </AnimatedElement>
            
            <AnimatedElement 
              animation="shimmer" 
              className="p-4 bg-background/50 rounded-lg border border-border overflow-hidden"
            >
              <h4 className="font-medium mb-2">Shimmer</h4>
              <p className="text-sm opacity-70">Subtle shimmer effect across the element</p>
            </AnimatedElement>
          </div>
        </AnimatedCard>
        
        {/* Hover Cards */}
        <AnimatedCard
          title={t('animationsShowcase.hoverCards')}
          isActive={activeSection === 'hoverCards'}
          onClick={() => toggleSection('hoverCards')}
        >
          <div className="space-y-6 pt-4 flex flex-col items-center">
            <HoverCard
              hoverContent={
                <div>
                  <h4 className="font-medium">Hover Card (Top)</h4>
                  <p className="text-sm">Additional information appears on hover</p>
                </div>
              }
              position="top"
              className="mx-auto"
            >
              <div className="p-4 bg-background/50 rounded-lg border border-border w-full">
                <h4 className="font-medium">Hover me (Top)</h4>
              </div>
            </HoverCard>
            
            <HoverCard
              hoverContent={
                <div>
                  <h4 className="font-medium">Hover Card (Right)</h4>
                  <p className="text-sm">Positioned to the right</p>
                </div>
              }
              position="right"
              className="mx-auto"
            >
              <div className="p-4 bg-background/50 rounded-lg border border-border w-full">
                <h4 className="font-medium">Hover me (Right)</h4>
              </div>
            </HoverCard>
            
            <HoverCard
              hoverContent={
                <div>
                  <h4 className="font-medium">Hover Card (Bottom)</h4>
                  <p className="text-sm">Positioned at the bottom</p>
                </div>
              }
              position="bottom"
              className="mx-auto"
            >
              <div className="p-4 bg-background/50 rounded-lg border border-border w-full">
                <h4 className="font-medium">Hover me (Bottom)</h4>
              </div>
            </HoverCard>
          </div>
        </AnimatedCard>
        
        {/* Staggered Animations */}
        <AnimatedCard
          title={t('animationsShowcase.staggeredAnimations')}
          isActive={activeSection === 'staggered'}
          onClick={() => toggleSection('staggered')}
        >
          <div className="space-y-0 pt-4">
            <StaggeredContainer staggerDelay={150} animation="fade-in">
              {Array.from({ length: 5 }).map((_, i) => (
                <div 
                  key={i} 
                  className="p-3 bg-background/50 rounded-lg border border-border mb-2"
                >
                  <h4 className="font-medium">Item {i + 1}</h4>
                  <p className="text-sm opacity-70">Staggered entrance</p>
                </div>
              ))}
            </StaggeredContainer>
          </div>
        </AnimatedCard>
        
        {/* Aurora Effect */}
        <AnimatedCard
          title={t('animationsShowcase.specialEffects')}
          isActive={activeSection === 'special'}
          onClick={() => toggleSection('special')}
        >
          <div className="space-y-6 pt-4">
            <AnimatedElement 
              animation="aurora" 
              className="p-4 rounded-lg border border-border relative overflow-hidden"
            >
              <div className="relative z-10">
                <h4 className="font-medium mb-2">Aurora Effect</h4>
                <p className="text-sm opacity-70">Dynamic gradient animation</p>
              </div>
            </AnimatedElement>
            
            <AnimatedElement 
              animation="spin-slow" 
              className="p-4 rounded-lg border border-border flex justify-center"
            >
              <div className="w-12 h-12 rounded-full border-2 border-accent border-t-transparent"></div>
            </AnimatedElement>
            
            <AnimatedElement 
              animation="bounce-slight" 
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <h4 className="font-medium mb-2">Slight Bounce</h4>
              <p className="text-sm opacity-70">Gentle bouncing effect</p>
            </AnimatedElement>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
}

// Animated card with click-to-expand functionality
interface AnimatedCardProps {
  title: string;
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

function AnimatedCard({ title, children, isActive, onClick }: AnimatedCardProps) {
  return (
    <PopIn className="rounded-xl overflow-hidden">
      <div 
        className={combineAnimationClasses(
          "border border-border rounded-xl transition-all duration-400",
          isActive ? "bg-background/80" : "bg-background/40"
        )}
      >
        <div 
          className={combineAnimationClasses(
            "p-5 cursor-pointer",
            animationClasses.hoverBg
          )}
          onClick={onClick}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">{title}</h3>
            <div className={`transform transition-transform ${isActive ? 'rotate-180' : ''}`}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div 
          className={combineAnimationClasses(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isActive ? "max-h-[500px] opacity-100 p-5" : "max-h-0 opacity-0 p-0"
          )}
        >
          {children}
        </div>
      </div>
    </PopIn>
  );
}