import React from 'react';

interface PropertyInputProps {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  type?: 'text' | 'number';
  disabled?: boolean;
  min?: number;
  max?: number;
  placeholder?: string;
}

/**
 * Reusable property input component
 * Eliminates 69 duplicate input occurrences in PropertyPanel.tsx
 */
export const PropertyInput: React.FC<PropertyInputProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  disabled = false,
  min,
  max,
  placeholder,
}) => {
  return (
    <div className="property-item">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        disabled={disabled}
        min={min}
        max={max}
        placeholder={placeholder}
        onChange={(e) => {
          const newValue = type === 'number' ? Number(e.target.value) : e.target.value;
          onChange(newValue);
        }}
        className="property-input"
      />
    </div>
  );
};
