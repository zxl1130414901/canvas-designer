import React from 'react';
import { useStore } from '../../../store';
import { PropertyInput, PropertyRange } from '../shared';
import { PropertySection } from '../shared';

interface CommonPropertiesPanelProps {
  component: any;
  onUpdate: (updates: any) => void;
}

/**
 * Common properties panel
 * Shows position, size, transform, opacity, and z-index for all components
 */
export const CommonPropertiesPanel: React.FC<CommonPropertiesPanelProps> = ({ component, onUpdate }) => {
  const { changeZIndex } = useStore();

  const handleZIndexUp = () => {
    changeZIndex(component.id, component.zIndex + 1);
  };

  const handleZIndexDown = () => {
    if (component.zIndex > 0) {
      changeZIndex(component.id, component.zIndex - 1);
    }
  };

  return (
    <>
      <PropertySection title="位置与尺寸">
        <div className="property-grid">
          <PropertyInput
            label="X坐标"
            value={typeof component.x === 'number' ? component.x : 0}
            onChange={(v) => onUpdate({ x: Number(v) })}
            type="number"
          />
          <PropertyInput
            label="Y坐标"
            value={typeof component.y === 'number' ? component.y : 0}
            onChange={(v) => onUpdate({ y: Number(v) })}
            type="number"
          />
          <PropertyInput
            label="宽度"
            value={typeof component.width === 'number' ? component.width : 0}
            onChange={(v) => onUpdate({ width: Number(v) })}
            type="number"
          />
          <PropertyInput
            label="高度"
            value={typeof component.height === 'number' ? component.height : 0}
            onChange={(v) => onUpdate({ height: Number(v) })}
            type="number"
          />
        </div>
      </PropertySection>

      <PropertySection title="变换">
        <PropertyRange
          label="旋转角度"
          value={typeof component.rotation === 'number' ? component.rotation : 0}
          min={0}
          max={360}
          onChange={(v) => onUpdate({ rotation: Number(v) })}
          displayValue={`${Math.round(typeof component.rotation === 'number' ? component.rotation : 0)}°`}
        />
      </PropertySection>

      <PropertySection title="外观">
        <PropertyRange
          label="不透明度"
          value={typeof component.opacity === 'number' ? component.opacity * 100 : 0}
          min={0}
          max={100}
          onChange={(v) => onUpdate({ opacity: Number(v) / 100 })}
          displayValue={`${Math.round(typeof component.opacity === 'number' ? component.opacity * 100 : 0)}%`}
        />
      </PropertySection>

      <PropertySection title="层级">
        <div className="property-grid">
          <button
            onClick={handleZIndexUp}
            className="z-index-btn"
            disabled={typeof component.zIndex === 'number' && component.zIndex >= 999}
            title="提升层级"
          >
            上移
          </button>
          <button
            onClick={handleZIndexDown}
            className="z-index-btn"
            disabled={typeof component.zIndex === 'number' && component.zIndex <= 0}
            title="降低层级"
          >
            下移
          </button>
        </div>
        <span>当前层级: {typeof component.zIndex === 'number' ? component.zIndex : 0}</span>
      </PropertySection>
    </>
  );
};
