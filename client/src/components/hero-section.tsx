import { WeatherWidget } from "@/components/ui/weather-widget";

export function HeroSection() {
  return (
    <section 
      className="relative flex items-center justify-center text-white min-h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 45, 64, 0.4), rgba(15, 45, 64, 0.4)), url('https://images.unsplash.com/photo-1518453047662-8a8d3ffb8c8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-montserrat font-bold text-4xl md:text-6xl mb-4 tracking-tight">THE REAL ARCTIC DEAL</h1>
        <p className="font-opensans text-lg md:text-xl mb-8 max-w-2xl mx-auto">Raw, authentic, and premium Arctic experiences in the heart of Swedish Lapland</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#experiences" className="custom-button font-montserrat text-base uppercase bg-fire px-8 py-4 rounded tracking-wide font-semibold hover:bg-opacity-90 transition">Discover Adventures</a>
          <a href="#package-builder" className="custom-button font-montserrat text-base uppercase bg-midnight border-2 border-white px-8 py-4 rounded tracking-wide font-semibold hover:bg-opacity-70 transition">Build Your Trip</a>
        </div>

        <div className="mt-16">
          <WeatherWidget />
        </div>
      </div>
    </section>
  );
}
