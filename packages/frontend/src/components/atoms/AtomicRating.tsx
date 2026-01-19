import React from 'react';
import { Group, Star, Text as KonvaText } from 'react-konva';
import type { BaseComponent } from '../../types';

interface RatingComponentData {
  rating: number; // 0-5
  maxStars: number;
  starColor: string;
  emptyColor: string;
  showLabel: boolean;
  labelText: string;
  labelColor: string;
  starSize: number;
}

interface AtomicRatingProps extends BaseComponent {
  data: RatingComponentData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const AtomicRating: React.FC<AtomicRatingProps> = ({
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
  const starSize = data.starSize || 24;
  const starSpacing = starSize + 4;
  const totalWidth = (data.maxStars || 5) * starSpacing;
  const centerX = (width - totalWidth) / 2;

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < (data.maxStars || 5); i++) {
      const isFilled = i < Math.floor(data.rating);
      const isHalf = !isFilled && i < data.rating;
      
      stars.push(
        <Star
          key={i}
          x={centerX + i * starSpacing + starSize / 2}
          y={height / 2}
          numPoints={5}
          innerRadius={starSize / 3}
          outerRadius={starSize / 2}
          fill={isFilled || isHalf ? data.starColor || '#fbbf24' : data.emptyColor || 'rgba(255, 255, 255, 0.2)'}
          stroke={selected ? '#ff8c5a' : undefined}
          strokeWidth={selected ? 2 : 0}
        />
      );
    }
    return stars;
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
      {/* 星星 */}
      {renderStars()}

      {/* 标签 */}
      {data.showLabel && data.labelText && (
        <KonvaText
          x={0}
          y={height - 16}
          width={width}
          text={data.labelText}
          fontSize={12}
          fontFamily="Inter"
          fill={data.labelColor || '#94a3b8'}
          align="center"
        />
      )}

      {/* 选中边框 */}
      {selected && (
        <Group>
          <KonvaText
            x={-2}
            y={-2}
            width={width + 4}
            height={height + 4}
            text=""
            stroke="#ff8c5a"
            strokeWidth={2}
            dash={[5, 5]}
          />
        </Group>
      )}
    </Group>
  );
};
