import React from 'react';
import { useStore } from '../../../store';
import { PropertyInput, PropertyColor } from '../shared';
import { PropertySection } from '../shared';

/**
 * Canvas settings panel
 * Shown when no component is selected
 */
export const CanvasSettingsPanel: React.FC = () => {
  const { canvas, updateCanvas } = useStore();

  return (
    <div className="properties-panel">
      <div className="panel-header">
        <h3>画布设置</h3>
      </div>
      <div className="panel-content">
        <PropertySection title="画布尺寸">
          <div className="property-grid">
            <PropertyInput
              label="宽度 (最大1600)"
              value={canvas.width}
              onChange={(v) => updateCanvas({ width: Math.min(Number(v), 1600) })}
              type="number"
            />
            <PropertyInput
              label="高度 (最大2560)"
              value={canvas.height}
              onChange={(v) => updateCanvas({ height: Math.min(Number(v), 2560) })}
              type="number"
            />
          </div>
        </PropertySection>

        <PropertySection title="背景颜色">
          <PropertyColor
            label="背景颜色"
            value={canvas.backgroundColor}
            onChange={(v) => updateCanvas({ backgroundColor: v })}
            style={{ width: '100%', height: '40px', cursor: 'pointer' }}
          />
        </PropertySection>

        <div className="empty-state" style={{ marginTop: '40px' }}>
          <div className="empty-icon">🎨</div>
          <p>选中组件以查看属性</p>
        </div>
      </div>
    </div>
  );
};
