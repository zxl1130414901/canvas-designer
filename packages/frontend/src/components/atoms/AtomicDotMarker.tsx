import React from 'react';
import { Circle, Group, Rect } from 'react-konva';
import type { BaseComponent } from '../../types';

interface DotMarkerComponentData {
  dotColor: string;
  dotSize: number;
  label?: string;
  labelColor: string;
  labelPosition: 'top' | 'bottom' | 'left' | 'right';
  filled: boolean;
  borderColor?: string;
  borderWidth?: number;
}

interface AtomicDotMarkerProps extends BaseComponent {
  data: DotMarkerComponentData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const AtomicDotMarker: React.FC<AtomicDotMarkerProps> = ({
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
  const dotRadius = (data.dotSize || 8) / 2;

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
        e.cancelBubble = true;
        onSelect(e);
      }}
      onDragStart={() => {
        onDragStart();
      }}
      onDragEnd={onDragEnd}
    >
      {/* 圆点 */}
      <Circle
        x={width / 2}
        y={height / 2}
        radius={dotRadius}
        fill={data.filled ? data.dotColor : 'transparent'}
        stroke={selected ? '#ff8c5a' : (data.borderColor || data.dotColor)}
        strokeWidth={data.borderWidth || (selected ? 2 : (data.filled ? 0 : 2))}
      />

      {/* 标签 */}
      {data.label && (
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="transparent"
        />
      )}

      {/* 选中效果 */}
      {selected && (
        <Circle
          x={width / 2}
          y={height / 2}
          radius={dotRadius + 4}
          stroke="#ff8c5a"
          strokeWidth={1}
          dash={[3, 3]}
        />
      )}
    </Group>
  );
};
