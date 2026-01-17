import React from 'react';
import { Group, Rect, Text as KonvaText, Circle, Line as KonvaLine } from 'react-konva';
import type { BaseComponent, TimelineBlockComponentData } from '../../types';

interface CompositeTimelineBlockProps extends BaseComponent {
  data: TimelineBlockComponentData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const CompositeTimelineBlock: React.FC<CompositeTimelineBlockProps> = ({
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
  const isCenter = data.position === 'center';
  const isLeft = data.position === 'left';
  
  // 计算连接线位置
  const connectorX = isCenter ? width / 2 : isLeft ? 0 : width;
  const connectorY = height / 2;
  
  // 日期badge位置
  const dateX = isLeft ? 60 : isCenter ? width / 2 - 40 : width - 100;
  const dateY = 10;

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
      {/* 背景 */}
      <Rect
        width={width}
        height={height}
        fill="rgba(255, 107, 53, 0.08)"
        stroke={selected ? '#ff8c5a' : 'rgba(255, 107, 53, 0.25)'}
        strokeWidth={selected ? 3 : 1.5}
        cornerRadius={8}
        shadowEnabled={selected}
        shadowBlur={10}
        shadowColor="#ff8c5a"
      />

      {/* 连接线 */}
      {data.showConnector && (
        <KonvaLine
          points={[connectorX, connectorY, connectorX, height]}
          stroke={data.connectorColor || '#94a3b8'}
          strokeWidth={2}
        />
      )}

      {/* 连接点 */}
      {data.showConnector && (
        <Circle
          x={connectorX}
          y={connectorY}
          radius={6}
          fill={data.connectorColor || '#94a3b8'}
          stroke={selected ? '#ff8c5a' : undefined}
          strokeWidth={selected ? 2 : 0}
        />
      )}

      {/* 日期Badge */}
      <Rect
        x={dateX}
        y={dateY}
        width={80}
        height={24}
        fill={data.dateColor || '#ff8c5a'}
        cornerRadius={12}
      />
      <KonvaText
        x={dateX}
        y={dateY + 4}
        width={80}
        text="2024-01"
        fontSize={12}
        fontFamily="Inter"
        fontWeight="600"
        fill="#ffffff"
        align="center"
      />

      {/* 图标 */}
      {data.showIcon && (
        <Circle
          x={isLeft ? 24 : isCenter ? width / 2 : width - 24}
          y={height - 24}
          radius={16}
          fill="rgba(255, 255, 255, 0.1)"
          stroke="#94a3b8"
          strokeWidth={1}
        />
      )}

      {/* 事件标题 */}
      <KonvaText
        x={padding}
        y={dateY + 36}
        width={width - padding * 2}
        text="Timeline Event"
        fontSize={16}
        fontFamily="Inter"
        fontWeight="600"
        fill="#ffffff"
        align="left"
      />

      {/* 事件描述 */}
      <KonvaText
        x={padding}
        y={dateY + 60}
        width={width - padding * 2}
        text="Event description goes here with more details"
        fontSize={13}
        fontFamily="Inter"
        fill="#94a3b8"
        align="left"
      />
    </Group>
  );
};
