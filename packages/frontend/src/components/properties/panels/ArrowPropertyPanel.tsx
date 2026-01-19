import React from 'react';
import { PropertyInput, PropertyColor, PropertyRange, PropertySelect, PropertyCheckbox } from '../shared';
import { PropertySection } from '../shared';

interface ArrowPropertyPanelProps {
  component: any;
  onUpdate: (updates: any) => void;
}

/**
 * Arrow component properties panel
 */
export const ArrowPropertyPanel: React.FC<ArrowPropertyPanelProps> = ({ component, onUpdate }) => {
  const data = component.data || {};

  return (
    <PropertySection title="箭头属性">
      <PropertyColor
        label="线条颜色"
        value={typeof data.strokeColor === 'string' ? data.strokeColor : '#000000'}
        onChange={(v) => onUpdate({ data: { ...data, strokeColor: v } })}
      />
      <div className="property-grid">
        <PropertyInput
          label="线条宽度"
          value={typeof data.strokeWidth === 'number' ? data.strokeWidth : 2}
          onChange={(v) => onUpdate({ data: { ...data, strokeWidth: Number(v) } })}
          type="number"
        />
        <PropertyInput
          label="箭头长度"
          value={typeof data.pointerLength === 'number' ? data.pointerLength : 10}
          onChange={(v) => onUpdate({ data: { ...data, pointerLength: Number(v) } })}
          type="number"
        />
        <PropertyInput
          label="箭头宽度"
          value={typeof data.pointerWidth === 'number' ? data.pointerWidth : 10}
          onChange={(v) => onUpdate({ data: { ...data, pointerWidth: Number(v) } })}
          type="number"
        />
      </div>
      <PropertySelect
        label="方向"
        value={typeof data.direction === 'string' ? data.direction : 'right'}
        options={[
          { value: 'up', label: '向上' },
          { value: 'down', label: '向下' },
          { value: 'left', label: '向左' },
          { value: 'right', label: '向右' },
        ]}
        onChange={(v) => onUpdate({ data: { ...data, direction: String(v) as any } })}
      />
      <PropertyRange
        label="长度"
        value={typeof data.lineLength === 'number' ? data.lineLength : 100}
        min={10}
        max={500}
        onChange={(v) => onUpdate({ data: { ...data, lineLength: Number(v) } })}
      />
      <PropertyRange
        label="曲率"
        value={typeof data.curvature === 'number' ? data.curvature : 0}
        min={-50}
        max={50}
        onChange={(v) => onUpdate({ data: { ...data, curvature: Number(v) } })}
      />
      <PropertySelect
        label="样式"
        value={typeof data.arrowStyle === 'string' ? data.arrowStyle : 'standard'}
        options={[
          { value: 'standard', label: '标准' },
          { value: 'filled', label: '填充' },
          { value: 'outlined', label: '轮廓' },
        ]}
        onChange={(v) => onUpdate({ data: { ...data, arrowStyle: String(v) as any } })}
      />
      <PropertyCheckbox
        label="双箭头"
        checked={typeof data.doubleEnded === 'boolean' ? data.doubleEnded : false}
        onChange={(v) => onUpdate({ data: { ...data, doubleEnded: v } })}
      />
    </PropertySection>
  );
};
