import React from 'react';
import { Group, Rect, Line } from 'react-konva';
import type { BaseComponent } from '../../types';

interface BarcodeComponentData {
  content: string;
  barcodeType: 'CODE128' | 'EAN13' | 'EAN8' | 'UPC';
  width: number;
  height: number;
  showText: boolean;
  barColor: string;
  backgroundColor: string;
  fontSize: number;
}

interface AtomicBarcodeProps extends BaseComponent {
  data: BarcodeComponentData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

// 简化的条形码生成（模拟）
const generateBarcodePattern = (content: string, width: number): Array<{x: number, width: number}> => {
  const bars: Array<{x: number, width: number}> = [];
  const seed = content.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const numBars = Math.max(10, content.length * 2);
  let currentX = 10;

  // 边界条（固定）
  bars.push({ x: 10, width: 2 });
  currentX = 12;

  // 数据条（基于内容生成）
  for (let i = 0; i < numBars - 2; i++) {
    const barWidth = ((seed + i * 13) % 3) + 1;
    const gapWidth = ((seed + i * 7) % 4) + 2;

    if (currentX + barWidth + gapWidth <= width - 10) {
      bars.push({ x: currentX, width: barWidth });
      currentX += barWidth + gapWidth;
    }
  }

  // 边界条（固定）
  bars.push({ x: width - 12, width: 2 });

  return bars;
};

export const AtomicBarcode: React.FC<AtomicBarcodeProps> = ({
  id,
  x,
  y,
  width,
  height,
  rotation,
  opacity,
  zIndex,
  locked,
  data,
  onDragStart,
  onDragEnd,
  onSelect,
}) => {
  const bars = generateBarcodePattern(data.content || '1234567890', width);
  const barcodeHeight = data.showText ? height - 25 : height;
  const barColor = data.barColor || '#000000';
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
        stroke="#e0e0e0"
        strokeWidth={1}
        cornerRadius={4}
      />

      {/* 条形码 */}
      {bars.map((bar, index) => (
        <Rect
          key={index}
          x={bar.x}
          y={data.showText ? 10 : 5}
          width={bar.width}
          height={barcodeHeight - (data.showText ? 10 : 10)}
          fill={barColor}
        />
      ))}

      {/* 文字标签 */}
      {data.showText && (
        <>
          <Line
            points={[10, barcodeHeight, width - 10, barcodeHeight]}
            stroke={barColor}
            strokeWidth={2}
          />
          <Group
            x={width / 2}
            y={barcodeHeight + 2}
          >
            {data.content.split('').map((_char, index) => {
              const totalWidth = data.content.length * 8;
              const offsetX = -totalWidth / 2 + index * 8 + 4;
              return (
                <Rect
                  key={index}
                  x={offsetX}
                  y={0}
                  width={6}
                  height={12}
                  fill={barColor}
                />
              );
            })}
          </Group>
        </>
      )}
    </Group>
  );
};
