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
      <div className={`glass-card p-4 animate-pulse ${className}`}>
        <p className="text-white opacity-70 text-sm">{translations.loading[language]}</p>
      </div>
    );
  }

  if (isError || !weather) {
    return (
      <div className={`glass-card p-4 ${className}`}>
        <p className="text-white opacity-70 text-sm">{translations.error[language]}</p>
      </div>
    );
  }

  return (
    <div className={`glass-card p-4 ${className}`}>
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-xs text-accent-color font-medium uppercase tracking-wider">
              {translations.currentConditions[language]}
            </p>
            <h4 className="text-white text-sm font-medium">
              {translations.weatherIn[language]} {weather.location}
            </h4>
          </div>
          <img 
            src={weather.iconUrl} 
            alt={weather.description} 
            className="w-14 h-14 -mr-2 -mt-2" 
          />
        </div>
        
        <div className="flex items-end gap-1 mt-1">
          <span className="text-white text-3xl font-bold">{weather.temperature}°</span>
          <span className="text-white opacity-70 text-sm mb-1 capitalize">{weather.description}</span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-3 text-xs text-white opacity-80">
          <div>
            <p className="opacity-60">{translations.feelsLike[language]}:</p>
            <p>{weather.feelsLike}°C</p>
          </div>
          <div>
            <p className="opacity-60">{translations.humidity[language]}:</p>
            <p>{weather.humidity}%</p>
          </div>
          <div>
            <p className="opacity-60">{translations.wind[language]}:</p>
            <p>{weather.windSpeed} m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
}