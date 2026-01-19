import React from 'react';
import { Group, Rect, Text as KonvaText } from 'react-konva';
import type { BaseComponent, CalloutBoxComponentData } from '../../types';

interface CompositeCalloutBoxProps extends BaseComponent {
  data: CalloutBoxComponentData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

// 预定义颜色方案
const variantColors = {
  info: {
    bg: 'rgba(59, 130, 246, 0.15)',
    border: 'rgba(59, 130, 246, 0.5)',
    text: '#3b82f6'
  },
  warning: {
    bg: 'rgba(245, 158, 11, 0.15)',
    border: 'rgba(245, 158, 11, 0.5)',
    text: '#f59e0b'
  },
  error: {
    bg: 'rgba(239, 68, 68, 0.15)',
    border: 'rgba(239, 68, 68, 0.5)',
    text: '#ef4444'
  },
  success: {
    bg: 'rgba(16, 185, 129, 0.15)',
    border: 'rgba(16, 185, 129, 0.5)',
    text: '#10b981'
  }
};

export const CompositeCalloutBox: React.FC<CompositeCalloutBoxProps> = ({
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
  const colors = variantColors[data.variant];
  const padding = data.padding || 16;

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
        e.cancelBubble = true; // Stop event propagation to prevent multiple selection
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
        fill={colors.bg}
        stroke={selected ? '#ff8c5a' : colors.border}
        strokeWidth={selected ? 3 : 1}
        cornerRadius={data.borderRadius || 8}
        shadowEnabled={selected}
        shadowBlur={10}
        shadowColor="#ff8c5a"
      />

      {/* 标题 */}
      <KonvaText
        x={padding}
        y={padding}
        width={width - padding * 2}
        text={`${data.variant.toUpperCase()}`}
        fontSize={14}
        fontFamily="Inter"
        fontWeight="700"
        fill={colors.text}
        align="center"
      />

      {/* 内容 */}
      <KonvaText
        x={padding}
        y={padding + 24}
        width={width - padding * 2}
        text={data.content || ''}
        fontSize={13}
        fontFamily="Inter"
        fill="#94a3b8"
        align="center"
      />
    </Group>
  );
};
