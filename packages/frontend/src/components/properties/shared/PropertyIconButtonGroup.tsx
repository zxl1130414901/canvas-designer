import React from 'react';

interface IconButton {
  value: string;
  label: string;
  icon: string;
}

interface PropertyIconButtonGroupProps {
  label: string;
  value: string;
  options: IconButton[];
  onChange: (value: string) => void;
  disabled?: boolean;
}

/**
 * Icon button group component for quick toggles
 * Provides visual icon-based selection for options like alignment
 */
export const PropertyIconButtonGroup: React.FC<PropertyIconButtonGroupProps> = ({
  label,
  value,
  options,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="property-item">
      <label>{label}</label>
      <div className="icon-button-group">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            disabled={disabled}
            className={`icon-btn ${value === option.value ? 'active' : ''}`}
            title={option.label}
          >
            <span className="icon">{option.icon}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
