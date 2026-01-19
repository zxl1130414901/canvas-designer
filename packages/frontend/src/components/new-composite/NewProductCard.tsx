import React from 'react';
import { Group, Rect, Text as KonvaText, Tag as KonvaTag } from 'react-konva';
import type { BaseComponent, ProductCardData } from '../../types';

interface ProductCardProps extends BaseComponent {
  data: ProductCardData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const NewProductCard: React.FC<ProductCardProps> = ({
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
  const imageHeight = 120;

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
      <Rect
        width={width}
        height={height}
        fill={data.bgColor || 'rgba(255, 255, 255, 0.05)'}
        stroke={selected ? '#ff8c5a' : 'rgba(255, 255, 255, 0.15)'}
        strokeWidth={selected ? 3 : 1}
        cornerRadius={16}
        shadowEnabled={selected}
        shadowBlur={selected ? 15 : 0}
        shadowColor="#ff8c5a"
      />

      <Rect
        x={padding}
        y={padding}
        width={width - padding * 2}
        height={imageHeight}
        fill="rgba(255, 255, 255, 0.08)"
        cornerRadius={12}
      />

      <KonvaText
        x={padding}
        y={padding + imageHeight + 12}
        width={width - padding * 2 - 80}
        text={data.title || ''}
        fontSize={16}
        fontFamily="Inter"
        fontWeight="600"
        fill={data.titleColor || '#ffffff'}
        align="left"
      />

      <KonvaText
        x={padding}
        y={padding + imageHeight + 36}
        width={width - padding * 2}
        text={`${data.price || ''}${data.originalPrice ? ` ${data.originalPrice}` : ''}`}
        fontSize={20}
        fontFamily="Inter"
        fontWeight="700"
        fill={data.priceColor || '#10b981'}
        align="left"
      />

      {data.originalPrice && (
        <KonvaText
          x={padding + (data.price?.length || 0) * 14 + 8}
          y={padding + imageHeight + 36}
          text={data.originalPrice}
          fontSize={14}
          fontFamily="Inter"
          fontWeight="400"
          fill="rgba(255,255,255,0.4)"
          align="left"
          textDecoration="line-through"
        />
      )}

      {data.badge && (
        <KonvaTag
          x={width - padding - 60}
          y={padding + imageHeight + 12}
          text={data.badge.text}
          fontSize={11}
          fontFamily="Inter"
          fontWeight="bold"
          fill={data.badge.color}
          padding={6}
          cornerRadius={8}
        />
      )}

      {data.buttonText && (
        <Group x={padding} y={height - 44}>
          <Rect
            width={width - padding * 2}
            height={32}
            fill={data.buttonColor || '#3b82f6'}
            cornerRadius={8}
          />
          <KonvaText
            x={0}
            y={8}
            width={width - padding * 2}
            text={data.buttonText}
            fontSize={13}
            fontFamily="Inter"
            fontWeight="600"
            fill="#ffffff"
            align="center"
          />
        </Group>
      )}
    </Group>
  );
};
