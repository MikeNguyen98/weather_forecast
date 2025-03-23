import React from "react";

interface TimeRangeToggleProps {
  timeRange: TimeRange;
  onTimeRangeChange: (timeRange: TimeRange) => void;
}

const TimeRangeToggle: React.FC<TimeRangeToggleProps> = ({
  timeRange,
  onTimeRangeChange,
}) => {
  return (
    <div className="btn-group" role="group">
      <input
        type="radio"
        className="btn-check"
        name="timeRange"
        id="1-week"
        checked={timeRange === "1-week"}
        onChange={() => onTimeRangeChange("1-week")}
      />
      <label className="btn btn-outline-primary" htmlFor="1-week">
        1 Week
      </label>

      <input
        type="radio"
        className="btn-check"
        name="timeRange"
        id="1-month"
        checked={timeRange === "1-month"}
        onChange={() => onTimeRangeChange("1-month")}
      />
      <label className="btn btn-outline-primary" htmlFor="1-month">
        1 Month
      </label>
    </div>
  );
};

export default TimeRangeToggle;
