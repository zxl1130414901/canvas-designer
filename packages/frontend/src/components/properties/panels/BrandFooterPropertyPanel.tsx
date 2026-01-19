import React from 'react';
import { PropertyInput, PropertyColor, PropertyCheckbox } from '../shared';
import { PropertySection } from '../shared';

interface BrandFooterPropertyPanelProps {
  component: any;
  onUpdate: (updates: any) => void;
}

/**
 * BrandFooter component properties panel
 */
export const BrandFooterPropertyPanel: React.FC<BrandFooterPropertyPanelProps> = ({ component, onUpdate }) => {
  const data = component.data || {};

  return (
    <PropertySection title="品牌页脚属性">
      <PropertyInput
        label="Logo文字"
        value={typeof data.logoText === 'string' ? data.logoText : 'BRAND'}
        onChange={(v) => onUpdate({ data: { ...data, logoText: v } })}
        type="text"
      />
      <div className="property-grid">
        <PropertyInput
          label="公司名称"
          value={typeof data.company === 'string' ? data.company : '公司名称'}
          onChange={(v) => onUpdate({ data: { ...data, company: v } })}
          type="text"
        />
        <PropertyInput
          label="版权信息"
          value={typeof data.copyright === 'string' ? data.copyright : '© 2024 All Rights Reserved'}
          onChange={(v) => onUpdate({ data: { ...data, copyright: v } })}
          type="text"
        />
      </div>
      <div className="property-grid">
        <PropertyColor
          label="Logo颜色"
          value={typeof data.logoColor === 'string' ? data.logoColor : '#ffffff'}
          onChange={(v) => onUpdate({ data: { ...data, logoColor: v } })}
        />
        <PropertyColor
          label="文字颜色"
          value={typeof data.textColor === 'string' ? data.textColor : '#94a3b8'}
          onChange={(v) => onUpdate({ data: { ...data, textColor: v } })}
        />
      </div>
      <div className="property-grid">
        <PropertyColor
          label="背景颜色"
          value={typeof data.bgColor === 'string' ? data.bgColor : 'rgba(255, 255, 255, 0.05)'}
          onChange={(v) => onUpdate({ data: { ...data, bgColor: v } })}
        />
        <PropertyColor
          label="分隔线颜色"
          value={typeof data.separatorColor === 'string' ? data.separatorColor : 'rgba(255, 255, 255, 0.2)'}
          onChange={(v) => onUpdate({ data: { ...data, separatorColor: v } })}
        />
      </div>
      <PropertyCheckbox
        label="显示分隔线"
        checked={typeof data.showSeparator === 'boolean' ? data.showSeparator : true}
        onChange={(v) => onUpdate({ data: { ...data, showSeparator: v } })}
      />
    </PropertySection>
  );
};
