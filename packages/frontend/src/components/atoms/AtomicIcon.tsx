import React from 'react';
import { Group, Circle, Rect, Line, RegularPolygon } from 'react-konva';
import type { BaseComponent } from '../../types';

interface IconComponentData {
  iconType: 'image' | 'video' | 'link' | 'email' | 'phone' | 'location' | 'calendar' | 'user' | 'gear' | 'check' | 'warning' | 'info' | 'question' | 'star' | 'heart' | 'cart' | 'search' | 'plus' | 'minus' | 'close' | 'menu';
  iconColor: string;
  iconSize: number;
  filled: boolean;
  backgroundColor?: string;
  showBackground: boolean;
  strokeWidth?: number;
}

interface AtomicIconProps extends BaseComponent {
  data: IconComponentData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

// 图标渲染函数
const renderIcon = (type: string, size: number, color: string, filled: boolean, strokeWidth: number) => {
  const half = size / 2;
  const sw = strokeWidth || (filled ? 0 : 2);
  const fill = filled ? color : 'transparent';

  switch (type) {
    case 'image':
      return (
        <Group>
          <Rect
            x={2}
            y={half - size / 3}
            width={size - 4}
            height={size * 0.66}
            stroke={color}
            strokeWidth={sw}
            fill={fill}
            cornerRadius={2}
          />
          <Rect
            x={half - 2}
            y={half - 2}
            width={4}
            height={4}
            fill={color}
          />
        </Group>
      );

    case 'video':
      return (
        <Group>
          <Rect
            x={2}
            y={4}
            width={size - 4}
            height={size - 8}
            stroke={color}
            strokeWidth={sw}
            fill={fill}
            cornerRadius={2}
          />
          <RegularPolygon
            x={half + 4}
            y={half}
            sides={3}
            radius={6}
            rotation={90}
            fill={color}
          />
        </Group>
      );

    case 'link':
      return (
        <Group>
          <Line
            points={[4, half, half, 4, size - 4, half, half, size - 4]}
            stroke={color}
            strokeWidth={sw}
            lineCap="round"
          />
        </Group>
      );

    case 'email':
      return (
        <Group>
          <Rect
            x={2}
            y={half - size / 4}
            width={size - 4}
            height={size / 2}
            stroke={color}
            strokeWidth={sw}
            fill={fill}
            cornerRadius={2}
          />
          <Line
            points={[2, half - size / 4, half, half, size - 2, half - size / 4]}
            stroke={color}
            strokeWidth={sw}
          />
        </Group>
      );

    case 'phone':
      return (
        <Group>
          <Rect
            x={half - size / 3}
            y={2}
            width={size * 0.66}
            height={size - 4}
            stroke={color}
            strokeWidth={sw}
            fill={fill}
            cornerRadius={4}
          />
          <Circle x={half} y={half} radius={2} fill={color} />
        </Group>
      );

    case 'location':
      return (
        <RegularPolygon
          x={half}
          y={half}
          sides={3}
          radius={size / 2 - 2}
          stroke={color}
          strokeWidth={sw}
          fill={fill}
        />
      );

    case 'calendar':
      return (
        <Group>
          <Rect
            x={2}
            y={2}
            width={size - 4}
            height={size - 4}
            stroke={color}
            strokeWidth={sw}
            fill={fill}
            cornerRadius={2}
          />
          <Line
            points={[2, half - 4, size - 2, half - 4]}
            stroke={color}
            strokeWidth={2}
          />
        </Group>
      );

    case 'user':
      return (
        <Group>
          <Circle
            x={half}
            y={half - size / 6}
            radius={size / 4}
            stroke={color}
            strokeWidth={sw}
            fill={fill}
          />
          <Rect
            x={half - size / 3}
            y={half + size / 8}
            width={size * 0.66}
            height={size / 3}
            stroke={color}
            strokeWidth={sw}
            fill={fill}
            cornerRadius={2}
          />
        </Group>
      );

    case 'gear':
      return (
        <RegularPolygon
          x={half}
          y={half}
          sides={6}
          radius={size / 2 - 2}
          stroke={color}
          strokeWidth={sw}
          fill={fill}
        />
      );

    case 'check':
      return (
        <Group>
          <Line
            points={[4, half, half - 4, size - 4, size - 4, 4]}
            stroke={color}
            strokeWidth={sw + 1}
            lineCap="round"
            lineJoin="round"
          />
        </Group>
      );

    case 'warning':
      return (
        <RegularPolygon
          x={half}
          y={half}
          sides={3}
          radius={size / 2 - 2}
          stroke={color}
          strokeWidth={sw}
          fill={fill}
        />
      );

    case 'info':
      return (
        <Group>
          <Circle
            x={half}
            y={half}
            radius={size / 2 - 2}
            stroke={color}
            strokeWidth={sw}
            fill={fill}
          />
          <Rect x={half - 1} y={half - size / 4} width={2} height={size / 3} fill={color} />
          <Circle x={half} y={half + size / 6} radius={2} fill={color} />
        </Group>
      );

    case 'question':
      return (
        <Group>
          <Circle
            x={half}
            y={half}
            radius={size / 2 - 2}
            stroke={color}
            strokeWidth={sw}
            fill={fill}
          />
          <Rect x={half - 1} y={half - size / 4} width={2} height={size / 5} fill={color} />
          <Circle x={half} y={half + size / 8} radius={2} fill={color} />
        </Group>
      );

    case 'star':
      return (
        <RegularPolygon
          x={half}
          y={half}
          sides={5}
          radius={size / 2 - 2}
          stroke={color}
          strokeWidth={sw}
          fill={fill}
        />
      );

    case 'heart':
      return (
        <Group>
          <Circle x={half - 4} y={half - 2} radius={6} fill={color} />
          <Circle x={half + 4} y={half - 2} radius={6} fill={color} />
        </Group>
      );

    case 'cart':
      return (
        <Group>
          <Circle x={half + 4} y={half + 4} radius={2} fill={color} />
          <Line
            points={[6, half, half + 4, half + 4, half + 4, size - 6]}
            stroke={color}
            strokeWidth={sw}
            lineCap="round"
          />
          <Rect x={half - 6} y={half - 2} width={8} height={4} stroke={color} strokeWidth={sw} fill={fill} />
        </Group>
      );

    case 'search':
      return (
        <Group>
          <Circle x={half - 2} y={half - 2} radius={size / 3} stroke={color} strokeWidth={sw} fill={fill} />
          <Line points={[half + size / 4, half + size / 4, half + size / 3, half + size / 3]} stroke={color} strokeWidth={sw + 1} lineCap="round" />
        </Group>
      );

    case 'plus':
      return (
        <Group>
          <Line points={[half, 4, half, size - 4]} stroke={color} strokeWidth={sw + 2} lineCap="round" />
          <Line points={[4, half, size - 4, half]} stroke={color} strokeWidth={sw + 2} lineCap="round" />
        </Group>
      );

    case 'minus':
      return (
        <Line points={[4, half, size - 4, half]} stroke={color} strokeWidth={sw + 2} lineCap="round" />
      );

    case 'close':
      return (
        <Group>
          <Line points={[4, 4, size - 4, size - 4]} stroke={color} strokeWidth={sw + 1} lineCap="round" />
          <Line points={[size - 4, 4, 4, size - 4]} stroke={color} strokeWidth={sw + 1} lineCap="round" />
        </Group>
      );

    case 'menu':
      return (
        <Group>
          <Line points={[4, half - 4, size - 4, half - 4]} stroke={color} strokeWidth={sw} lineCap="round" />
          <Line points={[4, half, size - 4, half]} stroke={color} strokeWidth={sw} lineCap="round" />
          <Line points={[4, half + 4, size - 4, half + 4]} stroke={color} strokeWidth={sw} lineCap="round" />
        </Group>
      );

    default:
      return (
        <Rect
          x={half - size / 4}
          y={half - size / 4}
          width={size / 2}
          height={size / 2}
          fill={color}
        />
      );
  }
};

export const AtomicIcon: React.FC<AtomicIconProps> = ({
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
  const iconSize = data.iconSize || Math.min(width, height);
  const backgroundRadius = iconSize / 2 + 4;

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
      {data.showBackground && (
        <Circle
          x={width / 2}
          y={height / 2}
          radius={backgroundRadius}
          fill={data.backgroundColor || 'rgba(255, 107, 53, 0.2)'}
        />
      )}

      {/* 图标 */}
      {renderIcon(data.iconType, iconSize, data.iconColor, data.filled, data.strokeWidth || 2)}

      {/* 选中效果 */}
      {selected && (
        <Circle
          x={width / 2}
          y={height / 2}
          radius={backgroundRadius + 4}
          stroke="#ff8c5a"
          strokeWidth={1}
          dash={[3, 3]}
        />
      )}
    </Group>
  );
};
