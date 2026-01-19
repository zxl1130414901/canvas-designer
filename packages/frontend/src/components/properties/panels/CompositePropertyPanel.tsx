import React from 'react';
import { PropertySection, PropertyCheckbox } from '../shared';

interface CompositePropertyPanelProps {
  component: any;
  onUpdate: (updates: any) => void;
}

/**
 * Composite component properties panel
 * Handles header-group, content-card, info-grid, callout-box, divider, timeline-block, stats-card
 */
export const CompositePropertyPanel: React.FC<CompositePropertyPanelProps> = ({ component, onUpdate }) => {
  const data = component.data || {};

  const compositeName = component.type.replace('new-', '').replace('-', ' ');

  return (
    <PropertySection title={`${compositeName} 属性`}>
      <p className="composite-hint">
        组合组件属性可通过选择子组件来编辑
      </p>
      {typeof data.childIds === 'object' && Array.isArray(data.childIds) && (
        <div className="property-grid">
          <span>包含 {data.childIds.length} 个子组件</span>
          <PropertyCheckbox
            label="锁定布局"
            checked={typeof data.locked === 'boolean' ? data.locked : false}
            onChange={(v) => onUpdate({ data: { ...data, locked: v } })}
          />
        </div>
      )}
    </PropertySection>
  );
};
