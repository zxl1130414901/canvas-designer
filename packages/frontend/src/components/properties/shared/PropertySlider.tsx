import React from 'react';

interface PropertySliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  presets?: number[];
  disabled?: boolean;
}

/**
 * Enhanced slider component with number input and preset buttons
 * Combines quick slider adjustment with precise number input
 */
export const PropertySlider: React.FC<PropertySliderProps> = ({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  presets,
  disabled = false,
}) => {
  return (
    <div className="property-item">
      <label>{label}</label>
      <div className="slider-container">
        <div className="slider-inputs">
          <input
            type="range"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            className="property-slider"
          />
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            className="property-number"
          />
          {unit && <span className="unit-label">{unit}</span>}
        </div>
        {presets && presets.length > 0 && (
          <div className="slider-presets">
            {presets.map((preset, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onChange(preset)}
                disabled={disabled}
                className={`preset-btn ${value === preset ? 'active' : ''}`}
              >
                {preset}{unit}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
