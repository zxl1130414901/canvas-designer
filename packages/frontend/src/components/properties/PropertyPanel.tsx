import React from 'react';
import { useStore } from '../../store';
import { CanvasSettingsPanel } from './panels/CanvasSettingsPanel';
import { CommonPropertiesPanel } from './panels/CommonPropertiesPanel';
import { PROPERTY_PANEL_REGISTRY } from './registries/PropertyPanelRegistry';

/**
 * Property Panel - Main Controller
 * Orchestrates property editing UI for all component types
 * Refactored from 1,812 lines to ~150 lines
 */
export const PropertyPanel: React.FC = () => {
  const {
    canvas,
    updateComponent,
    deleteComponent,
    combineComponents,
    separateComponents,
  } = useStore();

  // 获取选中的组件
  const selectedComponent = canvas.selectedIds.length === 1
    ? canvas.components.find((c) => c.id === canvas.selectedIds[0])
    : null;
  const selectedIds = canvas.selectedIds;
  const hasMultipleSelection = selectedIds.length > 1;
  
  // 判断是否是组合容器
  const isComposite = selectedComponent && (
    selectedComponent.type.includes('-group') ||
    ['content-card', 'info-grid', 'callout-box', 'timeline-block', 'stats-card', 'divider', 'header-group'].includes(selectedComponent.type) ||
    ['new-title-card', 'new-data-card', 'new-user-card', 'new-product-card', 'new-timeline', 'new-stats-chart', 'new-quote-card', 'new-section-divider'].includes(selectedComponent.type)
  );

  // 事件处理器
  const handleDelete = () => {
    if (selectedComponent && confirm('确定删除此组件吗？')) {
      deleteComponent(selectedComponent.id);
    }
  };

  const handleCombine = () => {
    if (hasMultipleSelection) {
      combineComponents(selectedIds);
    }
  };

  const handleSeparate = () => {
    if (selectedComponent && isComposite) {
      separateComponents(selectedComponent.id);
    }
  };

  // 画布设置（无选择时）
  if (!selectedComponent && !hasMultipleSelection) {
    return <CanvasSettingsPanel />;
  }

  // 多选情况
  if (hasMultipleSelection) {
    return (
      <div className="properties-panel">
        <div className="panel-header">
          <div className="header-content">
            <h3>组件属性</h3>
            <div className="component-type">已选中 {selectedIds.length} 个</div>
          </div>
        </div>
        <div className="panel-content">
          <div className="multiple-selection-info">
            <div className="info-icon">📦</div>
            <h4>多选模式</h4>
            <p>已选中 {selectedIds.length} 个组件</p>
            <button onClick={handleCombine} className="combine-large-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6a2 2 0 012 2v2a2 2 0 012-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z"/>
              </svg>
              组合组件
            </button>
            <p className="hint">点击组合按钮将选中的组件整合为一个容器</p>
          </div>
        </div>
      </div>
    );
  }

  const comp = selectedComponent;
  if (!comp) {
    return <CanvasSettingsPanel />;
  }

  // 渲染组件特定的属性面板
  const PropertyPanelComponent = PROPERTY_PANEL_REGISTRY[comp.type];

  return (
    <div className="properties-panel">
      {/* 标题 */}
      <div className="panel-header">
        <div className="header-content">
          <h3>组件属性</h3>
          <div className="component-type">{comp.type}</div>
        </div>
        <div className="header-actions">
          {isComposite && (
            <button
              onClick={handleSeparate}
              className="action-btn separate-btn"
              title="分离组合组件"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6a2 2 0 012 2v2a2 2 0 012-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z"/>
              </svg>
              分离
            </button>
          )}
          <button
            onClick={handleDelete}
            className="action-btn delete-btn"
            title="删除组件"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0h14M10 11v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="panel-content">
        {/* 通用属性 */}
        <CommonPropertiesPanel component={comp} onUpdate={(updates: any) => updateComponent(comp.id, updates)} />
        
        {/* 组件特定属性 */}
        {PropertyPanelComponent && <PropertyPanelComponent component={comp} onUpdate={(updates: any) => updateComponent(comp.id, updates)} />}
      </div>
    </div>
  );
};
