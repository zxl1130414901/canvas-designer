import React from 'react';
import { Text as KonvaText, Rect, Group } from 'react-konva';
import type { BaseComponent } from '../../types';

interface WatermarkComponentData {
  text: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  opacity: number;
  rotation: number;
  repeat: boolean;
  repeatSpacing: number;
  patternAngle: number;
}

interface AtomicWatermarkProps extends BaseComponent {
  data: WatermarkComponentData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const AtomicWatermark: React.FC<AtomicWatermarkProps> = ({
  id,
  x,
  y,
  width,
  height,
  rotation,
  opacity: compOpacity,
  zIndex,
  selected,
  locked,
  data,
  onDragStart,
  onDragEnd,
  onSelect,
}) => {
  // 计算重复水印的位置
   const calculatePositions = () => {
    const spacing = data.repeatSpacing || 200;
    const positions = [];

    if (!data.repeat) {
      // 单个水印 - 居中
      positions.push({
        x: width / 2,
        y: height / 2,
      });
    } else {
      // 重复水印 - 限制在组件范围内，最大显示 3x3 网格
      const cols = Math.min(Math.ceil(width / spacing), 3);
      const rows = Math.min(Math.ceil(height / spacing), 3);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          positions.push({
            x: col * spacing + spacing / 2,
            y: row * spacing + spacing / 2,
          });
        }
      }
    }

    return positions;
  };

  const positions = calculatePositions();

  return (
    <Group
      id={id}
      x={x}
      y={y}
      rotation={rotation}
      opacity={compOpacity}
      zIndex={zIndex}
      draggable={!locked}
      onClick={(e: any) => {
        e.cancelBubble = true;
        onSelect(e);
      }}
      onDragStart={() => {
        onDragStart();
      }}
      onDragEnd={onDragEnd}
    >
      {/* 批量渲染水印文字 */}
      {positions.map((pos, index) => (
        <KonvaText
          key={index}
          x={pos.x}
          y={pos.y}
          text={data.text}
          fontSize={data.fontSize || 24}
          fontFamily={data.fontFamily || 'Inter'}
          fill={data.color || 'rgba(200, 200, 200, 0.5)'}
          opacity={data.opacity || 0.5}
          offsetX={0}
          offsetY={0}
          rotation={data.patternAngle || 0}
        />
      ))}

      {/* 选中指示器 */}
      {selected && (
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          stroke="#ff8c5a"
          strokeWidth={1}
          dash={[5, 5]}
          cornerRadius={4}
        />
      )}
    </Group>
  );
};
