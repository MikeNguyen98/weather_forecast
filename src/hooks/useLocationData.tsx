import { useQuery } from "@tanstack/react-query";
import { fetchLocationData } from "../services/weatherService";

export const useLocationData = () => {
  const data = useQuery({
    queryKey: ["locationData"],
    queryFn: () => fetchLocationData(),
    refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes
    refetchOnWindowFocus: false,
  });

  return data;
};
