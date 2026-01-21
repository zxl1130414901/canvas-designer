import { useMemo, useRef } from 'react';
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
  width: propWidth,
  rotation,
  opacity,
  zIndex,
  locked,
  data,
  onDragStart,
  onDragEnd,
  onSelect,
}) => {
  const width = propWidth || 200;
  const textRef = useRef<any>(null);
  
  // 文字颜色
  const textColor = data.color || '#ffffff';

  // 计算阴影/发光效果
  const shadowConfig = useMemo(() => {
    if (data.textGlow?.enabled) {
      return {
        shadowColor: data.textGlow.color,
        shadowBlur: data.textGlow.blur,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowOpacity: 0.8,
      };
    }
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
  }, [data.textGlow, data.textShadow]);

  // 渐变填充配置
  const gradientConfig = useMemo(() => {
    const hasGradient = data.textGradient?.enabled === true;
    const hasColors = Array.isArray(data.textGradient?.colors) && 
                      data.textGradient!.colors.length >= 2 &&
                      data.textGradient!.colors[0] &&
                      data.textGradient!.colors[1];
    
    if (hasGradient && hasColors) {
      const { colors, direction, splitPoint = 50 } = data.textGradient!;
      
      const getEndPoint = () => {
        switch (direction) {
          case 'vertical': return { x: 0, y: width };
          case 'diagonal': return { x: width, y: width };
          default: return { x: width, y: 0 };
        }
      };

      // 使用分割点计算渐变
      return {
        fillLinearGradientStartPoint: { x: 0, y: 0 },
        fillLinearGradientEndPoint: getEndPoint(),
        fillLinearGradientColorStops: [0, colors[0], splitPoint / 100, colors[0], 1, colors[1]],
      };
    }
    return null;
  }, [data.textGradient, width]);

  // 最终的fill值
  const finalFill = gradientConfig ? undefined : textColor;

  return (
    <Text
      ref={textRef}
      id={id}
      x={x}
      width={width}
      text={data.text}
      fontSize={data.fontSize}
      fontFamily={data.fontFamily}
      fontWeight="normal"
      fill={finalFill}
      align={data.textAlign}
      lineHeight={data.lineHeight}
      fontStyle={data.fontStyle || 'normal'}
      textDecoration={data.textDecoration || 'none'}
      letterSpacing={data.letterSpacing || 0}
      background={data.backgroundColor || undefined}
      rotation={rotation}
      opacity={opacity}
      zIndex={zIndex}
      draggable={!locked}
      onClick={(e: any) => onSelect(e)}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      {...gradientConfig}
      {...shadowConfig}
    />
  );
};
