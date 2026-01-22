import React from 'react';
import {
  PropertySlider,
  PropertySelect,
  PropertyColor,
  PresetGrid,
  ColorPresets,
  ShadowControl,
  GlowControl,
  GradientControl,
} from '../shared';
import type { PresetOption } from '../shared/PresetGrid';

interface TrianglePropertyPanelProps {
  component: any;
  onUpdate: (updates: any) => void;
}

// Triangle preset styles with enhanced effects
const trianglePresets: PresetOption[] = [
  {
    id: 'solid-up',
    label: '实心向上',
    preview: '▲',
    config: {
      fillColor: '#ff6b35',
      borderColor: '#000000',
      borderWidth: 0,
      borderStyle: 'solid',
      fillGradient: { enabled: false, colors: ['#ff6b35', '#f7c531'], direction: 'horizontal' },
      shadow: { enabled: false, color: '#000000', offsetX: 2, offsetY: 2, blur: 4 },
      glow: { enabled: false, color: '#ff6b35', blur: 10 },
      opacity: 1,
      direction: 'up',
    },
  },
  {
    id: 'solid-down',
    label: '实心向下',
    preview: '▼',
    config: {
      fillColor: '#4f46e5',
      borderColor: '#000000',
      borderWidth: 0,
      borderStyle: 'solid',
      fillGradient: { enabled: false, colors: ['#4f46e5', '#06b6d4'], direction: 'horizontal' },
      shadow: { enabled: false, color: '#000000', offsetX: 2, offsetY: 2, blur: 4 },
      glow: { enabled: false, color: '#4f46e5', blur: 10 },
      opacity: 1,
      direction: 'down',
    },
  },
  {
    id: 'outline-up',
    label: '轮廓向上',
    preview: '△',
    config: {
      fillColor: 'transparent',
      borderColor: '#333333',
      borderWidth: 2,
      borderStyle: 'solid',
      fillGradient: { enabled: false, colors: ['#ff6b35', '#f7c531'], direction: 'horizontal' },
      shadow: { enabled: false, color: '#000000', offsetX: 2, offsetY: 2, blur: 4 },
      glow: { enabled: false, color: '#ff6b35', blur: 10 },
      opacity: 1,
      direction: 'up',
    },
  },
  {
    id: 'gradient-tech',
    label: '科技渐变',
    preview: '▴',
    config: {
      fillColor: '#8b5cf6',
      borderColor: '#000000',
      borderWidth: 0,
      borderStyle: 'solid',
      fillGradient: { enabled: true, colors: ['#8b5cf6', '#06b6d4'], direction: 'diagonal', splitPoint: 50 },
      shadow: { enabled: false, color: '#000000', offsetX: 2, offsetY: 2, blur: 4 },
      glow: { enabled: false, color: '#8b5cf6', blur: 10 },
      opacity: 1,
      direction: 'up',
    },
  },
  {
    id: 'gradient-warmth',
    label: '温暖渐变',
    preview: '▴',
    config: {
      fillColor: '#f97316',
      borderColor: '#000000',
      borderWidth: 0,
      borderStyle: 'solid',
      fillGradient: { enabled: true, colors: ['#f97316', '#facc15'], direction: 'vertical', splitPoint: 50 },
      shadow: { enabled: false, color: '#000000', offsetX: 2, offsetY: 2, blur: 4 },
      glow: { enabled: false, color: '#f97316', blur: 10 },
      opacity: 1,
      direction: 'up',
    },
  },
  {
    id: 'glow-neon',
    label: '霓虹发光',
    preview: '▲',
    config: {
      fillColor: '#10b981',
      borderColor: '#000000',
      borderWidth: 0,
      borderStyle: 'solid',
      fillGradient: { enabled: false, colors: ['#10b981', '#34d399'], direction: 'horizontal' },
      shadow: { enabled: false, color: '#000000', offsetX: 2, offsetY: 2, blur: 4 },
      glow: { enabled: true, color: '#10b981', blur: 15 },
      opacity: 1,
      direction: 'up',
    },
  },
  {
    id: 'shadow-depth',
    label: '深度阴影',
    preview: '▼',
    config: {
      fillColor: '#1e293b',
      borderColor: '#475569',
      borderWidth: 1,
      borderStyle: 'solid',
      fillGradient: { enabled: false, colors: ['#1e293b', '#334155'], direction: 'horizontal' },
      shadow: { enabled: true, color: '#000000', offsetX: 4, offsetY: 4, blur: 8 },
      glow: { enabled: false, color: '#1e293b', blur: 10 },
      opacity: 1,
      direction: 'down',
    },
  },
  {
    id: 'transparent',
    label: '半透明',
    preview: '▿',
    config: {
      fillColor: '#3b82f6',
      borderColor: '#1d4ed8',
      borderWidth: 2,
      borderStyle: 'solid',
      fillGradient: { enabled: false, colors: ['#3b82f6', '#60a5fa'], direction: 'horizontal' },
      shadow: { enabled: false, color: '#000000', offsetX: 2, offsetY: 2, blur: 4 },
      glow: { enabled: false, color: '#3b82f6', blur: 10 },
      opacity: 0.6,
      direction: 'down',
    },
  },
];

// Border style options with visual preview
const borderStyleOptions = [
  { value: 'solid', label: '实线 ____' },
  { value: 'dashed', label: '虚线 - - -' },
  { value: 'dotted', label: '点线 · · ·' },
];

