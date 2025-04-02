import { useWeather } from "@/hooks/use-weather";
import { useLanguage } from "@/contexts/LanguageContext";

interface WeatherWidgetProps {
  className?: string;
  location?: string;
}

export function WeatherWidget({ className = "", location = "Arvidsjaur,Sweden" }: WeatherWidgetProps) {
  const { language } = useLanguage();
  const { data: weather, isLoading, isError } = useWeather(location);

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
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 mb-3">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
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
          <img 
            src={weather.iconUrl} 
            alt={weather.description} 
            className="w-16 h-16 -mr-2 -mt-2" 
          />
        </div>
        
        <div className="flex items-end gap-2 mt-2">
          <span className="text-white text-4xl font-bold">{weather.temperature}°</span>
          <span className="text-white opacity-80 text-sm mb-1.5 capitalize">{weather.description}</span>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mt-auto pt-4 text-sm text-white opacity-90">
          <div>
            <p className="opacity-60 text-xs">{translations.feelsLike[language]}:</p>
            <p className="font-medium">{weather.feelsLike}°C</p>
          </div>
          <div>
            <p className="opacity-60 text-xs">{translations.humidity[language]}:</p>
            <p className="font-medium">{weather.humidity}%</p>
          </div>
          <div>
            <p className="opacity-60 text-xs">{translations.wind[language]}:</p>
            <p className="font-medium">{weather.windSpeed} m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
}