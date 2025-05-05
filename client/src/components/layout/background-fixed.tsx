import React, { useEffect, useRef, memo, useState } from 'react';

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
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  
  // Detect mobile and low-end devices once on mount
  useEffect(() => {
    // Check for mobile devices
    const checkIfMobile = () => {
      const isMobileViewport = window.matchMedia('(max-width: 768px)').matches;
      const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
      setIsMobile(isMobileViewport || isTouchDevice);
    };
    
    // Check for low-end devices or data saving mode
    const checkIfLowEndDevice = () => {
      const hasLowCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
      const hasLowMemory = 'deviceMemory' in navigator && (navigator as any).deviceMemory < 4;
      const hasSaveData = 'connection' in navigator && (navigator as any).connection?.saveData;
      const hasSlowConnection = 'connection' in navigator && 
         ['slow-2g', '2g', '3g'].includes((navigator as any).connection?.effectiveType);
      
      // If battery API is available, check if in low power mode
      const checkBattery = async () => {
        try {
          if ('getBattery' in navigator) {
            const battery = await (navigator as any).getBattery();
            if (battery.level < 0.15 || battery.charging === false) {
              setIsLowEndDevice(true);
            }
          }
        } catch (e) {
          // Battery API not available or error
        }
      };
      
      checkBattery().catch(() => {});
      
      setIsLowEndDevice(hasLowCPU || hasLowMemory || hasSaveData || hasSlowConnection);
    };
    
    checkIfMobile();
    checkIfLowEndDevice();
    
    // Listen for resize events to update mobile status
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  // Apply intensity classes based on prop and device capability
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Remove any existing intensity classes
    container.classList.remove('intensity-low', 'intensity-medium', 'intensity-high');
    
    // Reduce intensity based on device capabilities
    let appliedIntensity = intensity;
    
    // Significantly reduce for mobile devices
    if (isMobile) {
      appliedIntensity = intensity === 'high' ? 'medium' : 'low';
    }
    
    // Further reduce for low-end devices
    if (isLowEndDevice) {
      appliedIntensity = 'low';
    }
    
    // Apply the appropriate intensity class
    container.classList.add(`intensity-${appliedIntensity}`);
    
    // Apply color scheme classes
    container.classList.remove('color-default', 'color-blue', 'color-purple');
    container.classList.add(`color-${colorScheme}`);
    
    // Apply star density classes
    container.classList.remove('stars-sparse', 'stars-medium', 'stars-dense');
    
    // Reduce star density on mobile/low-end devices
    let appliedStarDensity = starDensity;
    if (isMobile || isLowEndDevice) {
      appliedStarDensity = 'sparse';
    }
    
    container.classList.add(`stars-${appliedStarDensity}`);
    
    // Add mobile-specific class
    if (isMobile) {
      container.classList.add('mobile-optimized');
    } else {
      container.classList.remove('mobile-optimized');
    }
  }, [intensity, colorScheme, starDensity, isMobile, isLowEndDevice]);

  // Use a simplified background for low-end or mobile devices
  if (isLowEndDevice || isMobile) {
    return (
      <div 
        ref={containerRef}
        className="fixed inset-0 overflow-hidden transform-gpu will-change-transform z-0 intensity-low mobile-optimized" 
        aria-hidden="true"
      >
        {/* Base gradient layer with simplified effects */}
        <div className="absolute inset-0 transform-gpu" 
             style={{ 
               background: "linear-gradient(180deg, #050A11 0%, #0A1019 40%, #0A0D14 100%)",
               opacity: 1 
             }}>
        </div>
        
        {/* Simplified starry night - static image instead of animated */}
        <div className="absolute inset-0 transform-gpu">
          <div className="stars-small absolute inset-0"></div>
        </div>
        
        {/* Simplified Northern Lights - only one element with reduced animation */}
        <div className="northern-lights-gradient absolute inset-0">
          <div className="northern-glow"></div>
        </div>
      </div>
    );
  }

  // Full version for desktop/high-end devices
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