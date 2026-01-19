import React from 'react';
import { Group, Rect, Text as KonvaText } from 'react-konva';
import type { BaseComponent } from '../../types';

interface TableCell {
  text: string;
  color?: string;
  fontWeight?: 'normal' | 'bold';
  align?: 'left' | 'center' | 'right';
}

interface TableRow {
  cells: TableCell[];
  bgColor?: string;
}

interface TableComponentData {
  headers: string[];
  rows: TableRow[];
  showHeaders: boolean;
  headerBgColor: string;
  headerColor: string;
  borderColor: string;
  cellPadding: number;
  fontSize: number;
  cornerRadius: number;
}

interface AtomicTableProps extends BaseComponent {
  data: TableComponentData;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
  onSelect: (e?: any) => void;
}

export const AtomicTable: React.FC<AtomicTableProps> = ({
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
  const padding = data.cellPadding || 8;
  const fontSize = data.fontSize || 12;
  
  // 计算列宽
  const columns = Math.max(
    data.headers.length,
    ...data.rows.map(row => row.cells.length)
  );
  const colWidth = (width - padding * 2) / columns;
  
  // 计算行高
  const headerHeight = data.showHeaders ? fontSize + padding * 2 : 0;
  const rowHeight = fontSize + padding * 2;
  const totalHeight = headerHeight + data.rows.length * rowHeight;

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
        x={0}
        y={0}
        width={width}
        height={height}
        fill="transparent"
        cornerRadius={data.cornerRadius || 4}
      />

      {/* 表头 */}
      {data.showHeaders && data.headers.map((header, colIndex) => (
        <Group key={`header-${colIndex}`}>
          <Rect
            x={padding + colIndex * colWidth}
            y={padding}
            width={colWidth}
            height={headerHeight}
            fill={data.headerBgColor || 'rgba(255, 107, 53, 0.2)'}
          />
          <KonvaText
            x={padding + colIndex * colWidth}
            y={padding + padding / 2}
            width={colWidth}
            text={header}
            fontSize={fontSize}
            fontFamily="Inter"
            fontWeight="bold"
            fill={data.headerColor || '#ffffff'}
            align="center"
          />
        </Group>
      ))}

      {/* 数据行 */}
      {data.rows.map((row, rowIndex) => (
        <Group key={`row-${rowIndex}`}>
          {row.cells.map((cell, colIndex) => (
            <Group key={`cell-${rowIndex}-${colIndex}`}>
              {/* 单元格背景 */}
              {(rowIndex % 2 === 0) && (
                <Rect
                  x={padding + colIndex * colWidth}
                  y={padding + headerHeight + rowIndex * rowHeight}
                  width={colWidth}
                  height={rowHeight}
                  fill="rgba(255, 255, 255, 0.02)"
                />
              )}
              
              {/* 单元格文字 */}
              <KonvaText
                x={padding + colIndex * colWidth}
                y={padding + headerHeight + rowIndex * rowHeight + padding / 2}
                width={colWidth}
                text={cell.text}
                fontSize={fontSize}
                fontFamily="Inter"
                fontWeight={cell.fontWeight || 'normal'}
                fill={cell.color || '#94a3b8'}
                align={cell.align || 'center'}
              />
            </Group>
          ))}
        </Group>
      ))}

      {/* 边框 */}
      <Rect
        x={padding}
        y={padding}
        width={width - padding * 2}
        height={totalHeight}
        stroke={selected ? '#ff8c5a' : data.borderColor || 'rgba(255, 107, 53, 0.3)'}
        strokeWidth={selected ? 2 : 1}
        cornerRadius={data.cornerRadius || 4}
        dash={selected ? [5, 5] : undefined}
      />
    </Group>
  );
};
