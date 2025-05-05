import React, { useEffect, useRef, memo } from 'react';

interface GlobalBackgroundProps {
  intensity?: 'low' | 'medium' | 'high';
  colorScheme?: 'default' | 'blue' | 'purple';
}

/**
 * Premium animated background component that spans the entire page
 * with performance optimizations for better rendering.
 * 
 * @param intensity Controls animation intensity, useful for reducing on mobile
 * @param colorScheme Different color schemes for the Northern Lights effect
 */
export const GlobalBackground = memo(function GlobalBackground({
  intensity = 'medium',
  colorScheme = 'default'
}: GlobalBackgroundProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Apply intensity classes based on prop and device capability
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Remove any existing intensity classes
    container.classList.remove('intensity-low', 'intensity-medium', 'intensity-high');
    
    // Reduce intensity automatically on low-power devices
    let appliedIntensity = intensity;
    if (window.matchMedia('(max-width: 768px), (pointer: coarse)').matches && intensity === 'high') {
      appliedIntensity = 'medium';
    }
    
    // Apply the appropriate intensity class
    container.classList.add(`intensity-${appliedIntensity}`);
    
    // Apply color scheme classes
    container.classList.remove('color-default', 'color-blue', 'color-purple');
    container.classList.add(`color-${colorScheme}`);
  }, [intensity, colorScheme]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden transform-gpu will-change-transform z-0 intensity-medium color-default" 
      aria-hidden="true"
    >
      {/* Base gradient layer */}
      <div className="absolute inset-0 transform-gpu" 
           style={{ 
             background: "linear-gradient(180deg, #0A0D10 0%, #141A1F 50%, #0A0D10 100%)",
             opacity: 1 
           }}>
        {/* Premium gradient overlay with subtle animation */}
        <div className="absolute inset-0 transform-gpu premium-dark-gradient opacity-80"></div>
      </div>
      
      {/* Northern Lights effect - persists across the entire page */}
      <div className="northern-lights-gradient absolute inset-0">
        <div className="northern-glow"></div>
        <div className="aurora-pillar"></div>
        <div className="aurora-pillar-2"></div>
        <div className="aurora-band"></div>
        <div className="stars"></div>
      </div>
      
      {/* Additional atmospheric effects for premium feel */}
      <div className="absolute inset-0 opacity-20">
        <div className="aurora-particles"></div>
      </div>
    </div>
  );
});

/**
 * Component that adds a section-specific atmospheric effect
 * to enhance the background in specific areas without duplicating the main background
 * 
 * NOTE: This component is no longer needed for the unified look but kept for backward compatibility
 */
export function SectionAtmosphere({ 
  intensity = 'medium', 
  accentPosition = 'center'
}: { 
  intensity?: 'low' | 'medium' | 'high', 
  accentPosition?: 'top' | 'center' | 'bottom' | 'left' | 'right' 
}) {
  // This component no longer adds any visual effects to maintain the unified look
  return null;
}