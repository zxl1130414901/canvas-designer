import React from 'react';
import { Group, Rect, Text as KonvaText } from 'react-konva';
import type { BaseComponent, TagComponentData } from '../../types';

interface AtomicTagProps extends BaseComponent {
  data: TagComponentData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const AtomicTag: React.FC<AtomicTagProps> = ({
  id,
  x,
  y,
  width,
  height,
  rotation,
  opacity,
  zIndex,
  selected,
  locked,
  data,
  onDragStart,
  onDragEnd,
  onSelect,
}) => {
  const padding = data.padding || 8;
  const borderRadius = data.variant === 'pill' ? width / 2 :
                     data.variant === 'rounded' ? 8 : 0;

  // 计算文本位置
  let textX = padding;
  let textY = padding;

  switch (data.textPositionX) {
    case 'center':
      textX = (width - (width - padding * 2)) / 2;
      break;
    case 'custom':
      textX = data.customTextX || padding;
      break;
    case 'padding':
    default:
      textX = padding;
      break;
  }

  switch (data.textPositionY) {
    case 'center':
      textY = (height - (height - padding * 2)) / 2;
      break;
    case 'custom':
      textY = data.customTextY || padding;
      break;
    case 'padding':
    default:
      textY = padding;
      break;
  }

  // 边框样式映射
  const borderDashMap: Record<string, number[] | undefined> = {
    solid: undefined,
    dashed: [10, 10],
    dotted: [3, 3],
  };

  return (
    <Group
      id={id}
      x={x}
      y={y}
      rotation={rotation}
      opacity={opacity}
      zIndex={zIndex}
      draggable={!locked}
      onClick={(e: any) => {
        onSelect(e);
      }}
      onDragStart={() => {
        onDragStart();
      }}
      onDragEnd={onDragEnd}
    >
      <Rect
        width={width}
        height={height}
        fill={data.backgroundColor}
        stroke={selected ? '#ff8c5a' : data.borderColor}
        strokeWidth={selected ? 3 : data.borderWidth || 1}
        dash={borderDashMap[data.borderStyle] || undefined}
        cornerRadius={borderRadius}
        shadowEnabled={data.shadowEnabled}
        shadowBlur={data.shadowBlur || 0}
        shadowColor={data.shadowColor || '#000000'}
        shadowOffsetX={data.shadowOffsetX || 0}
        shadowOffsetY={data.shadowOffsetY || 0}
      />
      <KonvaText
        x={textX}
        y={textY}
        width={width - padding * 2}
        height={height - padding * 2}
        text={data.text}
        fontSize={data.fontSize}
        fontFamily="Inter"
        fontWeight="600"
        fill={data.textColor}
        align={data.textAlign}
        verticalAlign="middle"
      />
    </Group>
  );
};
