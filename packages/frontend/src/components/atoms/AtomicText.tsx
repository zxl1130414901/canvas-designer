import { useRef } from 'react';
import { Text } from 'react-konva';
import type { BaseComponent, TextComponentData } from '../../types';

interface AtomicTextProps extends BaseComponent {
  data: TextComponentData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const AtomicText: React.FC<AtomicTextProps> = ({
  id,
  x,
  y,
  width,
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
  const textRef = useRef<any>(null);

  const commonProps = {
    x,
    y,
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
    onDragEnd: (e: any) => {
      onDragEnd(e);
    },
    // 选中效果
    stroke: selected ? '#ff8c5a' : undefined,
    strokeWidth: selected ? 2 : 0,
  };

  return (
    <Text
      ref={textRef}
      id={id}
      width={width}
      text={data.text}
      fontSize={data.fontSize}
      fontFamily={data.fontFamily}
      fontStyle={data.fontWeight}
      fill={data.color}
      align={data.textAlign}
      lineHeight={data.lineHeight}
      {...commonProps}
    />
  );
};
