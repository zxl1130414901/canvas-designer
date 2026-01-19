import React from 'react';
import { Rect } from 'react-konva';
import type { BaseComponent } from '../../types';

interface BackgroundComponentData {
  fillColor: string;
  cornerRadius: number;
  gradientColors?: string[];
  gradientDirection?: 'horizontal' | 'vertical';
  opacity: number;
  borderColor?: string;
  borderWidth?: number;
}

interface AtomicBackgroundProps extends BaseComponent {
  data: BackgroundComponentData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const AtomicBackground: React.FC<AtomicBackgroundProps> = ({
  id,
  x,
  y,
  width,
  height,
  rotation,
  opacity: compOpacity,
  zIndex,
  selected,
  locked,
  data,
  onDragStart,
  onDragEnd,
  onSelect,
}) => {
  // 处理渐变
  const getFill = () => {
    if (data.gradientColors && data.gradientColors.length >= 2) {
      // Konva 不直接支持多色渐变，这里用第一个颜色
      // 实际项目中可以使用 Konva 的 LinearGradient
      return data.gradientColors[0] || data.fillColor;
    }
    return data.fillColor;
  };

  return (
    <Rect
      id={id}
      x={x}
      y={y}
      width={width}
      height={height}
      rotation={rotation}
      opacity={compOpacity * (data.opacity || 1)}
      zIndex={zIndex}
      draggable={!locked}
      fill={getFill()}
      cornerRadius={data.cornerRadius || 0}
      stroke={selected ? '#ff8c5a' : data.borderColor}
      strokeWidth={selected ? 2 : (data.borderWidth || 0)}
      dash={selected ? [5, 5] : undefined}
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
