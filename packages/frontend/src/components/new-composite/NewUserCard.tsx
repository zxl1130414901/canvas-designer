import React from 'react';
import { Group, Rect, Circle, Text as KonvaText } from 'react-konva';
import type { BaseComponent, UserCardData } from '../../types';

interface UserCardProps extends BaseComponent {
  data: UserCardData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const NewUserCard: React.FC<UserCardProps> = ({
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
  const avatarSize = 60;

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
        fill={data.bgColor || 'rgba(139, 92, 246, 0.1)'}
        stroke={selected ? '#ff8c5a' : 'rgba(139, 92, 246, 0.3)'}
        strokeWidth={selected ? 3 : 1.5}
        cornerRadius={16}
        shadowEnabled={selected}
        shadowBlur={selected ? 15 : 0}
        shadowColor="#ff8c5a"
      />

      <Circle
        x={padding + avatarSize / 2}
        y={padding + avatarSize / 2}
        radius={avatarSize / 2}
        fill={data.avatarBg || 'rgba(139, 92, 246, 0.3)'}
        stroke={selected ? '#ff8c5a' : undefined}
        strokeWidth={selected ? 2 : 0}
      />

      {data.avatarUrl ? (
        <Circle
          x={padding + avatarSize / 2}
          y={padding + avatarSize / 2}
          radius={avatarSize / 2 - 4}
          fill="#666"
        />
      ) : (
        <KonvaText
          x={padding}
          y={padding + 16}
          width={avatarSize}
          text={data.name ? data.name.charAt(0).toUpperCase() : '?'}
          fontSize={24}
          fontFamily="Inter"
          fontWeight="600"
          fill={data.nameColor || '#ffffff'}
          align="center"
        />
      )}

      <KonvaText
        x={padding + avatarSize + 16}
        y={padding}
        width={width - padding * 2 - avatarSize - 16}
        text={data.name || ''}
        fontSize={18}
        fontFamily="Inter"
        fontWeight="600"
        fill={data.nameColor || '#ffffff'}
        align="left"
      />

      {data.title && (
        <KonvaText
          x={padding + avatarSize + 16}
          y={padding + 24}
          width={width - padding * 2 - avatarSize - 16}
          text={data.title}
          fontSize={13}
          fontFamily="Inter"
          fontWeight="400"
          fill={data.titleColor || 'rgba(255,255,255,0.7)'}
          align="left"
        />
      )}

      {data.bio && (
        <KonvaText
          x={padding}
          y={padding + avatarSize + 20}
          width={width - padding * 2}
          text={data.bio}
          fontSize={13}
          fontFamily="Inter"
          fontWeight="400"
          fill={data.bioColor || 'rgba(255,255,255,0.6)'}
          align="left"
        />
      )}
    </Group>
  );
};
