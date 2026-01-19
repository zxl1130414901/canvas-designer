import React from 'react';

interface PropertyRangeProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
  displayValue?: string;
}

/**
 * Reusable range slider component
 * Eliminates duplicate slider patterns in PropertyPanel.tsx
 */
export const PropertyRange: React.FC<PropertyRangeProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  disabled = false,
  displayValue,
}) => {
  return (
    <div className="property-item">
      <label>{label}</label>
      <div className="range-input">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
          className="property-range"
        />
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={Math.round(value)}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
          className="property-number"
        />
        {displayValue && <span className="range-value">{displayValue}</span>}
      </div>
    </div>
  );
};
