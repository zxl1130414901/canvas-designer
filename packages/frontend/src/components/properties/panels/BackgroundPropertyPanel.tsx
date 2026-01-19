import React from 'react';
import { PropertyInput, PropertyColor, PropertyRange, PropertySelect } from '../shared';
import { PropertySection } from '../shared';

interface BackgroundPropertyPanelProps {
  component: any;
  onUpdate: (updates: any) => void;
}

/**
 * Background component properties panel
 */
export const BackgroundPropertyPanel: React.FC<BackgroundPropertyPanelProps> = ({ component, onUpdate }) => {
  const data = component.data || {};

  return (
    <PropertySection title="背景属性">
      <PropertyColor
        label="填充颜色"
        value={typeof data.fillColor === 'string' ? data.fillColor : '#f5f5f5'}
        onChange={(v) => onUpdate({ data: { ...data, fillColor: v } })}
      />
      <PropertyRange
        label="不透明度"
        value={typeof data.opacity === 'number' ? data.opacity * 100 : 100}
        min={0}
        max={100}
        onChange={(v) => onUpdate({ data: { ...data, opacity: Number(v) / 100 } })}
      />
      <div className="property-grid">
        <PropertyInput
          label="圆角"
          value={typeof data.cornerRadius === 'number' ? data.cornerRadius : 0}
          onChange={(v) => onUpdate({ data: { ...data, cornerRadius: Number(v) } })}
          type="number"
          min={0}
          max={50}
        />
      <div className="property-grid">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '14px' }}>渐变效果：</span>
          <input
            type="checkbox"
            checked={Array.isArray(data.gradientColors) && data.gradientColors.length > 0}
            onChange={(e) => onUpdate({ data: { ...data, gradientColors: e.target.checked ? ['#000000', '#FFFFFF'] : [] as any } })}
          />
        </div>
      </div>
      </div>
      {Array.isArray(data.gradientColors) && data.gradientColors.length > 0 && (
        <>
          <div className="property-grid">
            <PropertyColor
              label="渐变颜色1"
              value={data.gradientColors[0] || '#000000'}
              onChange={(v) => {
                const colors = [...data.gradientColors];
                colors[0] = v;
                onUpdate({ data: { ...data, gradientColors: colors } });
              }}
            />
            <PropertyColor
              label="渐变颜色2"
              value={data.gradientColors[1] || '#FFFFFF'}
              onChange={(v) => {
                const colors = [...data.gradientColors];
                colors[1] = v;
                onUpdate({ data: { ...data, gradientColors: colors } });
              }}
            />
          </div>
          <PropertySelect
            label="渐变方向"
            value={typeof data.gradientDirection === 'string' ? data.gradientDirection : 'horizontal'}
            options={[
              { value: 'horizontal', label: '水平' },
              { value: 'vertical', label: '垂直' },
            ]}
            onChange={(v) => onUpdate({ data: { ...data, gradientDirection: String(v) as any } })}
          />
        </>
      )}
      <div className="property-grid">
        <PropertyColor
          label="边框颜色"
          value={typeof data.borderColor === 'string' ? data.borderColor : '#e0e0e0'}
          onChange={(v) => onUpdate({ data: { ...data, borderColor: v } })}
        />
        <PropertyInput
          label="边框宽度"
          value={typeof data.borderWidth === 'number' ? data.borderWidth : 0}
          onChange={(v) => onUpdate({ data: { ...data, borderWidth: Number(v) } })}
          type="number"
        />
      </div>
    </PropertySection>
  );
};
