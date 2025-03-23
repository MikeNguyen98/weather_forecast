import axios from "axios";

export const fetchWeatherData = async (
  latitude: number = 52.52,
  longitude: number = 13.41,
  startDate: string,
  endDate: string
): Promise<WeatherData> => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&start_date=${startDate}&end_date=${endDate}`;

  try {
    const response = await axios.get<WeatherData>(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const fetchLocationData = async () => {
  try {
    const response = await axios.get<Country[]>("https://restcountries.com/v3.1/all?fields=name&fields=latlng&fields=cca2&fields=flag");
    return response.data;
  } catch (error) {
    console.error("Error location data:", error);
    throw error;
  }
};
