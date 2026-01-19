import React from 'react';
import { Group, Line, Circle, Text as KonvaText } from 'react-konva';
import type { BaseComponent, SectionDividerData } from '../../types';

interface SectionDividerProps extends BaseComponent {
  data: SectionDividerData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const NewSectionDivider: React.FC<SectionDividerProps> = ({
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
  const centerY = height / 2;
  const lineLength = data.length || width;
  const startX = (width - lineLength) / 2;

  const renderLine = () => {
    if (data.style === 'gradient') {
      return (
        <Line
          points={[startX, centerY, startX + lineLength, centerY]}
          stroke={data.color}
          strokeWidth={data.thickness}
          lineCap="round"
        />
      );
    }
    return (
      <Line
        points={[startX, centerY, startX + lineLength, centerY]}
        stroke={data.color}
        strokeWidth={data.thickness}
        dash={data.style === 'dashed' ? [10, 10] : data.style === 'dotted' ? [4, 4] : undefined}
        lineCap="round"
      />
    );
  };

  const renderDots = () => {
    const dotCount = 3;
    const dotSpacing = lineLength / (dotCount - 1);
    return Array.from({ length: dotCount }).map((_, i) => (
      <Circle
        key={i}
        x={startX + i * dotSpacing}
        y={centerY}
        radius={data.thickness}
        fill={data.secondaryColor || data.color}
      />
    ));
  };

  const renderStars = () => {
    const starCount = 5;
    const starSpacing = lineLength / (starCount - 1);
    return Array.from({ length: starCount }).map((_, i) => (
      <KonvaText
        key={i}
        x={startX + i * starSpacing - 8}
        y={centerY - 8}
        text="✦"
        fontSize={16}
        fill={data.secondaryColor || data.color}
      />
    ));
  };

  const renderWave = () => {
    const waveWidth = 20;
    const waveCount = Math.floor(lineLength / waveWidth);
    const points: number[] = [];
    for (let i = 0; i <= waveCount; i++) {
      points.push(startX + i * waveWidth);
      points.push(centerY + (i % 2 === 0 ? -data.thickness : data.thickness));
    }
    return (
      <Line
        points={points}
        stroke={data.color}
        strokeWidth={data.thickness}
        tension={0.5}
        lineCap="round"
      />
    );
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
      {selected && (
        <Line
          points={[startX, centerY, startX + lineLength, centerY]}
          stroke="#ff8c5a"
          strokeWidth={data.thickness + 4}
          opacity={0.3}
        />
      )}

      {data.style === 'line' && renderLine()}
      {data.style === 'dashed' && renderLine()}
      {data.style === 'dotted' && renderLine()}
      {data.style === 'gradient' && renderLine()}
      {data.style === 'dots' && renderDots()}
      {data.style === 'stars' && renderStars()}
      {data.style === 'wave' && renderWave()}
    </Group>
  );
};
