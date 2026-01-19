import React from 'react';
import { Group, Rect, Text as KonvaText } from 'react-konva';
import type { BaseComponent, DataCardData } from '../../types';

interface DataCardProps extends BaseComponent {
  data: DataCardData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const NewDataCard: React.FC<DataCardProps> = ({
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
  const padding = 20;

  const trendColor = data.trend?.color ||
    (data.trend?.direction === 'up' ? '#10b981' :
     data.trend?.direction === 'down' ? '#ef4444' : '#94a3b8');

  const trendIcon = data.trend?.direction === 'up' ? '↑' :
                    data.trend?.direction === 'down' ? '↓' : '→';

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
        fill={data.bgColor || 'rgba(16, 185, 129, 0.1)'}
        stroke={selected ? '#ff8c5a' : 'rgba(16, 185, 129, 0.3)'}
        strokeWidth={selected ? 3 : 1.5}
        cornerRadius={12}
        shadowEnabled={selected}
        shadowBlur={selected ? 15 : 0}
        shadowColor="#ff8c5a"
      />

      <KonvaText
        x={padding}
        y={padding}
        width={width - padding * 2 - 80}
        text={data.label || ''}
        fontSize={14}
        fontFamily="Inter"
        fontWeight="500"
        fill={data.labelColor || '#94a3b8'}
        align="left"
      />

      <KonvaText
        x={padding}
        y={padding + 28}
        width={width - padding * 2}
        text={`${data.value || ''}${data.unit || ''}`}
        fontSize={32}
        fontFamily="Inter"
        fontWeight="700"
        fill={data.valueColor || '#ffffff'}
        align="left"
      />

      {data.trend && (
        <Group x={padding} y={padding + 70}>
          <Rect
            width={data.trend.value.length * 10 + 40}
            height={28}
            fill={trendColor}
            opacity={0.15}
            cornerRadius={8}
          />
          <KonvaText
            x={20}
            y={6}
            width={data.trend.value.length * 10 + 20}
            text={`${trendIcon} ${data.trend.value}`}
            fontSize={14}
            fontFamily="Inter"
            fontWeight="600"
            fill={trendColor}
            align="center"
          />
        </Group>
      )}
    </Group>
  );
};
