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
    onClick: (e: any) => {
      onSelect(e);
    },
    onDragStart: () => {
      onDragStart();
    },
    onDragEnd: onDragEnd,
  };

  if (shapeType === 'rectangle') {
    return (
      <Rect
        id={id}
        x={x}
        y={y}
        width={width}
        height={height}
        fill={data.fillColor}
        cornerRadius={data.borderRadius}
        stroke={data.borderColor}
        strokeWidth={data.borderWidth}
        dash={borderDashMap[data.borderStyle] || undefined}
        {...commonProps}
      />
    );
  }

  if (shapeType === 'circle') {
    return (
      <Group
        id={id}
        x={x}
        y={y}
        width={width}
        height={height}
        rotation={rotation}
        opacity={opacity}
        zIndex={zIndex}
        draggable={!locked}
        onClick={(e: any) => {
          onSelect(e);
        }}
        onDragStart={() => {
          onDragStart();
        }}
        onDragEnd={onDragEnd}
      >
        <Circle
          x={width / 2}
          y={height / 2}
          radius={width / 2}
          fill={data.fillColor}
          stroke={data.borderColor}
          strokeWidth={data.borderWidth}
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
