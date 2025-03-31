// Constants for reusable animation parameters
export const timings = {
  fast: '150ms',
  medium: '300ms',
  slow: '500ms',
  verySlow: '800ms',
};

export const easings = {
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  elastic: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
  decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
  accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
};

export const animations = {
  // Object transforms
  fadeIn: `opacity ${timings.medium} ${easings.decelerate}`,
  fadeOut: `opacity ${timings.medium} ${easings.accelerate}`,
  slideInY: `transform ${timings.medium} ${easings.decelerate}`,
  slideInX: `transform ${timings.medium} ${easings.decelerate}`,
  scale: `transform ${timings.medium} ${easings.elastic}`,
  
  // Colors and shadows
  colorChange: `color ${timings.medium} ${easings.smooth}`,
  backgroundChange: `background-color ${timings.medium} ${easings.smooth}`,
  borderChange: `border-color ${timings.medium} ${easings.smooth}`,
  shadowChange: `box-shadow ${timings.medium} ${easings.smooth}`,
  
  // Multiple properties
  hoverEffect: `transform ${timings.fast} ${easings.smooth}, box-shadow ${timings.fast} ${easings.smooth}`,
  clickEffect: `transform ${timings.fast} ${easings.bounce}`,
  navigationTransition: `all ${timings.medium} ${easings.decelerate}`,
};

/**
 * Generates a CSS variable-based animation string for dynamic animations
 * This approach allows for runtime customization of animations
 */
export const createAnimation = (property: string, timing: string, easing: string) => {
  return `${property} ${timing} ${easing}`;
};

/**
 * Helper class to manage classes for micro-interactions
 * Makes it easier to add/remove animation states
 */
export const animationClasses = {
  // Hover effects
  hoverScale: 'hover:scale-105 transition-transform',
  hoverShrink: 'hover:scale-98 transition-transform',
  hoverLift: 'hover:-translate-y-1 transition-transform',
  hoverGlow: 'hover:shadow-glow transition-shadow',
  hoverAccent: 'hover:text-accent transition-colors',
  hoverBg: 'hover:bg-accent/10 transition-colors',
  
  // Click effects
  clickPush: 'active:scale-95 transition-transform',
  clickDepression: 'active:translate-y-0.5 transition-transform',
  clickFlash: 'active:bg-accent/20 transition-colors',
  
  // Continuous animations
  float: 'animate-float',
  pulse: 'animate-pulse-soft',
  shimmer: 'animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%]',
  aurora: 'animate-aurora bg-gradient-to-br from-accent/20 via-primary/20 to-accent/10 bg-[length:200%_200%]',
  
  // Page transitions
  pageEnter: 'animate-fade-in',
  pageExit: 'animate-fade-out',
  
  // State changes
  active: 'bg-accent/20 text-accent',
  disabled: 'opacity-50 cursor-not-allowed',
};

/**
 * Helper function to apply multiple animation classes conditionally
 */
export const combineAnimationClasses = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};