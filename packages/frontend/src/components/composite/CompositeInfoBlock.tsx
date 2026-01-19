import React from 'react';
import { Group, Rect, Text as KonvaText } from 'react-konva';
import type { BaseComponent } from '../../types';

interface InfoBlockData {
  title: string;
  subtitle?: string;
  infoItems: Array<{label: string, value: string}>;
  bgColor: string;
  borderColor: string;
  titleColor: string;
  textColor: string;
  columns: number;
  showGrid: boolean;
}

interface CompositeInfoBlockProps extends BaseComponent {
  data: InfoBlockData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const CompositeInfoBlock: React.FC<CompositeInfoBlockProps> = ({
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
  const columns = data.columns || 2;
  const infoItems = data.infoItems || [
    { label: '项目A', value: '100' },
    { label: '项目B', value: '200' },
    { label: '项目C', value: '150' },
    { label: '项目D', value: '180' },
  ];
  const itemWidth = (width - padding * 2) / columns;
  const itemHeight = 60;
  const startY = data.subtitle ? padding + 40 : padding + 25;

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
        fill={data.bgColor || 'rgba(255, 255, 255, 0.05)'}
        stroke={selected ? '#ff8c5a' : data.borderColor || 'rgba(255, 255, 255, 0.1)'}
        strokeWidth={selected ? 2 : (data.borderColor ? 1 : 0)}
        cornerRadius={8}
      />

      {/* 标题 */}
      <KonvaText
        x={padding}
        y={padding}
        text={data.title || '信息区块'}
        fontSize={18}
        fontFamily="Inter"
        fontWeight="bold"
        fill={data.titleColor || '#ffffff'}
      />

      {/* 副标题 */}
      {data.subtitle && (
        <KonvaText
          x={padding}
          y={padding + 25}
          text={data.subtitle}
          fontSize={14}
          fontFamily="Inter"
          fill={data.textColor || '#94a3b8'}
        />
      )}

      {/* 信息项网格 */}
      {infoItems.map((item, index) => {
        const col = index % columns;
        const row = Math.floor(index / columns);
        const x = padding + col * itemWidth + 8;
        const y = startY + row * (itemHeight + 8);

        return (
          <Group key={index}>
            <Rect
              x={x}
              y={y}
              width={itemWidth - 16}
              height={itemHeight}
              fill="rgba(255, 255, 255, 0.03)"
              stroke={data.showGrid ? 'rgba(255, 255, 255, 0.1)' : undefined}
              strokeWidth={data.showGrid ? 1 : 0}
              cornerRadius={4}
            />
            <KonvaText
              x={x + 8}
              y={y + 10}
              text={item.label}
              fontSize={12}
              fontFamily="Inter"
              fill={data.textColor || '#94a3b8'}
            />
            <KonvaText
              x={x + 8}
              y={y + 35}
              text={item.value}
              fontSize={16}
              fontFamily="Inter"
              fontWeight="bold"
              fill="#ffffff"
            />
          </Group>
        );
      })}
    </Group>
  );
};
