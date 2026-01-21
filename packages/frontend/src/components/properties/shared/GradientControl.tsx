import React, { useState, useCallback, useMemo } from 'react';
import { PropertySelect } from '../shared';

export interface GradientConfig {
  enabled: boolean;
  colors: [string, string];
  direction: 'horizontal' | 'vertical' | 'diagonal';
  splitPoint?: number; // 渐变分割点 0-100
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
  splitPoint: 50,
};

/**
 * Interactive gradient control with position slider
 * Slider adjusts the gradient split point, colors remain fixed
 */
export const GradientControl: React.FC<GradientControlProps> = ({
  label = '渐变',
  value = defaultGradient,
  onChange,
}) => {
  // 渐变分割点（0-100），从value初始化
  const [splitPoint, setSplitPoint] = useState(value.splitPoint ?? 50);

  // 渐变方向对应的CSS角度
  const getGradientAngle = useCallback(() => {
    switch (value.direction) {
      case 'vertical': return '180deg';
      case 'diagonal': return '135deg';
      default: return '90deg';
    }
  }, [value.direction]);

  // 计算分割后的渐变背景
  const gradientBackground = useMemo(() => {
    return `linear-gradient(${getGradientAngle()}, ${value.colors[0]} ${splitPoint}%, ${value.colors[1]} 100%)`;
  }, [getGradientAngle, value.colors, splitPoint]);

  // 处理滑块变化
  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setSplitPoint(newValue);
    onChange({ ...value, splitPoint: newValue });
  }, [value, onChange]);

  const handleToggle = useCallback(() => {
    onChange({ ...value, enabled: !value.enabled });
  }, [value, onChange]);

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

      <div className="gradient-content">
        {/* 渐变预览块 - 显示当前渐变效果 */}
        <div className="gradient-preview-section">
          <label className="preview-label">渐变预览</label>
          <div className="gradient-preview-block">
            <div 
              className="gradient-preview-bg"
              style={{ background: gradientBackground }}
            />
            {/* 分割点标记 */}
            <div 
              className="split-point-marker"
              style={{ left: `${splitPoint}%` }}
            >
              <div className="marker-line" />
              <span className="marker-label">{splitPoint}%</span>
            </div>
          </div>
        </div>

        {/* 颜色分割点滑块 */}
        <div className="slider-section">
          <div className="slider-header">
            <span className="slider-label">颜色位置</span>
            <span className="slider-value">{splitPoint}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={splitPoint}
            onChange={handleSliderChange}
            className="gradient-slider"
            style={{
              '--start-color': value.colors[0],
              '--end-color': value.colors[1],
            } as React.CSSProperties}
          />
          <div className="slider-labels">
            <span>起始色</span>
            <span>结束色</span>
          </div>
        </div>

        {/* 起始颜色 */}
        <div className="color-input-row">
          <span className="color-label">起始</span>
          <input
            type="color"
            value={value.colors[0]}
            onChange={(e) => onChange({ ...value, colors: [e.target.value, value.colors[1]] })}
            className="color-picker-input"
          />
          <span className="color-value">{value.colors[0]}</span>
        </div>

        {/* 结束颜色 */}
        <div className="color-input-row">
          <span className="color-label">结束</span>
          <input
            type="color"
            value={value.colors[1]}
            onChange={(e) => onChange({ ...value, colors: [value.colors[0], e.target.value] })}
            className="color-picker-input"
          />
          <span className="color-value">{value.colors[1]}</span>
        </div>

        {/* 快速颜色 */}
        <div className="quick-colors">
          {['#ff6b35', '#f7c531', '#8b5cf6', '#06b6d4', '#10b981', '#ec4899'].map((color) => (
            <button
              key={color}
              type="button"
              className={`quick-color-btn ${value.colors.includes(color) ? 'active' : ''}`}
              style={{ background: color }}
              onClick={() => {
                if (value.colors.includes(color)) {
                  const newColors = value.colors.filter(c => c !== color);
                  onChange({ ...value, colors: [newColors[0] || '#ffffff', newColors[1] || '#ffffff'] });
                } else {
                  onChange({ ...value, colors: [value.colors[0], color] });
                }
              }}
            />
          ))}
        </div>

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
    </div>
  );
};
