import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  iconUrl: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
}

export function useWeather(location: string = "Kiruna,se") {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchWeather = async (): Promise<WeatherData> => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error("Weather data fetch failed");
      }
      
      const data = await response.json();
      
      return {
        location: data.name,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed)
      };
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["weather", location],
    queryFn: fetchWeather,
    enabled: isClient && !!import.meta.env.VITE_WEATHER_API_KEY,
    refetchInterval: 30 * 60 * 1000, // Refetch every 30 minutes
    staleTime: 15 * 60 * 1000, // Data considered fresh for 15 minutes
  });
}