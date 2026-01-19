import React from 'react';
import { Group, Rect, Text as KonvaText } from 'react-konva';
import type { BaseComponent, InfoGridComponentData } from '../../types';

interface CompositeInfoGridProps extends BaseComponent {
  data: InfoGridComponentData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const CompositeInfoGrid: React.FC<CompositeInfoGridProps> = ({
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
  const padding = data.padding || 12;
  const spacing = data.spacing || 8;
  const rows = data.rows || 2;
  const columns = data.columns || 2;

  const cellWidth = (width - padding * 2 - spacing * (columns - 1)) / columns;
  const cellHeight = (height - padding * 2 - spacing * (rows - 1)) / rows;

  const cells = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const cellIndex = row * columns + col;
      const cellData = data.data?.[cellIndex] || {};
      const cellX = padding + col * (cellWidth + spacing);
      const cellY = padding + row * (cellHeight + spacing);

      cells.push(
        <Group key={`cell-${row}-${col}`}>
          <Rect
            x={cellX}
            y={cellY}
            width={cellWidth}
            height={cellHeight}
            fill={data.bgColor || 'rgba(255, 107, 53, 0.06)'}
            stroke={data.showBorders ? (data.borderColor || 'rgba(255, 107, 53, 0.2)') : undefined}
            strokeWidth={data.showBorders ? 1 : 0}
            cornerRadius={4}
          />
          <KonvaText
            x={cellX + 8}
            y={cellY + 8}
            width={cellWidth - 16}
            text={cellData.label || ''}
            fontSize={12}
            fontFamily="Inter"
            fill="#94a3b8"
            align="left"
          />
          <KonvaText
            x={cellX + 8}
            y={cellY + cellHeight - 24}
            width={cellWidth - 16}
            text={cellData.value || ''}
            fontSize={14}
            fontFamily="Inter"
            fontWeight="600"
            fill="#ffffff"
            align="left"
          />
        </Group>
      );
    }
  }

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
        fill="transparent"
        stroke={selected ? '#ff8c5a' : 'rgba(255, 255, 255, 0.1)'}
        strokeWidth={selected ? 3 : 1}
        cornerRadius={8}
        shadowEnabled={selected}
        shadowBlur={10}
        shadowColor="#ff8c5a"
      />
      {cells}
    </Group>
  );
};
