import React from 'react';
import { Group, Rect, Text as KonvaText } from 'react-konva';
import type { BaseComponent } from '../../types';

interface CountdownComponentData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  separatorColor: string;
  numberColor: string;
  labelColor: string;
  showLabels: boolean;
  backgroundColor: string;
  cornerRadius: number;
}

interface AtomicCountdownProps extends BaseComponent {
  data: CountdownComponentData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const AtomicCountdown: React.FC<AtomicCountdownProps> = ({
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
  const padding = 12;
  const itemWidth = (width - padding * 2) / 4;
  const itemHeight = height - padding * 2 - (data.showLabels ? 20 : 0);
  
  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  const renderTimeItem = (value: number, label: string, index: number) => (
    <Group key={index}>
      {/* 背景 */}
      <Rect
        x={padding + index * itemWidth}
        y={padding}
        width={itemWidth - 8}
        height={itemHeight}
        fill={data.backgroundColor || 'rgba(255, 107, 53, 0.1)'}
        cornerRadius={data.cornerRadius || 8}
      />

      {/* 数字 */}
      <KonvaText
        x={padding + index * itemWidth}
        y={padding + 4}
        width={itemWidth - 8}
        text={formatNumber(value)}
        fontSize={Math.min(itemHeight - 16, 32)}
        fontFamily="Inter"
        fontWeight="bold"
        fill={data.numberColor || '#ffffff'}
        align="center"
      />

      {/* 标签 */}
      {data.showLabels && (
        <KonvaText
          x={padding + index * itemWidth}
          y={padding + itemHeight - 16}
          width={itemWidth - 8}
          text={label}
          fontSize={10}
          fontFamily="Inter"
          fill={data.labelColor || '#94a3b8'}
          align="center"
        />
      )}
    </Group>
  );

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
      {/* 时间段 */}
      {renderTimeItem(data.days || 0, '天', 0)}
      {renderTimeItem(data.hours || 0, '时', 1)}
      {renderTimeItem(data.minutes || 0, '分', 2)}
      {renderTimeItem(data.seconds || 0, '秒', 3)}

      {/* 选中边框 */}
      {selected && (
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          stroke="#ff8c5a"
          strokeWidth={2}
          dash={[5, 5]}
          cornerRadius={4}
        />
      )}
    </Group>
  );
};
