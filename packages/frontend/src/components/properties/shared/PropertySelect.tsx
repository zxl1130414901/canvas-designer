import React from 'react';

interface PropertySelectProps {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  options: Array<{ value: string | number; label: string }>;
  disabled?: boolean;
}

/**
 * Reusable select dropdown component
 * Eliminates duplicate select patterns in PropertyPanel.tsx
 */
export const PropertySelect: React.FC<PropertySelectProps> = ({
  label,
  value,
  onChange,
  options,
  disabled = false,
}) => {
  return (
    <div className="property-item">
      <label>{label}</label>
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="property-select"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
