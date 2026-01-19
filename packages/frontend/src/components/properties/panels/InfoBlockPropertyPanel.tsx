import React from 'react';
import { PropertyInput, PropertyColor, PropertySelect, PropertyCheckbox } from '../shared';
import { PropertySection } from '../shared';

interface InfoBlockPropertyPanelProps {
  component: any;
  onUpdate: (updates: any) => void;
}

/**
 * InfoBlock component properties panel
 */
export const InfoBlockPropertyPanel: React.FC<InfoBlockPropertyPanelProps> = ({ component, onUpdate }) => {
  const data = component.data || {};

  return (
    <PropertySection title="信息区块属性">
      <div className="property-grid">
        <PropertyInput
          label="标题"
          value={typeof data.title === 'string' ? data.title : '信息区块'}
          onChange={(v) => onUpdate({ data: { ...data, title: v } })}
          type="text"
        />
        <PropertyInput
          label="副标题"
          value={typeof data.subtitle === 'string' ? data.subtitle : ''}
          onChange={(v) => onUpdate({ data: { ...data, subtitle: v } })}
          type="text"
        />
      </div>
      <PropertyInput
        label="信息项（格式: 标签,数值;...）"
        value={Array.isArray(data.infoItems) ? data.infoItems.map((item: any) => `${item.label},${item.value}`).join(';') : ''}
        onChange={(v) => {
          const newItems = (v as string).split(';').filter(Boolean).map((pair: string) => {
            const [label, value] = pair.split(',');
            return { label: label || '', value: value || '' };
          });
          onUpdate({ data: { ...data, infoItems: newItems } });
        }}
        type="text"
        placeholder="项目A,100;项目B,200"
      />
      <PropertySelect
        label="列数"
        value={typeof data.columns === 'number' ? data.columns : 2}
        options={[
          { value: 1, label: '1列' },
          { value: 2, label: '2列' },
          { value: 3, label: '3列' },
          { value: 4, label: '4列' },
        ]}
        onChange={(v) => onUpdate({ data: { ...data, columns: Number(v) } })}
      />
      <div className="property-grid">
        <PropertyColor
          label="背景颜色"
          value={typeof data.bgColor === 'string' ? data.bgColor : 'rgba(255, 255, 255, 0.05)'}
          onChange={(v) => onUpdate({ data: { ...data, bgColor: v } })}
        />
        <PropertyColor
          label="边框颜色"
          value={typeof data.borderColor === 'string' ? data.borderColor : 'rgba(255, 255, 255, 0.1)'}
          onChange={(v) => onUpdate({ data: { ...data, borderColor: v } })}
        />
      </div>
      <div className="property-grid">
        <PropertyColor
          label="标题颜色"
          value={typeof data.titleColor === 'string' ? data.titleColor : '#ffffff'}
          onChange={(v) => onUpdate({ data: { ...data, titleColor: v } })}
        />
        <PropertyColor
          label="文字颜色"
          value={typeof data.textColor === 'string' ? data.textColor : '#94a3b8'}
          onChange={(v) => onUpdate({ data: { ...data, textColor: v } })}
        />
      </div>
      <PropertyCheckbox
        label="显示网格"
        checked={typeof data.showGrid === 'boolean' ? data.showGrid : true}
        onChange={(v) => onUpdate({ data: { ...data, showGrid: v } })}
      />
    </PropertySection>
  );
};
