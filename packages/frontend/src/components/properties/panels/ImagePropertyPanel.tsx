import React from 'react';
import { PropertyInput, PropertyColor, PropertySelect } from '../shared';
import { PropertySection } from '../shared';

interface ImagePropertyPanelProps {
  component: any;
  onUpdate: (updates: any) => void;
}

/**
 * Image component properties panel
 */
export const ImagePropertyPanel: React.FC<ImagePropertyPanelProps> = ({ component, onUpdate }) => {
  const data = component.data || {};

  return (
    <PropertySection title="图片属性">
      <PropertyInput
        label="图片URL"
        value={typeof data.src === 'string' ? data.src : ''}
        onChange={(v) => onUpdate({ data: { ...data, src: v } })}
        type="text"
        placeholder="https://example.com/image.jpg"
      />
      <div className="property-grid">
        <PropertyInput
          label="占位文字"
          value={typeof data.placeholderText === 'string' ? data.placeholderText : '点击上传图片'}
          onChange={(v) => onUpdate({ data: { ...data, placeholderText: v } })}
          type="text"
        />
        <PropertyColor
          label="占位颜色"
          value={typeof data.placeholderColor === 'string' ? data.placeholderColor : 'rgba(59, 130, 246, 0.2)'}
          onChange={(v) => onUpdate({ data: { ...data, placeholderColor: v } })}
        />
      </div>
      <PropertySelect
        label="填充方式"
        value={typeof data.objectFit === 'string' ? data.objectFit : 'cover'}
        options={[
          { value: 'cover', label: '覆盖' },
          { value: 'contain', label: '包含' },
          { value: 'fill', label: '拉伸' },
        ]}
        onChange={(v) => onUpdate({ data: { ...data, objectFit: String(v) as any } })}
      />
      <PropertyInput
        label="圆角"
        value={typeof data.cornerRadius === 'number' ? data.cornerRadius : 0}
        onChange={(v) => onUpdate({ data: { ...data, cornerRadius: Number(v) } })}
        type="number"
        min={0}
        max={100}
      />
    </PropertySection>
  );
};
