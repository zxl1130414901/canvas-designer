import React from 'react';
import { Group, Rect, Text as KonvaText } from 'react-konva';
import type { BaseComponent, QRCodeComponentData } from '../../types';

interface AtomicQRCodeProps extends BaseComponent {
  data: QRCodeComponentData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

// 简化的二维码生成函数（模拟）
const generateQRPattern = (content: string, _size: number): number[][] => {
  const cells = 21; // 标准二维码21x21网格
  const pattern: number[][] = [];
  const seed = content.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  for (let i = 0; i < cells; i++) {
    pattern[i] = [];
    for (let j = 0; j < cells; j++) {
      // 三个定位点 (左上、右上、左下)
      const isTopLeft = i < 7 && j < 7;
      const isTopRight = i < 7 && j >= cells - 7;
      const isBottomLeft = i >= cells - 7 && j < 7;

      // 定位点内部7x7
      const isPositionMarker = isTopLeft || isTopRight || isBottomLeft;
      const isInnerMarker =
        (i >= 2 && i <= 4 && j >= 2 && j <= 4) ||
        (i >= 2 && i <= 4 && j >= cells - 5 && j <= cells - 3) ||
        (i >= cells - 5 && i <= cells - 3 && j >= 2 && j <= 4);

      if (isPositionMarker && !isInnerMarker) {
        pattern[i][j] = 1;
      } else if (isInnerMarker) {
        pattern[i][j] = 0;
      } else {
        // 数据区域基于内容hash
        pattern[i][j] = ((seed + i * cells + j) % 3) === 0 ? 1 : 0;
      }
    }
  }
  return pattern;
};

export const AtomicQRCode: React.FC<AtomicQRCodeProps> = ({
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
  const pattern = generateQRPattern(data.content || 'QR Code', 21);
  const cellSize = Math.min(width, height) / 21;
  const offsetX = (width - cellSize * 21) / 2;
  const offsetY = (height - cellSize * 21) / 2;

  const foregroundColor = data.foregroundColor || '#000000';
  const backgroundColor = data.backgroundColor || '#ffffff';

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
      {/* 背景 */}
      <Rect
        width={width}
        height={height}
        fill={backgroundColor}
        stroke={selected ? '#ff8c5a' : '#e0e0e0'}
        strokeWidth={selected ? 2 : 1}
      />

      {/* 二维码图案 */}
      {pattern.map((row, i) =>
        row.map((cell, j) =>
          cell === 1 ? (
            <Rect
              key={`${i}-${j}`}
              x={offsetX + j * cellSize}
              y={offsetY + i * cellSize}
              width={cellSize}
              height={cellSize}
              fill={foregroundColor}
            />
          ) : null
        )
      )}

      {/* 占位文字（空内容时） */}
      {!data.content && (
        <KonvaText
          x={width / 2}
          y={height / 2}
          text="QR Code"
          fontSize={12}
          fontFamily="Inter"
          fill={foregroundColor}
          align="center"
          offsetX={30}
          offsetY={6}
        />
      )}
    </Group>
  );
};
