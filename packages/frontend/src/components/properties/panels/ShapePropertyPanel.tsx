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

interface ShapePropertyPanelProps {
  component: any;
  onUpdate: (updates: any) => void;
}

// Shape preset styles
const shapePresets: PresetOption[] = [
  {
    id: 'solid',
    label: '实心',
    preview: '■',
    config: { fillColor: '#ff6b35', borderColor: '#000000', borderWidth: 0, borderRadius: 0 },
  },
  {
    id: 'outline',
    label: '轮廓',
    preview: '□',
    config: { fillColor: 'transparent', borderColor: '#333333', borderWidth: 2, borderRadius: 0 },
  },
  {
    id: 'rounded',
    label: '圆角',
    preview: '▢',
    config: { fillColor: '#4f46e5', borderColor: '#000000', borderWidth: 0, borderRadius: 16 },
  },
  {
    id: 'card',
    label: '卡片',
    preview: '▣',
    config: { fillColor: '#1a1a3e', borderColor: '#6366f1', borderWidth: 1, borderRadius: 12 },
  },
  {
    id: 'badge',
    label: '徽章',
    preview: '▭',
    config: { fillColor: '#f7c531', borderColor: '#000000', borderWidth: 0, borderRadius: 8 },
  },
];

// Border style options with visual preview
const borderStyleOptions = [
  { value: 'solid', label: '实线 ____' },
  { value: 'dashed', label: '虚线 - - -' },
  { value: 'dotted', label: '点线 . . .' },
];

/**
 * Enhanced Shape Property Panel with section-based organization
 */
export const ShapePropertyPanel: React.FC<ShapePropertyPanelProps> = ({
  component,
  onUpdate,
}) => {
  const data = component.data || {};

  // Safe value access with fallbacks
  const fillColor = typeof data.fillColor === 'string' ? data.fillColor : '#ff6b35';
  const borderColor = typeof data.borderColor === 'string' ? data.borderColor : '#000000';
  const borderWidth = typeof data.borderWidth === 'number' ? data.borderWidth : 1;
  const borderRadius = typeof data.borderRadius === 'number' ? data.borderRadius : 0;
  const borderStyle = typeof data.borderStyle === 'string' ? data.borderStyle : 'solid';

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
    color: '#ff8c5a',
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
    <div className="shape-property-panel-enhanced">
      {/* 🎨 Preset Styles */}
      <div className="panel-section preset-section">
        <div className="section-header">
          <span className="section-icon">🎨</span>
          <span className="section-title">预设样式</span>
        </div>
        <PresetGrid
          presets={shapePresets}
          onSelect={handlePresetSelect}
          columns={5}
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
          label="圆角"
          value={borderRadius}
          onChange={(v) => onUpdate({ data: { ...data, borderRadius: v } })}
          min={0}
          max={100}
          step={1}
          unit="px"
          presets={[0, 4, 8, 16, 24, 32, 48]}
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
    </div>
  );
};
