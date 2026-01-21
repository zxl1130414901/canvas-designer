import { Rect, Circle, Line, Group } from 'react-konva';
import type { BaseComponent, ShapeComponentData } from '../../types';

interface AtomicShapeProps extends BaseComponent {
  data: ShapeComponentData;
  shapeType: 'rectangle' | 'circle' | 'line';
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const AtomicShape: React.FC<AtomicShapeProps> = ({
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
  shapeType,
  onDragStart,
  onDragEnd,
  onSelect,
}) => {
  const borderDashMap: Record<string, number[] | undefined> = {
    solid: undefined,
    dashed: [10, 10],
    dotted: [3, 3],
  };

  const commonProps = {
    rotation,
    opacity,
    zIndex,
    draggable: !locked,
    onClick: onSelect,
    onDragStart,
    onDragEnd,
  };

  // Shadow props
  const shadowProps = data.shadow?.enabled
    ? {
        shadowColor: data.shadow.color,
        shadowBlur: data.shadow.blur,
        shadowOffsetX: data.shadow.offsetX,
        shadowOffsetY: data.shadow.offsetY,
      }
    : {};

  // Glow props (use shadowBlur + color for glow effect)
  const glowProps = data.glow?.enabled
    ? {
        shadowColor: data.glow.color,
        shadowBlur: data.glow.blur,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
      }
    : {};

  // Combine shadow and glow (glow takes precedence)
  const effectProps = data.glow?.enabled ? glowProps : shadowProps;

  // Create gradient fill for rectangle if enabled
  const getRectFill = () => {
    if (shapeType === 'rectangle' && data.fillGradient?.enabled) {
      const { colors, direction, splitPoint = 50 } = data.fillGradient;
      const safeSplitPoint = splitPoint ?? 50;
      const gradientConfig = {
        fillLinearGradientStartPoint: { x: 0, y: 0 },
        fillLinearGradientEndPoint: { x: width, y: height },
        fillLinearGradientColorStops: [
          0,
          colors[0],
          safeSplitPoint / 100,
          colors[0],
          1,
          colors[1],
        ],
      };

      // Adjust gradient direction
      if (direction === 'horizontal') {
        gradientConfig.fillLinearGradientStartPoint = { x: 0, y: 0 };
        gradientConfig.fillLinearGradientEndPoint = { x: width, y: 0 };
      } else if (direction === 'vertical') {
        gradientConfig.fillLinearGradientStartPoint = { x: 0, y: 0 };
        gradientConfig.fillLinearGradientEndPoint = { x: 0, y: height };
      } else if (direction === 'diagonal') {
        gradientConfig.fillLinearGradientStartPoint = { x: 0, y: 0 };
        gradientConfig.fillLinearGradientEndPoint = { x: width, y: height };
      }

      return gradientConfig;
    }
    return { fill: data.fillColor };
  };

  if (shapeType === 'rectangle') {
    return (
      <Rect
        id={id}
        x={x}
        y={y}
        width={width}
        height={height}
        cornerRadius={data.borderRadius}
        stroke={data.borderColor}
        strokeWidth={data.borderWidth}
        dash={borderDashMap[data.borderStyle] || undefined}
        {...getRectFill()}
        {...effectProps}
        {...commonProps}
      />
    );
  }

  if (shapeType === 'circle') {
    return (
      <Group id={id} x={x} y={y} rotation={rotation} opacity={opacity} zIndex={zIndex} draggable={!locked} onClick={onSelect} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <Circle
          x={width / 2}
          y={height / 2}
          radius={width / 2}
          fill={data.fillColor}
          stroke={data.borderColor}
          strokeWidth={data.borderWidth}
          {...effectProps}
        />
      </Group>
    );
  }

  if (shapeType === 'line') {
    return (
      <Line
        id={id}
        points={[x, y, x + width, y + height]}
        stroke={data.borderColor}
        strokeWidth={data.borderWidth}
        dash={borderDashMap[data.borderStyle] || undefined}
        lineCap="round"
        {...commonProps}
      />
    );
  }

  return null;
};
