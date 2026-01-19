import React from 'react';
import { PropertyInput, PropertyColor, PropertySelect } from '../shared';
import { PropertySection } from '../shared';

interface QRCodePropertyPanelProps {
  component: any;
  onUpdate: (updates: any) => void;
}

/**
 * QRCode component properties panel
 */
export const QRCodePropertyPanel: React.FC<QRCodePropertyPanelProps> = ({ component, onUpdate }) => {
  const data = component.data || {};

  return (
    <PropertySection title="二维码属性">
      <PropertyInput
        label="二维码内容"
        value={typeof data.content === 'string' ? data.content : ''}
        onChange={(v) => onUpdate({ data: { ...data, content: v } })}
        type="text"
        placeholder="https://example.com"
      />
      <div className="property-grid">
        <PropertyColor
          label="前景颜色"
          value={typeof data.foregroundColor === 'string' ? data.foregroundColor : '#000000'}
          onChange={(v) => onUpdate({ data: { ...data, foregroundColor: v } })}
        />
        <PropertyColor
          label="背景颜色"
          value={typeof data.backgroundColor === 'string' ? data.backgroundColor : '#ffffff'}
          onChange={(v) => onUpdate({ data: { ...data, backgroundColor: v } })}
        />
      </div>
      <PropertyInput
        label="尺寸"
        value={typeof data.size === 'number' ? data.size : 100}
        onChange={(v) => onUpdate({ data: { ...data, size: Number(v) } })}
        type="number"
        min={50}
        max={300}
      />
      <PropertySelect
        label="纠错级别"
        value={typeof data.errorCorrectionLevel === 'string' ? data.errorCorrectionLevel : 'M'}
        options={[
          { value: 'L', label: '低 (7%)' },
          { value: 'M', label: '中 (15%)' },
          { value: 'Q', label: '较高 (25%)' },
          { value: 'H', label: '高 (30%)' },
        ]}
        onChange={(v) => onUpdate({ data: { ...data, errorCorrectionLevel: String(v) as any } })}
      />
    </PropertySection>
  );
};
