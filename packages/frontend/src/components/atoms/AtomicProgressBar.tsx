import React from 'react';
import { Group, Rect, Text as KonvaText } from 'react-konva';
import type { BaseComponent } from '../../types';

interface ProgressBarComponentData {
  progress: number; // 0-100
  barColor: string;
  backgroundColor: string;
  showLabel: boolean;
  labelColor: string;
  barHeight: number;
  borderRadius: number;
}

interface AtomicProgressBarProps extends BaseComponent {
  data: ProgressBarComponentData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const AtomicProgressBar: React.FC<AtomicProgressBarProps> = ({
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
  const barWidth = Math.min(data.progress, 100) / 100 * width;
  const barHeight = Math.min(data.barHeight || 20, height);

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
      {/* 背景条 */}
      <Rect
        width={width}
        height={barHeight}
        fill={data.backgroundColor || 'rgba(255, 255, 255, 0.1)'}
        cornerRadius={data.borderRadius || 4}
      />
      
      {/* 进度条 */}
      <Rect
        width={barWidth}
        height={barHeight}
        fill={data.barColor || '#ff6b35'}
        cornerRadius={data.borderRadius || 4}
      />

      {/* 标签 */}
      {data.showLabel && (
        <KonvaText
          x={0}
          y={barHeight + 4}
          width={width}
          text={`${data.progress}%`}
          fontSize={12}
          fontFamily="Inter"
          fill={data.labelColor || '#94a3b8'}
          align="center"
        />
      )}

      {/* 选中边框 */}
      {selected && (
        <Rect
          x={-2}
          y={-2}
          width={width + 4}
          height={height + 4}
          stroke="#ff8c5a"
          strokeWidth={2}
          dash={[5, 5]}
          cornerRadius={4}
        />
      )}
    </Group>
  );
};
