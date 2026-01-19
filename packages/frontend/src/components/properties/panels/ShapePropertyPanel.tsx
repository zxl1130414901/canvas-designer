import React from 'react';
import { PropertyInput, PropertyColor, PropertySelect } from '../shared';
import { PropertySection } from '../shared';

interface ShapePropertyPanelProps {
  component: any;
  onUpdate: (updates: any) => void;
}

/**
 * Shape component properties panel
 * Handles rectangle, circle, and line shapes
 */
export const ShapePropertyPanel: React.FC<ShapePropertyPanelProps> = ({ component, onUpdate }) => {
  const data = component.data || {};

  return (
    <PropertySection title="形状属性">
      <PropertyColor
        label="填充颜色"
        value={typeof data.fillColor === 'string' ? data.fillColor : '#000000'}
        onChange={(v) => onUpdate({ data: { ...data, fillColor: v } })}
      />
      <PropertyColor
        label="边框颜色"
        value={typeof data.borderColor === 'string' ? data.borderColor : '#000000'}
        onChange={(v) => onUpdate({ data: { ...data, borderColor: v } })}
      />
      <div className="property-grid">
        <PropertyInput
          label="边框宽度"
          value={typeof data.borderWidth === 'number' ? data.borderWidth : 1}
          onChange={(v) => onUpdate({ data: { ...data, borderWidth: Number(v) } })}
          type="number"
        />
        <PropertyInput
          label="圆角"
          value={typeof data.borderRadius === 'number' ? data.borderRadius : 0}
          onChange={(v) => onUpdate({ data: { ...data, borderRadius: Number(v) } })}
          type="number"
        />
      </div>
      <PropertySelect
        label="边框样式"
        value={typeof data.borderStyle === 'string' ? data.borderStyle : 'solid'}
        options={[
          { value: 'solid', label: '实线' },
          { value: 'dashed', label: '虚线' },
          { value: 'dotted', label: '点线' },
        ]}
        onChange={(v) => onUpdate({ data: { ...data, borderStyle: String(v) as any } })}
      />
    </PropertySection>
  );
};
