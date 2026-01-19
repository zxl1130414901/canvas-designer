import React from 'react';

interface PropertyColorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

/**
 * Reusable color picker component
 * Eliminates 38 duplicate color pickers in PropertyPanel.tsx
 */
export const PropertyColor: React.FC<PropertyColorProps> = ({
  label,
  value,
  onChange,
  disabled = false,
  style,
}) => {
  return (
    <div className="property-item">
      <label>{label}</label>
      <input
        type="color"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="property-color"
        style={style}
      />
    </div>
  );
};
