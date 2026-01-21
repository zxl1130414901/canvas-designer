import React from 'react';

export interface ColorPreset {
  color: string;
  label: string;
}

export const defaultColorPresets: ColorPreset[] = [
  { color: '#ffffff', label: '白色' },
  { color: '#000000', label: '黑色' },
  { color: '#f8fafc', label: '浅灰' },
  { color: '#94a3b8', label: '中灰' },
  { color: '#475569', label: '深灰' },
  { color: '#ef4444', label: '红色' },
  { color: '#f97316', label: '橙色' },
  { color: '#eab308', label: '黄色' },
  { color: '#22c55e', label: '绿色' },
  { color: '#06b6d4', label: '青色' },
  { color: '#3b82f6', label: '蓝色' },
  { color: '#8b5cf6', label: '紫色' },
  { color: '#ec4899', label: '粉色' },
  { color: '#f472b6', label: '玫瑰' },
  { color: '#ff6b35', label: '珊瑚' },
  { color: '#4ade80', label: '草绿' },
];

interface ColorPresetsProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  presets?: ColorPreset[];
  columns?: number;
  disabled?: boolean;
}

/**
 * Color presets grid component
 * Provides quick color selection from preset colors
 */
export const ColorPresets: React.FC<ColorPresetsProps> = ({
  label,
  value,
  onChange,
  presets = defaultColorPresets,
  columns = 8,
  disabled = false,
}) => {
  return (
    <div className="color-presets-section">
      {label && <label className="color-presets-label">{label}</label>}
      <div className="color-presets" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {presets.map((preset, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onChange(preset.color)}
            disabled={disabled}
            className={`color-preset-btn ${value.toLowerCase() === preset.color.toLowerCase() ? 'active' : ''}`}
            style={{ backgroundColor: preset.color }}
            title={preset.label}
          />
        ))}
      </div>
    </div>
  );
};
