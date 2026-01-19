import React from 'react';
import { PropertyInput, PropertyColor, PropertySelect } from '../shared';
import { PropertySection } from '../shared';

interface ChartSectionPropertyPanelProps {
  component: any;
  onUpdate: (updates: any) => void;
}

/**
 * ChartSection component properties panel
 */
export const ChartSectionPropertyPanel: React.FC<ChartSectionPropertyPanelProps> = ({ component, onUpdate }) => {
  const data = component.data || {};

  return (
    <PropertySection title="图表区域属性">
      <PropertySelect
        label="图表类型"
        value={typeof data.chartType === 'string' ? data.chartType : 'bar'}
        options={[
          { value: 'bar', label: '柱状图' },
          { value: 'pie', label: '饼图' },
          { value: 'line', label: '折线图' },
        ]}
        onChange={(v) => onUpdate({ data: { ...data, chartType: String(v) as any } })}
      />
      <PropertyInput
        label="数据（格式: label,value;...）"
        value={Array.isArray(data.data) ? data.data.map((d: any) => `${d.label},${d.value}`).join(';') : ''}
        onChange={(v) => {
          const newData = (v as string).split(';').filter(Boolean).map((pair: string) => {
            const [label, value] = pair.split(',');
            return { label: label || '', value: Number(value) || 0 };
          });
          onUpdate({ data: { ...data, data: newData } });
        }}
        type="text"
        placeholder="A,100;B,80;C,120"
      />
      <div className="property-grid">
        <PropertyColor
          label="主色调"
          value={Array.isArray(data.colors) && data.colors[0] ? data.colors[0] : '#3b82f6'}
          onChange={(v) => {
            const newColors = [...(data.colors || ['#3b82f6', '#10b981', '#f59e0b'])];
            newColors[0] = v;
            onUpdate({ data: { ...data, colors: newColors } });
          }}
        />
        <PropertyColor
          label="辅助色"
          value={Array.isArray(data.colors) && data.colors[1] ? data.colors[1] : '#10b981'}
          onChange={(v) => {
            const newColors = [...(data.colors || ['#3b82f6', '#10b981', '#f59e0b'])];
            newColors[1] = v;
            onUpdate({ data: { ...data, colors: newColors } });
          }}
        />
      </div>
    </PropertySection>
  );
};
