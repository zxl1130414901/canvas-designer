import React from 'react';
import { Group, Rect } from 'react-konva';
import type { BaseComponent } from '../../types';

// Icon组件使用简单的占位符实现
interface IconComponentData {
  iconName: string;
  color: string;
  size: number;
  strokeWidth: number;
}

interface AtomicIconProps extends BaseComponent {
  data: IconComponentData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: () => void;
}

export const AtomicIcon: React.FC<AtomicIconProps> = ({
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
  const iconSize = Math.min(width, height);

  return (
    <Group
      id={id}
      x={x}
      y={y}
      rotation={rotation}
      opacity={opacity}
      zIndex={zIndex}
      draggable={!locked}
      onClick={() => {
        onSelect();
      }}
      onDragStart={() => {
        onSelect();
        onDragStart();
      }}
      onDragEnd={onDragEnd}
    >
      <Rect
        width={width}
        height={height}
        fill="transparent"
        stroke={selected ? '#ff8c5a' : 'transparent'}
        strokeWidth={selected ? 2 : 0}
        strokeEnabled={selected}
      />
      <Rect
        x={width / 2 - iconSize / 2}
        y={height / 2 - iconSize / 2}
        width={iconSize}
        height={iconSize}
        cornerRadius={4}
        fill={data.color}
        opacity={0.8}
        shadowEnabled={selected}
        shadowBlur={10}
        shadowColor="#ff8c5a"
      />
    </Group>
  );
};
