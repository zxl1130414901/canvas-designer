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
  selected,
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
    // 选中效果
    stroke: selected ? '#ff8c5a' : data.borderColor,
    strokeWidth: selected ? 3 : data.borderWidth,
    dash: borderDashMap[data.borderStyle] || undefined,
    shadowEnabled: selected,
    shadowBlur: 10,
    shadowColor: '#ff8c5a',
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
        {...commonProps}
      />
    );
  }

  if (shapeType === 'circle') {
    // 使用Group包装Circle，解决拖拽坐标问题
    return (
      <Group
        id={id}
        x={x}
        y={y}
        width={width}
        height={height}
        {...commonProps}
      >
        <Circle
          x={width / 2}
          y={height / 2}
          radius={width / 2}
          fill={data.fillColor}
          stroke={selected ? '#ff8c5a' : data.borderColor}
          strokeWidth={selected ? 3 : data.borderWidth}
        />
      </Group>
    );
  }

  if (shapeType === 'line') {
    return (
      <Line
        id={id}
        points={[x, y, x + width, y + height]}
        {...commonProps}
      />
    );
  }

  return null;
};