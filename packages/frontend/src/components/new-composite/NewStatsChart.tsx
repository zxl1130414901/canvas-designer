import React from 'react';
import { Group, Rect, Text as KonvaText } from 'react-konva';
import type { BaseComponent, StatsChartData } from '../../types';

interface StatsChartProps extends BaseComponent {
  data: StatsChartData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const NewStatsChart: React.FC<StatsChartProps> = ({
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
  const chartHeight = 100;
  const chartWidth = width - padding * 2;

  const maxValue = Math.max(...data.data.map(d => d.value), 1);
  const barCount = data.data.length;
  const barWidth = (chartWidth - (barCount - 1) * 8) / barCount;
  const defaultColors = ['#ff8c5a', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  const getBarColor = (index: number) => {
    if (data.data[index].color) return data.data[index].color;
    if (data.colors && data.colors[index]) return data.colors[index];
    return defaultColors[index % defaultColors.length];
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
        fill={data.bgColor || 'rgba(255, 255, 255, 0.03)'}
        stroke={selected ? '#ff8c5a' : 'rgba(255, 255, 255, 0.1)'}
        strokeWidth={selected ? 3 : 1}
        cornerRadius={12}
        shadowEnabled={selected}
        shadowBlur={selected ? 15 : 0}
        shadowColor="#ff8c5a"
      />

      {data.labels.map((label, index) => {
        const barHeight = (data.data[index].value / maxValue) * chartHeight;
        const barX = padding + index * (barWidth + 8);
        const barY = padding + chartHeight - barHeight;

        return (
          <Group key={index}>
            <Rect
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill={getBarColor(index)}
              cornerRadius={[4, 4, 0, 0]}
            />
            <KonvaText
              x={barX}
              y={padding + chartHeight + 8}
              width={barWidth}
              text={label}
              fontSize={11}
              fontFamily="Inter"
              fontWeight="400"
              fill={data.labelColor || 'rgba(255,255,255,0.6)'}
              align="center"
            />
            {data.showValues && (
              <KonvaText
                x={barX}
                y={barY - 18}
                width={barWidth}
                text={data.data[index].value.toString()}
                fontSize={11}
                fontFamily="Inter"
                fontWeight="600"
                fill={data.valueColor || '#ffffff'}
                align="center"
              />
            )}
          </Group>
        );
      })}
    </Group>
  );
};
