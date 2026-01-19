import { useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Stage, Layer, Transformer } from 'react-konva';
import { useStore } from '../../store';
import type { Component } from '../../types';
import { AtomicText } from '../atoms/AtomicText';
import { AtomicShape } from '../atoms/AtomicShape';
import { AtomicTriangle } from '../atoms/AtomicTriangle';
import { AtomicStar } from '../atoms/AtomicStar';
import { AtomicArrow } from '../atoms/AtomicArrow';
import { AtomicTag } from '../atoms/AtomicTag';
import { AtomicProgressBar } from '../atoms/AtomicProgressBar';
import { AtomicRating } from '../atoms/AtomicRating';
import { AtomicBackground } from '../atoms/AtomicBackground';
import { AtomicBorder } from '../atoms/AtomicBorder';
import { AtomicDotMarker } from '../atoms/AtomicDotMarker';
import { AtomicWatermark } from '../atoms/AtomicWatermark';
import { AtomicCountdown } from '../atoms/AtomicCountdown';
import { AtomicTable } from '../atoms/AtomicTable';
import { CompositeHeader } from '../composite/CompositeHeader';
import { CompositeContentCard } from '../composite/CompositeContentCard';
import { CompositeInfoGrid } from '../composite/CompositeInfoGrid';
import { CompositeCalloutBox } from '../composite/CompositeCalloutBox';
import { CompositeDivider } from '../composite/CompositeDivider';
import { CompositeTimelineBlock } from '../composite/CompositeTimelineBlock';
import { CompositeStatsCard } from '../composite/CompositeStatsCard';
import { NewTitleCard, NewDataCard, NewUserCard, NewProductCard, NewTimeline, NewStatsChart, NewQuoteCard, NewSectionDivider } from '../new-composite';

interface CanvasProps {
  width?: number;
  height?: number;
  onExportSVG?: () => void;
  onExportPNG?: () => void;
}

export interface CanvasRef {
  exportToSVG: () => void;
  exportToPNG: () => void;
}

