import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useWeather() {
  return useQuery({
    queryKey: ["/api/weather"],
    queryFn: api.getWeather,
    refetchInterval: 1000 * 60 * 15, // Refetch every 15 minutes
    staleTime: 1000 * 60 * 10, // Consider data stale after 10 minutes
  });
}