// Direction options
const directionOptions = [
  { value: 'up', label: '↑ 向上' },
  { value: 'down', label: '↓ 向下' },
  { value: 'left', label: '← 向左' },
  { value: 'right', label: '→ 向右' },
];

/**
 * Enhanced Triangle Property Panel with comprehensive controls
 * Following ShapePropertyPanel architecture with presets, gradients, and effects
 */
export const TrianglePropertyPanel: React.FC<TrianglePropertyPanelProps> = ({
  component,
  onUpdate,
}) => {
  const data = component.data || {};

  // Safe value access with comprehensive fallbacks
  const fillColor = typeof data.fillColor === 'string' ? data.fillColor : '#ff6b35';
  const borderColor = typeof data.borderColor === 'string' ? data.borderColor : '#000000';
  const borderWidth = typeof data.borderWidth === 'number' ? data.borderWidth : 1;
  const borderStyle = typeof data.borderStyle === 'string' ? data.borderStyle : 'solid';
  const radius = typeof data.radius === 'number' ? data.radius : 50;
  const opacity = typeof data.opacity === 'number' ? data.opacity : 1;
  const direction = typeof data.direction === 'string' ? data.direction : 'up';

  // Shadow config (default disabled)
  const shadow = data.shadow || {
    enabled: false,
    color: '#000000',
    offsetX: 2,
    offsetY: 2,
    blur: 4,
  };

  // Glow config (default disabled)
  const glow = data.glow || {
    enabled: false,
    color: '#ff6b35',
    blur: 10,
  };

  // Gradient config (default disabled)
  const fillGradient = data.fillGradient || {
    enabled: false,
    colors: ['#ff6b35', '#f7c531'] as [string, string],
    direction: 'horizontal' as const,
    splitPoint: 50,
  };

  // Handle preset selection
  const handlePresetSelect = (preset: PresetOption) => {
    onUpdate({
      data: {
        ...data,
        ...preset.config,
      },
    });
  };

  return (
    <div className="triangle-property-panel-enhanced">
      {/* 🎨 Preset Styles */}
      <div className="panel-section preset-section">
        <div className="section-header">
          <span className="section-icon">🎨</span>
          <span className="section-title">预设样式</span>
        </div>
        <PresetGrid
          presets={trianglePresets}
          onSelect={handlePresetSelect}
          columns={4}
        />
      </div>

      {/* 🎨 Fill Section */}
      <div className="panel-section fill-section">
        <div className="section-header">
          <span className="section-icon">🎨</span>
          <span className="section-title">填充</span>
        </div>

        <ColorPresets
          label="常用颜色"
          value={fillColor}
          onChange={(v) => onUpdate({ data: { ...data, fillColor: String(v) } })}
        />

        <PropertyColor
          label="填充颜色"
          value={fillColor}
          onChange={(v) => onUpdate({ data: { ...data, fillColor: v } })}
        />

        <GradientControl
          label="填充渐变"
          value={fillGradient}
          onChange={(gradient) => onUpdate({ data: { ...data, fillGradient: gradient } })}
        />
      </div>

      {/* 🖼️ Border Section */}
      <div className="panel-section border-section">
        <div className="section-header">
          <span className="section-icon">🖼️</span>
          <span className="section-title">边框</span>
        </div>

        <ColorPresets
          label="常用颜色"
          value={borderColor}
          onChange={(v) => onUpdate({ data: { ...data, borderColor: String(v) } })}
        />

        <PropertyColor
          label="边框颜色"
          value={borderColor}
          onChange={(v) => onUpdate({ data: { ...data, borderColor: v } })}
        />

        <PropertySlider
          label="边框宽度"
          value={borderWidth}
          onChange={(v) => onUpdate({ data: { ...data, borderWidth: v } })}
          min={0}
          max={20}
          step={0.5}
          unit="px"
          presets={[0, 1, 2, 4, 8, 12, 16]}
        />

        <PropertySlider
          label="半径"
          value={radius}
          onChange={(v) => onUpdate({ data: { ...data, radius: v } })}
          min={0}
          max={200}
          step={1}
          unit="px"
          presets={[0, 25, 50, 75, 100, 150, 200]}
        />

        <PropertySelect
          label="边框样式"
          value={borderStyle}
          options={borderStyleOptions}
          onChange={(v) => onUpdate({ data: { ...data, borderStyle: String(v) as any } })}
        />
      </div>

      {/* ✨ Advanced Effects */}
      <div className="panel-section effects-section">
        <div className="section-header">
          <span className="section-icon">✨</span>
          <span className="section-title">高级效果</span>
        </div>

        <ShadowControl
          label="阴影"
          value={shadow}
          onChange={(shadow) => onUpdate({ data: { ...data, shadow } })}
        />

        <GlowControl
          label="发光"
          value={glow}
          onChange={(glow) => onUpdate({ data: { ...data, glow } })}
        />
      </div>

      {/* 🔧 Other Settings */}
      <div className="panel-section other-section">
        <div className="section-header">
          <span className="section-icon">🔧</span>
          <span className="section-title">其他</span>
        </div>

        <PropertySlider
          label="透明度"
          value={opacity}
          onChange={(v) => onUpdate({ data: { ...data, opacity: v } })}
          min={0}
          max={1}
          step={0.05}
          unit=""
          presets={[0.25, 0.5, 0.75, 1]}
        />

        <PropertySelect
          label="方向"
          value={direction}
          options={directionOptions}
          onChange={(v) => onUpdate({ data: { ...data, direction: String(v) as any } })}
        />
      </div>
    </div>
  );
};
