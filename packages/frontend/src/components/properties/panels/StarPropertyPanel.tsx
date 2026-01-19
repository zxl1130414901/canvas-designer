import React from 'react';
import { PropertyInput, PropertyColor, PropertyRange } from '../shared';
import { PropertySection } from '../shared';

interface StarPropertyPanelProps {
  component: any;
  onUpdate: (updates: any) => void;
}

/**
 * Star component properties panel
 */
export const StarPropertyPanel: React.FC<StarPropertyPanelProps> = ({ component, onUpdate }) => {
  const data = component.data || {};

  return (
    <PropertySection title="星形属性">
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
          label="顶点数"
          value={typeof data.numPoints === 'number' ? data.numPoints : 5}
          onChange={(v) => onUpdate({ data: { ...data, numPoints: Number(v) } })}
          type="number"
          min={3}
          max={20}
        />
      </div>
      <div className="property-grid">
        <PropertyRange
          label="内半径"
          value={typeof data.innerRadius === 'number' ? data.innerRadius : 0}
          min={0}
          max={50}
          onChange={(v) => onUpdate({ data: { ...data, innerRadius: Number(v) } })}
        />
        <PropertyRange
          label="外半径"
          value={typeof data.outerRadius === 'number' ? data.outerRadius : 0}
          min={0}
          max={100}
          onChange={(v) => onUpdate({ data: { ...data, outerRadius: Number(v) } })}
        />
      </div>
    </PropertySection>
  );
};
