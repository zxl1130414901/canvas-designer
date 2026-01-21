import { useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Stage, Layer, Transformer } from 'react-konva';
import { useStore } from '../../store';
import type { Component } from '../../types';
import { COMPONENT_REGISTRY } from '../../registries/ComponentRegistry';
import { NeonSelectionBorder } from './AnimatedSelectionBorder';

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

    // 组件渲染器 - 使用组件注册表和 React.memo 优化
    const renderComponent = (comp: Component) => {
      const Component = COMPONENT_REGISTRY[comp.type];
      if (!Component) {
        console.warn(`Unknown component type: ${comp.type}`);
        return null;
      }

      const isSelected = canvas.selectedIds.includes(comp.id);

      // 通用事件处理器
      const handleDragStart = () => {
        selectComponent(comp.id);
      };

      const handleDragEnd = (e: any) => {
        const dx = e.target.x() - comp.x;
        const dy = e.target.y() - comp.y;
        moveComponents([comp.id], dx, dy);
      };

      const handleSelect = (e: any) => {
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
      };

      return (
        <Component
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
          selected={isSelected}
          locked={comp.locked}
          data={comp.data as any}
          shapeType={comp.type as 'rectangle' | 'circle' | 'line'}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onSelect={handleSelect}
        />
      );
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
      [selectedComponent, deleteComponent, clearSelection]
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

            {/* 动画选中边框 - 霓虹灯效果 */}
            {selectedComponent && (
              <NeonSelectionBorder
                stageRef={stageRef}
                componentId={selectedComponent.id}
              />
            )}

            {/* 变换器（缩放、旋转）- 简化样式 */}
            {selectedComponent && getSelectedNode() && (
              <Transformer
                selectedNodes={[getSelectedNode()]}
                boundBoxFunc={(oldBox) => {
                  return oldBox;
                }}
                anchorSize={8}
                anchorCornerRadius={3}
                anchorStroke="#ff8c5a"
                anchorFill="#ff8c5a"
                anchorStrokeWidth={1}
                borderStroke="transparent"
                borderStrokeWidth={0}
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
