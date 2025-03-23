import React, { useMemo, useState } from "react";
import TemperatureChart from "./TemperatureChart";
import TemperatureUnitToggle from "./TemperatureUnitToggle";
import TimeRangeToggle from "./TimeRangeToggle";
import { useWeatherData } from "../hooks/useWeatherData";
import { useLocationData } from "../hooks/useLocationData";
import Select, { SingleValue } from "react-select";
import { Container, Row, Col, Card } from "react-bootstrap";

const defaultCountry = {
  value: "VNM",
  label: "🇻🇳 Vietnam",
  data: {
    name: {
      common: "Vietnam",
      official: "Socialist Republic of Vietnam",
      nativeName: {
        vie: {
          official: "Cộng hòa xã hội chủ nghĩa Việt Nam",
          common: "Việt Nam",
        },
      },
    },
    latlng: [16.16666666, 107.83333333],
    cca2: "VN",
    flag: "🇻🇳",
  },
};

interface OptionType {
  value: string;
  label: string;
  data: Country;
}

const WeatherDashboard: React.FC = () => {
  const [unit, setUnit] = useState<TemperatureUnit>("celsius");
  const [timeRange, setTimeRange] = useState<TimeRange>("1-week");
  const [selectedCountry, setSelectedCountry] =
    useState<OptionType>(defaultCountry);
  const { data: locationData } = useLocationData();
  console.log("🚀 ~ locationData:", locationData)

  const { data, isLoading, error, startDate, endDate } = useWeatherData(
    timeRange,
    unit,
    selectedCountry.data.latlng
  );

  // Transform location data into options for react-select
  const options = useMemo<OptionType[]>(() => {
    if (!locationData) return [];
    return locationData.map((country: Country) => ({
      value: country.cca2,
      label: country.flag + " " + country.name.common,
      data: country,
    }));
  }, [locationData]);

  const handleCountryChange = (option: SingleValue<OptionType>) => {
    console.log("🚀 ~ handleCountryChange ~ option:", option);
    if (option) {
      setSelectedCountry(option);
    } else {
      setSelectedCountry(defaultCountry);
    }
  };

  const handleUnitChange = (newUnit: TemperatureUnit) => {
    setUnit(newUnit);
  };

  const handleTimeRangeChange = (newTimeRange: TimeRange) => {
    setTimeRange(newTimeRange);
  };

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="card-title text-center mb-4">
                Weather Forecast Dashboard
              </h2>

              <Row className="mb-4">
                <Col
                  md={4}
                  className="d-flex flex-row justify-content-center align-items-center"
                >
                  <label className="me-2">Time Range:</label>
                  <TimeRangeToggle
                    timeRange={timeRange}
                    onTimeRangeChange={handleTimeRangeChange}
                  />
                </Col>
                <Col
                  md={4}
                  className="d-flex flex-row justify-content-center align-items-center"
                >
                  <label className="me-2">Temperature Unit:</label>
                  <TemperatureUnitToggle
                    unit={unit}
                    onUnitChange={handleUnitChange}
                  />
                </Col>
                <Col
                  md={4}
                  className="d-flex flex-row justify-content-center align-items-center"
                >
                  <label className="me-2">Country:</label>
                  <Select
                    options={options}
                    onChange={handleCountryChange}
                    value={selectedCountry}
                    placeholder="Select Country"
                    styles={{
                      container: (provided) => ({
                        ...provided,
                        width: "100%",
                      }),
                    }}
                  />
                </Col>
              </Row>

              <Row className="mb-4"></Row>

              <Row>
                <Col>
                  {isLoading && (
                    <div className="d-flex justify-content-center my-5">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="alert alert-danger" role="alert">
                      Error loading weather data. Please try again later.
                    </div>
                  )}

                  {!isLoading && !error && data && data.length > 0 && (
                    <TemperatureChart
                      data={data}
                      unit={unit}
                      startDate={startDate}
                      endDate={endDate}
                      country={selectedCountry.data.name.common}
                    />
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <h4 className="card-title">About This Dashboard</h4>
              <p className="card-text">
                This dashboard displays temperature forecasts using data from
                the Open Meteo API. You can toggle between 1-week and 1-month
                views, and switch between Celsius and Kelvin temperature units.
                The data automatically refreshes every 2 minutes to ensure you
                have the most up-to-date information.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default WeatherDashboard;
