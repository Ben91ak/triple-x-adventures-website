import { useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { language } = useLanguage();
  const t = useTranslation(language);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
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
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef}
          className="absolute object-cover w-full h-full"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/videos/TXA Teaser 2025.mov" type="video/quicktime" />
          {/* Fallback image if video fails to load */}
          <img 
            src="https://images.unsplash.com/photo-1518453047662-8a8d3ffb8c8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
            alt="Arctic adventure background" 
            className="absolute object-cover w-full h-full" 
          />
        </video>
      </div>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-dark-bg bg-opacity-60 z-10"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wNCIgZmlsbC1ydWxlPSJub256ZXJvIj48cGF0aCBkPSJNMjkgNTguNWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1em0wIDFhNi41IDYuNSAwIDEgMCAwIDEzIDYuNSA2LjUgMCAwIDAgMC0xM3ptMS0uMDg3YTcuNSA3LjUgMCAxIDEgMCAxNSA3LjUgNy41IDAgMCAxIDAtMTV6TTIwIDU5LjVhNy41IDcuNSAwIDEgMSAwIDE1IDcuNSA3LjUgMCAwIDEgMC0xNXptMCAxYTYuNSA2LjUgMCAxIDAgMCAxMyA2LjUgNi41IDAgMCAwIDAtMTN6bTAtMWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1eiIvPjwvZz48L2c+PC9zdmc+')]  opacity-60 z-20 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-30 mt-16 md:mt-0">
        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-3 text-secondary-text text-sm font-medium tracking-wider uppercase">{content.welcome}</div>
          
          <h1 className="font-bold text-5xl md:text-7xl mb-6 tracking-tight background-animate bg-gradient-to-r from-white via-accent-color to-white bg-clip-text text-transparent">
            TRIPLE <span className="text-accent-color">X</span> ADVENTURES
          </h1>
          
          <div 
            className="text-lg md:text-xl mb-4 max-w-2xl mx-auto font-light"
            dangerouslySetInnerHTML={{ __html: content.adventure }}
          />
          
          <p className="text-sm mb-8 font-mono text-secondary-text">65.5916° N, 19.1668° E</p>
          
          <div className="glass-card p-6 md:p-8 mb-12 max-w-3xl mx-auto text-left">
            <p 
              className="mb-4 text-secondary-text leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content.paragraph1 }}
            />
            
            <p 
              className="mb-4 text-secondary-text leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content.paragraph2 }}
            />
            
            <p 
              className="text-secondary-text leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content.paragraph3 }}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#pakete" className="btn-primary inline-flex items-center justify-center gap-2 text-sm uppercase bg-accent-color tracking-wide font-medium transition-all">
              {t.hero.cta}
            </a>
            <a href="#contact" className="btn-ghost inline-flex items-center justify-center gap-2 text-sm uppercase tracking-wide font-medium transition-all">
              {t.nav.contact}
            </a>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-sm text-secondary-text mb-2 opacity-80">Scroll down</span>
          <ChevronDown className="h-5 w-5 text-accent-color" />
        </div>
      </div>
    </section>
  );
}
