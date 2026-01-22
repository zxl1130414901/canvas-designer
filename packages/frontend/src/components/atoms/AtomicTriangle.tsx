import React, { useMemo } from 'react';
import { RegularPolygon, Group } from 'react-konva';
import type { BaseComponent, TriangleComponentData } from '../../types';

interface AtomicTriangleProps extends BaseComponent {
  data: TriangleComponentData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

/**
 * Enhanced Atomic Triangle Component
 * Supports gradients, shadows, glow effects, and multiple directions
 * 
 * Design principle: User's color settings are always respected.
 * Selected state is indicated by the NeonSelectionBorder component, not by overriding colors.
 */
export const AtomicTriangle: React.FC<AtomicTriangleProps> = ({
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
  const radius = data.radius || Math.min(width, height) / 2;

  // Safe value access with fallbacks - always respect user's settings
  const fillColor = typeof data.fillColor === 'string' ? data.fillColor : '#ff6b35';
  const borderColor = typeof data.borderColor === 'string' ? data.borderColor : '#000000';
  const borderWidth = typeof data.borderWidth === 'number' ? data.borderWidth : 1;

  // Calculate rotation offset based on direction
  const rotationOffset = useMemo(() => {
    switch (data.direction) {
      case 'up': return 0;
      case 'down': return 180;
      case 'left': return -90;
      case 'right': return 90;
      default: return 0;
    }
  }, [data.direction]);

  // Calculate total rotation (user rotation + direction offset)
  const totalRotation = rotation + rotationOffset;

  // Calculate gradient configuration
  const gradientConfig = useMemo(() => {
    if (!data.fillGradient?.enabled) return null;

    const { direction, colors, splitPoint = 50 } = data.fillGradient;

    // Calculate start and end points based on direction
    let startPoint = { x: 0, y: 0 };
    let endPoint = { x: 0, y: 0 };

    const size = radius;

    switch (direction) {
      case 'horizontal':
        startPoint = { x: -size, y: 0 };
        endPoint = { x: size, y: 0 };
        break;
      case 'vertical':
        startPoint = { x: 0, y: -size };
        endPoint = { x: 0, y: size };
        break;
      case 'diagonal':
        startPoint = { x: -size, y: -size };
        endPoint = { x: size, y: size };
        break;
      default:
        startPoint = { x: -size, y: 0 };
        endPoint = { x: size, y: 0 };
    }

    // Build color stops: [offset, color, offset, color, ...]
    const colorStops = [
      0, colors[0],
      splitPoint / 100, colors[0],
      splitPoint / 100, colors[1],
      1, colors[1],
    ];

    return {
      startPoint,
      endPoint,
      colorStops,
    };
  }, [data.fillGradient, radius]);

  // Build shadow configuration
  const shadowConfig = useMemo(() => {
    if (data.shadow?.enabled) {
      return {
        color: data.shadow.color,
        blur: data.shadow.blur,
        offset: { x: data.shadow.offsetX, y: data.shadow.offsetY },
      };
    }
    return undefined;
  }, [data.shadow]);

  // Border dash array for dashed/dotted styles
  const dashArray = useMemo(() => {
    switch (data.borderStyle) {
      case 'dashed': return [10, 5];
      case 'dotted': return [2, 4];
      default: return null;
    }
  }, [data.borderStyle]);

  // Always use user's border color - selected state is indicated by NeonSelectionBorder
  const strokeColor = borderColor;

  return (
    <Group
      id={id}
      x={x}
      y={y}
      width={width}
      height={height}
      rotation={totalRotation}
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
      {/* Glow effect layer (behind main shape) */}
      {data.glow?.enabled && (
        <RegularPolygon
          x={width / 2}
          y={height / 2}
          sides={3}
          radius={radius + data.glow.blur * 0.5}
          fill="transparent"
          stroke={data.glow.color}
          strokeWidth={borderWidth}
          dash={dashArray}
          opacity={0.6}
        />
      )}

      {/* Main triangle shape with gradient support */}
      <RegularPolygon
        x={width / 2}
        y={height / 2}
        sides={3}
        radius={radius}
        fill={gradientConfig ? undefined : fillColor}
        fillLinearGradientEnabled={!!gradientConfig}
        fillLinearGradientStartPoint={gradientConfig?.startPoint}
        fillLinearGradientEndPoint={gradientConfig?.endPoint}
        fillLinearGradientColorStops={gradientConfig?.colorStops}
        stroke={strokeColor}
        strokeWidth={borderWidth}
        dash={dashArray}
        shadowEnabled={!!shadowConfig}
        shadowColor={shadowConfig?.color || '#000000'}
        shadowBlur={shadowConfig?.blur || 0}
        shadowOffsetX={shadowConfig?.offset?.x || 0}
        shadowOffsetY={shadowConfig?.offset?.y || 0}
      />
    </Group>
  );
};

export default AtomicTriangle;
