import React from 'react';
import { Group, Rect, Text as KonvaText, Line } from 'react-konva';
import type { BaseComponent, ChartComponentData } from '../../types';

interface CompositeChartSectionProps extends BaseComponent {
  data: ChartComponentData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const CompositeChartSection: React.FC<CompositeChartSectionProps> = ({
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
  const chartHeight = height - padding * 2 - 40; // 减去标题和图例
  const chartWidth = width - padding * 2 - 60; // 减去Y轴标签
  const chartType = data.chartType || 'bar';
  const chartData = data.data || [{ label: 'A', value: 100 }, { label: 'B', value: 80 }, { label: 'C', value: 120 }];
  const colors = data.colors || ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const maxValue = Math.max(...chartData.map(d => d.value), 1);

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
      {/* 背景卡片 */}
      <Rect
        width={width}
        height={height}
        fill="rgba(255, 255, 255, 0.05)"
        stroke={selected ? '#ff8c5a' : 'rgba(255, 255, 255, 0.1)'}
        strokeWidth={selected ? 2 : 1}
        cornerRadius={8}
      />

      {/* 标题 */}
      <KonvaText
        x={padding}
        y={padding}
        text="图表区域"
        fontSize={16}
        fontFamily="Inter"
        fontWeight="bold"
        fill="#ffffff"
      />

      {/* Y轴 */}
      <Line
        points={[padding + 50, padding + 30, padding + 50, padding + 30 + chartHeight]}
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth={1}
      />

      {/* X轴 */}
      <Line
        points={[padding + 50, padding + 30 + chartHeight, width - padding - 10, padding + 30 + chartHeight]}
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth={1}
      />

      {/* 柱状图 */}
      {chartType === 'bar' && chartData.map((item, index) => {
        const barWidth = chartWidth / chartData.length - 20;
        const barHeight = (item.value / maxValue) * (chartHeight - 20);
        const x = padding + 60 + index * (chartWidth / chartData.length);
        const y = padding + 30 + chartHeight - barHeight;

        return (
          <Group key={index}>
            <Rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={colors[index % colors.length]}
              cornerRadius={4}
            />
            <KonvaText
              x={x + barWidth / 2}
              y={padding + 30 + chartHeight + 5}
              text={item.label}
              fontSize={12}
              fontFamily="Inter"
              fill="#94a3b8"
              align="center"
              offsetX={item.label.length * 3}
            />
          </Group>
        );
      })}

      {/* 饼图 */}
      {chartType === 'pie' && (
        <Group
          x={width / 2}
          y={padding + 30 + chartHeight / 2}
        >
          {chartData.map((_item, index) => {
            return (
              <Rect
                key={index}
                x={-chartWidth / 4}
                y={-chartHeight / 4}
                width={chartWidth / 2}
                height={chartHeight / 2}
                fill={colors[index % colors.length]}
                cornerRadius={4}
                rotation={index * 45}
              />
            );
          })}
        </Group>
      )}
    </Group>
  );
};
