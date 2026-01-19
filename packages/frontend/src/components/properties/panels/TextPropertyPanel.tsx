import React from 'react';
import { PropertyInput, PropertySelect, PropertyColor } from '../shared';
import { PropertySection } from '../shared';
import { isTextComponent } from '../../../types/guards';

interface TextPropertyPanelProps {
  component: any;
  onUpdate: (updates: any) => void;
}

/**
 * Text component properties panel
 */
export const TextPropertyPanel: React.FC<TextPropertyPanelProps> = ({ component, onUpdate }) => {
  if (!isTextComponent(component)) {
    return null;
  }

  const data = component.data || {};

  return (
    <PropertySection title="文本属性">
      <PropertyInput
        label="内容"
        value={typeof data.text === 'string' ? data.text : ''}
        onChange={(v) => onUpdate({ data: { ...data, text: String(v) } })}
        type="text"
      />
      
      <div className="property-grid">
        <PropertyInput
          label="字号"
          value={typeof data.fontSize === 'number' ? data.fontSize : 24}
          onChange={(v) => onUpdate({ data: { ...data, fontSize: Number(v) } })}
          type="number"
        />
        <PropertyInput
          label="行高"
          value={typeof data.lineHeight === 'number' ? data.lineHeight : 1.5}
          onChange={(v) => onUpdate({ data: { ...data, lineHeight: Number(v) } })}
          type="number"
        />
      </div>
      
      <PropertySelect
        label="字体"
        value={typeof data.fontFamily === 'string' ? data.fontFamily : 'Inter'}
        options={[
          { value: 'Inter', label: 'Inter' },
          { value: 'Arial', label: 'Arial' },
          { value: 'Times New Roman', label: 'Times New Roman' },
          { value: 'Courier New', label: 'Courier New' },
        ]}
        onChange={(v) => onUpdate({ data: { ...data, fontFamily: String(v) } })}
      />
      
      <PropertySelect
        label="字重"
        value={typeof data.fontWeight === 'string' ? data.fontWeight : 'normal'}
        options={[
          { value: 'normal', label: '正常' },
          { value: 'bold', label: '粗体' },
          { value: 'light', label: '细体' },
        ]}
        onChange={(v) => onUpdate({ data: { ...data, fontWeight: String(v) as any } })}
      />
      
      <PropertyColor
        label="颜色"
        value={typeof data.color === 'string' ? data.color : '#333333'}
        onChange={(v) => onUpdate({ data: { ...data, color: String(v) } })}
      />
      
      <PropertySelect
        label="对齐"
        value={typeof data.textAlign === 'string' ? data.textAlign : 'left'}
        options={[
          { value: 'left', label: '左对齐' },
          { value: 'center', label: '居中' },
          { value: 'right', label: '右对齐' },
        ]}
        onChange={(v) => onUpdate({ data: { ...data, textAlign: String(v) as any } })}
      />
    </PropertySection>
  );
};
