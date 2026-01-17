import React from 'react';
import { Group, Line } from 'react-konva';
import type { BaseComponent, DividerComponentData } from '../../types';

interface CompositeDividerProps extends BaseComponent {
  data: DividerComponentData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const CompositeDivider: React.FC<CompositeDividerProps> = ({
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
  const isHorizontal = data.orientation === 'horizontal';
  const startX = isHorizontal ? 0 : width / 2;
  const startY = isHorizontal ? height / 2 : 0;
  const endX = isHorizontal ? width : width / 2;
  const endY = isHorizontal ? height / 2 : height;

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
      <Line
        points={[startX, startY, endX, endY]}
        stroke={data.color}
        strokeWidth={data.thickness}
        dash={data.style === 'dashed' ? [10, 10] : data.style === 'dotted' ? [5,5] : undefined}
        strokeEnabled={selected}
        shadowEnabled={selected}
        shadowBlur={10}
        shadowColor="#ff8c5a"
      />
    </Group>
  );
};
