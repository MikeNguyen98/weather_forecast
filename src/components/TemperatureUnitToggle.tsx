import React from "react";
type TemperatureUnit = "celsius" | "kelvin";
interface TemperatureUnitToggleProps {
  unit: TemperatureUnit;
  onUnitChange: (unit: TemperatureUnit) => void;
}

const TemperatureUnitToggle: React.FC<TemperatureUnitToggleProps> = ({
  unit,
  onUnitChange,
}) => {
  return (
    <div className="btn-group" role="group">
      <input
        type="radio"
        className="btn-check"
        name="unit"
        id="celsius"
        checked={unit === "celsius"}
        onChange={() => onUnitChange("celsius")}
      />
      <label className="btn btn-outline-primary" htmlFor="celsius">
        Celsius
      </label>

      <input
        type="radio"
        className="btn-check"
        name="unit"
        id="kelvin"
        checked={unit === "kelvin"}
        onChange={() => onUnitChange("kelvin")}
      />
      <label className="btn btn-outline-primary" htmlFor="kelvin">
        Kelvin
      </label>
    </div>
  );
};

export default TemperatureUnitToggle;
