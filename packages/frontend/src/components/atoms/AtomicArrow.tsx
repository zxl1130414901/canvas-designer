import React from 'react';
import { Arrow, Line, Path, Group, Rect } from 'react-konva';
import type { BaseComponent, ArrowComponentData } from '../../types';

interface AtomicArrowProps extends BaseComponent {
  data: ArrowComponentData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const AtomicArrow: React.FC<AtomicArrowProps> = ({
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
  // 计算起点（根据方向）
  let startX = 0;
  let startY = 0;

  // 计算箭头终点，支持 lineLength
  let endX = width;
  let endY = height;

  if (data.lineLength && data.direction) {
    switch (data.direction) {
      case 'right':
        startX = width / 2;
        startY = height / 2;
        endX = data.lineLength;
        endY = height / 2;
        break;
      case 'left':
        startX = width / 2;
        startY = height / 2;
        endX = -data.lineLength;
        endY = height / 2;
        break;
      case 'down':
        startX = width / 2;
        startY = height / 2;
        endX = width / 2;
        endY = data.lineLength;
        break;
      case 'up':
        startX = width / 2;
        startY = height / 2;
        endX = width / 2;
        endY = -data.lineLength;
        break;
    }
  }

  // 计算曲线路径
  let curvePath = '';
  let showCurve = false;

  if (data.curvature && data.curvature > 0) {
    showCurve = true;

    // 计算控制点（二次贝塞尔曲线）
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;

    // 根据方向和曲率调整控制点
    let offsetX = 0;
    let offsetY = 0;

    if (data.direction === 'right' || data.direction === 'left') {
      offsetX = 0;
      offsetY = data.curvature;
    } else {
      offsetX = data.curvature;
      offsetY = 0;
    }

    const cpX = midX + offsetX;
    const cpY = midY + offsetY;

    // 二次贝塞尔曲线: M startX startY Q cpX cpY endX endY
    curvePath = `M ${startX} ${startY} Q ${cpX} ${cpY} ${endX} ${endY}`;
  }

  // 箭头样式配置
  const pointerLength = data.pointerLength || 20;
  const pointerWidth = data.pointerWidth || 20;

  // 路径属性
  const pathProps = {
    stroke: data.strokeColor,
    strokeWidth: data.strokeWidth || 2,
    dash: data.dashArray || undefined,
  };

  // 箭头填充样式
  let arrowFill = data.strokeColor;
  if (data.arrowStyle === 'outlined') {
    arrowFill = 'transparent';
  }

  // 计算点击区域
  const padding = 20; // 点击区域padding
  let hitboxX = Math.min(startX, endX) - pointerLength - padding;
  let hitboxY = Math.min(startY, endY) - pointerLength - padding;
  let hitboxWidth = Math.abs(endX - startX) + pointerLength * 2 + padding * 2;
  let hitboxHeight = Math.abs(endY - startY) + pointerLength * 2 + padding * 2;

  // 对于曲线箭头，扩大点击区域
  if (showCurve && data.curvature) {
    const curveExtent = data.curvature + padding;
    if (data.direction === 'right' || data.direction === 'left') {
      hitboxY = Math.min(startY, endY) - curveExtent;
      hitboxHeight = Math.abs(endY - startY) + curveExtent * 2;
    } else {
      hitboxX = Math.min(startX, endX) - curveExtent;
      hitboxWidth = Math.abs(endX - startX) + curveExtent * 2;
    }
  }

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
      {/* 透明点击区域 - 扩大点击范围 */}
      <Rect
        x={hitboxX}
        y={hitboxY}
        width={hitboxWidth}
        height={hitboxHeight}
        fill="transparent"
        listening={true}
      />

      {showCurve ? (
        <>
          {/* 曲线主体 */}
          <Path
            d={curvePath}
            {...pathProps}
            fill={data.arrowStyle === 'filled' ? data.strokeColor : 'transparent'}
          />

          {/* 结束箭头 */}
          <Arrow
            points={[endX, endY]}
            pointerLength={pointerLength}
            pointerWidth={pointerWidth}
            fill={arrowFill}
            pointerAtBeginning={false}
            {...pathProps}
          />

          {/* 双箭头的起点箭头 */}
          {data.doubleEnded && (
            <Arrow
              points={[startX, startY]}
              pointerLength={pointerLength}
              pointerWidth={pointerWidth}
              fill={arrowFill}
              pointerAtBeginning={true}
              {...pathProps}
            />
          )}
        </>
      ) : (
        <>
          {/* 直线主体 */}
          <Line
            points={[startX, startY, endX, endY]}
            {...pathProps}
          />

          {/* 结束箭头 */}
          <Arrow
            points={[endX, endY]}
            pointerLength={pointerLength}
            pointerWidth={pointerWidth}
            fill={arrowFill}
            pointerAtBeginning={false}
            {...pathProps}
          />

          {/* 双箭头的起点箭头 */}
          {data.doubleEnded && (
            <Arrow
              points={[startX, startY]}
              pointerLength={pointerLength}
              pointerWidth={pointerWidth}
              fill={arrowFill}
              pointerAtBeginning={true}
              {...pathProps}
            />
          )}
        </>
      )}
    </Group>
  );
};
