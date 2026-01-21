import React from 'react';

export interface ToggleOption {
  id: string;
  label: string;
  icon?: string;
}

interface ToggleGroupProps {
  label?: string;
  value: string;
  options: ToggleOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
}

/**
 * Toggle button group component
 * Provides visual toggle selection with icons
 */
export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  label,
  value,
  options,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="toggle-group-section">
      {label && <label className="toggle-group-label">{label}</label>}
      <div className="toggle-group">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            disabled={disabled}
            className={`toggle-btn ${value === option.id ? 'active' : ''}`}
          >
            {option.icon && <span className="toggle-icon">{option.icon}</span>}
            <span className="toggle-label">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
