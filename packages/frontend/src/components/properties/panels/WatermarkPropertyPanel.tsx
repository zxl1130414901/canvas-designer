import React from 'react';
import { PropertyInput, PropertyColor, PropertyRange, PropertyCheckbox, PropertySelect } from '../shared';
import { PropertySection } from '../shared';

interface WatermarkPropertyPanelProps {
  component: any;
  onUpdate: (updates: any) => void;
}

/**
 * Watermark component properties panel
 */
export const WatermarkPropertyPanel: React.FC<WatermarkPropertyPanelProps> = ({ component, onUpdate }) => {
  const data = component.data || {};

  return (
    <PropertySection title="水印属性">
      <PropertyInput
        label="水印文字"
        value={typeof data.text === 'string' ? data.text : ''}
        onChange={(v) => onUpdate({ data: { ...data, text: v } })}
        type="text"
      />
      <div className="property-grid">
        <PropertyInput
          label="字号"
          value={typeof data.fontSize === 'number' ? data.fontSize : 24}
          onChange={(v) => onUpdate({ data: { ...data, fontSize: Number(v) } })}
          type="number"
          min={10}
          max={72}
        />
        <PropertySelect
          label="字体"
          value={typeof data.fontFamily === 'string' ? data.fontFamily : 'Arial'}
          options={[
            { value: 'Arial', label: 'Arial' },
            { value: 'Times New Roman', label: 'Times New Roman' },
            { value: 'Courier New', label: 'Courier New' },
            { value: 'Georgia', label: 'Georgia' },
          ]}
          onChange={(v) => onUpdate({ data: { ...data, fontFamily: String(v) as any } })}
        />
      </div>
      <div className="property-grid">
        <PropertyColor
          label="文字颜色"
          value={typeof data.color === 'string' ? data.color : '#c8c8c8'}
          onChange={(v) => onUpdate({ data: { ...data, color: v } })}
        />
        <PropertyRange
          label="不透明度"
          value={typeof data.opacity === 'number' ? data.opacity * 100 : 50}
          min={0}
          max={100}
          onChange={(v) => onUpdate({ data: { ...data, opacity: Number(v) / 100 } })}
        />
      </div>
      <PropertyInput
         label="整体旋转角度"
         value={typeof data.rotation === 'number' ? data.rotation : 45}
         onChange={(v) => onUpdate({ data: { ...data, rotation: Number(v) } })}
         type="number"
         min={-180}
         max={180}
       />
       <PropertyCheckbox
         label="重复显示"
         checked={typeof data.repeat === 'boolean' ? data.repeat : false}
         onChange={(v) => onUpdate({ data: { ...data, repeat: v } })}
       />
       <div className="property-grid">
         <PropertyInput
           label="水平间距"
           value={typeof data.repeatSpacing === 'number' ? data.repeatSpacing : 200}
           onChange={(v) => onUpdate({ data: { ...data, repeatSpacing: Number(v) } })}
           type="number"
           min={20}
           max={200}
         />
         <PropertyInput
           label="单个角度"
           value={typeof data.patternAngle === 'number' ? data.patternAngle : 0}
           onChange={(v) => onUpdate({ data: { ...data, patternAngle: Number(v) } })}
           type="number"
           min={0}
           max={360}
         />
       </div>
    </PropertySection>
  );
};
