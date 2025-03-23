import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData } from "../services/weatherService";

// Helper to convert Celsius to Kelvin
const celsiusToKelvin = (celsius: number): number => celsius + 273.15;

export const useWeatherData = (
  timeRange: TimeRange,
  unit: TemperatureUnit = "celsius",
  latlng: number[]
) => {
  // Calculate start and end dates based on timeRange
  const endDate = new Date();
  const startDate = new Date();

  if (timeRange === "1-week") {
    startDate.setDate(endDate.getDate() - 7);
  } else {
    startDate.setDate(endDate.getDate() - 30);
  }

  // Format dates for API call
  const formatDateForApi = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  const formattedStartDate = formatDateForApi(startDate);
  const formattedEndDate = formatDateForApi(endDate);

  // Use React Query to fetch and cache the data
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["weatherData", timeRange, latlng],
    queryFn: () =>
      fetchWeatherData(
        latlng[0],
        latlng[1],
        formattedStartDate,
        formattedEndDate
      ),
    refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes
    refetchOnWindowFocus: false,
  });
  console.log("🚀 ~ data:", data)

  // Process data for charting
  const processedData: ChartData[] = data
    ? data?.hourly?.time?.map((time: string, index: number) => ({
        date: new Date(time),
        temperature:
          unit === "kelvin"
            ? celsiusToKelvin(data.hourly.temperature_2m[index])
            : data.hourly.temperature_2m[index],
      }))
    : [];

  return {
    data: processedData,
    isLoading,
    error,
    refetch,
    startDate,
    endDate,
  };
};
