type TemperatureUnit = "celsius" | "kelvin";
type TimeRange = "1-week" | "1-month";

type WeatherData = {
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
  hourly_units: {
    temperature_2m: string;
  };
};

type ChartData = {
  date: Date;
  temperature: number;
};

type CountryName = {
  common: string;
  official: string;
  nativeName?: Record<string, { official: string; common: string }>;
};

type Country = {
  cca2: string;
  name: CountryName;
  latlng: number[];
  flag: string;
};
