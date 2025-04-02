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
      return <Sun className="text-white opacity-70" size={24} />;
    } else if (desc.includes('rain') || desc.includes('drizzle') || desc.includes('shower')) {
      return <CloudRain className="text-white opacity-70" size={24} />;
    } else if (desc.includes('snow') || desc.includes('blizzard') || desc.includes('ice')) {
      return <CloudSnow className="text-white opacity-70" size={24} />;
    } else if (desc.includes('cloud') || desc.includes('overcast') || desc.includes('partly')) {
      return <Cloud className="text-white opacity-70" size={24} />;
    } else if (desc.includes('fog') || desc.includes('mist')) {
      return <CloudFog className="text-white opacity-70" size={24} />;
    } else if (desc.includes('thunder') || desc.includes('lightning') || desc.includes('storm')) {
      return <CloudLightningIcon className="text-white opacity-70" size={24} />;
    } else if (desc.includes('wind') || desc.includes('gale')) {
      return <Wind className="text-white opacity-70" size={24} />;
    } else if (desc.includes('night') || desc.includes('dark')) {
      return <Moon className="text-white opacity-70" size={24} />;
    } else {
      // Default icon - fallback to cloud if we can't determine
      return <Cloud className="text-white opacity-70" size={24} />;
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
        <div className="flex flex-col h-full">
          <div className="w-1/2 h-3 bg-white/10 rounded mb-3"></div>
          <div className="w-full h-10 bg-white/5 rounded"></div>
        </div>
      </div>
    );
  }

  if (isError || !weather) {
    return (
      <div className={`glass-card p-4 rounded-xl border border-white/5 bg-black/60 ${className}`}>
        <div className="flex justify-between items-center">
          <p className="text-white/40 text-sm">Weather unavailable</p>
          <Cloud className="text-white/40" size={20} />
        </div>
      </div>
    );
  }

  return (
    <div className={`glass-card p-4 rounded-xl border border-white/5 bg-black/60 hover:border-white/10 transition-colors duration-300 ${className}`}>
      <div className="space-y-2">
        {/* Upper section */}
        <p className="text-white/40 text-xs tracking-wider uppercase">
          {translations.currentConditions[language]}
        </p>
        
        {/* Middle section */}
        <div className="text-white">
          {translations.weatherIn[language]} 
          <span className="ml-1">{weather.location.split(',')[0]}</span>
        </div>
        
        {/* Bottom section */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-baseline">
            <span className="text-white text-4xl font-light">{Math.round(weather.temperature)}°</span>
            <span className="text-white/60 text-sm ml-2 capitalize">{weather.description}</span>
          </div>
          
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
              <Thermometer className="text-white/60" size={14} />
              <span className="text-white/70 text-xs ml-0.5">{Math.round(weather.feelsLike)}°</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
              <Droplets className="text-white/60" size={14} />
              <span className="text-white/70 text-xs ml-0.5">{weather.humidity}%</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
              <Wind className="text-white/60" size={14} />
              <span className="text-white/70 text-xs ml-0.5">{weather.windSpeed}</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
              {getWeatherIcon(weather.description)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}