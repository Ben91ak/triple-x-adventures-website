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

export function useWeather(location: string = "Kiruna,Sweden") {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchWeather = async (): Promise<WeatherData> => {
    try {
      // Using our proxy endpoint to Weatherstack API
      const response = await fetch(
        `/api/weather?query=${encodeURIComponent(location)}`
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Weather data fetch failed");
      }
      
      const data = await response.json();
      
      return {
        location: data.location.name,
        temperature: Math.round(data.current.temperature),
        description: data.current.weather_descriptions[0] || "Clear",
        iconUrl: data.current.weather_icons[0] || "",
        feelsLike: Math.round(data.current.feelslike),
        humidity: data.current.humidity,
        windSpeed: Math.round(data.current.wind_speed)
      };
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["weather", location],
    queryFn: fetchWeather,
    enabled: isClient, // We're now using the server's environment variable
    refetchInterval: 30 * 60 * 1000, // Refetch every 30 minutes
    staleTime: 15 * 60 * 1000, // Data considered fresh for 15 minutes
  });
}