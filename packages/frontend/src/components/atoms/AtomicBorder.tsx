import React from 'react';
import { Rect } from 'react-konva';
import type { BaseComponent } from '../../types';

interface BorderComponentData {
  borderColor: string;
  borderWidth: number;
  cornerRadius: number;
  style: 'solid' | 'dashed' | 'dotted' | 'double';
  position: 'inside' | 'outside' | 'center';
}

interface AtomicBorderProps extends BaseComponent {
  data: BorderComponentData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const AtomicBorder: React.FC<AtomicBorderProps> = ({
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
  const getDashArray = () => {
    switch (data.style) {
      case 'dashed':
        return [8, 4];
      case 'dotted':
        return [2, 4];
      case 'double':
        return undefined; // 双线需要特殊处理
      default:
        return undefined;
    }
  };

  const strokeWidth = data.style === 'double' ? data.borderWidth * 3 : data.borderWidth;

  return (
    <Rect
      id={id}
      x={x}
      y={y}
      width={width}
      height={height}
      rotation={rotation}
      opacity={opacity}
      zIndex={zIndex}
      draggable={!locked}
      stroke={selected ? '#ff8c5a' : data.borderColor}
      strokeWidth={selected ? 2 : strokeWidth}
      cornerRadius={data.cornerRadius || 0}
      dash={selected ? [5, 5] : getDashArray()}
      onClick={(e: any) => {
        e.cancelBubble = true;
        onSelect(e);
      }}
      onDragStart={() => {
        onDragStart();
      }}
      onDragEnd={onDragEnd}
    />
  );
};
