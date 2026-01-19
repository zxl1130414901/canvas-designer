import React from 'react';
import { PropertyInput, PropertyColor, PropertySelect, PropertyCheckbox } from '../shared';
import { PropertySection } from '../shared';

interface IconPropertyPanelProps {
  component: any;
  onUpdate: (updates: any) => void;
}

/**
 * Icon component properties panel
 */
export const IconPropertyPanel: React.FC<IconPropertyPanelProps> = ({ component, onUpdate }) => {
  const data = component.data || {};

  const iconOptions = [
    { value: 'image', label: '图片' },
    { value: 'video', label: '视频' },
    { value: 'link', label: '链接' },
    { value: 'email', label: '邮箱' },
    { value: 'phone', label: '电话' },
    { value: 'location', label: '位置' },
    { value: 'calendar', label: '日历' },
    { value: 'user', label: '用户' },
    { value: 'gear', label: '设置' },
    { value: 'check', label: '勾选' },
    { value: 'warning', label: '警告' },
    { value: 'info', label: '信息' },
    { value: 'question', label: '问题' },
    { value: 'star', label: '星标' },
    { value: 'heart', label: '爱心' },
    { value: 'cart', label: '购物车' },
    { value: 'search', label: '搜索' },
    { value: 'plus', label: '加号' },
    { value: 'minus', label: '减号' },
    { value: 'close', label: '关闭' },
    { value: 'menu', label: '菜单' },
  ];

  return (
    <PropertySection title="图标属性">
      <PropertySelect
        label="图标类型"
        value={typeof data.iconType === 'string' ? data.iconType : 'gear'}
        options={iconOptions}
        onChange={(v) => onUpdate({ data: { ...data, iconType: String(v) as any } })}
      />
      <div className="property-grid">
        <PropertyColor
          label="图标颜色"
          value={typeof data.iconColor === 'string' ? data.iconColor : '#3b82f6'}
          onChange={(v) => onUpdate({ data: { ...data, iconColor: v } })}
        />
        <PropertyInput
          label="图标大小"
          value={typeof data.iconSize === 'number' ? data.iconSize : 24}
          onChange={(v) => onUpdate({ data: { ...data, iconSize: Number(v) } })}
          type="number"
          min={12}
          max={64}
        />
      </div>
      <PropertyCheckbox
        label="显示背景"
        checked={typeof data.showBackground === 'boolean' ? data.showBackground : false}
        onChange={(v) => onUpdate({ data: { ...data, showBackground: v } })}
      />
      {data.showBackground && (
        <PropertyColor
          label="背景颜色"
          value={typeof data.backgroundColor === 'string' ? data.backgroundColor : 'rgba(59, 130, 246, 0.1)'}
          onChange={(v) => onUpdate({ data: { ...data, backgroundColor: v } })}
        />
      )}
      <PropertyCheckbox
        label="填充样式"
        checked={typeof data.filled === 'boolean' ? data.filled : false}
        onChange={(v) => onUpdate({ data: { ...data, filled: v } })}
      />
      <PropertyInput
        label="描边宽度"
        value={typeof data.strokeWidth === 'number' ? data.strokeWidth : 1}
        onChange={(v) => onUpdate({ data: { ...data, strokeWidth: Number(v) } })}
        type="number"
        min={0}
        max={5}
      />
    </PropertySection>
  );
};
