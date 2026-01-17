import React from 'react';
import { RegularPolygon, Group } from 'react-konva';
import type { BaseComponent, TriangleComponentData } from '../../types';

interface AtomicTriangleProps extends BaseComponent {
  data: TriangleComponentData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const AtomicTriangle: React.FC<AtomicTriangleProps> = ({
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
  const radius = data.radius || Math.min(width, height) / 2;

  return (
    <Group
      id={id}
      x={x}
      y={y}
      width={width}
      height={height}
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
      <RegularPolygon
        x={width / 2}
        y={height / 2}
        sides={3}
        radius={radius}
        fill={data.fillColor}
        stroke={selected ? '#ff8c5a' : data.borderColor}
        strokeWidth={selected ? 3 : data.borderWidth}
        shadowEnabled={selected}
        shadowBlur={10}
        shadowColor="#ff8c5a"
      />
    </Group>
  );
};
