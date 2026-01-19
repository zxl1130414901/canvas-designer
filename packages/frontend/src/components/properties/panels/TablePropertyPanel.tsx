import React from 'react';
import { PropertyInput, PropertyColor, PropertyCheckbox } from '../shared';
import { PropertySection } from '../shared';

interface TablePropertyPanelProps {
  component: any;
  onUpdate: (updates: any) => void;
}

/**
 * Table component properties panel
 */
export const TablePropertyPanel: React.FC<TablePropertyPanelProps> = ({ component, onUpdate }) => {
  const data = component.data || {};

  return (
    <PropertySection title="表格属性">
      <PropertyCheckbox
        label="显示表头"
        checked={typeof data.showHeaders === 'boolean' ? data.showHeaders : true}
        onChange={(v) => onUpdate({ data: { ...data, showHeaders: v } })}
      />
      <div className="property-grid">
        <PropertyColor
          label="表头背景"
          value={typeof data.headerBgColor === 'string' ? data.headerBgColor : '#f5f5f5'}
          onChange={(v) => onUpdate({ data: { ...data, headerBgColor: v } })}
        />
        <PropertyColor
          label="表头文字"
          value={typeof data.headerColor === 'string' ? data.headerColor : '#000000'}
          onChange={(v) => onUpdate({ data: { ...data, headerColor: v } })}
        />
      </div>
      <div className="property-grid">
        <PropertyColor
          label="边框颜色"
          value={typeof data.borderColor === 'string' ? data.borderColor : '#000000'}
          onChange={(v) => onUpdate({ data: { ...data, borderColor: v } })}
        />
        <PropertyInput
          label="单元格内边距"
          value={typeof data.cellPadding === 'number' ? data.cellPadding : 8}
          onChange={(v) => onUpdate({ data: { ...data, cellPadding: Number(v) } })}
          type="number"
          min={2}
          max={20}
        />
        <PropertyInput
          label="圆角"
          value={typeof data.cornerRadius === 'number' ? data.cornerRadius : 0}
          onChange={(v) => onUpdate({ data: { ...data, cornerRadius: Number(v) } })}
          type="number"
          min={0}
          max={20}
        />
      </div>
      <PropertySection title="样式设置">
        <div className="property-grid">
          <PropertyInput
            label="字号"
            value={typeof data.fontSize === 'number' ? data.fontSize : 14}
            onChange={(v) => onUpdate({ data: { ...data, fontSize: Number(v) } })}
            type="number"
            min={10}
            max={24}
          />
        </div>
      </PropertySection>
    </PropertySection>
  );
};
