import { useWeather } from "@/hooks/use-weather";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sun, Cloud, CloudRain, CloudSnow, Wind, Droplets, Thermometer, CloudLightningIcon, CloudFog } from "lucide-react";

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
      return <Sun size={28} />;
    } else if (desc.includes('rain') || desc.includes('drizzle') || desc.includes('shower')) {
      return <CloudRain size={28} />;
    } else if (desc.includes('snow') || desc.includes('blizzard') || desc.includes('ice')) {
      return <CloudSnow size={28} />;
    } else if (desc.includes('cloud') || desc.includes('overcast') || desc.includes('partly')) {
      return <Cloud size={28} />;
    } else if (desc.includes('fog') || desc.includes('mist')) {
      return <CloudFog size={28} />;
    } else if (desc.includes('thunder') || desc.includes('lightning') || desc.includes('storm')) {
      return <CloudLightningIcon size={28} />;
    } else if (desc.includes('wind') || desc.includes('gale')) {
      return <Wind size={28} />;
    } else {
      // Default icon - fallback to cloud if we can't determine
      return <Cloud size={28} />;
    }
  };

  // Translations
  const translations = {
    weatherIn: {
      en: "Weather in",
      de: "Wetter in",
      sv: "Väder i"
    },
    feelsLike: {
      en: "Feels like",
      de: "Gefühlt wie",
      sv: "Känns som"
    },
    humidity: {
      en: "Humidity",
      de: "Luftfeuchtigkeit",
      sv: "Luftfuktighet"
    },
    wind: {
      en: "Wind",
      de: "Wind",
      sv: "Vind"
    },
    loading: {
      en: "Loading weather...",
      de: "Wetter wird geladen...",
      sv: "Laddar väder..."
    },
    error: {
      en: "Weather data unavailable",
      de: "Wetterdaten nicht verfügbar",
      sv: "Väderdata otillgänglig"
    },
    currentConditions: {
      en: "Current conditions",
      de: "Aktuelle Bedingungen",
      sv: "Aktuella förhållanden"
    }
  };

  if (isLoading) {
    return (
      <div className={`glass-card p-4 shadow-lg border border-white/10 animate-pulse ${className}`}>
        <div className="flex flex-row h-full justify-between items-center">
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="w-2/3 h-3 bg-white/20 rounded mb-2"></div>
              <div className="w-1/2 h-4 bg-white/10 rounded"></div>
            </div>
            <div className="w-1/3 h-6 bg-white/10 rounded mt-2"></div>
          </div>
          <div className="flex flex-col items-end">
            <div className="w-14 h-14 rounded-full bg-white/10"></div>
            <div className="flex gap-3 mt-2">
              <div className="w-12 h-4 bg-white/10 rounded"></div>
              <div className="w-12 h-4 bg-white/10 rounded"></div>
              <div className="w-12 h-4 bg-white/10 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !weather) {
    return (
      <div className={`glass-card p-4 shadow-lg border border-white/10 ${className}`}>
        <div className="flex flex-row h-full justify-between items-center">
          <div>
            <p className="text-white/70 text-sm">{translations.error[language]}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-accent-color/20 flex items-center justify-center text-accent-color shadow-glow-sm">
            <Cloud size={22} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`glass-card p-4 shadow-lg border border-white/10 hover:border-accent-color/20 transition-all duration-300 ${className}`}>
      <div className="flex flex-row h-full justify-between items-center">
        <div className="flex flex-col justify-between h-full">
          <div>
            <p className="text-xs text-accent-color font-medium uppercase tracking-wider mb-1">
              {translations.currentConditions[language]}
            </p>
            <h4 className="text-white text-sm font-medium">
              {translations.weatherIn[language]} {weather.location}
            </h4>
          </div>
          
          <div className="flex items-end gap-2 mt-1">
            <span className="text-white text-3xl font-bold">{weather.temperature}°</span>
            <span className="text-white opacity-80 text-xs mb-1 capitalize">{weather.description}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="w-14 h-14 rounded-full bg-accent-color/20 flex items-center justify-center mb-2 text-accent-color shadow-glow-sm">
            {getWeatherIcon(weather.description)}
          </div>
          
          <div className="flex gap-3 text-xs text-white opacity-90">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-accent-color/20 flex items-center justify-center mr-1 text-accent-color shadow-glow-sm">
                <Thermometer size={12} />
              </div>
              <p className="font-medium">{weather.feelsLike}°</p>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-accent-color/20 flex items-center justify-center mr-1 text-accent-color shadow-glow-sm">
                <Droplets size={12} />
              </div>
              <p className="font-medium">{weather.humidity}%</p>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-accent-color/20 flex items-center justify-center mr-1 text-accent-color shadow-glow-sm">
                <Wind size={12} />
              </div>
              <p className="font-medium">{weather.windSpeed}m/s</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}