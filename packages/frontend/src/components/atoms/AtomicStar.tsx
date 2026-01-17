import React from 'react';
import { Star, Group } from 'react-konva';
import type { BaseComponent, StarComponentData } from '../../types';

interface AtomicStarProps extends BaseComponent {
  data: StarComponentData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const AtomicStar: React.FC<AtomicStarProps> = ({
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
  const outerRadius = Math.min(width, height) / 2;
  const innerRadius = data.innerRadius;

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
      <Star
        x={width / 2}
        y={height / 2}
        numPoints={data.numPoints}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
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
