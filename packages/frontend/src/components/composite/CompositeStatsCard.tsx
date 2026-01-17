import React from 'react';
import { Group, Rect, Text as KonvaText } from 'react-konva';
import type { BaseComponent, StatsCardComponentData } from '../../types';

interface CompositeStatsCardProps extends BaseComponent {
  data: StatsCardComponentData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const CompositeStatsCard: React.FC<CompositeStatsCardProps> = ({
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
  const contentWidth = width - padding * 2;

  // 趋势颜色和指示器
  const trendColor = data.trendDirection === 'up' ? '#10b981' :
                     data.trendDirection === 'down' ? '#ef4444' : '#94a3b8';
  const trendArrow = data.trendDirection === 'up' ? '↑' :
                      data.trendDirection === 'down' ? '↓' : '→';

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
        cornerRadius={12}
        shadowEnabled={selected}
        shadowBlur={10}
        shadowColor="#ff8c5a"
      />

      {/* 标签 */}
      <KonvaText
        x={padding}
        y={padding}
        width={contentWidth}
        text="Total Revenue"
        fontSize={13}
        fontFamily="Inter"
        fontWeight="500"
        fill={data.labelColor || '#94a3b8'}
        align="left"
      />

      {/* 数值 */}
      <KonvaText
        x={padding}
        y={padding + 28}
        width={contentWidth}
        text="¥1,234,567"
        fontSize={28}
        fontFamily="Inter"
        fontWeight="700"
        fill={data.valueColor || '#ffffff'}
        align="left"
      />

      {/* 趋势指示器 */}
      <Group x={padding} y={padding + 70}>
        <Rect
          width={100}
          height={28}
          fill={trendColor}
          opacity={0.15}
          cornerRadius={8}
        />
        <KonvaText
          x={50}
          y={4}
          width={100}
          text={`${trendArrow} ${Math.abs(data.trendPercentage)}%`}
          fontSize={14}
          fontFamily="Inter"
          fontWeight="600"
          fill={trendColor}
          align="center"
        />
      </Group>

      {/* Sparkline占位符 */}
      {data.showSparkline && (
        <Rect
          x={padding}
          y={padding + 110}
          width={contentWidth}
          height={40}
          fill="rgba(255, 255, 255, 0.02)"
          cornerRadius={4}
          dash={[4, 4]}
        />
      )}
    </Group>
  );
};
