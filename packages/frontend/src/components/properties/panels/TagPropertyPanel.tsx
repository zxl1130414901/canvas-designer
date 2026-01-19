import React from 'react';
import { PropertyInput, PropertyColor, PropertySelect, PropertyCheckbox } from '../shared';
import { PropertySection } from '../shared';

interface TagPropertyPanelProps {
  component: any;
  onUpdate: (updates: any) => void;
}

/**
 * Tag component properties panel
 */
export const TagPropertyPanel: React.FC<TagPropertyPanelProps> = ({ component, onUpdate }) => {
  const data = component.data || {};

  return (
    <PropertySection title="标签属性">
      <PropertyInput
        label="文本内容"
        value={typeof data.text === 'string' ? data.text : ''}
        onChange={(v) => onUpdate({ data: { ...data, text: v } })}
        type="text"
      />
      <div className="property-grid">
        <PropertyColor
          label="背景颜色"
          value={typeof data.backgroundColor === 'string' ? data.backgroundColor : '#000000'}
          onChange={(v) => onUpdate({ data: { ...data, backgroundColor: v } })}
        />
        <PropertyColor
          label="文字颜色"
          value={typeof data.textColor === 'string' ? data.textColor : '#ffffff'}
          onChange={(v) => onUpdate({ data: { ...data, textColor: v } })}
        />
        <PropertyColor
          label="边框颜色"
          value={typeof data.borderColor === 'string' ? data.borderColor : '#000000'}
          onChange={(v) => onUpdate({ data: { ...data, borderColor: v } })}
        />
      </div>
      <div className="property-grid">
        <PropertyInput
          label="字号"
          value={typeof data.fontSize === 'number' ? data.fontSize : 14}
          onChange={(v) => onUpdate({ data: { ...data, fontSize: Number(v) } })}
          type="number"
        />
        <PropertyInput
          label="内边距"
          value={typeof data.padding === 'number' ? data.padding : 8}
          onChange={(v) => onUpdate({ data: { ...data, padding: Number(v) } })}
          type="number"
        />
        <PropertyInput
          label="圆角"
          value={typeof data.borderRadius === 'number' ? data.borderRadius : 4}
          onChange={(v) => onUpdate({ data: { ...data, borderRadius: Number(v) } })}
          type="number"
        />
      </div>
      <PropertySelect
        label="样式"
        value={typeof data.variant === 'string' ? data.variant : 'pill'}
        options={[
          { value: 'pill', label: '胶囊' },
          { value: 'rounded', label: '圆角' },
          { value: 'square', label: '方形' },
        ]}
        onChange={(v) => onUpdate({ data: { ...data, variant: String(v) as any } })}
      />
      <PropertySelect
        label="文字水平"
        value={typeof data.textPositionX === 'string' ? data.textPositionX : 'center'}
        options={[
          { value: 'padding', label: '内边距' },
          { value: 'left', label: '左' },
          { value: 'right', label: '右' },
          { value: 'center', label: '居中' },
        ]}
        onChange={(v) => onUpdate({ data: { ...data, textPositionX: String(v) as any } })}
      />
      <PropertySelect
        label="文字垂直"
        value={typeof data.textPositionY === 'string' ? data.textPositionY : 'center'}
        options={[
          { value: 'padding', label: '内边距' },
          { value: 'top', label: '上' },
          { value: 'bottom', label: '下' },
          { value: 'center', label: '居中' },
        ]}
        onChange={(v) => onUpdate({ data: { ...data, textPositionY: String(v) as any } })}
      />
      <div className="property-grid">
        <PropertyInput
          label="自定义X"
          value={typeof data.customTextX === 'number' ? data.customTextX : 0}
          onChange={(v) => onUpdate({ data: { ...data, customTextX: Number(v) } })}
          type="number"
        />
        <PropertyInput
          label="自定义Y"
          value={typeof data.customTextY === 'number' ? data.customTextY : 0}
          onChange={(v) => onUpdate({ data: { ...data, customTextY: Number(v) } })}
          type="number"
        />
        <PropertyInput
          label="边框宽度"
          value={typeof data.borderWidth === 'number' ? data.borderWidth : 1}
          onChange={(v) => onUpdate({ data: { ...data, borderWidth: Number(v) } })}
          type="number"
        />
        <PropertySelect
          label="边框样式"
          value={typeof data.borderStyle === 'string' ? data.borderStyle : 'solid'}
          options={[
            { value: 'solid', label: '实线' },
            { value: 'dashed', label: '虚线' },
            { value: 'dotted', label: '点线' },
          ]}
          onChange={(v) => onUpdate({ data: { ...data, borderStyle: String(v) as any } })}
        />
      </div>
      <PropertySection title="阴影设置">
        <PropertyCheckbox
          label="启用阴影"
          checked={typeof data.shadowEnabled === 'boolean' ? data.shadowEnabled : false}
          onChange={(v) => onUpdate({ data: { ...data, shadowEnabled: v } })}
        />
        {data.shadowEnabled && (
          <>
            <div className="property-grid">
              <PropertyInput
                label="模糊半径"
                value={typeof data.shadowBlur === 'number' ? data.shadowBlur : 5}
                onChange={(v) => onUpdate({ data: { ...data, shadowBlur: Number(v) } })}
                type="number"
              />
              <PropertyInput
                label="阴影颜色"
                value={typeof data.shadowColor === 'string' ? data.shadowColor : '#000000'}
                onChange={(v) => onUpdate({ data: { ...data, shadowColor: v } })}
                type="text"
              />
            </div>
            <div className="property-grid">
              <PropertyInput
                label="X偏移"
                value={typeof data.shadowOffsetX === 'number' ? data.shadowOffsetX : 0}
                onChange={(v) => onUpdate({ data: { ...data, shadowOffsetX: Number(v) } })}
                type="number"
              />
              <PropertyInput
                label="Y偏移"
                value={typeof data.shadowOffsetY === 'number' ? data.shadowOffsetY : 0}
                onChange={(v) => onUpdate({ data: { ...data, shadowOffsetY: Number(v) } })}
                type="number"
              />
            </div>
          </>
        )}
      </PropertySection>
    </PropertySection>
  );
};
