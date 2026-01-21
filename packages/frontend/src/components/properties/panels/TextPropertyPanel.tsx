import React from 'react';
import {
  PropertySlider,
  PropertySelect,
  PropertyColor,
  PropertyTextArea,
  PresetGrid,
  ColorPresets,
  ToggleGroup,
  ShadowControl,
  GlowControl,
  GradientControl,
} from '../shared';
import type { PresetOption } from '../shared/PresetGrid';
import { isTextComponent } from '../../../types/guards';

interface TextPropertyPanelProps {
  component: any;
  onUpdate: (updates: any) => void;
}

// Extended font options
const fontOptions = [
  { value: 'Inter', label: 'Inter' },
  { value: 'Arial', label: 'Arial' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Microsoft YaHei', label: '微软雅黑' },
  { value: 'PingFang SC', label: '苹方' },
  { value: 'Source Han Sans CN', label: '思源黑体' },
  { value: 'Noto Sans SC', label: 'Noto Sans SC' },
  { value: 'Zcool KuaiLe', label: '站酷快乐体' },
  { value: 'Ma Shan Zheng', label: '马善政毛笔' },
];

// Extended font weight options
const fontWeightOptions = [
  { value: 'thin', label: '细体' },
  { value: 'light', label: '轻体' },
  { value: 'normal', label: '正常' },
  { value: 'medium', label: '中等' },
  { value: 'semibold', label: '半粗' },
  { value: 'bold', label: '粗体' },
  { value: 'extrabold', label: '特粗' },
];

// Preset styles
const presetOptions: PresetOption[] = [
  {
    id: 'title',
    label: '主标题',
    preview: '主标题',
    config: { fontSize: 36, fontWeight: 'bold', textAlign: 'center' },
  },
  {
    id: 'subtitle',
    label: '副标题',
    preview: '副标题',
    config: { fontSize: 24, fontWeight: 'medium', textAlign: 'center' },
  },
  {
    id: 'body',
    label: '正文',
    preview: '正文内容',
    config: { fontSize: 16, fontWeight: 'normal', textAlign: 'left' },
  },
  {
    id: 'caption',
    label: '标注',
    preview: '标注文字',
    config: { fontSize: 12, fontWeight: 'normal', textAlign: 'left', color: '#94a3b8' },
  },
  {
    id: 'emphasis',
    label: '强调',
    preview: '强调文字',
    config: { fontSize: 18, fontWeight: 'bold', textAlign: 'left', color: '#ff6b35' },
  },
];

// Toggle options for alignment
const alignOptions = [
  { id: 'left', label: '左', icon: '⬅' },
  { id: 'center', label: '中', icon: '⏸' },
  { id: 'right', label: '右', icon: '➡' },
];

// Toggle options for decoration
const decorationOptions = [
  { value: 'none', label: '无' },
  { value: 'underline', label: '下划线' },
  { value: 'line-through', label: '删除线' },
];

/**
 * Beautiful Text Property Panel
 */
export const TextPropertyPanel: React.FC<TextPropertyPanelProps> = ({
  component,
  onUpdate,
}) => {
  if (!isTextComponent(component)) {
    return null;
  }

  const data = component.data || {};

  // Safe value access with fallbacks
  const text = typeof data.text === 'string' ? data.text : '';
  const fontSize = typeof data.fontSize === 'number' ? data.fontSize : 24;
  const lineHeight = typeof data.lineHeight === 'number' ? data.lineHeight : 1.5;
  const fontFamily = typeof data.fontFamily === 'string' ? data.fontFamily : 'Inter';
  const fontWeight = typeof data.fontWeight === 'string' ? data.fontWeight : 'normal';
  const fontStyle = typeof data.fontStyle === 'string' ? data.fontStyle : 'normal';
  const textDecoration = typeof data.textDecoration === 'string' ? data.textDecoration : 'none';
  const color = typeof data.color === 'string' ? data.color : '#333333';
  const textAlign = typeof data.textAlign === 'string' ? data.textAlign : 'left';
  const letterSpacing = typeof data.letterSpacing === 'number' ? data.letterSpacing : 0;

  // Shadow config
  const textShadow = data.textShadow || { enabled: false, color: '#000000', offsetX: 2, offsetY: 2, blur: 4 };
  // Glow config
  const textGlow = data.textGlow || { enabled: false, color: '#ff6b35', blur: 10 };
  // Gradient config
  const textGradient = data.textGradient || { enabled: false, colors: ['#ff6b35', '#f7c531'] as [string, string], direction: 'horizontal' as const };

  // Handle preset selection
  const handlePresetSelect = (preset: PresetOption) => {
    onUpdate({
      data: {
        ...data,
        ...preset.config,
        // Keep color and fontFamily from current settings
        fontFamily,
        color,
      },
    });
  };

  return (
    <div className="text-property-panel-enhanced">
      {/* 🎨 Preset Styles */}
      <div className="panel-section preset-section">
        <div className="section-header">
          <span className="section-icon">🎨</span>
          <span className="section-title">预设样式</span>
        </div>
        <PresetGrid
          presets={presetOptions}
          onSelect={handlePresetSelect}
          columns={5}
        />
      </div>

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
          placeholder="输入文本内容..."
          rows={3}
        />
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

        <div className="property-row property-row-2">
          <PropertySelect
            label="字重"
            value={fontWeight}
            options={fontWeightOptions}
            onChange={(v) => onUpdate({ data: { ...data, fontWeight: String(v) as any } })}
          />
          <PropertySelect
            label="样式"
            value={fontStyle}
            options={[
              { value: 'normal', label: '常规' },
              { value: 'italic', label: '斜体' },
            ]}
            onChange={(v) => onUpdate({ data: { ...data, fontStyle: String(v) as any } })}
          />
        </div>

        <div className="property-row">
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
          <span className="section-title">尺寸调整</span>
        </div>

        <PropertySlider
          label="字号"
          value={fontSize}
          onChange={(v) => onUpdate({ data: { ...data, fontSize: v } })}
          min={8}
          max={120}
          step={1}
          unit="px"
          presets={[12, 16, 24, 32, 48, 64]}
        />

        <PropertySlider
          label="行高"
          value={lineHeight}
          onChange={(v) => onUpdate({ data: { ...data, lineHeight: v } })}
          min={1.0}
          max={3.0}
          step={0.1}
          presets={[1.0, 1.2, 1.5, 1.8, 2.0]}
        />

        <PropertySlider
          label="字间距"
          value={letterSpacing}
          onChange={(v) => onUpdate({ data: { ...data, letterSpacing: v } })}
          min={-5}
          max={20}
          step={0.5}
          unit="px"
          presets={[-2, 0, 2, 4, 8]}
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
          value={color}
          onChange={(v) => onUpdate({ data: { ...data, color: String(v) } })}
        />

        <div className="color-inputs">
          <PropertyColor
            label="文本色"
            value={color}
            onChange={(v) => onUpdate({ data: { ...data, color: String(v) } })}
          />
          <PropertyColor
            label="背景色"
            value={data.backgroundColor || 'transparent'}
            onChange={(v) => {
              const newColor = v === 'transparent' ? undefined : String(v);
              onUpdate({ data: { ...data, backgroundColor: newColor } });
            }}
          />
        </div>
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
          value={textShadow}
          onChange={(shadow) => onUpdate({ data: { ...data, textShadow: shadow } })}
        />

        <GlowControl
          label="发光"
          value={textGlow}
          onChange={(glow) => onUpdate({ data: { ...data, textGlow: glow } })}
        />

        <GradientControl
          label="渐变"
          value={textGradient}
          onChange={(gradient) => onUpdate({ data: { ...data, textGradient: gradient } })}
        />
      </div>
    </div>
  );
};
