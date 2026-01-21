import React from 'react';
import {
  PropertyTextArea,
  PropertySlider,
  PropertySelect,
  PropertyColor,
  ColorPresets,
  ToggleGroup,
  ShadowControl,
  GlowControl,
  GradientControl,
} from '../shared';

interface TagPropertyPanelProps {
  component: any;
  onUpdate: (updates: any) => void;
}

// Font options
const fontOptions = [
  { value: 'Inter', label: 'Inter' },
  { value: 'Arial', label: 'Arial' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Microsoft YaHei', label: '微软雅黑' },
  { value: 'PingFang SC', label: '苹方' },
  { value: 'Source Han Sans CN', label: '思源黑体' },
];

// Toggle options for alignment
const alignOptions = [
  { id: 'left', label: '左', icon: '⬅' },
  { id: 'center', label: '中', icon: '⏸' },
  { id: 'right', label: '右', icon: '➡' },
];

// Toggle options for text decoration
const decorationOptions = [
  { value: 'none', label: '无' },
  { value: 'underline', label: '下划线' },
  { value: 'line-through', label: '删除线' },
];

/**
 * Enhanced Tag Property Panel with modern UI and advanced features
 */
export const TagPropertyPanel: React.FC<TagPropertyPanelProps> = ({ component, onUpdate }) => {
  const data = component.data || {};

  // Safe value access with fallbacks
  const text = typeof data.text === 'string' ? data.text : '';
  const fontSize = typeof data.fontSize === 'number' ? data.fontSize : 14;
  const padding = typeof data.padding === 'number' ? data.padding : 8;
  const borderRadius = typeof data.borderRadius === 'number' ? data.borderRadius : 4;
  const borderWidth = typeof data.borderWidth === 'number' ? data.borderWidth : 1;
  const fontFamily = typeof data.fontFamily === 'string' ? data.fontFamily : 'Inter';
  const fontStyle = typeof data.fontStyle === 'string' ? data.fontStyle : 'normal';
  const textDecoration = typeof data.textDecoration === 'string' ? data.textDecoration : 'none';
  const backgroundColor = typeof data.backgroundColor === 'string' ? data.backgroundColor : '#000000';
  const textColor = typeof data.textColor === 'string' ? data.textColor : '#ffffff';
  const borderColor = typeof data.borderColor === 'string' ? data.borderColor : '#000000';
  const variant = typeof data.variant === 'string' ? data.variant : 'pill';
  const borderStyle = typeof data.borderStyle === 'string' ? data.borderStyle : 'solid';
  const textAlign = typeof data.textAlign === 'string' ? data.textAlign : 'center';

  // Shadow config
  const shadowConfig = data.shadowConfig || { enabled: false, color: '#000000', offsetX: 2, offsetY: 2, blur: 4 };
  // Glow config
  const glowConfig = data.glowConfig || { enabled: false, color: '#ff6b35', blur: 10 };
  // Gradient config
  const gradientConfig = data.gradientConfig || {
    enabled: false,
    colors: ['#ff6b35', '#f7c531'] as [string, string],
    direction: 'horizontal' as const,
    splitPoint: 50,
  };

  return (
    <div className="tag-property-panel-enhanced">
      {/* 📝 Content */}
      <div className="panel-section content-section">
        <div className="section-header">
          <span className="section-icon">📝</span>
          <span className="section-title">文本内容</span>
        </div>
        <PropertyTextArea
          label="内容"
          value={text}
          onChange={(v) => onUpdate({ data: { ...data, text: v } })}
          placeholder="输入标签文本..."
          rows={2}
        />
      </div>

      {/* 🎨 Colors */}
      <div className="panel-section colors-section">
        <div className="section-header">
          <span className="section-icon">🎨</span>
          <span className="section-title">颜色设置</span>
        </div>

        <ColorPresets
          label="常用颜色"
          value={textColor}
          onChange={(v) => onUpdate({ data: { ...data, textColor: String(v) } })}
        />

        <div className="color-inputs">
          <PropertyColor
            label="背景色"
            value={backgroundColor}
            onChange={(v) => onUpdate({ data: { ...data, backgroundColor: String(v) } })}
          />
          <PropertyColor
            label="文字色"
            value={textColor}
            onChange={(v) => onUpdate({ data: { ...data, textColor: String(v) } })}
          />
          <PropertyColor
            label="边框色"
            value={borderColor}
            onChange={(v) => onUpdate({ data: { ...data, borderColor: String(v) } })}
          />
        </div>
      </div>

      {/* 🔤 Typography */}
      <div className="panel-section typography-section">
        <div className="section-header">
          <span className="section-icon">🔤</span>
          <span className="section-title">字体排版</span>
        </div>

        <div className="property-row">
          <PropertySelect
            label="字体"
            value={fontFamily}
            options={fontOptions}
            onChange={(v) => onUpdate({ data: { ...data, fontFamily: String(v) } })}
          />
        </div>

        <PropertySlider
          label="字号"
          value={fontSize}
          onChange={(v) => onUpdate({ data: { ...data, fontSize: v } })}
          min={8}
          max={48}
          step={1}
          unit="px"
          presets={[10, 12, 14, 16, 20, 24, 32]}
        />

        <div className="property-row property-row-2">
          <PropertySelect
            label="样式"
            value={fontStyle}
            options={[
              { value: 'normal', label: '常规' },
              { value: 'italic', label: '斜体' },
            ]}
            onChange={(v) => onUpdate({ data: { ...data, fontStyle: String(v) as any } })}
          />
          <PropertySelect
            label="装饰"
            value={textDecoration}
            options={decorationOptions}
            onChange={(v) => onUpdate({ data: { ...data, textDecoration: String(v) as any } })}
          />
        </div>
      </div>

      {/* 📐 Size Controls */}
      <div className="panel-section size-section">
        <div className="section-header">
          <span className="section-icon">📐</span>
          <span className="section-title">尺寸形状</span>
        </div>

        <PropertySelect
          label="形状样式"
          value={variant}
          options={[
            { value: 'pill', label: '胶囊' },
            { value: 'rounded', label: '圆角' },
            { value: 'square', label: '方形' },
          ]}
          onChange={(v) => onUpdate({ data: { ...data, variant: String(v) as any } })}
        />

        <PropertySlider
          label="内边距"
          value={padding}
          onChange={(v) => onUpdate({ data: { ...data, padding: v } })}
          min={2}
          max={32}
          step={1}
          unit="px"
          presets={[4, 6, 8, 12, 16, 24]}
        />

        <PropertySlider
          label="圆角半径"
          value={borderRadius}
          onChange={(v) => onUpdate({ data: { ...data, borderRadius: v } })}
          min={0}
          max={50}
          step={1}
          unit="px"
          presets={[0, 2, 4, 8, 16, 24]}
        />

        <PropertySlider
          label="边框宽度"
          value={borderWidth}
          onChange={(v) => onUpdate({ data: { ...data, borderWidth: v } })}
          min={0}
          max={10}
          step={0.5}
          unit="px"
          presets={[0, 1, 2, 3, 4]}
        />

        <PropertySelect
          label="边框样式"
          value={borderStyle}
          options={[
            { value: 'solid', label: '实线' },
            { value: 'dashed', label: '虚线' },
            { value: 'dotted', label: '点线' },
          ]}
          onChange={(v) => onUpdate({ data: { ...data, borderStyle: String(v) as any } })}
        />
      </div>

      {/* ↔️ Alignment */}
      <div className="panel-section alignment-section">
        <div className="section-header">
          <span className="section-icon">↔️</span>
          <span className="section-title">对齐方式</span>
        </div>
        <ToggleGroup
          value={textAlign}
          options={alignOptions}
          onChange={(v) => onUpdate({ data: { ...data, textAlign: String(v) as any } })}
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
          value={shadowConfig}
          onChange={(shadow) => onUpdate({ data: { ...data, shadowConfig: shadow } })}
        />

        <GlowControl
          label="发光"
          value={glowConfig}
          onChange={(glow) => onUpdate({ data: { ...data, glowConfig: glow } })}
        />

        <GradientControl
          label="背景渐变"
          value={gradientConfig}
          onChange={(gradient) => onUpdate({ data: { ...data, gradientConfig: gradient } })}
        />
      </div>
    </div>
  );
};
