import React, { useEffect, useState } from 'react';
import { Group, Rect, Text as KonvaText, Image as KonvaImage } from 'react-konva';
import type { BaseComponent, ImageComponentData } from '../../types';

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
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (data.src && !data.showPlaceholder) {
      const img = new window.Image();
      img.src = data.src;
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        setImage(img);
      };
      img.onerror = () => {
        console.error('Failed to load image:', data.src);
        setImage(null);
      };
      return () => {
        setImage(null);
      };
    } else {
      setImage(null);
    }
  }, [data.src, data.showPlaceholder]);

  const cornerRadius = data.cornerRadius || 0;

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
      {image ? (
        <>
          <KonvaImage
            image={image}
            width={width}
            height={height}
            cornerRadius={cornerRadius}
          />
          {selected && (
            <Rect
              width={width}
              height={height}
              stroke="#ff8c5a"
              strokeWidth={2}
              cornerRadius={cornerRadius}
              dash={[5, 5]}
              listening={false}
            />
          )}
        </>
      ) : (
        <>
          <Rect
            width={width}
            height={height}
            fill={data.placeholderColor || 'rgba(59, 130, 246, 0.2)'}
            stroke={selected ? '#ff8c5a' : 'rgba(59, 130, 246, 0.4)'}
            strokeWidth={selected ? 2 : 1}
            cornerRadius={cornerRadius}
            dash={data.showPlaceholder ? [8, 8] : undefined}
          />

          {data.showPlaceholder && (
            <>
              {/* 简单图片图标 */}
              <Rect
                x={width / 2 - 24}
                y={height / 2 - 30}
                width={48}
                height={36}
                fill="rgba(255, 255, 255, 0.1)"
                cornerRadius={4}
                listening={false}
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
                listening={false}
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
                listening={false}
              />
            </>
          )}
        </>
      )}
    </Group>
  );
};
