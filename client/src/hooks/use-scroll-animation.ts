import { useEffect, useRef, useState, MutableRefObject } from 'react';

/**
 * Hook to detect when an element enters the viewport using Intersection Observer
 * and apply animations with configurable options.
 * 
 * @param options Configuration options for the intersection observer and animations
 * @returns Object containing ref to attach to the element and state to track visibility
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
  animationDelay = 0,
  initiallyVisible = false, // New option to set initial visibility
} = {}) {
  const elementRef = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(initiallyVisible);
  const [hasAnimated, setHasAnimated] = useState(initiallyVisible);
  
  useEffect(() => {
    // Store the current element reference to use in cleanup
    const currentRef = elementRef.current;
    
    if (!currentRef) return;
    
    // Create the observer with configuration options
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        
        // If element is in viewport and we haven't triggered yet or don't want to trigger once
        if (entry.isIntersecting && (!hasAnimated || !triggerOnce)) {
          // Apply timeout for staggered animations if delay is specified
          if (animationDelay > 0) {
            setTimeout(() => {
              setIsVisible(true);
              setHasAnimated(true);
            }, animationDelay);
          } else {
            setIsVisible(true);
            setHasAnimated(true);
          }
        } else if (!triggerOnce && !entry.isIntersecting) {
          // If not triggering once and element leaves viewport, reset visibility
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );
    
    // Start observing the element
    observer.observe(currentRef);
    
    // Cleanup function to stop observing when component unmounts
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, triggerOnce, hasAnimated, animationDelay]);
  
  return { ref: elementRef, isVisible };
}

/**
 * Utility function to generate CSS classes for animated elements
 * 
 * @param isVisible Whether the element is visible in the viewport
 * @param baseClasses Base CSS classes to always apply
 * @param visibleClasses Classes to apply when element is visible
 * @param hiddenClasses Classes to apply when element is hidden
 * @returns String of CSS classes
 */
export function getAnimationClasses(
  isVisible: boolean,
  baseClasses: string = "",
  visibleClasses: string = "opacity-100 transform translate-y-0",
  hiddenClasses: string = "opacity-0 transform translate-y-8"
): string {
  return `${baseClasses} transition-all duration-700 ease-out ${isVisible ? visibleClasses : hiddenClasses}`;
}

/**
 * Hook to create a parallax effect on scroll
 * 
 * @param speed Speed of parallax effect (1 is normal scroll speed)
 * @returns Ref to attach to the element and style object
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed: number = 0.5) {
  const elementRef = useRef<T | null>(null);
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    if (!elementRef.current) return;
    
    const handleScroll = () => {
      if (!elementRef.current) return;
      const element = elementRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the element is in the viewport
      const visiblePercentage = 
        Math.min(windowHeight, rect.bottom) - 
        Math.max(0, rect.top);
      
      // Translate this to a percentage of the viewport height
      const scrollPercentage = visiblePercentage / windowHeight;
      
      // Apply this as a transformation based on speed
      setOffset(scrollPercentage * speed * 100);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);
  
  const style = {
    transform: `translateY(${offset}px)`
  };
  
  return { ref: elementRef, style };
}