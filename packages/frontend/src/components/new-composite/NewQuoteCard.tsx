import React from 'react';
import { Group, Rect, Text as KonvaText, Line as KonvaLine } from 'react-konva';
import type { BaseComponent, QuoteCardData } from '../../types';

interface QuoteCardProps extends BaseComponent {
  data: QuoteCardData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const NewQuoteCard: React.FC<QuoteCardProps> = ({
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
  const padding = 20;

  const renderQuoteMark = () => {
    if (data.style === 'icon' && data.icon) {
      return (
        <KonvaText
          x={padding - 5}
          y={padding - 5}
          text={data.icon}
          fontSize={32}
          fill={data.quoteColor || 'rgba(255, 107, 53, 0.3)'}
        />
      );
    }
    return (
      <KonvaText
        x={padding - 5}
        y={padding - 5}
        text='"'
        fontSize={48}
        fontFamily="Georgia"
        fill={data.quoteColor || 'rgba(255, 107, 53, 0.4)'}
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
      {data.style === 'border' && (
        <Rect
          width={width}
          height={height}
          fill="transparent"
          stroke={data.borderColor || 'rgba(255, 107, 53, 0.3)'}
          strokeWidth={2}
          cornerRadius={12}
        />
      )}

      <Rect
        width={data.style === 'border' ? width - 8 : width}
        height={data.style === 'border' ? height - 8 : height}
        x={data.style === 'border' ? 4 : 0}
        y={data.style === 'border' ? 4 : 0}
        fill={data.bgColor || 'rgba(255, 107, 53, 0.08)'}
        stroke={selected ? '#ff8c5a' : 'transparent'}
        strokeWidth={selected ? 3 : 0}
        cornerRadius={data.style === 'border' ? 8 : 12}
        shadowEnabled={selected}
        shadowBlur={selected ? 15 : 0}
        shadowColor="#ff8c5a"
      />

      {renderQuoteMark()}

      <KonvaText
        x={padding + 20}
        y={padding}
        width={width - padding * 2 - 20}
        text={data.quote || ''}
        fontSize={16}
        fontFamily="Georgia"
        fontStyle="italic"
        fill={data.quoteColor || '#ffffff'}
        align="left"
        lineHeight={1.6}
      />

      {data.author && (
        <Group>
          <KonvaLine
            points={[padding, height - 40, padding + 30, height - 40]}
            stroke={data.borderColor || 'rgba(255, 107, 53, 0.5)'}
            strokeWidth={2}
          />
          <KonvaText
            x={padding + 40}
            y={height - 48}
            width={width - padding * 2 - 40}
            text={data.author}
            fontSize={13}
            fontFamily="Inter"
            fontWeight="500"
            fill={data.authorColor || 'rgba(255, 255, 255, 0.8)'}
            align="left"
          />
          {data.source && (
            <KonvaText
              x={padding + 40}
              y={height - 30}
              width={width - padding * 2 - 40}
              text={data.source}
              fontSize={11}
              fontFamily="Inter"
              fontWeight="400"
              fill="rgba(255, 255, 255, 0.5)"
              align="left"
            />
          )}
        </Group>
      )}
    </Group>
  );
};
