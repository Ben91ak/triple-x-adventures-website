import React, { useState } from 'react';
import { AnimatedElement } from './animated-element';

interface HoverCardProps {
  children: React.ReactNode;
  hoverContent: React.ReactNode;
  delay?: number;
  position?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
  contentClassName?: string;
  hoverContentClassName?: string;
}

/**
 * HoverCard component that shows additional content on hover
 * Uses micro-animations for smooth transitions
 */
export function HoverCard({
  children,
  hoverContent,
  delay = 100,
  position = 'top',
  className = '',
  contentClassName = '',
  hoverContentClassName = '',
}: HoverCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  
  // Position styles for the hover content
  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 ml-2';
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 mr-2';
      default:
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
    }
  };
  
  // Arrow position based on hover content position
  const getArrowStyles = () => {
    switch (position) {
      case 'top':
        return 'bottom-[-6px] left-1/2 -translate-x-1/2 border-t-white border-l-transparent border-r-transparent border-b-transparent';
      case 'right':
        return 'left-[-6px] top-1/2 -translate-y-1/2 border-r-white border-t-transparent border-b-transparent border-l-transparent';
      case 'bottom':
        return 'top-[-6px] left-1/2 -translate-x-1/2 border-b-white border-l-transparent border-r-transparent border-t-transparent';
      case 'left':
        return 'right-[-6px] top-1/2 -translate-y-1/2 border-l-white border-t-transparent border-b-transparent border-r-transparent';
      default:
        return 'bottom-[-6px] left-1/2 -translate-x-1/2 border-t-white border-l-transparent border-r-transparent border-b-transparent';
    }
  };
  
  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Main content */}
      <div className={contentClassName}>
        {children}
      </div>
      
      {/* Hover content with animation */}
      <AnimatedElement
        animation="fade-in"
        duration={200}
        delay={delay}
        isActive={isHovering}
        trigger="manual"
        className={`absolute z-50 pointer-events-none ${getPositionStyles()} ${hoverContentClassName}`}
      >
        <div className="bg-white text-black rounded-lg p-3 shadow-lg min-w-[150px] relative">
          {/* Arrow element */}
          <div 
            className={`absolute w-0 h-0 border-[6px] ${getArrowStyles()}`} 
            aria-hidden="true"
          ></div>
          
          {hoverContent}
        </div>
      </AnimatedElement>
    </div>
  );
}

/**
 * A simpler version that just applies micro-animations on hover
 * without displaying additional content
 */
export function HoverEffect({
  children,
  animation = 'hover-scale',
  className = '',
  ...props
}: {
  children: React.ReactNode;
  animation?: 'hover-scale' | 'hover-lift' | 'hover-glow' | 'pulse-soft' | 'float';
  className?: string;
  [key: string]: any;
}) {
  return (
    <AnimatedElement
      hoverAnimation={animation}
      className={className}
      {...props}
    >
      {children}
    </AnimatedElement>
  );
}