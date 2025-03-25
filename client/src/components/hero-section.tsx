import { WeatherWidget } from "@/components/ui/weather-widget";
import { useRef, useEffect } from "react";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

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
        <div className="mb-4 text-ice">WILLKOMMEN IN DER WELT VON</div>
        <h1 className="font-montserrat font-bold text-4xl md:text-6xl mb-6 tracking-tight">
          TRIPLE <span className="text-green-400">X</span> ADVENTURES
        </h1>
        <p className="font-opensans text-lg md:text-xl mb-4 max-w-2xl mx-auto">
          Dein Abenteuer in <strong>Arvidsjaur Schwedisch-Lappland</strong>
        </p>
        <p className="text-sm mb-8">65.5916° N, 19.1668°</p>
        
        <div className="max-w-3xl mx-auto mb-8">
          <p className="mb-4">Entdecke unvergessliche Abenteuer in der Nähe des Polarkreises. Erlebe atemberaubende <strong>Outdoor-Abenteuer</strong> und eine außergewöhnliche Küche in einer der schönsten Regionen der Welt.</p>
          
          <p className="mb-4">Freue dich auf eine Vielzahl von <strong>actionreichen und adrenalingeladenen Aktivitäten</strong>, die dein Herz höher schlagen lassen.</p>
          
          <p className="mb-4">Entspanne nach einem aufregenden Tag in unserem Spa und genieße die Ruhe der Natur. Unser <strong>Außen-Whirlpools und Saunen</strong> bieten den perfekten Rückzugsort. Beobachten Sie schließlich die wunderschönen <strong>Polarlichter</strong> am Himmel tanzen.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#experiences" className="custom-button font-montserrat text-base uppercase bg-fire px-8 py-4 rounded tracking-wide font-semibold hover:bg-opacity-90 transition">Pakete Entdecken</a>
          <a href="#contact" className="custom-button font-montserrat text-base uppercase bg-midnight border-2 border-white px-8 py-4 rounded tracking-wide font-semibold hover:bg-opacity-70 transition">Kontakt</a>
        </div>

        <div className="mt-16">
          <WeatherWidget />
        </div>
      </div>
    </section>
  );
}
