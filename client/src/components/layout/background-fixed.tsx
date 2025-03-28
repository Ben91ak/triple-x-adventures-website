import React, { useEffect, useRef, memo } from 'react';

interface GlobalBackgroundProps {
  intensity?: 'low' | 'medium' | 'high';
  colorScheme?: 'default' | 'blue' | 'purple';
  starDensity?: 'sparse' | 'medium' | 'dense';
}

/**
 * Premium animated background component that spans the entire page
 * with performance optimizations for better rendering.
 * 
 * @param intensity Controls animation intensity, useful for reducing on mobile
 * @param colorScheme Different color schemes for the Northern Lights effect
 * @param starDensity Controls how many stars appear in the background
 */
export const GlobalBackground = memo(function GlobalBackground({
  intensity = 'medium',
  colorScheme = 'default',
  starDensity = 'medium'
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
    
    // Apply star density classes
    container.classList.remove('stars-sparse', 'stars-medium', 'stars-dense');
    container.classList.add(`stars-${starDensity}`);
  }, [intensity, colorScheme, starDensity]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden transform-gpu will-change-transform z-0 intensity-medium color-default stars-medium" 
      aria-hidden="true"
    >
      {/* Base gradient layer with deep night sky effect */}
      <div className="absolute inset-0 transform-gpu" 
           style={{ 
             background: "linear-gradient(180deg, #050A11 0%, #0A1019 40%, #0A0D14 100%)",
             opacity: 1 
           }}>
        {/* Premium gradient overlay with subtle animation */}
        <div className="absolute inset-0 transform-gpu premium-dark-gradient opacity-80"></div>
      </div>
      
      {/* Enhanced starry night background layer */}
      <div className="absolute inset-0 transform-gpu">
        <div className="stars-small absolute inset-0"></div>
        <div className="stars-medium absolute inset-0"></div>
        <div className="stars-large absolute inset-0"></div>
        <div className="shooting-stars absolute inset-0"></div>
      </div>
      
      {/* Northern Lights effect - persists across the entire page */}
      <div className="northern-lights-gradient absolute inset-0">
        <div className="northern-glow"></div>
        <div className="aurora-pillar"></div>
        <div className="aurora-pillar-2"></div>
        <div className="aurora-band"></div>
      </div>
      
      {/* Dark overlay for text contrast - slightly reduced opacity for better star visibility */}
      <div className="absolute inset-0 bg-dark-bg transform-gpu" 
           style={{ backgroundColor: 'rgba(0, 0, 0, 0.35)' }}></div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wNCIgZmlsbC1ydWxlPSJub256ZXJvIj48cGF0aCBkPSJNMjkgNTguNWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1em0wIDFhNi41IDYuNSAwIDEgMCAwIDEzIDYuNSA2LjUgMCAwIDAgMC0xM3ptMS0uMDg3YTcuNSA3LjUgMCAxIDEgMCAxNSA3LjUgNy41IDAgMCAxIDAtMTV6TTIwIDU5LjVhNy41IDcuNSAwIDEgMSAwIDE1IDcuNSA3LjUgMCAwIDEgMC0xNXptMCAxYTYuNSA2LjUgMCAxIDAgMCAxMyA2LjUgNi41IDAgMCAwIDAtMTN6bTAtMWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1eiIvPjwvZz48L2c+PC9zdmc+')] 
           opacity-50 pointer-events-none transform-gpu"></div>
           
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
 */
export function SectionAtmosphere({ 
  intensity = 'medium', 
  accentPosition = 'center'
}: { 
  intensity?: 'low' | 'medium' | 'high', 
  accentPosition?: 'top' | 'center' | 'bottom' | 'left' | 'right' 
}) {
  // Map intensity to opacity value
  const opacityMap = {
    low: 0.15,
    medium: 0.25,
    high: 0.35
  };
  
  // Map position to css classes
  const positionClasses = {
    top: 'top-0 left-0 right-0 h-1/2',
    bottom: 'bottom-0 left-0 right-0 h-1/2',
    left: 'left-0 top-0 bottom-0 w-1/2',
    right: 'right-0 top-0 bottom-0 w-1/2',
    center: 'inset-0'
  };
  
  return (
    <div className={`absolute ${positionClasses[accentPosition]} pointer-events-none transform-gpu z-10`}>
      <div className="absolute inset-0 aurora-glow" style={{ opacity: opacityMap[intensity] }}></div>
    </div>
  );
}