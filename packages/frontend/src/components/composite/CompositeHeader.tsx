import React, { useRef } from 'react';
import { Group, Rect } from 'react-konva';
import type { BaseComponent, CompositeComponentData, Component } from '../../types';
import { AtomicText } from '../atoms/AtomicText';

interface CompositeHeaderProps extends BaseComponent {
  data: CompositeComponentData;
  childComponents: Component[];
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
  onChildSelect: (childId: string) => void;
  updateComponent: (id: string, updates: any) => void;
}

export const CompositeHeader: React.FC<CompositeHeaderProps> = ({
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
  childComponents,
  onDragStart,
  onDragEnd,
  onSelect,
  onChildSelect,
  updateComponent,
}) => {
  // Use ref to track current position for correct drag delta calculation
  const positionRef = useRef({ x, y });

  // Update ref when props change
  React.useEffect(() => {
    positionRef.current = { x, y };
  }, [x, y]);

  const commonProps = {
    x,
    y,
    rotation,
    opacity,
    zIndex,
    draggable: !locked,
    onClick: (e: any) => {
      e.cancelBubble = true; // Stop event propagation to prevent multiple selection
      onSelect(e);
    },
    onDragStart: () => {
      onDragStart();
    },
    onDragEnd: (e: any) => {
      const newX = e.target.x();
      const newY = e.target.y();
      const dx = newX - positionRef.current.x;
      const dy = newY - positionRef.current.y;
      onDragEnd({ dx, dy });
    },
    // 选中效果
    stroke: selected ? '#ff8c5a' : 'rgba(255, 107, 53, 0.3)',
    strokeWidth: selected ? 3 : 2,
    shadowEnabled: selected,
    shadowBlur: 10,
    shadowColor: '#ff8c5a',
  };

  // 根据布局方式排列子组件
  const renderChildren = () => {
    return childComponents.map((child) => {
      // 子组件的坐标是相对于容器的，所以需要加上容器的x,y
      const childX = x + child.x;
      const childY = y + child.y;

      // 简单渲染文本子组件作为示例
      if (child.type === 'text') {
        return (
          <AtomicText
            key={child.id}
            id={child.id}
            type={child.type}
            x={childX}
            y={childY}
            width={child.width}
            height={child.height}
            rotation={child.rotation}
            opacity={child.opacity}
            zIndex={child.zIndex}
            selected={child.selected}
            locked={child.locked}
            data={child.data as any}
            onDragStart={() => {
              // 子组件被拖动时，不需要选中容器
            }}
            onDragEnd={(e: any) => {
              // 子组件拖动结束，更新子组件的相对位置
              const newX = e.target.x();
              const newY = e.target.y();
              // 转换为相对坐标
              updateComponent(child.id, { x: newX - x, y: newY - y });
            }}
            onSelect={() => onChildSelect(child.id)}
          />
        );
      }

      return null;
    });
  };

  return (
    <Group id={id} {...commonProps}>
      {/* 背景框 */}
      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="transparent"
        stroke={selected ? '#ff8c5a' : 'rgba(255, 140, 90, 0.3)'}
        strokeWidth={selected ? 3 : 2}
        cornerRadius={8}
        dash={selected ? undefined : [5, 5]}
      />

      {/* 渲染子组件 */}
      {renderChildren()}
    </Group>
  );
};
