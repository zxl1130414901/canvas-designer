import React from 'react';
import { PropertySlider, PropertyColor } from '../shared';

export interface GlowConfig {
  enabled: boolean;
  color: string;
  blur: number;
}

interface GlowControlProps {
  label?: string;
  value: GlowConfig;
  onChange: (value: GlowConfig) => void;
}

const defaultGlow: GlowConfig = {
  enabled: false,
  color: '#ff6b35',
  blur: 10,
};

/**
 * Glow control component
 * Controls text glow effects
 */
export const GlowControl: React.FC<GlowControlProps> = ({
  label = '发光',
  value = defaultGlow,
  onChange,
}) => {
  const handleToggle = () => {
    onChange({ ...value, enabled: !value.enabled });
  };

  return (
    <div className={`glow-control ${value.enabled ? 'enabled' : ''}`}>
      <div className="glow-header">
        <label className="toggle-label">{label}</label>
        <button
          type="button"
          className={`toggle-switch ${value.enabled ? 'on' : 'off'}`}
          onClick={handleToggle}
        >
          <span className="toggle-thumb" />
        </button>
      </div>

      {value.enabled && (
        <div className="glow-content">
          <PropertyColor
            label="颜色"
            value={value.color}
            onChange={(color) => onChange({ ...value, color })}
          />
          <PropertySlider
            label="强度"
            value={value.blur}
            onChange={(blur) => onChange({ ...value, blur })}
            min={0}
            max={50}
            step={1}
            unit="px"
          />
        </div>
      )}
    </div>
  );
};
