import React from 'react';
import { PropertyInput, PropertyColor, PropertyCheckbox } from '../shared';
import { PropertySection } from '../shared';

interface DotMarkerPropertyPanelProps {
  component: any;
  onUpdate: (updates: any) => void;
}

/**
 * Dot Marker component properties panel
 */
export const DotMarkerPropertyPanel: React.FC<DotMarkerPropertyPanelProps> = ({ component, onUpdate }) => {
  const data = component.data || {};

  return (
    <PropertySection title="圆点标记属性">
      <PropertyColor
        label="圆点颜色"
        value={typeof data.dotColor === 'string' ? data.dotColor : '#000000'}
        onChange={(v) => onUpdate({ data: { ...data, dotColor: v } })}
      />
      <div className="property-grid">
        <PropertyInput
          label="圆点大小"
          value={typeof data.dotSize === 'number' ? data.dotSize : 10}
          onChange={(v) => onUpdate({ data: { ...data, dotSize: Number(v) } })}
          type="number"
          min={5}
          max={50}
        />
        <PropertyCheckbox
          label="填充"
          checked={typeof data.filled === 'boolean' ? data.filled : true}
          onChange={(v) => onUpdate({ data: { ...data, filled: v } })}
        />
      </div>
      <div className="property-grid">
        <PropertyColor
          label="边框颜色"
          value={typeof data.borderColor === 'string' ? data.borderColor : '#000000'}
          onChange={(v) => onUpdate({ data: { ...data, borderColor: v } })}
        />
        <PropertyInput
          label="边框宽度"
          value={typeof data.borderWidth === 'number' ? data.borderWidth : 1}
          onChange={(v) => onUpdate({ data: { ...data, borderWidth: Number(v) } })}
          type="number"
          min={1}
          max={10}
        />
      </div>
      <PropertySection title="标签">
        <PropertyCheckbox
          label="显示标签"
          checked={typeof data.label !== 'undefined' && data.label !== ''}
          onChange={(v) => onUpdate({ data: { ...data, label: v } })}
        />
        <div className="property-grid">
          <PropertyInput
            label="标签内容"
            value={typeof data.label === 'string' ? data.label : ''}
            onChange={(v) => onUpdate({ data: { ...data, label: v } })}
            type="text"
          />
          <PropertyColor
            label="标签颜色"
            value={typeof data.labelColor === 'string' ? data.labelColor : '#000000'}
            onChange={(v) => onUpdate({ data: { ...data, labelColor: v } })}
          />
        </div>
      </PropertySection>
    </PropertySection>
  );
};
