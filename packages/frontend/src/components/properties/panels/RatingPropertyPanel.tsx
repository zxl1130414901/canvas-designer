import React from 'react';
import { PropertyInput, PropertyColor, PropertyRange, PropertyCheckbox } from '../shared';
import { PropertySection } from '../shared';

interface RatingPropertyPanelProps {
  component: any;
  onUpdate: (updates: any) => void;
}

/**
 * Rating component properties panel
 */
export const RatingPropertyPanel: React.FC<RatingPropertyPanelProps> = ({ component, onUpdate }) => {
  const data = component.data || {};

  return (
    <PropertySection title="评分组件属性">
      <PropertyRange
         label="评分"
        value={typeof data.rating === 'number' ? data.rating :3}
        min={0}
        max={data.maxStars || 5}
        onChange={(v) => onUpdate({ data: { ...data, rating: Number(v) } })}
      />
      <div className="property-grid">
        <PropertyInput
          label="最大星级"
          value={typeof data.maxStars === 'number' ? data.maxStars : 5}
          onChange={(v) => onUpdate({ data: { ...data, maxStars: Number(v) } })}
          type="number"
          min={1}
          max={10}
        />
        <PropertyInput
          label="星星大小"
          value={typeof data.starSize === 'number' ? data.starSize : 24}
          onChange={(v) => onUpdate({ data: { ...data, starSize: Number(v) } })}
          type="number"
          min={12}
          max={48}
        />
      </div>
      <div className="property-grid">
        <PropertyColor
          label="星星颜色"
          value={typeof data.starColor === 'string' ? data.starColor : '#FFD700'}
          onChange={(v) => onUpdate({ data: { ...data, starColor: v } })}
        />
        <PropertyColor
          label="空星颜色"
          value={typeof data.emptyColor === 'string' ? data.emptyColor : '#E0E0E0'}
          onChange={(v) => onUpdate({ data: { ...data, emptyColor: v } })}
        />
      </div>
      <PropertySection title="标签设置">
        <PropertyCheckbox
          label="显示标签"
          checked={typeof data.showLabel === 'boolean' ? data.showLabel : true}
          onChange={(v) => onUpdate({ data: { ...data, showLabel: v } })}
        />
        <div className="property-grid">
          <PropertyInput
            label="标签文字"
            value={typeof data.labelText === 'string' ? data.labelText : 'Rating'}
            onChange={(v) => onUpdate({ data: { ...data, labelText: v } })}
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
