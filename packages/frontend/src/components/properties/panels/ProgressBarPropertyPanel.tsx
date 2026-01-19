import React from 'react';
import { PropertyInput, PropertyRange, PropertyColor, PropertyCheckbox } from '../shared';
import { PropertySection } from '../shared';

interface ProgressBarPropertyPanelProps {
  component: any;
  onUpdate: (updates: any) => void;
}

/**
 * Progress Bar component properties panel
 */
export const ProgressBarPropertyPanel: React.FC<ProgressBarPropertyPanelProps> = ({ component, onUpdate }) => {
  const data = component.data || {};

  return (
    <PropertySection title="进度条属性">
      <PropertyRange
        label="进度"
        value={typeof data.progress === 'number' ? data.progress : 50}
        min={0}
        max={100}
        onChange={(v) => onUpdate({ data: { ...data, progress: Number(v) } })}
      />
      <div className="property-grid">
        <PropertyInput
          label="条高度"
          value={typeof data.barHeight === 'number' ? data.barHeight : 20}
          onChange={(v) => onUpdate({ data: { ...data, barHeight: Number(v) } })}
          type="number"
          min={5}
          max={50}
        />
        <PropertyInput
          label="圆角"
          value={typeof data.borderRadius === 'number' ? data.borderRadius : 4}
          onChange={(v) => onUpdate({ data: { ...data, borderRadius: Number(v) } })}
          type="number"
        />
      </div>
      <div className="property-grid">
        <PropertyColor
          label="进度条颜色"
          value={typeof data.barColor === 'string' ? data.barColor : '#4CAF50'}
          onChange={(v) => onUpdate({ data: { ...data, barColor: v } })}
        />
        <PropertyColor
          label="背景颜色"
          value={typeof data.backgroundColor === 'string' ? data.backgroundColor : '#E0E0E0'}
          onChange={(v) => onUpdate({ data: { ...data, backgroundColor: v } })}
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
            value={typeof data.labelText === 'string' ? data.labelText : 'Progress'}
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
