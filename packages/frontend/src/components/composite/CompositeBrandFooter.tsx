import React from 'react';
import { Group, Rect, Text as KonvaText, Line } from 'react-konva';
import type { BaseComponent } from '../../types';

interface BrandFooterData {
  logoText: string;
  company: string;
  copyright: string;
  socialLinks: Array<{platform: string, icon: string}>;
  logoColor: string;
  textColor: string;
  separatorColor: string;
  bgColor: string;
  showSeparator: boolean;
}

interface CompositeBrandFooterProps extends BaseComponent {
  data: BrandFooterData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const CompositeBrandFooter: React.FC<CompositeBrandFooterProps> = ({
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
  const padding = 20;
  const socialIcons = data.socialLinks || [
    { platform: 'twitter', icon: '🐦' },
    { platform: 'facebook', icon: '👤' },
    { platform: 'linkedin', icon: '💼' },
  ];

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
      {/* 背景 */}
      <Rect
        width={width}
        height={height}
        fill={data.bgColor || 'rgba(255, 255, 255, 0.05)'}
        stroke={selected ? '#ff8c5a' : 'rgba(255, 255, 255, 0.1)'}
        strokeWidth={selected ? 2 : 1}
        cornerRadius={8}
      />

      {/* Logo/品牌名称 */}
      <KonvaText
        x={padding}
        y={padding}
        text={data.logoText || 'BRAND'}
        fontSize={24}
        fontFamily="Inter"
        fontWeight="bold"
        fill={data.logoColor || '#ffffff'}
      />

      {/* 分隔线 */}
      {data.showSeparator !== false && (
        <Line
          points={[padding, padding + 40, width - padding, padding + 40]}
          stroke={data.separatorColor || 'rgba(255, 255, 255, 0.2)'}
          strokeWidth={1}
          dash={[4, 4]}
        />
      )}

      {/* 公司信息 */}
      <KonvaText
        x={padding}
        y={padding + 50}
        text={data.company || '公司名称'}
        fontSize={14}
        fontFamily="Inter"
        fill={data.textColor || '#94a3b8'}
      />

      {/* 版权信息 */}
      <KonvaText
        x={padding}
        y={padding + 70}
        text={data.copyright || '© 2024 All Rights Reserved'}
        fontSize={12}
        fontFamily="Inter"
        fill={data.textColor || '#94a3b8'}
      />

      {/* 社交媒体图标 */}
      <Group x={width - padding - 20} y={padding + 50}>
        {socialIcons.map((item, index) => (
          <KonvaText
            key={index}
            x={-index * 30}
            y={0}
            text={item.icon}
            fontSize={20}
            align="center"
          />
        ))}
      </Group>
    </Group>
  );
};
