import { WeatherWidget } from "@/components/ui/weather-widget";
import { useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";

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
    <section className="relative flex items-center justify-center text-white min-h-screen">
      {/* Video background with fallback */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-midnight opacity-40 z-10"></div>
        {/* Video will be added when provided */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1518453047662-8a8d3ffb8c8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-20">
        <div className="mb-4 text-ice">{content.welcome}</div>
        <h1 className="font-montserrat font-bold text-4xl md:text-6xl mb-6 tracking-tight">
          TRIPLE <span className="text-green-400">X</span> ADVENTURES
        </h1>
        <p 
          className="font-opensans text-lg md:text-xl mb-4 max-w-2xl mx-auto"
          dangerouslySetInnerHTML={{ __html: content.adventure }}
        />
        <p className="text-sm mb-8">65.5916° N, 19.1668°</p>
        
        <div className="max-w-3xl mx-auto mb-8">
          <p 
            className="mb-4"
            dangerouslySetInnerHTML={{ __html: content.paragraph1 }}
          />
          
          <p 
            className="mb-4"
            dangerouslySetInnerHTML={{ __html: content.paragraph2 }}
          />
          
          <p 
            className="mb-4"
            dangerouslySetInnerHTML={{ __html: content.paragraph3 }}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#experiences" className="custom-button font-montserrat text-base uppercase bg-fire px-8 py-4 rounded tracking-wide font-semibold hover:bg-opacity-90 transition">{t.hero.cta}</a>
          <a href="#contact" className="custom-button font-montserrat text-base uppercase bg-midnight border-2 border-white px-8 py-4 rounded tracking-wide font-semibold hover:bg-opacity-70 transition">{t.nav.contact}</a>
        </div>

        <div className="mt-16">
          <WeatherWidget />
        </div>
      </div>
    </section>
  );
}
