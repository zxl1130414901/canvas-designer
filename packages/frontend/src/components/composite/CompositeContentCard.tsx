import React from 'react';
import { Group, Rect, Text as KonvaText, Tag as KonvaTag } from 'react-konva';
import type { BaseComponent, ContentCardComponentData } from '../../types';

interface CompositeContentCardProps extends BaseComponent {
  data: ContentCardComponentData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const CompositeContentCard: React.FC<CompositeContentCardProps> = ({
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
  const padding = data.padding || 16;
  const borderRadius = data.borderRadius || 12;

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
      {/* 背景 */}
      <Rect
        width={width}
        height={height}
        fill={data.bgColor || 'rgba(255, 107, 53, 0.12)'}
        stroke={selected ? '#ff8c5a' : data.borderColor || 'rgba(255, 107, 53, 0.3)'}
        strokeWidth={selected ? 3 : 1.5}
        cornerRadius={borderRadius}
        shadowEnabled={selected}
        shadowBlur={10}
        shadowColor="#ff8c5a"
      />

      {/* 标题 */}
      <KonvaText
        x={padding}
        y={padding}
        width={width - padding * 2}
        text={data.title || ''}
        fontSize={18}
        fontFamily="Inter"
        fontWeight="600"
        fill="#ffffff"
        align="left"
      />

      {/* 副标题 */}
      {(data.subtitle || data.showBadge) && (
        <KonvaText
          x={padding}
          y={padding + 28}
          width={width - padding * 2 - (data.showBadge ? 70 : 0)}
          text={data.subtitle || ''}
          fontSize={14}
          fontFamily="Inter"
          fill="#94a3b8"
          align="left"
        />
      )}

      {/* Badge */}
      {data.showBadge && (
        <KonvaTag
          x={width - padding - 50}
          y={padding}
          text={data.badgeText || 'NEW'}
          fontSize={12}
          fontFamily="Inter"
          fontWeight="bold"
          fill="#ff8c5a"
          padding={6}
          cornerRadius={12}
          lineHeight={1.2}
        />
      )}

      {/* 图片占位区域 */}
      <Rect
        x={padding}
        y={padding + 60}
        width={width - padding * 2}
        height={height - padding * 2 - 80}
        fill="rgba(59, 130, 246, 0.2)"
        cornerRadius={8}
        dash={[4, 4]}
      />
    </Group>
  );
};
