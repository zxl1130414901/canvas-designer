import React from 'react';
import { PropertyInput, PropertyColor, PropertySelect } from '../shared';
import { PropertySection } from '../shared';

interface BorderPropertyPanelProps {
  component: any;
  onUpdate: (updates: any) => void;
}

/**
 * Border component properties panel
 */
export const BorderPropertyPanel: React.FC<BorderPropertyPanelProps> = ({ component, onUpdate }) => {
  const data = component.data || {};

  return (
    <PropertySection title="边框属性">
      <PropertyColor
        label="边框颜色"
        value={typeof data.borderColor === 'string' ? data.borderColor : '#000000'}
        onChange={(v) => onUpdate({ data: { ...data, borderColor: v } })}
      />
      <div className="property-grid">
        <PropertyInput
          label="边框宽度"
          value={typeof data.borderWidth === 'number' ? data.borderWidth : 2}
          onChange={(v) => onUpdate({ data: { ...data, borderWidth: Number(v) } })}
          type="number"
          min={1}
          max={20}
        />
        <PropertyInput
          label="圆角"
          value={typeof data.cornerRadius === 'number' ? data.cornerRadius : 8}
          onChange={(v) => onUpdate({ data: { ...data, cornerRadius: Number(v) } })}
          type="number"
          min={0}
          max={50}
        />
      </div>
      <PropertySelect
        label="样式"
        value={typeof data.style === 'string' ? data.style : 'solid'}
        options={[
          { value: 'solid', label: '实线' },
          { value: 'dashed', label: '虚线' },
          { value: 'dotted', label: '点线' },
          { value: 'double', label: '双线' },
        ]}
        onChange={(v) => onUpdate({ data: { ...data, style: String(v) as any } })}
      />
      <PropertySelect
        label="位置"
        value={typeof data.position === 'string' ? data.position : 'center'}
        options={[
          { value: 'inside', label: '内部' },
          { value: 'center', label: '中心' },
          { value: 'outside', label: '外部' },
        ]}
        onChange={(v) => onUpdate({ data: { ...data, position: String(v) as any } })}
      />
    </PropertySection>
  );
};
