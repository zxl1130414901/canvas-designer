import React, { useEffect, useRef, useMemo } from 'react';
import { Group, Rect, Text as KonvaText } from 'react-konva';
import type { BaseComponent, TagComponentData } from '../../types';

interface AtomicTagProps extends BaseComponent {
  data: TagComponentData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const AtomicTag: React.FC<AtomicTagProps> = ({
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
  onDragStart,
  onDragEnd,
  onSelect,
}) => {
  const padding = data.padding || 8;
  const rectRef = useRef<any>(null);
  const textRef = useRef<any>(null);

  // 修复圆角逻辑：用户设置的 borderRadius 应该总是生效
  // pill 模式：不超过 height/2
  // rounded/square 模式：直接使用用户设置的值
  const borderRadius = useMemo(() => {
    const userRadius = data.borderRadius ?? 0;
    if (data.variant === 'pill') {
      return Math.min(userRadius, height / 2);
    } else if (data.variant === 'rounded') {
      return userRadius > 0 ? userRadius : 8;
    }
    return userRadius; // square 模式
  }, [data.variant, data.borderRadius, height]);

  // 边框样式映射
  const borderDash = useMemo(() => {
    const map: Record<string, number[] | undefined> = {
      solid: undefined,  // 实线用 undefined，不用空数组
      dashed: [10, 10],
      dotted: [3, 3],
    };
    return map[data.borderStyle || 'solid'];
  }, [data.borderStyle]);

  // 计算矩形背景的 props
  const rectProps: any = useMemo(() => {
    const props: any = {
      width,
      height,
      stroke: data.borderColor,
      strokeWidth: data.borderWidth || 1,
      dash: borderDash,
      cornerRadius: borderRadius,
    };

    // 处理背景渐变
    const gradientConfig = data.gradientConfig;
    const hasGradient = gradientConfig?.enabled === true &&
                        Array.isArray(gradientConfig.colors) &&
                        gradientConfig.colors.length >= 2;

    if (hasGradient && gradientConfig) {
      // 使用渐变背景
      props.fillLinearGradientStartPoint = { x: 0, y: 0 };

      switch (gradientConfig.direction) {
        case 'vertical':
          props.fillLinearGradientEndPoint = { x: 0, y: height };
          break;
        case 'diagonal':
          props.fillLinearGradientEndPoint = { x: width, y: height };
          break;
        default:
          props.fillLinearGradientEndPoint = { x: width, y: 0 };
      }

      const splitPoint = (gradientConfig.splitPoint || 50) / 100;
      props.fillLinearGradientColorStops = [
        0, gradientConfig.colors[0],
        splitPoint, gradientConfig.colors[0],
        1, gradientConfig.colors[1]
      ];
    } else {
      // 使用纯色背景
      props.fill = data.backgroundColor;
    }

    // 处理阴影效果
    const glowConfig = data.glowConfig;
    const shadowConfig = data.shadowConfig;

    if (glowConfig?.enabled) {
      // 发光效果（无偏移的阴影）
      props.shadowColor = glowConfig.color;
      props.shadowBlur = glowConfig.blur || 10;
      props.shadowOffsetX = 0;
      props.shadowOffsetY = 0;
      props.shadowOpacity = 0.8;
    } else if (shadowConfig?.enabled) {
      // 普通阴影
      props.shadowColor = shadowConfig.color;
      props.shadowBlur = shadowConfig.blur || 4;
      props.shadowOffsetX = shadowConfig.offsetX || 0;
      props.shadowOffsetY = shadowConfig.offsetY || 0;
      props.shadowOpacity = 0.5;
    }

    return props;
  }, [
    width, height, data.borderColor, data.borderWidth, borderDash, borderRadius,
    data.backgroundColor, data.gradientConfig, data.glowConfig, data.shadowConfig
  ]);

  // 文本对齐方式映射
  const alignMap: Record<string, 'left' | 'center' | 'right'> = {
    left: 'left',
    center: 'center',
    right: 'right',
  };

  // 字体加载逻辑：确保字体加载后重新渲染
  useEffect(() => {
    if (data.fontFamily && textRef.current) {
      const fontStr = `${data.fontSize}px ${data.fontFamily}`;
      if (document.fonts && document.fonts.load) {
        document.fonts.load(fontStr).then(() => {
          textRef.current?.getLayer()?.batchDraw();
        }).catch(() => {
          // 如果字体加载失败，仍然重新渲染
          textRef.current?.getLayer()?.batchDraw();
        });
      } else {
        // 如果浏览器不支持，直接重绘
        textRef.current?.getLayer()?.batchDraw();
      }
    }
  }, [data.fontFamily, data.fontSize]);

  // KonvaText 的 key，确保在属性变化时重新创建
  const textKey = `${data.fontFamily}-${data.fontSize}-${data.fontStyle}-${data.textDecoration}-${data.textAlign}-${data.textColor}-${padding}`;

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
        onSelect(e);
      }}
      onDragStart={() => {
        onDragStart();
      }}
      onDragEnd={onDragEnd}
    >
      <Rect ref={rectRef} {...rectProps} />
      <KonvaText
        key={textKey}
        ref={textRef}
        x={padding}
        y={padding}
        width={width - padding * 2}
        height={height - padding * 2}
        text={data.text}
        fontSize={data.fontSize}
        fontFamily={data.fontFamily || 'Inter'}
        fontWeight="600"
        fontStyle={data.fontStyle || 'normal'}
        textDecoration={data.textDecoration || 'none'}
        fill={data.textColor}
        align={alignMap[data.textAlign || 'center']}
        verticalAlign="middle"
      />
    </Group>
  );
};
