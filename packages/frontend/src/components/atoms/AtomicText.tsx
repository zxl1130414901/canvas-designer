import { useMemo } from 'react';
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
  locked,
  data,
  onDragStart,
  onDragEnd,
  onSelect,
}) => {
  // Calculate shadow configuration for Konva
  const shadowConfig = useMemo(() => {
    if (data.textShadow?.enabled) {
      return {
        shadowColor: data.textShadow.color,
        shadowBlur: data.textShadow.blur,
        shadowOffsetX: data.textShadow.offsetX,
        shadowOffsetY: data.textShadow.offsetY,
        shadowOpacity: 1,
      };
    }
    return undefined;
  }, [data.textShadow]);

  // Calculate glow configuration (same as shadow in Konva)
  const glowConfig = useMemo(() => {
    if (data.textGlow?.enabled) {
      return {
        shadowColor: data.textGlow.color,
        shadowBlur: data.textGlow.blur,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowOpacity: 0.8,
      };
    }
    return undefined;
  }, [data.textGlow]);

  // Final shadow (prioritize glow over shadow)
  const finalShadow = useMemo(() => {
    if (data.textGlow?.enabled) return glowConfig;
    return shadowConfig;
  }, [glowConfig, shadowConfig, data.textGlow]);

  // Gradient fill configuration
  const gradientConfig = useMemo(() => {
    if (data.textGradient?.enabled && data.textGradient.colors) {
      const { colors, direction } = data.textGradient;
      
      // Calculate gradient direction
      let startPoint = { x: 0, y: 0 };
      let endPoint = { x: 100, y: 0 };
      
      switch (direction) {
        case 'vertical':
          startPoint = { x: 0, y: 0 };
          endPoint = { x: 0, y: 100 };
          break;
        case 'diagonal':
          startPoint = { x: 0, y: 0 };
          endPoint = { x: 100, y: 100 };
          break;
        case 'horizontal':
        default:
          startPoint = { x: 0, y: 0 };
          endPoint = { x: 100, y: 0 };
          break;
      }

      return {
        fillLinearGradientStartPoint: startPoint,
        fillLinearGradientEndPoint: endPoint,
        fillLinearGradientColorStops: [0, colors[0], 1, colors[1]],
      };
    }
    return undefined;
  }, [data.textGradient]);

  // Fill color (fallback when gradient is disabled)
  const fillColor = data.textGradient?.enabled 
    ? undefined  // Let gradient take over
    : (data.color || '#ffffff');

  return (
    <Text
      id={id}
      x={x}
      y={y}
      width={width}
      text={data.text}
      fontSize={data.fontSize}
      fontFamily={data.fontFamily}
      fontWeight={data.fontWeight}
      fill={fillColor}
      align={data.textAlign}
      lineHeight={data.lineHeight}
      fontStyle={data.fontStyle || 'normal'}
      textDecoration={data.textDecoration || 'none'}
      letterSpacing={data.letterSpacing || 0}
      background={data.backgroundColor || undefined}
      {...gradientConfig}
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
      onDragEnd={(e: any) => {
        onDragEnd(e);
      }}
      {...finalShadow}
    />
  );
};
