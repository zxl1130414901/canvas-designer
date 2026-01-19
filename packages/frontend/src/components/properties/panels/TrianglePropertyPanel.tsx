import React from 'react';
import { PropertyInput, PropertyColor } from '../shared';
import { PropertySection } from '../shared';

interface TrianglePropertyPanelProps {
  component: any;
  onUpdate: (updates: any) => void;
}

/**
 * Triangle component properties panel
 */
export const TrianglePropertyPanel: React.FC<TrianglePropertyPanelProps> = ({ component, onUpdate }) => {
  const data = component.data || {};

  return (
    <PropertySection title="三角形属性">
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
          label="半径"
          value={typeof data.radius === 'number' ? data.radius : 0}
          onChange={(v) => onUpdate({ data: { ...data, radius: Number(v) } })}
          type="number"
        />
      </div>
    </PropertySection>
  );
};
