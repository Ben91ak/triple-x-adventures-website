import { useWeather } from "@/hooks/use-weather";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sun, Cloud, CloudRain, CloudSnow, Wind, Droplets, Thermometer, CloudLightningIcon, CloudFog, Moon } from "lucide-react";

interface WeatherWidgetProps {
  className?: string;
  location?: string;
}

export function WeatherWidget({ className = "", location = "Arvidsjaur,Sweden" }: WeatherWidgetProps) {
  const { language } = useLanguage();
  const { data: weather, isLoading, isError } = useWeather(location);

  // Function to determine which weather icon to display based on the description
  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase();
    
    if (desc.includes('sun') || desc.includes('clear') || desc.includes('fair')) {
      return <Sun className="text-white opacity-70" size={22} />;
    } else if (desc.includes('rain') || desc.includes('drizzle') || desc.includes('shower')) {
      return <CloudRain className="text-white opacity-70" size={22} />;
    } else if (desc.includes('snow') || desc.includes('blizzard') || desc.includes('ice')) {
      return <CloudSnow className="text-white opacity-70" size={22} />;
    } else if (desc.includes('cloud') || desc.includes('overcast') || desc.includes('partly')) {
      return <Cloud className="text-white opacity-70" size={22} />;
    } else if (desc.includes('fog') || desc.includes('mist')) {
      return <CloudFog className="text-white opacity-70" size={22} />;
    } else if (desc.includes('thunder') || desc.includes('lightning') || desc.includes('storm')) {
      return <CloudLightningIcon className="text-white opacity-70" size={22} />;
    } else if (desc.includes('wind') || desc.includes('gale')) {
      return <Wind className="text-white opacity-70" size={22} />;
    } else if (desc.includes('night') || desc.includes('dark')) {
      return <Moon className="text-white opacity-70" size={22} />;
    } else {
      // Default icon - fallback to cloud if we can't determine
      return <Cloud className="text-white opacity-70" size={22} />;
    }
  };

  // Translations
  const translations = {
    weatherIn: {
      en: "Weather in",
      de: "Wetter in",
      sv: "Väder i"
    },
    currentConditions: {
      en: "CURRENT CONDITIONS",
      de: "AKTUELLE BEDINGUNGEN",
      sv: "AKTUELLA FÖRHÅLLANDEN"
    }
  };

  if (isLoading) {
    return (
      <div className={`glass-card p-4 rounded-xl border border-white/5 bg-black/60 animate-pulse ${className}`}>
        <div className="space-y-3">
          <div className="w-1/2 h-3 bg-white/10 rounded"></div>
          <div className="w-2/3 h-4 bg-white/10 rounded"></div>
          <div className="flex items-center space-x-5 pt-1">
            <div className="w-16 h-10 bg-white/10 rounded"></div>
            <div className="flex-1 h-4 bg-white/5 rounded"></div>
            <div className="flex space-x-3">
              <div className="w-8 h-4 bg-white/10 rounded"></div>
              <div className="w-8 h-4 bg-white/10 rounded"></div>
              <div className="w-8 h-4 bg-white/10 rounded"></div>
              <div className="w-6 h-6 bg-white/10 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !weather) {
    return (
      <div className={`glass-card p-4 rounded-xl border border-white/5 bg-black/60 ${className}`}>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Error</p>
            <p className="text-white/60 text-sm">Weather unavailable</p>
          </div>
          <Cloud className="text-white/40" size={22} />
        </div>
      </div>
    );
  }

  return (
    <div className={`glass-card p-4 rounded-xl border border-white/5 bg-black/60 hover:border-white/10 transition-colors duration-300 ${className}`}>
      <div className="space-y-3">
        {/* Upper section */}
        <p className="text-white/40 text-xs tracking-wider uppercase">
          {translations.currentConditions[language]}
        </p>
        
        {/* Middle section */}
        <div className="text-white">
          {translations.weatherIn[language]} 
          <span className="ml-1">{weather.location.split(',')[0]}</span>
        </div>
        
        {/* Bottom section with temperature and icons in line */}
        <div className="flex items-center space-x-5">
          {/* Temperature */}
          <div className="flex items-baseline">
            <span className="text-white text-6xl font-light">{Math.round(weather.temperature)}°</span>
          </div>
          
          {/* Weather description */}
          <div className="flex-1">
            <span className="text-white/60 text-sm capitalize">{weather.description}</span>
          </div>
          
          {/* Icons in a row */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Thermometer className="text-white/60 mr-1" size={16} />
              <span className="text-white/80 text-sm">{Math.round(weather.feelsLike)}°</span>
            </div>
            <div className="flex items-center">
              <Droplets className="text-white/60 mr-1" size={16} />
              <span className="text-white/80 text-sm">{weather.humidity}%</span>
            </div>
            <div className="flex items-center">
              <Wind className="text-white/60 mr-1" size={16} />
              <span className="text-white/80 text-sm">{weather.windSpeed}</span>
            </div>
            <div className="text-white/60">
              {getWeatherIcon(weather.description)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}