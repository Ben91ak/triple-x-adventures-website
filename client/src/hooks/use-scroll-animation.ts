import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Hook to detect when an element enters the viewport using Intersection Observer
 * with optimized performance.
 * 
 * @param options Configuration options for the intersection observer and animations
 * @returns Object containing ref to attach to the element and state to track visibility
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
  animationDelay = 0,
  initiallyVisible = false,
} = {}) {
  const elementRef = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(initiallyVisible);
  const hasAnimatedRef = useRef(initiallyVisible);
  const timerRef = useRef<number | null>(null);
  
  // Use callback to prevent recreation on each render
  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    
    if (entry.isIntersecting && (!hasAnimatedRef.current || !triggerOnce)) {
      // Clear any existing timer
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
      
      // Use requestAnimationFrame for smoother animations
      requestAnimationFrame(() => {
        if (animationDelay > 0) {
          timerRef.current = window.setTimeout(() => {
            setIsVisible(true);
            hasAnimatedRef.current = true;
          }, animationDelay);
        } else {
          setIsVisible(true);
          hasAnimatedRef.current = true;
        }
      });
    } else if (!triggerOnce && !entry.isIntersecting) {
      requestAnimationFrame(() => {
        setIsVisible(false);
      });
    }
  }, [triggerOnce, animationDelay]);
  
  useEffect(() => {
    const currentRef = elementRef.current;
    if (!currentRef) return;
    
    // Create observer with options
    const observer = new IntersectionObserver(observerCallback, { 
      threshold, 
      rootMargin,
      // Only observe when element is in the DOM
      root: null 
    });
    
    // Start observing
    observer.observe(currentRef);
    
    // Cleanup
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
      observer.disconnect();
    };
  }, [threshold, rootMargin, observerCallback]);
  
  return { ref: elementRef, isVisible };
}

/**
 * Optimized utility function for generating animation classes
 * Uses memoized class generation for better performance
 */
export function getAnimationClasses(
  isVisible: boolean,
  baseClasses: string = "",
  visibleClasses: string = "opacity-100 transform translate-y-0 will-change-transform",
  hiddenClasses: string = "opacity-0 transform translate-y-8 will-change-transform"
): string {
  // Apply hardware acceleration and will-change only when needed
  const transitionClasses = "transition-transform transition-opacity duration-700 ease-out";
  return `${baseClasses} ${transitionClasses} ${isVisible ? visibleClasses : hiddenClasses}`;
}

/**
 * Optimized hook for parallax scrolling with better performance
 * Uses RAF and passive scroll events
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed: number = 0.5) {
  const elementRef = useRef<T | null>(null);
  const offsetRef = useRef(0);
  const [style, setStyle] = useState({ transform: 'translateY(0px)' });
  const frameRef = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  const isInViewRef = useRef(false);
  
  // Create optimized scroll handler that uses RAF
  const handleScroll = useCallback(() => {
    // Skip if we've already scheduled a frame or element isn't in view
    if (frameRef.current !== null || !isInViewRef.current) return;
    
    // Schedule frame for next repaint
    frameRef.current = requestAnimationFrame(() => {
      const currentRef = elementRef.current;
      if (!currentRef) {
        frameRef.current = null;
        return;
      }
      
      const rect = currentRef.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if element is in viewport with some padding
      if (rect.bottom < -100 || rect.top > windowHeight + 100) {
        isInViewRef.current = false;
        frameRef.current = null;
        return;
      }
      
      // Calculate parallax offset
      const visiblePercentage = 
        Math.min(windowHeight, rect.bottom) - 
        Math.max(0, rect.top);
      const scrollPercentage = visiblePercentage / windowHeight;
      const newOffset = Math.round(scrollPercentage * speed * 100);
      
      // Only update if the offset has changed significantly
      if (Math.abs(newOffset - offsetRef.current) > 1) {
        offsetRef.current = newOffset;
        setStyle({ 
          transform: `translateY(${newOffset}px) translateZ(0)` 
        });
      }
      
      frameRef.current = null;
    });
  }, [speed]);
  
  // Set up a more efficient intersection observer to check visibility
  useEffect(() => {
    const currentRef = elementRef.current;
    if (!currentRef) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isInViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          handleScroll();
        }
      },
      { 
        rootMargin: '100px',
        threshold: 0 
      }
    );
    
    observer.observe(currentRef);
    
    return () => observer.disconnect();
  }, [handleScroll]);
  
  // Add passive scroll listener
  useEffect(() => {
    // Throttle scroll events for better performance
    const throttledScrollHandler = () => {
      const currentScrollY = window.scrollY;
      
      // Skip if scroll position hasn't changed significantly
      if (Math.abs(currentScrollY - lastScrollY.current) < 5) return;
      
      lastScrollY.current = currentScrollY;
      handleScroll();
    };
    
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [handleScroll]);
  
  return { ref: elementRef, style };
}