import React from 'react';
import { Group, Rect, Text as KonvaText, Circle, Line as KonvaLine } from 'react-konva';
import type { BaseComponent, TimelineData } from '../../types';

interface TimelineProps extends BaseComponent {
  data: TimelineData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const NewTimeline: React.FC<TimelineProps> = ({
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
  const padding = 16;
  const lineX = padding + 40;

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
      <Rect
        width={width}
        height={height}
        fill={data.bgColor || 'transparent'}
        stroke={selected ? '#ff8c5a' : 'transparent'}
        strokeWidth={selected ? 3 : 0}
        cornerRadius={8}
        shadowEnabled={selected}
        shadowBlur={selected ? 15 : 0}
        shadowColor="#ff8c5a"
      />

      <KonvaLine
        points={[lineX, padding, lineX, height - padding]}
        stroke={data.lineColor || 'rgba(255, 255, 255, 0.2)'}
        strokeWidth={2}
      />

      <Circle
        x={lineX}
        y={padding + 20}
        radius={8}
        fill={data.dotColor || '#ff8c5a'}
        stroke={selected ? '#ff8c5a' : undefined}
        strokeWidth={selected ? 2 : 0}
      />

      <Rect
        x={padding}
        y={padding}
        width={70}
        height={24}
        fill={data.dateColor || '#ff8c5a'}
        cornerRadius={12}
      />
      <KonvaText
        x={padding}
        y={padding + 4}
        width={70}
        text={data.date || ''}
        fontSize={11}
        fontFamily="Inter"
        fontWeight="600"
        fill="#ffffff"
        align="center"
      />

      {data.time && (
        <KonvaText
          x={padding + 78}
          y={padding + 4}
          text={data.time}
          fontSize={11}
          fontFamily="Inter"
          fontWeight="400"
          fill={data.dateColor || 'rgba(255,255,255,0.6)'}
          align="left"
        />
      )}

      <KonvaText
        x={lineX + 20}
        y={padding + 16}
        width={width - lineX - padding - 20}
        text={data.title || ''}
        fontSize={15}
        fontFamily="Inter"
        fontWeight="600"
        fill={data.titleColor || '#ffffff'}
        align="left"
      />

      {data.description && (
        <KonvaText
          x={lineX + 20}
          y={padding + 40}
          width={width - lineX - padding - 20}
          text={data.description}
          fontSize={13}
          fontFamily="Inter"
          fontWeight="400"
          fill={data.descColor || 'rgba(255,255,255,0.6)'}
          align="left"
        />
      )}
    </Group>
  );
};
