import React from 'react';
import { PropertySlider, PropertyColor } from '../shared';

export interface ShadowConfig {
  enabled: boolean;
  color: string;
  offsetX: number;
  offsetY: number;
  blur: number;
}

interface ShadowControlProps {
  label?: string;
  value: ShadowConfig;
  onChange: (value: ShadowConfig) => void;
}

const defaultShadow: ShadowConfig = {
  enabled: false,
  color: '#000000',
  offsetX: 2,
  offsetY: 2,
  blur: 4,
};

/**
 * Shadow control component
 * Controls text shadow effects
 */
export const ShadowControl: React.FC<ShadowControlProps> = ({
  label = '阴影',
  value = defaultShadow,
  onChange,
}) => {
  const handleToggle = () => {
    onChange({ ...value, enabled: !value.enabled });
  };

  return (
    <div className={`shadow-control ${value.enabled ? 'enabled' : ''}`}>
      <div className="shadow-header">
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
        <div className="shadow-content">
          <PropertyColor
            label="颜色"
            value={value.color}
            onChange={(color) => onChange({ ...value, color })}
          />
          <PropertySlider
            label="X偏移"
            value={value.offsetX}
            onChange={(offsetX) => onChange({ ...value, offsetX })}
            min={-20}
            max={20}
            step={1}
            unit="px"
          />
          <PropertySlider
            label="Y偏移"
            value={value.offsetY}
            onChange={(offsetY) => onChange({ ...value, offsetY })}
            min={-20}
            max={20}
            step={1}
            unit="px"
          />
          <PropertySlider
            label="模糊度"
            value={value.blur}
            onChange={(blur) => onChange({ ...value, blur })}
            min={0}
            max={30}
            step={1}
            unit="px"
          />
        </div>
      )}
    </div>
  );
};
