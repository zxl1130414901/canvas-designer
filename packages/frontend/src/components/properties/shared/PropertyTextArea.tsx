import React from 'react';

interface PropertyTextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  showCharCount?: boolean;
}

/**
 * Enhanced textarea component with character count and multiline support
 * Supports rich text editing for long content
 */
export const PropertyTextArea: React.FC<PropertyTextAreaProps> = ({
  label,
  value,
  onChange,
  disabled = false,
  placeholder,
  rows = 4,
  maxLength,
  showCharCount = false,
}) => {
  return (
    <div className="property-item">
      <label>{label}</label>
      <div className="textarea-wrapper">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          className="property-textarea"
        />
        {showCharCount && maxLength && (
          <div className="char-count">
            {value?.length || 0}/{maxLength}
          </div>
        )}
      </div>
    </div>
  );
};
