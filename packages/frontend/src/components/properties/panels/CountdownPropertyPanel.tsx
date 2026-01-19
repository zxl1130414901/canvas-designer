import React from 'react';
import { PropertyInput, PropertyColor, PropertyCheckbox } from '../shared';
import { PropertySection } from '../shared';

interface CountdownPropertyPanelProps {
  component: any;
  onUpdate: (updates: any) => void;
}

/**
 * Countdown component properties panel
 */
export const CountdownPropertyPanel: React.FC<CountdownPropertyPanelProps> = ({ component, onUpdate }) => {
  const data = component.data || {};

  return (
    <PropertySection title="倒计时属性">
      <div className="property-grid">
        <PropertyInput
          label="天"
          value={typeof data.days === 'number' ? data.days : 0}
          onChange={(v) => onUpdate({ data: { ...data, days: Number(v) } })}
          type="number"
          min={0}
          max={365}
        />
        <PropertyInput
          label="小时"
          value={typeof data.hours === 'number' ? data.hours : 0}
          onChange={(v) => onUpdate({ data: { ...data, hours: Number(v) } })}
          type="number"
          min={0}
          max={23}
        />
        <PropertyInput
          label="分钟"
          value={typeof data.minutes === 'number' ? data.minutes : 0}
          onChange={(v) => onUpdate({ data: { ...data, minutes: Number(v) } })}
          type="number"
          min={0}
          max={59}
        />
        <PropertyInput
          label="秒"
          value={typeof data.seconds === 'number' ? data.seconds : 0}
          onChange={(v) => onUpdate({ data: { ...data, seconds: Number(v) } })}
          type="number"
          min={0}
          max={59}
        />
      </div>
      <div className="property-grid">
        <PropertyColor
          label="数字颜色"
          value={typeof data.numberColor === 'string' ? data.numberColor : '#000000'}
          onChange={(v) => onUpdate({ data: { ...data, numberColor: v } })}
        />
        <PropertyColor
          label="分隔符颜色"
          value={typeof data.separatorColor === 'string' ? data.separatorColor : '#666666'}
          onChange={(v) => onUpdate({ data: { ...data, separatorColor: v } })}
        />
      </div>
      <div className="property-grid">
        <PropertyColor
          label="标签颜色"
          value={typeof data.labelColor === 'string' ? data.labelColor : '#666666'}
          onChange={(v) => onUpdate({ data: { ...data, labelColor: v } })}
        />
        <PropertyColor
          label="背景颜色"
          value={typeof data.backgroundColor === 'string' ? data.backgroundColor : '#FFFFFF'}
          onChange={(v) => onUpdate({ data: { ...data, backgroundColor: v } })}
        />
      </div>
      <PropertySection title="标签设置">
        <PropertyCheckbox
          label="显示标签"
          checked={typeof data.showLabels === 'boolean' ? data.showLabels : true}
          onChange={(v) => onUpdate({ data: { ...data, showLabels: v } })}
        />
      </PropertySection>
    </PropertySection>
  );
};
