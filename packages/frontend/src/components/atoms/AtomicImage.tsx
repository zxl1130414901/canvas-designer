import React from 'react';
import { Group, Rect, Text as KonvaText } from 'react-konva';
import type { BaseComponent } from '../../types';

interface ImageComponentData {
  src?: string; // 图片URL或base64
  placeholderColor: string;
  placeholderText: string;
  showPlaceholder: boolean;
  cornerRadius: number;
  objectFit: 'cover' | 'contain' | 'fill';
}

interface AtomicImageProps extends BaseComponent {
  data: ImageComponentData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const AtomicImage: React.FC<AtomicImageProps> = ({
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
      {/* 占位符背景 */}
      <Rect
        width={width}
        height={height}
        fill={data.placeholderColor || 'rgba(59, 130, 246, 0.2)'}
        cornerRadius={data.cornerRadius || 8}
      />

      {/* 占位符图标和文字 */}
      {data.showPlaceholder && (
        <Group>
          {/* 简单图片图标 */}
          <Rect
            x={width / 2 - 24}
            y={height / 2 - 30}
            width={48}
            height={36}
            fill="rgba(255, 255, 255, 0.1)"
            cornerRadius={4}
          />
          <Rect
            x={width / 2 - 20}
            y={height / 2 - 26}
            width={40}
            height={28}
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth={2}
            cornerRadius={2}
          />
          {/* 山峰 */}
          <Rect
            x={width / 2 - 12}
            y={height / 2 - 10}
            width={0}
            height={0}
            fill="transparent"
          />
          
          {/* 占位文字 */}
          <KonvaText
            x={0}
            y={height / 2 + 16}
            width={width}
            text={data.placeholderText || '点击上传图片'}
            fontSize={14}
            fontFamily="Inter"
            fill="rgba(255, 255, 255, 0.5)"
            align="center"
          />
        </Group>
      )}

      {/* 选中边框 */}
      {selected && (
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          stroke="#ff8c5a"
          strokeWidth={2}
          cornerRadius={data.cornerRadius || 8}
          dash={[5, 5]}
        />
      )}
    </Group>
  );
};
