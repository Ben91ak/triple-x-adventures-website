import { useWeather } from "@/hooks/use-weather";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sun, Cloud, CloudRain, CloudSnow, Wind, Droplets, Thermometer } from "lucide-react";

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
    
    if (desc.includes('sun') || desc.includes('clear')) {
      return <Sun size={32} />;
    } else if (desc.includes('rain') || desc.includes('drizzle') || desc.includes('shower')) {
      return <CloudRain size={32} />;
    } else if (desc.includes('snow') || desc.includes('blizzard')) {
      return <CloudSnow size={32} />;
    } else if (desc.includes('cloud') || desc.includes('overcast')) {
      return <Cloud size={32} />;
    } else {
      // Default icon
      return <Sun size={32} />;
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
      <div className={`glass-card p-5 shadow-lg border border-white/10 animate-pulse ${className}`}>
        <div className="h-full flex flex-col justify-center">
          <div className="w-2/3 h-4 bg-white/20 rounded mb-3"></div>
          <div className="w-1/2 h-6 bg-white/10 rounded"></div>
          <div className="mt-auto pt-12">
            <div className="grid grid-cols-3 gap-3">
              <div className="h-8 bg-white/10 rounded"></div>
              <div className="h-8 bg-white/10 rounded"></div>
              <div className="h-8 bg-white/10 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !weather) {
    return (
      <div className={`glass-card p-5 shadow-lg border border-white/10 ${className}`}>
        <div className="h-full flex flex-col justify-center items-center">
          <div className="w-12 h-12 rounded-full bg-accent-color/20 flex items-center justify-center mb-3 text-accent-color shadow-glow-sm">
            <Cloud size={24} />
          </div>
          <p className="text-white/70 text-sm text-center">{translations.error[language]}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`glass-card p-5 shadow-lg border border-white/10 hover:border-accent-color/20 transition-all duration-300 ${className}`}>
      <div className="flex flex-col h-full justify-between">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs text-accent-color font-medium uppercase tracking-wider mb-1">
              {translations.currentConditions[language]}
            </p>
            <h4 className="text-white text-sm font-medium">
              {translations.weatherIn[language]} {weather.location}
            </h4>
          </div>
          <div className="w-16 h-16 rounded-full bg-accent-color/20 flex items-center justify-center mr-1 -mt-2 text-accent-color shadow-glow-sm">
            {getWeatherIcon(weather.description)}
          </div>
        </div>
        
        <div className="flex items-end gap-2 mt-2">
          <span className="text-white text-4xl font-bold">{weather.temperature}°</span>
          <span className="text-white opacity-80 text-sm mb-1.5 capitalize">{weather.description}</span>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mt-auto pt-4 text-sm text-white opacity-90">
          <div className="flex flex-col items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-accent-color/20 flex items-center justify-center mb-1 text-accent-color shadow-glow-sm">
              <Thermometer size={16} />
            </div>
            <p className="opacity-60 text-xs">{translations.feelsLike[language]}</p>
            <p className="font-medium">{weather.feelsLike}°C</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-accent-color/20 flex items-center justify-center mb-1 text-accent-color shadow-glow-sm">
              <Droplets size={16} />
            </div>
            <p className="opacity-60 text-xs">{translations.humidity[language]}</p>
            <p className="font-medium">{weather.humidity}%</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-accent-color/20 flex items-center justify-center mb-1 text-accent-color shadow-glow-sm">
              <Wind size={16} />
            </div>
            <p className="opacity-60 text-xs">{translations.wind[language]}</p>
            <p className="font-medium">{weather.windSpeed} m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
}