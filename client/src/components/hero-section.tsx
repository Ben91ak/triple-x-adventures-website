import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/use-translation";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Maintain video loading and error states
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const { language } = useLanguage();
  const { t } = useTranslation();
  
  // Handle visibility changes to pause/play video
  useEffect(() => {
    function handleVisibilityChange() {
      if (videoRef.current) {
        if (document.hidden) {
          videoRef.current.pause();
        } else {
          videoRef.current.play().catch(e => {
            console.log('Autoplay prevented by browser:', e);
          });
        }
      }
    }
    
    // Add event listener for visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Cleanup any dynamically added preload links that might cause warnings
    function cleanupUnusedPreloads() {
      try {
        // Get all preload links
        const preloads = document.head.querySelectorAll('link[rel="preload"]');
        
        // Convert to array and filter properly typed link elements
        Array.from(preloads)
          .filter((link): link is HTMLLinkElement => link instanceof HTMLLinkElement)
          .forEach(link => {
            // Now TypeScript knows this is an HTMLLinkElement with an href
            if (!link.href.includes('TXA%20Teaser%202025%20Homepage-d5kHXNSaQibOJdx9cKc2PK1vXNlLgp.mp4') && 
                !link.href.includes('TXA%20Teaser%202025%20Homepage-Fnb2gpMVOnfP0UDwuU6elWEDJehxL3.webm')) {
              link.remove();
              console.log('Removed unnecessary preload:', link.href);
            }
          });
      } catch (err) {
        console.error('Error cleaning up preloads:', err);
      }
    }
    
    // Run cleanup after a short delay to catch any dynamically added preloads
    setTimeout(cleanupUnusedPreloads, 100);
    
    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  
  // Create animation hooks for various hero elements with staggered timing
  // Set initiallyVisible to true to ensure elements show immediately on page load
  const { ref: titleRef, isVisible: isTitleVisible } = useScrollAnimation({
    triggerOnce: true,
    threshold: 0,
    rootMargin: '100% 0px 100% 0px',
    initiallyVisible: true // Always visible immediately
  });
  
  const { ref: subtitleRef, isVisible: isSubtitleVisible } = useScrollAnimation({
    triggerOnce: true,
    threshold: 0,
    rootMargin: '100% 0px 100% 0px',
    animationDelay: 300,
    initiallyVisible: true // Always visible immediately
  });
  
  const { ref: descriptionRef, isVisible: isDescriptionVisible } = useScrollAnimation({
    triggerOnce: true,
    threshold: 0,
    rootMargin: '100% 0px 100% 0px',
    animationDelay: 600,
    initiallyVisible: true // Always visible immediately
  });
  
  const { ref: buttonsRef, isVisible: isButtonsVisible } = useScrollAnimation({
    triggerOnce: true,
    threshold: 0,
    rootMargin: '100% 0px 100% 0px',
    animationDelay: 900,
    initiallyVisible: true // Always visible immediately
  });
  
  // Create scroll indicator animation that runs continuously
  // This is a ref for an element we no longer show, but keep for animation logic
  const { ref: scrollIndicatorAnimRef, isVisible: isScrollIndicatorVisible } = useScrollAnimation({
    triggerOnce: false,
    threshold: 0.1,
    animationDelay: 1500
  });
  
  // Enhanced effect to handle video loading with improved strategies from examples
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    // Set up event listeners for video
    const handleCanPlay = () => {
      console.log("Video can play");
      setVideoLoaded(true);
    };
    
    const handleError = (e: Event) => {
      console.error("Video loading error:", e);
      setVideoError(true);
      // Hide video element if it fails to load
      if (video) {
        video.style.display = 'none';
      }
    };
    
    // Add event listeners
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    
    // Check if browser is mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // For mobile devices, optimize playback
    if (isMobile) {
      console.log("Mobile device detected, optimizing video playback");
      // The playbackRate is already set in the onLoadedMetadata handler
    }
    
    // Handle visibility changes to save resources
    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else {
        // Try to play but catch errors (browsers may block autoplay)
        video.play().catch(e => {
          console.log('Auto-play prevented by browser:', e);
        });
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Network Information API
    let connection: any = null;
    if ('connection' in navigator && (navigator as any).connection) {
      connection = (navigator as any).connection;
      
      // For slow connections, disable autoplay and use fallback
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        console.log("Slow connection detected, using fallback image");
        video.autoplay = false;
        setVideoError(true); // Skip video loading on very slow connections
      }
      
      // Monitor connection changes
      const handleConnectionChange = () => {
        console.log('Connection type changed to ' + connection.effectiveType);
        // Could update video quality based on new connection type
      };
      
      connection.addEventListener('change', handleConnectionChange);
      
      // Add to cleanup function
      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        connection.removeEventListener('change', handleConnectionChange);
      };
    }
    
    // Regular cleanup without connection API
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <section className="relative flex items-center justify-center text-primary-text h-screen overflow-hidden pt-16" aria-labelledby="hero-heading">
      {/* BASE LAYER - Using the global background - complemented with section-specific elements */}
      <div className="absolute inset-0 overflow-hidden transform-gpu will-change-transform" style={{ zIndex: 5 }}>
        {/* Using the global background - complemented with a subtle overlay */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none transform-gpu">
          {/* Simple glow effect to complement global background */}
          <div className="aurora-glow absolute inset-0 opacity-30"></div>
        </div>
        
        {/* Video with fallback animation */}
        {!videoError ? (
          <>
            {/* Low-quality image poster that will show immediately while video loads */}
            {/* High-priority fallback image with proper attributes for LCP optimization */}
            {/* Optimized fallback image with multiple format support - critical for fast LCP */}
            <picture>
              {/* AVIF format - best compression and quality */}
              <source
                srcSet="/images/TXA_fallback.avif"
                type="image/avif"
              />
              {/* WebP format - good fallback for browsers without AVIF */}
              <source
                srcSet="/images/TXA_fallback.webp"
                type="image/webp"
              />
              {/* Final JPEG fallback for maximum compatibility */}
              <img 
                src="/images/TXA_fallback_optimized.jpg" 
                alt="Arctic adventures in the snow" 
                className="absolute w-full h-full object-cover transform-gpu"
                style={{ 
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  zIndex: 5,
                  position: 'absolute',
                  filter: 'brightness(0.9)'
                }}
                loading="eager"
                decoding="sync"
                width="1920"
                height="1080"
                // Use data attribute instead to avoid TypeScript errors
                data-fetchpriority="high"
              />
            </picture>
            
            {/* Video element with improved loading strategy based on provided example */}
            <video 
              id="hero-video"
              ref={videoRef}
              className={`absolute w-full h-full object-cover transform-gpu transition-opacity duration-700 ${videoLoaded ? 'opacity-90' : 'opacity-0'}`}
              autoPlay 
              muted 
              loop 
              playsInline
              controls={false}
              poster="/images/TXA_fallback_optimized.jpg"
              preload="metadata"
              aria-label="Background video of Arctic adventures"
              aria-hidden="true"
              onLoadedMetadata={() => {
                console.log("Video metadata loaded");
                if (videoRef.current) {
                  videoRef.current.playbackRate = 0.8;
                }
              }}
              onError={(e) => {
                console.error('Video loading error:', e);
                setVideoError(true);
              }}
              onCanPlay={() => setVideoLoaded(true)}
              onPlaying={() => console.log("Video is playing")}
              style={{ 
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                filter: 'brightness(1.0) contrast(1.05)',
                zIndex: 6,
                position: 'absolute',
                top: '50%',
                left: '50%',
                minWidth: '100%',
                minHeight: '100%',
                transform: 'translateX(-50%) translateY(-50%)'
              }}
            >
              {/* WebM format - primary source for better performance */}
              <source src="https://8ixqcoqwa5k0ppxp.public.blob.vercel-storage.com/TXA%20Teaser%202025%20Homepage-Fnb2gpMVOnfP0UDwuU6elWEDJehxL3.webm" type="video/webm" />
              {/* MP4 fallback for browsers that don't support WebM */}
              <source src="https://8ixqcoqwa5k0ppxp.public.blob.vercel-storage.com/TXA%20Teaser%202025%20Homepage-d5kHXNSaQibOJdx9cKc2PK1vXNlLgp.mp4" type="video/mp4" />
            </video>
            
            {/* Temporary aurora animation while waiting for video to load */}
            {!videoLoaded && (
              <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-bg/90 to-dark-bg/80 opacity-100 transform-gpu">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-color/10 via-dark-bg/5 to-accent-color/5 opacity-60 animate-aurora-slow"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-color/5 via-dark-bg/5 to-accent-color/15 opacity-50 animate-aurora-medium"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-accent-color/10 to-transparent opacity-30 animate-aurora-pillar-slow"></div>
              </div>
            )}
          </>
        ) : (
          // Fallback for when video fails to load
          <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-bg/90 to-dark-bg/80 opacity-100 transform-gpu">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-color/10 via-dark-bg/5 to-accent-color/5 opacity-60 animate-aurora-slow"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-color/5 via-dark-bg/5 to-accent-color/15 opacity-50 animate-aurora-medium"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-accent-color/10 to-transparent opacity-30 animate-aurora-pillar-slow"></div>
          </div>
        )}
      </div>
      
      {/* Section content uses global background without local overlays */}
      
      {/* TOP LAYER - Content (highest z-index) - optimized with transform-gpu */}
      <div className="container mx-auto px-4 relative z-50 flex items-center justify-center h-full transform-gpu">
        {/* Hero Content with animated entrance - optimized for performance */}
        <div className="text-center max-w-4xl mx-auto py-8 md:py-0 transform-gpu">
          {/* Desktop/tablet content - show full content */}
          <div className="hidden md:block transform-gpu">
            {/* Content for larger screens - optimized with transform-gpu */}
            <div 
              className={`mb-3 text-white text-sm font-medium tracking-wider uppercase text-shadow-lg fade-in transform-gpu ${isTitleVisible ? 'visible' : ''}`}
              ref={titleRef as React.RefObject<HTMLDivElement>}
              style={{ color: '#FFFFFF', textShadow: '0 4px 8px rgba(0, 0, 0, 0.9)' }}
            >
              {t('heroSection.welcome')}
            </div>
            
            <h1 
              className={`font-bold text-4xl sm:text-5xl md:text-7xl mb-4 md:mb-6 tracking-tight fade-in transform-gpu ${isTitleVisible ? 'visible' : ''}`}
              ref={titleRef as React.RefObject<HTMLHeadingElement>}
              style={{ 
                color: '#FFFFFF', 
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.9)',
                WebkitTextStroke: '1px rgba(255, 255, 255, 0.1)'
              }}
            >
              TRIPLE <span style={{ color: 'rgb(149, 204, 47)' }}>X</span> ADVENTURES
            </h1>
            
            <div 
              className={`text-base sm:text-lg md:text-xl mb-3 md:mb-4 max-w-2xl mx-auto font-semibold text-white text-shadow-lg fade-in transform-gpu ${isSubtitleVisible ? 'visible' : ''}`}
              dangerouslySetInnerHTML={{ __html: t('heroSection.adventure') }}
              ref={subtitleRef as React.RefObject<HTMLDivElement>}
              style={{ color: '#FFFFFF', textShadow: '0 4px 8px rgba(0, 0, 0, 0.9)' }}
            />
            
            <p 
              className={`text-xs sm:text-sm mb-6 md:mb-8 font-mono text-white/80 fade-in transform-gpu ${isSubtitleVisible ? 'visible' : ''}`}
              ref={subtitleRef as React.RefObject<HTMLParagraphElement>}
              style={{ color: '#FFFFFF', textShadow: '0 1px 3px rgba(0, 0, 0, 0.75)' }}
            >
              65.5916° N, 19.1668° E
            </p>
            
            <div 
              className={`glass-card p-4 sm:p-6 md:p-8 mb-8 md:mb-12 max-w-3xl mx-auto text-left shadow-xl fade-in scale-up transform-gpu ${isDescriptionVisible ? 'visible' : ''}`}
              ref={descriptionRef as React.RefObject<HTMLDivElement>}
              style={{ backgroundColor: 'rgba(26, 29, 31, 0.7)', backdropFilter: 'blur(8px)' }}
            >
              <p className="mb-3 md:mb-4 text-white text-sm md:text-base leading-relaxed transform-gpu" dangerouslySetInnerHTML={{ __html: t('heroSection.paragraph1') }} />
              <p className="mb-3 md:mb-4 text-white text-sm md:text-base leading-relaxed transform-gpu" dangerouslySetInnerHTML={{ __html: t('heroSection.paragraph2') }} />
              <p className="text-white text-sm md:text-base leading-relaxed transform-gpu" dangerouslySetInnerHTML={{ __html: t('heroSection.paragraph3') }} />
            </div>
          </div>
          
          {/* Mobile-only content - optimized for performance */}
          <div className="md:hidden block transform-gpu">
            <h1 
              className={`font-bold text-4xl sm:text-5xl mb-3 tracking-tight fade-in transform-gpu ${isTitleVisible ? 'visible' : ''}`}
              ref={titleRef as React.RefObject<HTMLHeadingElement>}
              style={{ 
                color: '#FFFFFF', 
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.9)',
                WebkitTextStroke: '1px rgba(255, 255, 255, 0.1)'
              }}
            >
              TRIPLE <span style={{ color: 'rgb(149, 204, 47)' }}>X</span> ADVENTURES
            </h1>
            
            <div 
              className={`text-base sm:text-lg mb-3 max-w-xs mx-auto font-semibold text-white text-shadow-lg fade-in transform-gpu ${isSubtitleVisible ? 'visible' : ''}`}
              dangerouslySetInnerHTML={{ __html: t('heroSection.adventure') }}
              ref={subtitleRef as React.RefObject<HTMLDivElement>}
              style={{ color: '#FFFFFF', textShadow: '0 4px 8px rgba(0, 0, 0, 0.9)' }}
            />
            
            <p 
              className={`text-xs mb-6 font-mono text-white/80 fade-in transform-gpu ${isSubtitleVisible ? 'visible' : ''}`}
              ref={subtitleRef as React.RefObject<HTMLParagraphElement>}
              style={{ color: '#FFFFFF', textShadow: '0 1px 3px rgba(0, 0, 0, 0.75)' }}
            >
              65.5916° N, 19.1668° E
            </p>
            
            {/* Full content for mobile with smaller text - optimized blur effect */}
            <div 
              className={`glass-card p-3 mb-4 mx-auto text-left shadow-lg fade-in scale-up transform-gpu ${isDescriptionVisible ? 'visible' : ''}`}
              ref={descriptionRef as React.RefObject<HTMLDivElement>}
              style={{ maxHeight: 'calc(60vh - 200px)', overflowY: 'auto', backgroundColor: 'rgba(26, 29, 31, 0.75)', backdropFilter: 'blur(6px)' }}
            >
              <p className="mb-2 text-white text-xs leading-relaxed transform-gpu" dangerouslySetInnerHTML={{ __html: t('heroSection.paragraph1') }} />
              <p className="mb-2 text-white text-xs leading-relaxed transform-gpu" dangerouslySetInnerHTML={{ __html: t('heroSection.paragraph2') }} />
              <p className="text-white text-xs leading-relaxed transform-gpu" dangerouslySetInnerHTML={{ __html: t('heroSection.paragraph3') }} />
            </div>
          </div>
          
          {/* Button group with the most delayed entrance - optimized for performance */}
          <div 
            className={`flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-2 md:mb-16 fade-in transform-gpu ${isButtonsVisible ? 'visible' : ''}`}
            ref={buttonsRef as React.RefObject<HTMLDivElement>}
          >
            <a 
              href="#pakete" 
              className="btn-primary inline-flex items-center justify-center gap-2 text-sm uppercase bg-accent-color tracking-wide font-medium transition-colors transform-gpu"
              role="button"
              aria-label="Explore adventures"
            >
              {t('hero.cta')}
            </a>
            <a 
              href="#contact" 
              className="btn-ghost inline-flex items-center justify-center gap-2 text-sm uppercase tracking-wide font-medium transition-colors transform-gpu"
              role="button"
              aria-label="Contact us"
            >
              {t('nav.contact')}
            </a>
          </div>
        </div>
      </div>
      
{/* Scroll indicator removed as requested */}
    </section>
  );
}