export const Canvas = forwardRef<CanvasRef, CanvasProps>(
  ({ width = 800, height = 1200 }, ref) => {
    const {
      canvas,
      selectComponent,
      selectMultiple,
      clearSelection,
      moveComponents,
      updateComponent,
      deleteComponent,
    } = useStore();

    const stageRef = useRef<any>(null);

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
      exportToSVG: () => {
        if (!stageRef?.current) {
          console.warn('Stage ref is not available');
          return;
        }
        try {
          const svgData = stageRef.current.toDataURL({
            mimeType: 'image/svg+xml',
            quality: 1,
          });
          const link = document.createElement('a');
          link.download = `poster-${Date.now()}.svg`;
          link.href = svgData;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (error) {
          console.error('导出SVG失败:', error);
          alert('导出SVG失败，请查看控制台');
        }
      },
      exportToPNG: () => {
        if (!stageRef?.current) {
          console.warn('Stage ref is not available');
          return;
        }
        try {
          const pngData = stageRef.current.toDataURL({
            mimeType: 'image/png',
            quality: 1,
            pixelRatio: 2,
          });
          const link = document.createElement('a');
          link.download = `poster-${Date.now()}.png`;
          link.href = pngData;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (error) {
          console.error('导出PNG失败:', error);
          alert('导出PNG失败，请查看控制台');
        }
      },
    }));

    // 获取选中的组件
    const selectedComponent = canvas.selectedIds.length === 1 
      ? canvas.components.find((c) => c.id === canvas.selectedIds[0])
      : null;

    // 安全的获取选中节点
    const getSelectedNode = () => {
      if (!stageRef?.current || !selectedComponent) {
        return null;
      }
      try {
        return stageRef.current.findOne(`#${selectedComponent.id}`) as any;
      } catch (error) {
        console.error('获取选中节点失败:', error);
        return null;
      }
    };

    // 组件渲染
    const renderComponent = (comp: Component) => {
      if (!comp) {
        return null;
      }

      // 文本组件
      if (comp.type === 'text' || comp.type === 'rectangle' || comp.type === 'circle' || comp.type === 'line') {
        // 使用类型守卫来判断具体的形状类型
        const isText = comp.type === 'text';
        const isRectangle = comp.type === 'rectangle';
        const isCircle = comp.type === 'circle';
        const isLine = comp.type === 'line';

        if (isText) {
          return (
            <AtomicText
              key={comp.id}
              id={comp.id}
              type={comp.type}
              x={comp.x}
              y={comp.y}
              width={comp.width}
              height={comp.height}
              rotation={comp.rotation}
              opacity={comp.opacity}
              zIndex={comp.zIndex}
              selected={canvas.selectedIds.includes(comp.id)}
              locked={comp.locked}
              data={comp.data as any}
              onDragStart={() => {
                selectComponent(comp.id);
              }}
              onDragEnd={(e) => {
                const dx = e.target.x() - comp.x;
                const dy = e.target.y() - comp.y;
                moveComponents([comp.id], dx, dy);
              }}
              onSelect={(e: any) => {
                // 如果按住Ctrl键，切换选中状态
                if (e?.ctrlKey || e?.metaKey) {
                  if (canvas.selectedIds.includes(comp.id)) {
                    selectMultiple(canvas.selectedIds.filter(id => id !== comp.id));
                  } else {
                    selectMultiple([...canvas.selectedIds, comp.id]);
                  }
                } else {
                  selectComponent(comp.id);
                }
              }}
            />
          );
        }

        // 图形组件
        if (isRectangle || isCircle || isLine) {
          return (
            <AtomicShape
              key={comp.id}
              id={comp.id}
              type={comp.type}
              x={comp.x}
              y={comp.y}
              width={comp.width}
              height={comp.height}
              rotation={comp.rotation}
              opacity={comp.opacity}
              zIndex={comp.zIndex}
              selected={canvas.selectedIds.includes(comp.id)}
              locked={comp.locked}
              data={comp.data as any}
              shapeType={isRectangle ? 'rectangle' : isCircle ? 'circle' : 'line'}
              onDragStart={() => {
                selectComponent(comp.id);
              }}
              onDragEnd={(e) => {
                const dx = e.target.x() - comp.x;
                const dy = e.target.y() - comp.y;
                moveComponents([comp.id], dx, dy);
              }}
              onSelect={(e: any) => {
                // 如果按住Ctrl键，切换选中状态
                if (e?.ctrlKey || e?.metaKey) {
                  if (canvas.selectedIds.includes(comp.id)) {
                    selectMultiple(canvas.selectedIds.filter(id => id !== comp.id));
                  } else {
                    selectMultiple([...canvas.selectedIds, comp.id]);
                  }
                } else {
                  selectComponent(comp.id);
                }
              }}
            />
          );
        }
      }

      // 三角形组件
      if (comp.type === 'triangle') {
        return (
          <AtomicTriangle
            key={comp.id}
            id={comp.id}
            type={comp.type}
            x={comp.x}
            y={comp.y}
            width={comp.width}
            height={comp.height}
            rotation={comp.rotation}
            opacity={comp.opacity}
            zIndex={comp.zIndex}
            selected={comp.selected}
            locked={comp.locked}
            data={comp.data as any}
            onDragStart={() => {
              selectComponent(comp.id);
            }}
            onDragEnd={(e) => {
              const dx = e.target.x() - comp.x;
              const dy = e.target.y() - comp.y;
              moveComponents([comp.id], dx, dy);
            }}
            onSelect={() => selectComponent(comp.id)}
          />
        );
      }

      // 星形组件
      if (comp.type === 'star') {
        return (
          <AtomicStar
            key={comp.id}
            id={comp.id}
            type={comp.type}
            x={comp.x}
            y={comp.y}
            width={comp.width}
            height={comp.height}
            rotation={comp.rotation}
            opacity={comp.opacity}
            zIndex={comp.zIndex}
            selected={comp.selected}
            locked={comp.locked}
            data={comp.data as any}
            onDragStart={() => {
              selectComponent(comp.id);
            }}
            onDragEnd={(e) => {
              const dx = e.target.x() - comp.x;
              const dy = e.target.y() - comp.y;
              moveComponents([comp.id], dx, dy);
            }}
            onSelect={() => selectComponent(comp.id)}
          />
        );
      }

      // 箭头组件
      if (comp.type === 'arrow') {
        return (
          <AtomicArrow
            key={comp.id}
            id={comp.id}
            type={comp.type}
            x={comp.x}
            y={comp.y}
            width={comp.width}
            height={comp.height}
            rotation={comp.rotation}
            opacity={comp.opacity}
            zIndex={comp.zIndex}
            selected={comp.selected}
            locked={comp.locked}
            data={comp.data as any}
            onDragStart={() => {
              selectComponent(comp.id);
            }}
            onDragEnd={(e) => {
              const dx = e.target.x() - comp.x;
              const dy = e.target.y() - comp.y;
              moveComponents([comp.id], dx, dy);
            }}
            onSelect={() => selectComponent(comp.id)}
          />
        );
      }

      // 标签组件
      if (comp.type === 'tag') {
        return (
          <AtomicTag
            key={comp.id}
            id={comp.id}
            type={comp.type}
            x={comp.x}
            y={comp.y}
            width={comp.width}
            height={comp.height}
            rotation={comp.rotation}
            opacity={comp.opacity}
            zIndex={comp.zIndex}
            selected={comp.selected}
            locked={comp.locked}
            data={comp.data as any}
            onDragStart={() => {
              selectComponent(comp.id);
            }}
            onDragEnd={(e) => {
              const dx = e.target.x() - comp.x;
              const dy = e.target.y() - comp.y;
              moveComponents([comp.id], dx, dy);
            }}
            onSelect={() => selectComponent(comp.id)}
          />
        );
      }

      // 组合组件 - header-group
      if (comp.type === 'header-group') {
        const childIds = (comp.data as any).childIds || [];
        const childComponents = canvas.components.filter((c) =>
          childIds.includes(c.id)
        );
        return (
          <CompositeHeader
            key={comp.id}
            id={comp.id}
            type={comp.type}
            x={comp.x}
            y={comp.y}
            width={comp.width}
            height={comp.height}
            rotation={comp.rotation}
            opacity={comp.opacity}
            zIndex={comp.zIndex}
            selected={comp.selected}
            locked={comp.locked}
            data={comp.data as any}
            childComponents={childComponents}
            onDragStart={() => {
              selectComponent(comp.id);
            }}
            onDragEnd={(e) => {
              const dx = e.target.x() - comp.x;
              const dy = e.target.y() - comp.y;
              // 移动容器和所有子组件
              moveComponents([comp.id, ...childIds], dx, dy);
            }}
            onSelect={() => selectComponent(comp.id)}
            onChildSelect={(childId) => selectComponent(childId)}
            updateComponent={updateComponent}
          />
        );
      }

      // 组合组件 - content-card
      if (comp.type === 'content-card') {
        return (
          <CompositeContentCard
            key={comp.id}
            id={comp.id}
            type={comp.type}
            x={comp.x}
            y={comp.y}
            width={comp.width}
            height={comp.height}
            rotation={comp.rotation}
            opacity={comp.opacity}
            zIndex={comp.zIndex}
            selected={comp.selected}
            locked={comp.locked}
            data={comp.data as any}
            onDragStart={() => {
              selectComponent(comp.id);
            }}
            onDragEnd={(e) => {
              const dx = e.target.x() - comp.x;
              const dy = e.target.y() - comp.y;
              moveComponents([comp.id], dx, dy);
            }}
            onSelect={() => selectComponent(comp.id)}
          />
        );
      }

      // 组合组件 - info-grid
      if (comp.type === 'info-grid') {
        return (
          <CompositeInfoGrid
            key={comp.id}
            id={comp.id}
            type={comp.type}
            x={comp.x}
            y={comp.y}
            width={comp.width}
            height={comp.height}
            rotation={comp.rotation}
            opacity={comp.opacity}
            zIndex={comp.zIndex}
            selected={comp.selected}
            locked={comp.locked}
            data={comp.data as any}
            onDragStart={() => {
              selectComponent(comp.id);
            }}
            onDragEnd={(e) => {
              const dx = e.target.x() - comp.x;
              const dy = e.target.y() - comp.y;
              moveComponents([comp.id], dx, dy);
            }}
            onSelect={() => selectComponent(comp.id)}
          />
        );
      }

      // 组合组件 - callout-box
      if (comp.type === 'callout-box') {
        return (
          <CompositeCalloutBox
            key={comp.id}
            id={comp.id}
            type={comp.type}
            x={comp.x}
            y={comp.y}
            width={comp.width}
            height={comp.height}
            rotation={comp.rotation}
            opacity={comp.opacity}
            zIndex={comp.zIndex}
            selected={comp.selected}
            locked={comp.locked}
            data={comp.data as any}
            onDragStart={() => {
              selectComponent(comp.id);
            }}
            onDragEnd={(e) => {
              const dx = e.target.x() - comp.x;
              const dy = e.target.y() - comp.y;
              moveComponents([comp.id], dx, dy);
            }}
            onSelect={() => selectComponent(comp.id)}
          />
        );
      }

      // 组合组件 - divider
      if (comp.type === 'divider') {
        return (
          <CompositeDivider
            key={comp.id}
            id={comp.id}
            type={comp.type}
            x={comp.x}
            y={comp.y}
            width={comp.width}
            height={comp.height}
            rotation={comp.rotation}
            opacity={comp.opacity}
            zIndex={comp.zIndex}
            selected={comp.selected}
            locked={comp.locked}
            data={comp.data as any}
            onDragStart={() => {
              selectComponent(comp.id);
            }}
            onDragEnd={(e) => {
              const dx = e.target.x() - comp.x;
              const dy = e.target.y() - comp.y;
              moveComponents([comp.id], dx, dy);
            }}
            onSelect={() => selectComponent(comp.id)}
          />
        );
      }

      // 组合组件 - timeline-block
      if (comp.type === 'timeline-block') {
        return (
          <CompositeTimelineBlock
            key={comp.id}
            id={comp.id}
            type={comp.type}
            x={comp.x}
            y={comp.y}
            width={comp.width}
            height={comp.height}
            rotation={comp.rotation}
            opacity={comp.opacity}
            zIndex={comp.zIndex}
            selected={comp.selected}
            locked={comp.locked}
            data={comp.data as any}
            onDragStart={() => {
              selectComponent(comp.id);
            }}
            onDragEnd={(e) => {
              const dx = e.target.x() - comp.x;
              const dy = e.target.y() - comp.y;
              moveComponents([comp.id], dx, dy);
            }}
            onSelect={() => selectComponent(comp.id)}
          />
        );
      }

      // 组合组件 - stats-card
      if (comp.type === 'stats-card') {
        return (
          <CompositeStatsCard
            key={comp.id}
            id={comp.id}
            type={comp.type}
            x={comp.x}
            y={comp.y}
            width={comp.width}
            height={comp.height}
            rotation={comp.rotation}
            opacity={comp.opacity}
            zIndex={comp.zIndex}
            selected={comp.selected}
            locked={comp.locked}
            data={comp.data as any}
            onDragStart={() => {
              selectComponent(comp.id);
            }}
            onDragEnd={(e) => {
              const dx = e.target.x() - comp.x;
              const dy = e.target.y() - comp.y;
              moveComponents([comp.id], dx, dy);
            }}
            onSelect={() => selectComponent(comp.id)}
          />
        );
      }

      // 新组合组件 - new-title-card
      if (comp.type === 'new-title-card') {
        return (
          <NewTitleCard
            key={comp.id}
            id={comp.id}
            type={comp.type}
            x={comp.x}
            y={comp.y}
            width={comp.width}
            height={comp.height}
            rotation={comp.rotation}
            opacity={comp.opacity}
            zIndex={comp.zIndex}
            selected={comp.selected}
            locked={comp.locked}
            data={comp.data as any}
            onDragStart={() => {
              selectComponent(comp.id);
            }}
            onDragEnd={(e) => {
              const dx = e.target.x() - comp.x;
              const dy = e.target.y() - comp.y;
              moveComponents([comp.id], dx, dy);
            }}
            onSelect={() => selectComponent(comp.id)}
          />
        );
      }

      // 新组合组件 - new-data-card
      if (comp.type === 'new-data-card') {
        return (
          <NewDataCard
            key={comp.id}
            id={comp.id}
            type={comp.type}
            x={comp.x}
            y={comp.y}
            width={comp.width}
            height={comp.height}
            rotation={comp.rotation}
            opacity={comp.opacity}
            zIndex={comp.zIndex}
            selected={comp.selected}
            locked={comp.locked}
            data={comp.data as any}
            onDragStart={() => {
              selectComponent(comp.id);
            }}
            onDragEnd={(e) => {
              const dx = e.target.x() - comp.x;
              const dy = e.target.y() - comp.y;
              moveComponents([comp.id], dx, dy);
            }}
            onSelect={() => selectComponent(comp.id)}
          />
        );
      }

      // 新组合组件 - new-user-card
      if (comp.type === 'new-user-card') {
        return (
          <NewUserCard
            key={comp.id}
            id={comp.id}
            type={comp.type}
            x={comp.x}
            y={comp.y}
            width={comp.width}
            height={comp.height}
            rotation={comp.rotation}
            opacity={comp.opacity}
            zIndex={comp.zIndex}
            selected={comp.selected}
            locked={comp.locked}
            data={comp.data as any}
            onDragStart={() => {
              selectComponent(comp.id);
            }}
            onDragEnd={(e) => {
              const dx = e.target.x() - comp.x;
              const dy = e.target.y() - comp.y;
              moveComponents([comp.id], dx, dy);
            }}
            onSelect={() => selectComponent(comp.id)}
          />
        );
      }

      // 新组合组件 - new-product-card
      if (comp.type === 'new-product-card') {
        return (
          <NewProductCard
            key={comp.id}
            id={comp.id}
            type={comp.type}
            x={comp.x}
            y={comp.y}
            width={comp.width}
            height={comp.height}
            rotation={comp.rotation}
            opacity={comp.opacity}
            zIndex={comp.zIndex}
            selected={comp.selected}
            locked={comp.locked}
            data={comp.data as any}
            onDragStart={() => {
              selectComponent(comp.id);
            }}
            onDragEnd={(e) => {
              const dx = e.target.x() - comp.x;
              const dy = e.target.y() - comp.y;
              moveComponents([comp.id], dx, dy);
            }}
            onSelect={() => selectComponent(comp.id)}
          />
        );
      }

      // 新组合组件 - new-timeline
      if (comp.type === 'new-timeline') {
        return (
          <NewTimeline
            key={comp.id}
            id={comp.id}
            type={comp.type}
            x={comp.x}
            y={comp.y}
            width={comp.width}
            height={comp.height}
            rotation={comp.rotation}
            opacity={comp.opacity}
            zIndex={comp.zIndex}
            selected={comp.selected}
            locked={comp.locked}
            data={comp.data as any}
            onDragStart={() => {
              selectComponent(comp.id);
            }}
            onDragEnd={(e) => {
              const dx = e.target.x() - comp.x;
              const dy = e.target.y() - comp.y;
              moveComponents([comp.id], dx, dy);
            }}
            onSelect={() => selectComponent(comp.id)}
          />
        );
      }

      // 新组合组件 - new-stats-chart
      if (comp.type === 'new-stats-chart') {
        return (
          <NewStatsChart
            key={comp.id}
            id={comp.id}
            type={comp.type}
            x={comp.x}
            y={comp.y}
            width={comp.width}
            height={comp.height}
            rotation={comp.rotation}
            opacity={comp.opacity}
            zIndex={comp.zIndex}
            selected={comp.selected}
            locked={comp.locked}
            data={comp.data as any}
            onDragStart={() => {
              selectComponent(comp.id);
            }}
            onDragEnd={(e) => {
              const dx = e.target.x() - comp.x;
              const dy = e.target.y() - comp.y;
              moveComponents([comp.id], dx, dy);
            }}
            onSelect={() => selectComponent(comp.id)}
          />
        );
      }

      // 新组合组件 - new-quote-card
      if (comp.type === 'new-quote-card') {
        return (
          <NewQuoteCard
            key={comp.id}
            id={comp.id}
            type={comp.type}
            x={comp.x}
            y={comp.y}
            width={comp.width}
            height={comp.height}
            rotation={comp.rotation}
            opacity={comp.opacity}
            zIndex={comp.zIndex}
            selected={comp.selected}
            locked={comp.locked}
            data={comp.data as any}
            onDragStart={() => {
              selectComponent(comp.id);
            }}
            onDragEnd={(e) => {
              const dx = e.target.x() - comp.x;
              const dy = e.target.y() - comp.y;
              moveComponents([comp.id], dx, dy);
            }}
            onSelect={() => selectComponent(comp.id)}
          />
        );
      }

      // 新组合组件 - new-section-divider
      if (comp.type === 'new-section-divider') {
        return (
          <NewSectionDivider
            key={comp.id}
            id={comp.id}
            type={comp.type}
            x={comp.x}
            y={comp.y}
            width={comp.width}
            height={comp.height}
            rotation={comp.rotation}
            opacity={comp.opacity}
            zIndex={comp.zIndex}
            selected={comp.selected}
            locked={comp.locked}
            data={comp.data as any}
            onDragStart={() => {
              selectComponent(comp.id);
            }}
            onDragEnd={(e) => {
              const dx = e.target.x() - comp.x;
              const dy = e.target.y() - comp.y;
              moveComponents([comp.id], dx, dy);
            }}
            onSelect={() => selectComponent(comp.id)}
          />
        );
      }

      // 新增原子组件 - progress-bar
      if (comp.type === 'progress-bar') {
        return (
          <AtomicProgressBar
            key={comp.id}
            id={comp.id}
            type={comp.type}
            x={comp.x}
            y={comp.y}
            width={comp.width}
            height={comp.height}
            rotation={comp.rotation}
            opacity={comp.opacity}
            zIndex={comp.zIndex}
            selected={comp.selected}
            locked={comp.locked}
            data={comp.data as any}
            onDragStart={() => {
              selectComponent(comp.id);
            }}
            onDragEnd={(e) => {
              const dx = e.target.x() - comp.x;
              const dy = e.target.y() - comp.y;
              moveComponents([comp.id], dx, dy);
            }}
            onSelect={() => selectComponent(comp.id)}
          />
        );
      }

      // 新增原子组件 - rating
      if (comp.type === 'rating') {
        return (
          <AtomicRating
            key={comp.id}
            id={comp.id}
            type={comp.type}
            x={comp.x}
            y={comp.y}
            width={comp.width}
            height={comp.height}
            rotation={comp.rotation}
            opacity={comp.opacity}
            zIndex={comp.zIndex}
            selected={comp.selected}
            locked={comp.locked}
            data={comp.data as any}
            onDragStart={() => {
              selectComponent(comp.id);
            }}
            onDragEnd={(e) => {
              const dx = e.target.x() - comp.x;
              const dy = e.target.y() - comp.y;
              moveComponents([comp.id], dx, dy);
            }}
            onSelect={() => selectComponent(comp.id)}
          />
        );
      }

      // 新增原子组件 - background
      if (comp.type === 'background') {
        return (
          <AtomicBackground
            key={comp.id}
            id={comp.id}
            type={comp.type}
            x={comp.x}
            y={comp.y}
            width={comp.width}
            height={comp.height}
            rotation={comp.rotation}
            opacity={comp.opacity}
            zIndex={comp.zIndex}
            selected={comp.selected}
            locked={comp.locked}
            data={comp.data as any}
            onDragStart={() => {
              selectComponent(comp.id);
            }}
            onDragEnd={(e) => {
              const dx = e.target.x() - comp.x;
              const dy = e.target.y() - comp.y;
              moveComponents([comp.id], dx, dy);
            }}
            onSelect={() => selectComponent(comp.id)}
          />
        );
      }

      // 新增原子组件 - border
      if (comp.type === 'border') {
        return (
          <AtomicBorder
            key={comp.id}
            id={comp.id}
            type={comp.type}
            x={comp.x}
            y={comp.y}
            width={comp.width}
            height={comp.height}
            rotation={comp.rotation}
            opacity={comp.opacity}
            zIndex={comp.zIndex}
            selected={comp.selected}
            locked={comp.locked}
            data={comp.data as any}
            onDragStart={() => {
              selectComponent(comp.id);
            }}
            onDragEnd={(e) => {
              const dx = e.target.x() - comp.x;
              const dy = e.target.y() - comp.y;
              moveComponents([comp.id], dx, dy);
            }}
            onSelect={() => selectComponent(comp.id)}
          />
        );
      }

      // 新增原子组件 - dot-marker
      if (comp.type === 'dot-marker') {
        return (
          <AtomicDotMarker
            key={comp.id}
            id={comp.id}
            type={comp.type}
            x={comp.x}
            y={comp.y}
            width={comp.width}
            height={comp.height}
            rotation={comp.rotation}
            opacity={comp.opacity}
            zIndex={comp.zIndex}
            selected={comp.selected}
            locked={comp.locked}
            data={comp.data as any}
            onDragStart={() => {
              selectComponent(comp.id);
            }}
            onDragEnd={(e) => {
              const dx = e.target.x() - comp.x;
              const dy = e.target.y() - comp.y;
              moveComponents([comp.id], dx, dy);
            }}
            onSelect={() => selectComponent(comp.id)}
          />
        );
      }

      // 新增原子组件 - watermark
      if (comp.type === 'watermark') {
        return (
          <AtomicWatermark
            key={comp.id}
            id={comp.id}
            type={comp.type}
            x={comp.x}
            y={comp.y}
            width={comp.width}
            height={comp.height}
            rotation={comp.rotation}
            opacity={comp.opacity}
            zIndex={comp.zIndex}
            selected={comp.selected}
            locked={comp.locked}
            data={comp.data as any}
            onDragStart={() => {
              selectComponent(comp.id);
            }}
            onDragEnd={(e) => {
              const dx = e.target.x() - comp.x;
              const dy = e.target.y() - comp.y;
              moveComponents([comp.id], dx, dy);
            }}
            onSelect={() => selectComponent(comp.id)}
          />
        );
      }

      // 新增原子组件 - countdown
      if (comp.type === 'countdown') {
        return (
          <AtomicCountdown
            key={comp.id}
            id={comp.id}
            type={comp.type}
            x={comp.x}
            y={comp.y}
            width={comp.width}
            height={comp.height}
            rotation={comp.rotation}
            opacity={comp.opacity}
            zIndex={comp.zIndex}
            selected={comp.selected}
            locked={comp.locked}
            data={comp.data as any}
            onDragStart={() => {
              selectComponent(comp.id);
            }}
            onDragEnd={(e) => {
              const dx = e.target.x() - comp.x;
              const dy = e.target.y() - comp.y;
              moveComponents([comp.id], dx, dy);
            }}
            onSelect={() => selectComponent(comp.id)}
          />
        );
      }

      // 新增原子组件 - table
      if (comp.type === 'table') {
        return (
          <AtomicTable
            key={comp.id}
            id={comp.id}
            type={comp.type}
            x={comp.x}
            y={comp.y}
            width={comp.width}
            height={comp.height}
            rotation={comp.rotation}
            opacity={comp.opacity}
            zIndex={comp.zIndex}
            selected={comp.selected}
            locked={comp.locked}
            data={comp.data as any}
            onDragStart={() => {
              selectComponent(comp.id);
            }}
            onDragEnd={(e) => {
              const dx = e.target.x() - comp.x;
              const dy = e.target.y() - comp.y;
              moveComponents([comp.id], dx, dy);
            }}
            onSelect={() => selectComponent(comp.id)}
          />
        );
      }

      return null;
    };

    // 点击画布空白处取消选择
    const handleStageClick = (e: any) => {
      if (e.target === e.target.getStage()) {
        clearSelection();
      }
    };

    // 键盘事件处理（删除组件）
    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        // 检查是否在文本输入框中编辑
        const target = e.target as HTMLElement;
        const isEditing =
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable;

        // 如果正在编辑文本，不删除组件
        if (isEditing) {
          return;
        }

        // Delete或Backspace键删除选中组件
        if ((e.key === 'Delete' || e.key === 'Backspace') && selectedComponent) {
          e.preventDefault();
          deleteComponent(selectedComponent.id);
        }

        // Escape键取消选择
        if (e.key === 'Escape') {
          clearSelection();
        }
      },
      [selectedComponent]
    );

    useEffect(() => {
      // 添加键盘事件监听
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [handleKeyDown]);

    return (
      <div style={{ width: '100vw', height: '100vh', display: 'flex', backgroundColor: '#0a0e27' }}>
        {/* 画布区域 */}
        <Stage
          ref={stageRef}
          width={width}
          height={height}
          onClick={handleStageClick}
          style={{
            margin: 'auto',
            backgroundColor: canvas.backgroundColor,
            boxShadow: '0 0 40px rgba(0, 0, 0, 0.5)',
          }}
        >
          <Layer>
            {/* 渲染所有组件，按zIndex排序 */}
            {canvas.components
              .slice()
              .sort((a, b) => a.zIndex - b.zIndex)
              .map(renderComponent)}

            {/* 变换器（缩放、旋转） */}
            {selectedComponent && getSelectedNode() && (
              <Transformer
                selectedNodes={[getSelectedNode()]}
                boundBoxFunc={(oldBox) => {
                  return oldBox;
                }}
                anchorSize={10}
                anchorCornerRadius={4}
                anchorStroke="#ff6b35"
                anchorFill="#ff6b35"
                borderStroke="#ff6b35"
                borderDash={[6, 4]}
                rotateEnabled
                enabledAnchors={[
                  'top-left',
                  'top-center',
                  'top-right',
                  'middle-right',
                  'bottom-right',
                  'bottom-center',
                  'bottom-left',
                  'middle-left',
                ]}
              />
            )}
          </Layer>
        </Stage>
      </div>
    );
  },
);

Canvas.displayName = 'Canvas';
