import React from 'react';
import { PropertyColor, PropertySelect } from '../shared';

export interface GradientConfig {
  enabled: boolean;
  colors: [string, string];
  direction: 'horizontal' | 'vertical' | 'diagonal';
}

interface GradientControlProps {
  label?: string;
  value: GradientConfig;
  onChange: (value: GradientConfig) => void;
}

const defaultGradient: GradientConfig = {
  enabled: false,
  colors: ['#ff6b35', '#f7c531'],
  direction: 'horizontal',
};

/**
 * Gradient control component
 * Controls text gradient effects
 */
export const GradientControl: React.FC<GradientControlProps> = ({
  label = '渐变',
  value = defaultGradient,
  onChange,
}) => {
  const handleToggle = () => {
    onChange({ ...value, enabled: !value.enabled });
  };

  return (
    <div className={`gradient-control ${value.enabled ? 'enabled' : ''}`}>
      <div className="gradient-header">
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
        <div className="gradient-content">
          <div className="gradient-preview">
            <div
              className="gradient-preview-text"
              style={{
                background: `linear-gradient(${value.direction === 'horizontal' ? '90deg' : value.direction === 'vertical' ? '180deg' : '135deg'}, ${value.colors[0]}, ${value.colors[1]})`,
              }}
            >
              渐变预览
            </div>
          </div>

          <PropertyColor
            label="起始色"
            value={value.colors[0]}
            onChange={(color) => onChange({ ...value, colors: [color, value.colors[1]] })}
          />
          <PropertyColor
            label="结束色"
            value={value.colors[1]}
            onChange={(color) => onChange({ ...value, colors: [value.colors[0], color] })}
          />
          <PropertySelect
            label="方向"
            value={value.direction}
            options={[
              { value: 'horizontal', label: '水平' },
              { value: 'vertical', label: '垂直' },
              { value: 'diagonal', label: '对角' },
            ]}
            onChange={(v) => onChange({ ...value, direction: v as any })}
          />
        </div>
      )}
    </div>
  );
};
