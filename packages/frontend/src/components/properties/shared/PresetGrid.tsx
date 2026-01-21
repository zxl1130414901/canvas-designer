import React from 'react';

export interface PresetOption {
  id: string;
  label: string;
  preview: string;
  config: Record<string, any>;
}

interface PresetGridProps {
  label?: string;
  presets: PresetOption[];
  onSelect: (config: PresetOption) => void;
  columns?: number;
  disabled?: boolean;
}

/**
 * Preset styles grid component
 * Displays selectable preset styles with preview text
 */
export const PresetGrid: React.FC<PresetGridProps> = ({
  label,
  presets,
  onSelect,
  columns = 5,
  disabled = false,
}) => {
  return (
    <div className="preset-section">
      {label && <label className="preset-label">{label}</label>}
      <div className="preset-grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {presets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => onSelect(preset)}
            disabled={disabled}
            className="preset-btn"
            title={preset.label}
          >
            <div className="preset-preview">{preset.preview}</div>
            <span className="preset-name">{preset.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
