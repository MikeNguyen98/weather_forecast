import { render, screen, fireEvent } from "@testing-library/react";
import TemperatureUnitToggle from "./TemperatureUnitToggle";

describe("TemperatureUnitToggle", () => {
  const mockOnUnitChange = jest.fn();

  beforeEach(() => {
    mockOnUnitChange.mockClear();
  });

  it("renders correctly with celsius selected", () => {
    render(
      <TemperatureUnitToggle unit="celsius" onUnitChange={mockOnUnitChange} />
    );

    const celsiusRadio = screen.getByLabelText("Celsius") as HTMLInputElement;
    const kelvinRadio = screen.getByLabelText("Kelvin") as HTMLInputElement;

    expect(celsiusRadio.checked).toBe(true);
    expect(kelvinRadio.checked).toBe(false);
  });

  it("renders correctly with kelvin selected", () => {
    render(
      <TemperatureUnitToggle unit="kelvin" onUnitChange={mockOnUnitChange} />
    );

    const celsiusRadio = screen.getByLabelText("Celsius") as HTMLInputElement;
    const kelvinRadio = screen.getByLabelText("Kelvin") as HTMLInputElement;

    expect(celsiusRadio.checked).toBe(false);
    expect(kelvinRadio.checked).toBe(true);
  });

  it("calls onUnitChange when changing to kelvin", () => {
    render(
      <TemperatureUnitToggle unit="celsius" onUnitChange={mockOnUnitChange} />
    );

    const kelvinRadio = screen.getByLabelText("Kelvin");
    fireEvent.click(kelvinRadio);

    expect(mockOnUnitChange).toHaveBeenCalledWith("kelvin");
  });

  it("calls onUnitChange when changing to celsius", () => {
    render(
      <TemperatureUnitToggle unit="kelvin" onUnitChange={mockOnUnitChange} />
    );

    const celsiusRadio = screen.getByLabelText("Celsius");
    fireEvent.click(celsiusRadio);

    expect(mockOnUnitChange).toHaveBeenCalledWith("celsius");
  });
});
