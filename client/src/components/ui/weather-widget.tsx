import { useWeather } from "@/hooks/use-weather";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";

export function WeatherWidget() {
  const { data: weather, isLoading, error } = useWeather();
  const { language } = useLanguage();
  const t = useTranslation(language);

  if (isLoading) {
    return (
      <div className="inline-block bg-midnight bg-opacity-70 p-4 rounded-lg">
        <div className="flex items-center justify-center space-x-3">
          <Skeleton className="w-24 h-6" />
          <div className="h-8 border-r border-gray-500"></div>
          <Skeleton className="w-24 h-6" />
          <div className="h-8 border-r border-gray-500"></div>
          <Skeleton className="w-24 h-6" />
        </div>
        <div className="text-sm text-ice opacity-80 mt-1">{t.weather.loading}</div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="inline-block bg-midnight bg-opacity-70 p-4 rounded-lg">
        <div className="text-ice text-base">
          <i className="fas fa-exclamation-circle mr-2"></i>
          <span>{t.weather.error}</span>
        </div>
        <div className="text-sm text-ice opacity-80 mt-1">{t.weather.title}</div>
      </div>
    );
  }

  return (
    <div className="inline-block bg-midnight bg-opacity-70 p-4 rounded-lg">
      <div className="flex items-center justify-center space-x-3">
        <div className="text-ice text-base">
          <i className="fas fa-temperature-low mr-2"></i>
          <span>{weather.temperature}°C</span>
        </div>
        <div className="h-8 border-r border-gray-500"></div>
        <div className="text-ice text-base">
          <i className="fas fa-wind mr-2"></i>
          <span>{weather.wind.speed} m/s</span>
        </div>
        <div className="h-8 border-r border-gray-500"></div>
        <div className="text-ice text-base">
          <i className="fas fa-cloud mr-2"></i>
          <span>{weather.condition}</span>
        </div>
      </div>
      <div className="text-sm text-ice opacity-80 mt-1">{t.weather.title}</div>
    </div>
  );
}
