import { useRef, useEffect, useState, memo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const { language } = useLanguage();
  const t = useTranslation(language);
  
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
  
  useEffect(() => {
    // Simplified video loading
    const videoElement = videoRef.current;
    if (!videoElement) {
      console.error("Video element not found in the DOM");
      setVideoError(true);
      return;
    }
    
    console.log("Setting up video element");
    
    // Set video properties
    videoElement.playbackRate = 0.8;
    videoElement.preload = "auto";
    
    // Handle errors
    const handleVideoError = () => {
      console.error("Video failed to load:", videoElement ? videoElement.error : "No video element");
      setVideoError(true);
    };
    
    // Handle successful loading
    const handleCanPlay = () => {
      console.log("Video can play now");
      setVideoLoaded(true);
      
      // Try to play the video
      videoElement.play().catch(err => {
        console.log("Autoplay failed:", err);
      });
    };
    
    // Add event listeners
    videoElement.addEventListener('error', handleVideoError);
    videoElement.addEventListener('canplay', handleCanPlay);
    
    // Start loading immediately
    videoElement.load();
    
    // Clean up
    return () => {
      videoElement.removeEventListener('error', handleVideoError);
      videoElement.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  // Content based on language
  const heroContent = {
    en: {
      welcome: "WELCOME TO THE WORLD OF",
      adventure: "Your adventure in <strong>Arvidsjaur Swedish Lapland</strong>",
      paragraph1: "Discover unforgettable adventures near the Arctic Circle. Experience breathtaking <strong>outdoor adventures</strong> and exceptional cuisine in one of the most beautiful regions in the world.",
      paragraph2: "Look forward to a variety of <strong>action-packed and adrenaline-fueled activities</strong> that will make your heart beat faster.",
      paragraph3: "Relax after an exciting day in our spa and enjoy the tranquility of nature. Our <strong>outdoor hot tubs and saunas</strong> offer the perfect retreat. Finally, watch the beautiful <strong>Northern Lights</strong> dance in the sky."
    },
    de: {
      welcome: "WILLKOMMEN IN DER WELT VON",
      adventure: "Dein Abenteuer in <strong>Arvidsjaur Schwedisch-Lappland</strong>",
      paragraph1: "Entdecke unvergessliche Abenteuer in der Nähe des Polarkreises. Erlebe atemberaubende <strong>Outdoor-Abenteuer</strong> und eine außergewöhnliche Küche in einer der schönsten Regionen der Welt.",
      paragraph2: "Freue dich auf eine Vielzahl von <strong>actionreichen und adrenalingeladenen Aktivitäten</strong>, die dein Herz höher schlagen lassen.",
      paragraph3: "Entspanne nach einem aufregenden Tag in unserem Spa und genieße die Ruhe der Natur. Unser <strong>Außen-Whirlpools und Saunen</strong> bieten den perfekten Rückzugsort. Beobachten Sie schließlich die wunderschönen <strong>Polarlichter</strong> am Himmel tanzen."
    },
    sv: {
      welcome: "VÄLKOMMEN TILL VÄRLDEN AV",
      adventure: "Ditt äventyr i <strong>Arvidsjaur Svenska Lappland</strong>",
      paragraph1: "Upptäck oförglömliga äventyr nära polcirkeln. Upplev hisnande <strong>utomhusäventyr</strong> och exceptionell mat i en av världens vackraste regioner.",
      paragraph2: "Se fram emot en mängd <strong>actionfyllda och adrenalinstinna aktiviteter</strong> som får ditt hjärta att slå snabbare.",
      paragraph3: "Koppla av efter en spännande dag i vårt spa och njut av naturens lugn. Våra <strong>utomhus-bubbelpooler och bastur</strong> erbjuder den perfekta reträtten. Till sist, se de vackra <strong>norrskenen</strong> dansa på himlen."
    }
  }

  const content = heroContent[language];

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
            
            {/* Delay loading the video to prioritize the background image for faster LCP */}
            <video 
              ref={videoRef}
              className={`absolute w-full h-full object-cover transform-gpu transition-opacity duration-700 ${videoLoaded ? 'opacity-90' : 'opacity-0'}`}
              autoPlay 
              muted 
              loop 
              playsInline
              poster="/images/TXA_fallback_optimized.jpg"
              preload="auto" // Load video immediately for testing
              aria-label="Background video of Arctic adventures"
              aria-hidden="true" // Background video is decorative
              onLoadedMetadata={() => {
                // Once metadata is loaded, we can start loading the content
                if (videoRef.current) {
                  // Use lower quality on mobile/slow connections
                  if (window.innerWidth < 768 || 
                      (navigator as any)?.connection?.effectiveType === 'slow-2g' || 
                      (navigator as any)?.connection?.effectiveType === '2g') {
                    videoRef.current.playbackRate = 0.8;
                    videoRef.current.currentTime = 2; // Skip to a more interesting part
                  }
                  
                  // Now load the actual video content
                  videoRef.current.preload = "auto";
                }
              }}
              onError={(e) => {
                console.error("Video error:", e);
                setVideoError(true);
              }}
              onCanPlay={() => setVideoLoaded(true)}
              style={{ 
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                filter: 'brightness(1.0) contrast(1.05)',
                zIndex: 6,
                position: 'absolute'
              }}
            >
              {/* Provide multiple source formats for faster loading based on browser support */}
              <source 
                src="/videos/TXA Teaser 2025 Homepage.mp4" 
                type="video/mp4"
              />
              {/* WebM as secondary source since we're having issues with it */}
              <source 
                src="/videos/TXA Teaser 2025 Homepage.webm" 
                type="video/webm"
              />
              {/* Fallback text in case browser doesn't support video element */}
              <p>Your browser does not support HTML5 video playback.</p>
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
      
      {/* Dark overlay for text contrast - reduced opacity for brighter video */}
      <div className="absolute inset-0 bg-dark-bg transform-gpu" style={{ zIndex: 10, backgroundColor: 'rgba(0, 0, 0, 0.2)' }} aria-hidden="true"></div>
      
      {/* Grid pattern overlay - optimized with transform-gpu */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wNCIgZmlsbC1ydWxlPSJub256ZXJvIj48cGF0aCBkPSJNMjkgNTguNWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1em0wIDFhNi41IDYuNSAwIDEgMCAwIDEzIDYuNSA2LjUgMCAwIDAgMC0xM3ptMS0uMDg3YTcuNSA3LjUgMCAxIDEgMCAxNSA3LjUgNy41IDAgMCAxIDAtMTV6TTIwIDU5LjVhNy41IDcuNSAwIDEgMSAwIDE1IDcuNSA3LjUgMCAwIDEgMC0xNXptMCAxYTYuNSA2LjUgMCAxIDAgMCAxMyA2LjUgNi41IDAgMCAwIDAtMTN6bTAtMWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1eiIvPjwvZz48L2c+PC9zdmc+')]  opacity-60 pointer-events-none transform-gpu" style={{ zIndex: 20 }} aria-hidden="true"></div>

      {/* No transition overlay between sections - removed as requested */}
      
      {/* TOP LAYER - Content (highest z-index) - optimized with transform-gpu */}
      <div className="container mx-auto px-4 relative z-50 flex items-center justify-center h-full transform-gpu" style={{ zIndex: 50 }}>
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
              {content.welcome}
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
              dangerouslySetInnerHTML={{ __html: content.adventure }}
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
              <p 
                className="mb-3 md:mb-4 text-white text-sm md:text-base leading-relaxed transform-gpu"
                dangerouslySetInnerHTML={{ __html: content.paragraph1 }}
              />
              
              <p 
                className="mb-3 md:mb-4 text-white text-sm md:text-base leading-relaxed transform-gpu"
                dangerouslySetInnerHTML={{ __html: content.paragraph2 }}
              />
              
              <p 
                className="text-white text-sm md:text-base leading-relaxed transform-gpu"
                dangerouslySetInnerHTML={{ __html: content.paragraph3 }}
              />
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
              dangerouslySetInnerHTML={{ __html: content.adventure }}
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
              <p 
                className="mb-2 text-white text-xs leading-relaxed transform-gpu"
                dangerouslySetInnerHTML={{ __html: content.paragraph1 }}
              />
              
              <p 
                className="mb-2 text-white text-xs leading-relaxed transform-gpu"
                dangerouslySetInnerHTML={{ __html: content.paragraph2 }}
              />
              
              <p 
                className="text-white text-xs leading-relaxed transform-gpu"
                dangerouslySetInnerHTML={{ __html: content.paragraph3 }}
              />
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
              {t.hero.cta}
            </a>
            <a 
              href="#contact" 
              className="btn-ghost inline-flex items-center justify-center gap-2 text-sm uppercase tracking-wide font-medium transition-colors transform-gpu"
              role="button"
              aria-label="Contact us"
            >
              {t.nav.contact}
            </a>
          </div>
        </div>
      </div>
      
{/* Scroll indicator removed as requested */}
    </section>
  );
}
