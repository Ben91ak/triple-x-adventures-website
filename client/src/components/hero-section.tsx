import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { ChevronDown } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [videoError, setVideoError] = useState(false);
  const { language } = useLanguage();
  const t = useTranslation(language);
  
  // Create animation hooks for various hero elements with staggered timing
  const { ref: titleRef, isVisible: isTitleVisible } = useScrollAnimation({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const { ref: subtitleRef, isVisible: isSubtitleVisible } = useScrollAnimation({
    triggerOnce: true,
    threshold: 0.1,
    animationDelay: 300
  });
  
  const { ref: descriptionRef, isVisible: isDescriptionVisible } = useScrollAnimation({
    triggerOnce: true,
    threshold: 0.1,
    animationDelay: 600
  });
  
  const { ref: buttonsRef, isVisible: isButtonsVisible } = useScrollAnimation({
    triggerOnce: true,
    threshold: 0.1,
    animationDelay: 900
  });
  
  // Create scroll indicator animation that runs continuously
  const { ref: scrollIndicatorAnimRef, isVisible: isScrollIndicatorVisible } = useScrollAnimation({
    triggerOnce: false,
    threshold: 0.1,
    animationDelay: 1500
  });
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
      
      // Handle video error (show fallback animation)
      const handleVideoError = () => {
        setVideoError(true);
        console.log("Video failed to load, showing fallback animation");
      };
      
      videoRef.current.addEventListener('error', handleVideoError);
      
      // Add scroll event listener for scroll indicator fade out
      const handleScroll = () => {
        if (scrollIndicatorRef.current) {
          // Calculate scroll position as percentage
          const scrollY = window.scrollY;
          const opacity = Math.max(0, 1 - (scrollY / 200)); // Fade out over first 200px of scroll
          scrollIndicatorRef.current.style.opacity = opacity.toString();
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('error', handleVideoError);
        }
        window.removeEventListener('scroll', handleScroll);
      };
    }
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
    <section className="relative flex items-center justify-center text-primary-text h-screen overflow-hidden">
      {/* BASE LAYER - Video Background (lowest z-index) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video 
          ref={videoRef}
          className="absolute w-auto min-w-full min-h-full max-w-none object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
          style={{ 
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <source src="/videos/TXA Teaser 2025 (1).mp4" type="video/mp4" />
        </video>
        
        {/* Fallback gradient background in case video fails to load */}
        <div className={`absolute inset-0 bg-gradient-animated transition-opacity duration-500 ${videoError ? 'opacity-100' : 'opacity-0'}`}></div>
      </div>
      
      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-dark-bg bg-opacity-75 z-10"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wNCIgZmlsbC1ydWxlPSJub256ZXJvIj48cGF0aCBkPSJNMjkgNTguNWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1em0wIDFhNi41IDYuNSAwIDEgMCAwIDEzIDYuNSA2LjUgMCAwIDAgMC0xM3ptMS0uMDg3YTcuNSA3LjUgMCAxIDEgMCAxNSA3LjUgNy41IDAgMCAxIDAtMTV6TTIwIDU5LjVhNy41IDcuNSAwIDEgMSAwIDE1IDcuNSA3LjUgMCAwIDEgMC0xNXptMCAxYTYuNSA2LjUgMCAxIDAgMCAxMyA2LjUgNi41IDAgMCAwIDAtMTN6bTAtMWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1eiIvPjwvZz48L2c+PC9zdmc+')]  opacity-60 z-15 pointer-events-none"></div>

      {/* MIDDLE LAYER - Transition Elements */}
      {/* Simple gradient fade to next section (removed wave overlay) */}
      <div className="absolute bottom-0 left-0 right-0 h-[300px] z-20">
        {/* Gradient overlay for smooth transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg/70 to-dark-bg"></div>
      </div>
      
      {/* TOP LAYER - Content (highest z-index) */}
      <div className="container mx-auto px-4 relative z-50 mt-16 md:mt-0 flex items-center justify-center h-full">
        {/* Hero Content with animated entrance */}
        <div className="text-center max-w-4xl mx-auto py-8 md:py-0">
          {/* Entrance animation for welcome text */}
          <div 
            className={`mb-3 text-white text-sm font-medium tracking-wider uppercase text-shadow-sm fade-in ${isTitleVisible ? 'visible' : ''}`}
            ref={titleRef as React.RefObject<HTMLDivElement>}
          >
            {content.welcome}
          </div>
          
          {/* Main title with animated entrance */}
          <h1 
            className={`font-bold text-4xl sm:text-5xl md:text-7xl mb-4 md:mb-6 tracking-tight background-animate bg-gradient-to-r from-white via-accent-color to-white bg-clip-text text-transparent fade-in ${isTitleVisible ? 'visible' : ''}`}
            ref={titleRef as React.RefObject<HTMLHeadingElement>}
          >
            TRIPLE <span className="text-accent-color">X</span> ADVENTURES
          </h1>
          
          {/* Subtitle with slightly delayed entrance */}
          <div 
            className={`text-base sm:text-lg md:text-xl mb-3 md:mb-4 max-w-2xl mx-auto font-light text-white text-shadow-sm fade-in ${isSubtitleVisible ? 'visible' : ''}`}
            dangerouslySetInnerHTML={{ __html: content.adventure }}
            ref={subtitleRef as React.RefObject<HTMLDivElement>}
          />
          
          <p 
            className={`text-xs sm:text-sm mb-6 md:mb-8 font-mono text-white/80 fade-in ${isSubtitleVisible ? 'visible' : ''}`}
            ref={subtitleRef as React.RefObject<HTMLParagraphElement>}
          >
            65.5916° N, 19.1668° E
          </p>
          
          {/* Content card with delayed entrance */}
          <div 
            className={`glass-card p-4 sm:p-6 md:p-8 mb-8 md:mb-12 max-w-3xl mx-auto text-left shadow-xl fade-in scale-up ${isDescriptionVisible ? 'visible' : ''}`}
            ref={descriptionRef as React.RefObject<HTMLDivElement>}
          >
            <p 
              className="mb-3 md:mb-4 text-white text-sm md:text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content.paragraph1 }}
            />
            
            <p 
              className="mb-3 md:mb-4 text-white text-sm md:text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content.paragraph2 }}
            />
            
            <p 
              className="text-white text-sm md:text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content.paragraph3 }}
            />
          </div>
          
          {/* Button group with the most delayed entrance */}
          <div 
            className={`flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-10 md:mb-16 fade-in ${isButtonsVisible ? 'visible' : ''}`}
            ref={buttonsRef as React.RefObject<HTMLDivElement>}
          >
            <a href="#pakete" className="btn-primary inline-flex items-center justify-center gap-2 text-sm uppercase bg-accent-color tracking-wide font-medium transition-all">
              {t.hero.cta}
            </a>
            <a href="#contact" className="btn-ghost inline-flex items-center justify-center gap-2 text-sm uppercase tracking-wide font-medium transition-all">
              {t.nav.contact}
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator - fades in after all content and fades out on scroll */}
      <div 
        ref={scrollIndicatorAnimRef as React.RefObject<HTMLDivElement>}
        className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 z-50 text-white flex flex-col items-center fade-in ${isScrollIndicatorVisible ? 'visible' : ''}`}
      >
        <span className="text-xs uppercase tracking-widest mb-2 text-white/80">Scroll Down</span>
        <ChevronDown className="animate-bounce w-6 h-6" />
      </div>
    </section>
  );
}
