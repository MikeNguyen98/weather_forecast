import axios from "axios";

export const fetchWeatherData = async (
  latitude: number = 52.52,
  longitude: number = 13.41,
  startDate: string,
  endDate: string
): Promise<WeatherData> => {
  const url = `${import.meta.env.VITE_OPENMETEO_API}/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&start_date=${startDate}&end_date=${endDate}`;

  try {
    const response = await axios.get<WeatherData>(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const fetchLocationData = async () => {
  const url = `${import.meta.env.VITE_RESTCOUNTRY_API}/v3.1/all?fields=name&fields=latlng&fields=cca2&fields=flag`
  
  try {
    const response = await axios.get<Country[]>(url);
    return response.data;
  } catch (error) {
    console.error("Error location data:", error);
    throw error;
  }
};
