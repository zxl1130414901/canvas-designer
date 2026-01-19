import React from 'react';
import { Group, Rect, Text as KonvaText } from 'react-konva';
import type { BaseComponent, TitleCardData } from '../../types';

interface TitleCardProps extends BaseComponent {
  data: TitleCardData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const NewTitleCard: React.FC<TitleCardProps> = ({
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

  const getBgFill = () => {
    if (data.bgStyle === 'gradient' && data.gradientColors) {
      return undefined;
    }
    return data.bgColor || 'rgba(59, 130, 246, 0.1)';
  };

  const renderContent = () => {
    return (
      <>
        <KonvaText
          x={padding}
          y={padding}
          width={width - padding * 2}
          text={data.title || ''}
          fontSize={28}
          fontFamily="Inter"
          fontWeight="700"
          fill={data.titleColor || '#ffffff'}
          align="left"
        />
        {data.subtitle && (
          <KonvaText
            x={padding}
            y={padding + 36}
            width={width - padding * 2}
            text={data.subtitle}
            fontSize={14}
            fontFamily="Inter"
            fontWeight="400"
            fill={data.subtitleColor || 'rgba(255,255,255,0.7)'}
            align="left"
          />
        )}
      </>
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
      <Rect
        width={width}
        height={height}
        fill={getBgFill()}
        stroke={selected ? '#ff8c5a' : data.bgStyle === 'outline' ? 'rgba(255,255,255,0.3)' : 'transparent'}
        strokeWidth={selected ? 3 : 1}
        cornerRadius={12}
        shadowEnabled={selected}
        shadowBlur={selected ? 15 : 0}
        shadowColor="#ff8c5a"
      />
      {data.bgStyle === 'gradient' && data.gradientColors && (
        <Rect
          width={width}
          height={height}
          fillLinearGradientStartPoint={{ x: 0, y: 0 }}
          fillLinearGradientEndPoint={{ x: width, y: 0 }}
          fillLinearGradientColorStops={[0, data.gradientColors[0], 1, data.gradientColors[1]]}
          cornerRadius={12}
        />
      )}
      {renderContent()}
    </Group>
  );
};
