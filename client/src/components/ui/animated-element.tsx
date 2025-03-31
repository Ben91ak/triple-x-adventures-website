import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { combineAnimationClasses } from '@/lib/animations';

// Animation variants
export type AnimationVariant = 
  | 'fade-in'
  | 'slide-in-up'
  | 'slide-in-down'
  | 'slide-in-left'
  | 'slide-in-right'
  | 'pop-in'
  | 'float'
  | 'pulse-soft'
  | 'shimmer'
  | 'spin-slow'
  | 'bounce-slight'
  | 'hover-scale'
  | 'hover-lift'
  | 'hover-glow'
  | 'click-push'
  | 'aurora'
  | 'none';

// Animation trigger options
export type AnimationTrigger = 
  | 'onMount'      // Animate when component mounts
  | 'onScroll'     // Animate when component enters viewport
  | 'onHover'      // Animate on hover
  | 'onClick'      // Animate on click
  | 'onLoad'       // Animate after content loads
  | 'manual';      // Manually control animation (through isActive prop)

interface AnimatedElementProps {
  // Content
  children: ReactNode;
  
  // Main animation type
  animation?: AnimationVariant;
  
  // When animation should trigger
  trigger?: AnimationTrigger;
  
  // Additional animations on interaction
  hoverAnimation?: AnimationVariant;
  clickAnimation?: AnimationVariant;
  
  // Animation customization
  delay?: number;                // Delay in ms before animation starts
  duration?: number;             // Duration of animation in ms
  threshold?: number;            // Viewport threshold for scroll animation (0-1)
  repeat?: boolean;              // Whether animation should repeat
  stagger?: number;              // Delay between staggered children animations
  
  // For manual control
  isActive?: boolean;            // Control animation state externally
  
  // HTML attributes
  className?: string;            // Additional CSS classes
  as?: React.ElementType;        // Element type to render
  [key: string]: any;            // Other HTML props
}

export function AnimatedElement({
  children,
  animation = 'fade-in',
  trigger = 'onMount',
  hoverAnimation,
  clickAnimation,
  delay = 0,
  duration,
  threshold = 0.1,
  repeat = false,
  stagger = 0,
  isActive,
  className = '',
  as: Component = 'div',
  ...props
}: AnimatedElementProps) {
  // Animation state
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  // Refs
  const elementRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll-triggered animations
  useEffect(() => {
    if (trigger !== 'onScroll') return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setIsAnimating(true);
          if (!repeat) {
            setHasAnimated(true);
          }
        } else if (repeat && !entry.isIntersecting && hasAnimated) {
          setIsAnimating(false);
        }
      },
      { threshold }
    );
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [trigger, threshold, hasAnimated, repeat]);
  
  // Handle mount-triggered animations
  useEffect(() => {
    if (trigger !== 'onMount') return;
    
    const timer = setTimeout(() => {
      setIsAnimating(true);
      if (!repeat) {
        setHasAnimated(true);
      }
    }, delay);
    
    return () => clearTimeout(timer);
  }, [trigger, delay, repeat]);
  
  // Handle manually triggered animations
  useEffect(() => {
    if (trigger !== 'manual') return;
    
    if (isActive) {
      setIsAnimating(true);
      if (!repeat) {
        setHasAnimated(true);
      }
    } else {
      setIsAnimating(false);
    }
  }, [isActive, trigger, repeat]);
  
  // Generate animation classes
  const getAnimationClasses = () => {
    const classes: string[] = [];
    
    // Base animation
    if (isAnimating && animation !== 'none') {
      classes.push(`animate-${animation}`);
    }
    
    // Hover animation
    if (isHovering && hoverAnimation && hoverAnimation !== 'none') {
      classes.push(`animate-${hoverAnimation}`);
    } else if (hoverAnimation === 'hover-scale') {
      classes.push('hover:scale-105 transition-transform');
    } else if (hoverAnimation === 'hover-lift') {
      classes.push('hover:-translate-y-1 transition-transform');
    } else if (hoverAnimation === 'hover-glow') {
      classes.push('hover:shadow-glow transition-shadow');
    }
    
    // Click animation
    if (isClicking && clickAnimation && clickAnimation !== 'none') {
      classes.push(`animate-${clickAnimation}`);
    } else if (clickAnimation === 'click-push') {
      classes.push('active:scale-95 transition-transform');
    }
    
    return classes.join(' ');
  };
  
  // Animation style overrides
  const animationStyle: React.CSSProperties = {
    ...(duration ? { animationDuration: `${duration}ms` } : {}),
    ...(delay && trigger !== 'onMount' ? { animationDelay: `${delay}ms` } : {}),
    ...(stagger ? { '--stagger-delay': `${stagger}ms` } as React.CSSProperties : {}),
  };
  
  // Event handlers
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  const handleMouseDown = () => setIsClicking(true);
  const handleMouseUp = () => setIsClicking(false);
  
  // Interactive event handlers should only be applied when needed
  const interactionHandlers = (trigger === 'onHover' || hoverAnimation || trigger === 'onClick' || clickAnimation)
    ? {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
        onTouchStart: handleMouseDown,
        onTouchEnd: handleMouseUp,
      }
    : {};
  
  return (
    <Component
      ref={elementRef}
      className={combineAnimationClasses(className, getAnimationClasses())}
      style={animationStyle}
      {...interactionHandlers}
      {...props}
    >
      {children}
    </Component>
  );
}

// For creating staggered animations where multiple elements animate in sequence
export function StaggeredContainer({
  children,
  staggerDelay = 100,
  animation = 'fade-in',
  ...props
}: {
  children: ReactNode;
  staggerDelay?: number;
  animation?: AnimationVariant;
} & Omit<AnimatedElementProps, 'children' | 'animation' | 'stagger'>) {
  // Ensure children is always an array
  const childrenArray = React.Children.toArray(children);
  
  return (
    <>
      {React.Children.map(childrenArray, (child, index) => {
        if (!React.isValidElement(child)) return child;
        
        // Calculate delay based on index
        const itemDelay = props.delay ?? 0 + index * staggerDelay;
        
        // Clone the element with animation props
        return React.cloneElement(child as React.ReactElement, {
          ...props,
          animation,
          delay: itemDelay,
        });
      })}
    </>
  );
}

// Simple animated button with appropriate micro-interactions
export function AnimatedButton({
  children,
  className = '',
  animation = 'none',
  ...props
}: Omit<AnimatedElementProps, 'hoverAnimation' | 'clickAnimation'>) {
  return (
    <AnimatedElement
      animation={animation}
      hoverAnimation="hover-scale"
      clickAnimation="click-push"
      className={`relative inline-flex items-center justify-center overflow-hidden ${className}`}
      as="button"
      {...props}
    >
      {children}
    </AnimatedElement>
  );
}

// Export preset components for common use cases
export const FadeIn = ({children, ...props}: Omit<AnimatedElementProps, 'animation'>) => (
  <AnimatedElement animation="fade-in" {...props}>
    {children}
  </AnimatedElement>
);

export const SlideUp = ({children, ...props}: Omit<AnimatedElementProps, 'animation'>) => (
  <AnimatedElement animation="slide-in-up" {...props}>
    {children}
  </AnimatedElement>
);

export const PopIn = ({children, ...props}: Omit<AnimatedElementProps, 'animation'>) => (
  <AnimatedElement animation="pop-in" {...props}>
    {children}
  </AnimatedElement>
);

export const Float = ({children, ...props}: Omit<AnimatedElementProps, 'animation'>) => (
  <AnimatedElement animation="float" {...props}>
    {children}
  </AnimatedElement>
);