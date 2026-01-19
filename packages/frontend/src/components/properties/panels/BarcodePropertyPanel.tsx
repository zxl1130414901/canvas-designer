import React from 'react';
import { PropertyInput, PropertyColor, PropertySelect, PropertyCheckbox } from '../shared';
import { PropertySection } from '../shared';

interface BarcodePropertyPanelProps {
  component: any;
  onUpdate: (updates: any) => void;
}

/**
 * Barcode component properties panel
 */
export const BarcodePropertyPanel: React.FC<BarcodePropertyPanelProps> = ({ component, onUpdate }) => {
  const data = component.data || {};

  return (
    <PropertySection title="条形码属性">
      <PropertyInput
        label="条形码内容"
        value={typeof data.content === 'string' ? data.content : ''}
        onChange={(v) => onUpdate({ data: { ...data, content: v } })}
        type="text"
        placeholder="1234567890"
      />
      <PropertySelect
        label="条形码类型"
        value={typeof data.barcodeType === 'string' ? data.barcodeType : 'CODE128'}
        options={[
          { value: 'CODE128', label: 'CODE128' },
          { value: 'EAN13', label: 'EAN-13' },
          { value: 'EAN8', label: 'EAN-8' },
          { value: 'UPC', label: 'UPC-A' },
        ]}
        onChange={(v) => onUpdate({ data: { ...data, barcodeType: String(v) as any } })}
      />
      <div className="property-grid">
        <PropertyColor
          label="条形颜色"
          value={typeof data.barColor === 'string' ? data.barColor : '#000000'}
          onChange={(v) => onUpdate({ data: { ...data, barColor: v } })}
        />
        <PropertyColor
          label="背景颜色"
          value={typeof data.backgroundColor === 'string' ? data.backgroundColor : '#ffffff'}
          onChange={(v) => onUpdate({ data: { ...data, backgroundColor: v } })}
        />
      </div>
      <PropertyCheckbox
        label="显示文字"
        checked={typeof data.showText === 'boolean' ? data.showText : true}
        onChange={(v) => onUpdate({ data: { ...data, showText: v } })}
      />
      {data.showText && (
        <PropertyInput
          label="字体大小"
          value={typeof data.fontSize === 'number' ? data.fontSize : 12}
          onChange={(v) => onUpdate({ data: { ...data, fontSize: Number(v) } })}
          type="number"
          min={8}
          max={24}
        />
      )}
      <div className="property-grid">
        <PropertyInput
          label="宽度"
          value={typeof data.width === 'number' ? data.width : 200}
          onChange={(v) => onUpdate({ data: { ...data, width: Number(v) } })}
          type="number"
          min={100}
          max={500}
        />
        <PropertyInput
          label="高度"
          value={typeof data.height === 'number' ? data.height : 60}
          onChange={(v) => onUpdate({ data: { ...data, height: Number(v) } })}
          type="number"
          min={40}
          max={200}
        />
      </div>
    </PropertySection>
  );
};
