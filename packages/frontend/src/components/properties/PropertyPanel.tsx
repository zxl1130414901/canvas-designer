import React from 'react';
import { useStore } from '../../store';
// import { TagPropertyPanel } from './atoms/TagPropertyPanel';
// import { ArrowPropertyPanel } from './atoms/ArrowPropertyPanel';
// import { ShapePropertyPanel } from './atoms/ShapePropertyPanel';

export const PropertyPanel: React.FC = () => {
  const {
    canvas,
    updateComponent,
    updateCanvas,
    deleteComponent,
    changeZIndex,
    combineComponents,
    separateComponents,
  } = useStore();

  // 获取选中的组件（支持多选和单选）
  const selectedComponent = canvas.selectedIds.length === 1 
    ? canvas.components.find((c) => c.id === canvas.selectedIds[0])
    : null;
  const selectedIds = canvas.selectedIds;
  const hasMultipleSelection = selectedIds.length > 1;
  
  // 判断是否是组合容器（包括用户组合和预定义的高级组件）
  const isComposite = selectedComponent && (
    selectedComponent.type.includes('-group') ||
    ['content-card', 'info-grid', 'callout-box', 'timeline-block', 'stats-card', 'divider', 'header-group'].includes(selectedComponent.type) ||
    // 新组合组件
    ['new-title-card', 'new-data-card', 'new-user-card', 'new-product-card', 'new-timeline', 'new-stats-chart', 'new-quote-card', 'new-section-divider'].includes(selectedComponent.type)
  );

  if (!selectedComponent && !hasMultipleSelection) {
    return (
      <div className="properties-panel">
        <div className="panel-header">
          <h3>画布设置</h3>
        </div>
        <div className="panel-content">
          <div className="property-group">
            <h4>画布尺寸</h4>
            <div className="property-grid">
              <div className="property-item">
                <label>宽度 (最大1600)</label>
                <input
                  type="number"
                  value={canvas.width}
                  onChange={(e) => updateCanvas({ width: Math.min(Number(e.target.value), 1600) })}
                  className="property-input"
                />
              </div>
              <div className="property-item">
                <label>高度 (最大2560)</label>
                <input
                  type="number"
                  value={canvas.height}
                  onChange={(e) => updateCanvas({ height: Math.min(Number(e.target.value), 2560) })}
                  className="property-input"
                />
              </div>
            </div>
          </div>

          <div className="property-group">
            <h4>背景颜色</h4>
            <div className="property-item">
              <input
                type="color"
                value={canvas.backgroundColor}
                onChange={(e) => updateCanvas({ backgroundColor: e.target.value })}
                className="property-color"
                style={{ width: '100%', height: '40px', cursor: 'pointer' }}
              />
            </div>
          </div>

          <div className="empty-state" style={{ marginTop: '40px' }}>
            <div className="empty-icon">🎨</div>
            <p>选中组件以查看属性</p>
          </div>
        </div>
      </div>
    );
  }

  const handleUpdate = (updates: any) => {
    if (selectedComponent) {
      updateComponent(selectedComponent.id, updates);
    }
  };

  const handleDelete = () => {
    if (selectedComponent && confirm('确定删除此组件吗？')) {
      deleteComponent(selectedComponent.id);
    }
  };

  const handleZIndexUp = () => {
    if (selectedComponent) {
      changeZIndex(selectedComponent.id, selectedComponent.zIndex + 1);
    }
  };

  const handleZIndexDown = () => {
    if (selectedComponent && selectedComponent.zIndex > 0) {
      changeZIndex(selectedComponent.id, selectedComponent.zIndex - 1);
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
    return (
      <div className="properties-panel">
        <div className="panel-header">
          <h3>画布设置</h3>
        </div>
        <div className="panel-content">
          <div className="property-group">
            <h4>画布尺寸</h4>
            <div className="property-grid">
              <div className="property-item">
                <label>宽度 (最大1600)</label>
                <input
                  type="number"
                  value={canvas.width}
                  onChange={(e) => updateCanvas({ width: Math.min(Number(e.target.value), 1600) })}
                  className="property-input"
                />
              </div>
              <div className="property-item">
                <label>高度 (最大2560)</label>
                <input
                  type="number"
                  value={canvas.height}
                  onChange={(e) => updateCanvas({ height: Math.min(Number(e.target.value), 2560) })}
                  className="property-input"
                />
              </div>
            </div>
          </div>

          <div className="property-group">
            <h4>背景颜色</h4>
            <div className="property-item">
              <input
                type="color"
                value={canvas.backgroundColor}
                onChange={(e) => updateCanvas({ backgroundColor: e.target.value })}
                className="property-color"
                style={{ width: '100%', height: '40px', cursor: 'pointer' }}
              />
            </div>
          </div>

          <div className="empty-state" style={{ marginTop: '40px' }}>
            <div className="empty-icon">🎨</div>
            <p>选中组件以查看属性</p>
          </div>
        </div>
      </div>
    );
  }

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
        {/* 位置与尺寸 */}
        <div className="property-group">
          <h4>位置与尺寸</h4>
          <div className="property-grid">
            <div className="property-item">
              <label>X坐标</label>
              <input
                type="number"
                value={Math.round(comp.x)}
                onChange={(e) => handleUpdate({ x: Number(e.target.value) })}
                className="property-input"
              />
            </div>
            <div className="property-item">
              <label>Y坐标</label>
              <input
                type="number"
                value={Math.round(comp.y)}
                onChange={(e) => handleUpdate({ y: Number(e.target.value) })}
                className="property-input"
              />
            </div>
            <div className="property-item">
              <label>宽度</label>
              <input
                type="number"
                value={Math.round(comp.width)}
                onChange={(e) => handleUpdate({ width: Number(e.target.value) })}
                className="property-input"
              />
            </div>
            <div className="property-item">
              <label>高度</label>
              <input
                type="number"
                value={Math.round(comp.height)}
                onChange={(e) => handleUpdate({ height: Number(e.target.value) })}
                className="property-input"
              />
            </div>
          </div>
        </div>

        {/* 变换 */}
        <div className="property-group">
          <h4>变换</h4>
          <div className="property-item">
            <label>旋转角度</label>
            <div className="range-input">
              <input
                type="range"
                min="0"
                max="360"
                value={comp.rotation}
                onChange={(e) => handleUpdate({ rotation: Number(e.target.value) })}
                className="property-range"
              />
              <input
                type="number"
                min="0"
                max="360"
                value={Math.round(comp.rotation)}
                onChange={(e) => handleUpdate({ rotation: Number(e.target.value) })}
                className="property-number"
              />
            </div>
          </div>
        </div>

        {/* 外观 */}
        <div className="property-group">
          <h4>外观</h4>
          <div className="property-item">
            <label>不透明度</label>
            <div className="range-input">
              <input
                type="range"
                min="0"
                max="100"
                value={comp.opacity * 100}
                onChange={(e) => handleUpdate({ opacity: Number(e.target.value) / 100 })}
                className="property-range"
              />
              <input
                type="number"
                min="0"
                max="100"
                value={Math.round(comp.opacity * 100)}
                onChange={(e) => handleUpdate({ opacity: Number(e.target.value) / 100 })}
                className="property-number"
              />
              <span className="range-value">{Math.round(comp.opacity * 100)}%</span>
            </div>
          </div>
        </div>

        {/* 层级 */}
        <div className="property-group">
          <h4>层级</h4>
          <div className="property-grid">
            <button
              onClick={handleZIndexUp}
              className="z-index-btn"
              disabled={comp.zIndex >= 999}
              title="提升层级"
            >
              上移
            </button>
            <button
              onClick={handleZIndexDown}
              className="z-index-btn"
              disabled={comp.zIndex <= 0}
              title="降低层级"
            >
              下移
            </button>
          </div>
          <span>当前层级: {comp.zIndex}</span>
        </div>

        {/* 组件特定属性 */}
        {comp.type === 'text' && (
          <div className="property-group">
            <h4>文本属性</h4>
            <div className="property-item">
              <label>内容</label>
              <input
                type="text"
                value={(comp.data as any).text}
                onChange={(e) => handleUpdate({ data: { ...comp.data, text: e.target.value } })}
                className="property-input"
              />
            </div>
            <div className="property-grid">
              <div className="property-item">
                <label>字号</label>
                <input
                  type="number"
                  value={(comp.data as any).fontSize}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, fontSize: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
              <div className="property-item">
                <label>行高</label>
                <input
                  type="number"
                  value={(comp.data as any).lineHeight}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, lineHeight: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
            </div>
            <div className="property-item">
              <label>字体</label>
              <select
                value={(comp.data as any).fontFamily}
                onChange={(e) => handleUpdate({ data: { ...comp.data, fontFamily: e.target.value } })}
                className="property-select"
              >
                <option value="Inter">Inter</option>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
              </select>
            </div>
            <div className="property-item">
              <label>字重</label>
              <select
                value={(comp.data as any).fontWeight}
                onChange={(e) => handleUpdate({ data: { ...comp.data, fontWeight: e.target.value } })}
                className="property-select"
              >
                <option value="normal">正常</option>
                <option value="bold">粗体</option>
                <option value="light">细体</option>
              </select>
            </div>
            <div className="property-item">
              <label>颜色</label>
              <input
                type="color"
                value={(comp.data as any).color}
                onChange={(e) => handleUpdate({ data: { ...comp.data, color: e.target.value } })}
                className="property-color"
              />
            </div>
            <div className="property-item">
              <label>对齐</label>
              <select
                value={(comp.data as any).textAlign}
                onChange={(e) => handleUpdate({ data: { ...comp.data, textAlign: e.target.value } })}
                className="property-select"
              >
                <option value="left">左对齐</option>
                <option value="center">居中</option>
                <option value="right">右对齐</option>
              </select>
            </div>
          </div>
        )}

        {(comp.type === 'rectangle' || comp.type === 'circle' || comp.type === 'line') && (
          <div className="property-group">
            <h4>图形属性</h4>
            <div className="property-item">
              <label>填充颜色</label>
              <input
                type="color"
                value={(comp.data as any).fillColor}
                onChange={(e) => handleUpdate({ data: { ...comp.data, fillColor: e.target.value } })}
                className="property-color"
              />
            </div>
            <div className="property-item">
              <label>边框颜色</label>
              <input
                type="color"
                value={(comp.data as any).borderColor}
                onChange={(e) => handleUpdate({ data: { ...comp.data, borderColor: e.target.value } })}
                className="property-color"
              />
            </div>
            <div className="property-grid">
              <div className="property-item">
                <label>边框宽度</label>
                <input
                  type="number"
                  value={(comp.data as any).borderWidth}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, borderWidth: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
              <div className="property-item">
                <label>圆角</label>
                <input
                  type="number"
                  value={(comp.data as any).borderRadius}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, borderRadius: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
            </div>
            <div className="property-item">
              <label>边框样式</label>
              <select
                value={(comp.data as any).borderStyle}
                onChange={(e) => handleUpdate({ data: { ...comp.data, borderStyle: e.target.value } })}
                className="property-select"
              >
                <option value="solid">实线</option>
                <option value="dashed">虚线</option>
                <option value="dotted">点线</option>
              </select>
            </div>
          </div>
        )}

        {comp.type === 'triangle' && (
          <div className="property-group">
            <h4>三角形属性</h4>
            <div className="property-item">
              <label>填充颜色</label>
              <input
                type="color"
                value={(comp.data as any).fillColor}
                onChange={(e) => handleUpdate({ data: { ...comp.data, fillColor: e.target.value } })}
                className="property-color"
              />
            </div>
            <div className="property-item">
              <label>边框颜色</label>
              <input
                type="color"
                value={(comp.data as any).borderColor}
                onChange={(e) => handleUpdate({ data: { ...comp.data, borderColor: e.target.value } })}
                className="property-color"
              />
            </div>
            <div className="property-grid">
              <div className="property-item">
                <label>边框宽度</label>
                <input
                  type="number"
                  value={(comp.data as any).borderWidth}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, borderWidth: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
              <div className="property-item">
                <label>半径</label>
                <input
                  type="number"
                  value={(comp.data as any).radius}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, radius: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
            </div>
          </div>
        )}

        {comp.type === 'star' && (
          <div className="property-group">
            <h4>星形属性</h4>
            <div className="property-item">
              <label>填充颜色</label>
              <input
                type="color"
                value={(comp.data as any).fillColor}
                onChange={(e) => handleUpdate({ data: { ...comp.data, fillColor: e.target.value } })}
                className="property-color"
              />
            </div>
            <div className="property-item">
              <label>边框颜色</label>
              <input
                type="color"
                value={(comp.data as any).borderColor}
                onChange={(e) => handleUpdate({ data: { ...comp.data, borderColor: e.target.value } })}
                className="property-color"
              />
            </div>
            <div className="property-grid">
              <div className="property-item">
                <label>边框宽度</label>
                <input
                  type="number"
                  value={(comp.data as any).borderWidth}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, borderWidth: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
              <div className="property-item">
                <label>顶点数</label>
                <input
                  type="number"
                  min="3"
                  max="20"
                  value={(comp.data as any).numPoints}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, numPoints: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
            </div>
            <div className="property-grid">
              <div className="property-item">
                <label>内半径</label>
                <input
                  type="number"
                  value={(comp.data as any).innerRadius}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, innerRadius: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
              <div className="property-item">
                <label>外半径</label>
                <input
                  type="number"
                  value={(comp.data as any).outerRadius}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, outerRadius: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
            </div>
          </div>
        )}

        {comp.type === 'arrow' && (
          <div className="property-group">
            <h4>箭头属性</h4>
            <div className="property-item">
              <label>描边颜色</label>
              <input
                type="color"
                value={(comp.data as any).strokeColor}
                onChange={(e) => handleUpdate({ data: { ...comp.data, strokeColor: e.target.value } })}
                className="property-color"
              />
            </div>
            <div className="property-grid">
              <div className="property-item">
                <label>描边宽度</label>
                <input
                  type="number"
                  value={(comp.data as any).strokeWidth}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, strokeWidth: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
              <div className="property-item">
                <label>箭头长度</label>
                <input
                  type="number"
                  value={(comp.data as any).pointerLength}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, pointerLength: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
            </div>
            <div className="property-item">
              <label>方向</label>
              <select
                value={(comp.data as any).direction}
                onChange={(e) => handleUpdate({ data: { ...comp.data, direction: e.target.value } })}
                className="property-select"
              >
                <option value="up">上</option>
                <option value="down">下</option>
                <option value="left">左</option>
                <option value="right">右</option>
              </select>
            </div>
            <div className="property-item">
              <label>长度</label>
              <input
                type="number"
                value={(comp.data as any).lineLength}
                onChange={(e) => handleUpdate({ data: { ...comp.data, lineLength: Number(e.target.value) } })}
                className="property-input"
              />
            </div>
            <div className="property-item">
              <label>曲率</label>
              <input
                type="range"
                min="0"
                max="100"
                value={(comp.data as any).curvature}
                onChange={(e) => handleUpdate({ data: { ...comp.data, curvature: Number(e.target.value) } })}
                className="property-range"
              />
            </div>
            <div className="property-item">
              <label>
                <input
                  type="checkbox"
                  checked={(comp.data as any).doubleEnded}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, doubleEnded: e.target.checked } })}
                />
                双向箭头
              </label>
            </div>
            <div className="property-item">
              <label>箭头样式</label>
              <select
                value={(comp.data as any).arrowStyle}
                onChange={(e) => handleUpdate({ data: { ...comp.data, arrowStyle: e.target.value } })}
                className="property-select"
              >
                <option value="standard">标准</option>
                <option value="filled">填充</option>
                <option value="outlined">描边</option>
              </select>
            </div>
          </div>
        )}

        {comp.type === 'tag' && (
          <div className="property-group">
            <h4>标签属性</h4>
            <div className="property-item">
              <label>文本</label>
              <input
                type="text"
                value={(comp.data as any).text}
                onChange={(e) => handleUpdate({ data: { ...comp.data, text: e.target.value } })}
                className="property-input"
              />
            </div>
            <div className="property-grid">
              <div className="property-item">
                <label>背景颜色</label>
                <input
                  type="color"
                  value={(comp.data as any).backgroundColor}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, backgroundColor: e.target.value } })}
                  className="property-color"
                />
              </div>
              <div className="property-item">
                <label>文字颜色</label>
                <input
                  type="color"
                  value={(comp.data as any).textColor}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, textColor: e.target.value } })}
                  className="property-color"
                />
              </div>
            </div>
            <div className="property-grid">
              <div className="property-item">
                <label>字号</label>
                <input
                  type="number"
                  value={(comp.data as any).fontSize}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, fontSize: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
              <div className="property-item">
                <label>内边距</label>
                <input
                  type="number"
                  value={(comp.data as any).padding}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, padding: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
            </div>
            <div className="property-item">
              <label>样式</label>
              <select
                value={(comp.data as any).variant}
                onChange={(e) => handleUpdate({ data: { ...comp.data, variant: e.target.value } })}
                className="property-select"
              >
                <option value="pill">胶囊</option>
                <option value="rounded">圆角</option>
                <option value="square">方形</option>
              </select>
            </div>
            <div className="property-item">
              <label>边框颜色</label>
              <input
                type="color"
                value={(comp.data as any).borderColor}
                onChange={(e) => handleUpdate({ data: { ...comp.data, borderColor: e.target.value } })}
                className="property-color"
              />
            </div>
            <div className="property-grid">
              <div className="property-item">
                <label>边框宽度</label>
                <input
                  type="number"
                  value={(comp.data as any).borderWidth}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, borderWidth: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
              <div className="property-item">
                <label>边框样式</label>
                <select
                  value={(comp.data as any).borderStyle}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, borderStyle: e.target.value } })}
                  className="property-select"
                >
                  <option value="solid">实线</option>
                  <option value="dashed">虚线</option>
                  <option value="dotted">点线</option>
                </select>
              </div>
            </div>
            <div className="property-item">
              <label>
                <input
                  type="checkbox"
                  checked={(comp.data as any).shadowEnabled}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, shadowEnabled: e.target.checked } })}
                />
                启用阴影
              </label>
            </div>
            {(comp.data as any).shadowEnabled && (
              <>
                <div className="property-item">
                  <label>阴影颜色</label>
                  <input
                    type="color"
                    value={(comp.data as any).shadowColor}
                    onChange={(e) => handleUpdate({ data: { ...comp.data, shadowColor: e.target.value } })}
                    className="property-color"
                  />
                </div>
                <div className="property-grid">
                  <div className="property-item">
                    <label>阴影模糊</label>
                    <input
                      type="number"
                      value={(comp.data as any).shadowBlur}
                      onChange={(e) => handleUpdate({ data: { ...comp.data, shadowBlur: Number(e.target.value) } })}
                      className="property-input"
                    />
                  </div>
                  <div className="property-item">
                    <label>偏移X</label>
                    <input
                      type="number"
                      value={(comp.data as any).shadowOffsetX}
                      onChange={(e) => handleUpdate({ data: { ...comp.data, shadowOffsetX: Number(e.target.value) } })}
                      className="property-input"
                    />
                  </div>
                </div>
                <div className="property-item">
                  <label>偏移Y</label>
                  <input
                    type="number"
                    value={(comp.data as any).shadowOffsetY}
                    onChange={(e) => handleUpdate({ data: { ...comp.data, shadowOffsetY: Number(e.target.value) } })}
                    className="property-input"
                  />
                </div>
              </>
            )}
          </div>
        )}

        {isComposite && (
          <div className="property-group">
            <h4>组合组件属性</h4>
            
            {/* 分离按钮 */}
            <button
              onClick={() => separateComponents(comp.id)}
              style={{
                width: '100%',
                padding: '10px 16px',
                background: 'rgba(255, 107, 53, 0.15)',
                border: '1px solid rgba(255, 107, 53, 0.4)',
                color: '#ff8c5a',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"/>
                <path d="M8 4v16M16 4v16"/>
              </svg>
              分离组件
            </button>
          </div>
        )}

        {/* ========== 新增原子组件属性面板 ========== */}

        {/* 进度条属性 */}
        {comp.type === 'progress-bar' && (
          <div className="property-group">
            <h4>进度条属性</h4>
            <div className="property-grid">
              <div className="property-item">
                <label>进度 (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={(comp.data as any).progress || 0}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, progress: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
              <div className="property-item">
                <label>条高度</label>
                <input
                  type="number"
                  value={(comp.data as any).barHeight || 20}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, barHeight: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
            </div>
            <div className="property-item">
              <label>进度颜色</label>
              <input
                type="color"
                value={(comp.data as any).barColor || '#ff6b35'}
                onChange={(e) => handleUpdate({ data: { ...comp.data, barColor: e.target.value } })}
                className="property-color"
              />
            </div>
            <div className="property-item">
              <label>背景颜色</label>
              <input
                type="color"
                value={(comp.data as any).backgroundColor || 'rgba(255,255,255,0.1)'}
                onChange={(e) => handleUpdate({ data: { ...comp.data, backgroundColor: e.target.value } })}
                className="property-color"
              />
            </div>
            <div className="property-item">
              <label>
                <input
                  type="checkbox"
                  checked={(comp.data as any).showLabel !== false}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, showLabel: e.target.checked } })}
                />
                显示标签
              </label>
            </div>
          </div>
        )}

        {/* 星级评分属性 */}
        {comp.type === 'rating' && (
          <div className="property-group">
            <h4>星级评分属性</h4>
            <div className="property-grid">
              <div className="property-item">
                <label>当前评分</label>
                <input
                  type="number"
                  min="0"
                  max={(comp.data as any).maxStars || 5}
                  value={(comp.data as any).rating || 0}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, rating: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
              <div className="property-item">
                <label>最大星级</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={(comp.data as any).maxStars || 5}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, maxStars: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
            </div>
            <div className="property-grid">
              <div className="property-item">
                <label>星级颜色</label>
                <input
                  type="color"
                  value={(comp.data as any).starColor || '#fbbf24'}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, starColor: e.target.value } })}
                  className="property-color"
                />
              </div>
              <div className="property-item">
                <label>空星颜色</label>
                <input
                  type="color"
                  value={(comp.data as any).emptyColor || 'rgba(255,255,255,0.2)'}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, emptyColor: e.target.value } })}
                  className="property-color"
                />
              </div>
            </div>
            <div className="property-item">
              <label>星级大小</label>
              <input
                type="number"
                value={(comp.data as any).starSize || 24}
                onChange={(e) => handleUpdate({ data: { ...comp.data, starSize: Number(e.target.value) } })}
                className="property-input"
              />
            </div>
            <div className="property-item">
              <label>
                <input
                  type="checkbox"
                  checked={(comp.data as any).showLabel !== false}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, showLabel: e.target.checked } })}
                />
                显示标签
              </label>
            </div>
            {(comp.data as any).showLabel && (
              <div className="property-item">
                <label>标签文字</label>
                <input
                  type="text"
                  value={(comp.data as any).labelText || ''}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, labelText: e.target.value } })}
                  className="property-input"
                />
              </div>
            )}
          </div>
        )}

        {/* 背景块属性 */}
        {comp.type === 'background' && (
          <div className="property-group">
            <h4>背景块属性</h4>
            <div className="property-item">
              <label>背景颜色</label>
              <input
                type="color"
                value={(comp.data as any).fillColor || '#ffffff'}
                onChange={(e) => handleUpdate({ data: { ...comp.data, fillColor: e.target.value } })}
                className="property-color"
              />
            </div>
            <div className="property-grid">
              <div className="property-item">
                <label>圆角</label>
                <input
                  type="number"
                  value={(comp.data as any).cornerRadius || 0}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, cornerRadius: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
              <div className="property-item">
                <label>透明度</label>
                <input
                  type="number"
                  min="0"
                  max="1"
                  step="0.1"
                  value={(comp.data as any).opacity || 1}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, opacity: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
            </div>
            <div className="property-item">
              <label>边框颜色</label>
              <input
                type="color"
                value={(comp.data as any).borderColor || ''}
                onChange={(e) => handleUpdate({ data: { ...comp.data, borderColor: e.target.value } })}
                className="property-color"
              />
            </div>
            <div className="property-item">
              <label>边框宽度</label>
              <input
                type="number"
                value={(comp.data as any).borderWidth || 0}
                onChange={(e) => handleUpdate({ data: { ...comp.data, borderWidth: Number(e.target.value) } })}
                className="property-input"
              />
            </div>
          </div>
        )}

        {/* 边框装饰属性 */}
        {comp.type === 'border' && (
          <div className="property-group">
            <h4>边框装饰属性</h4>
            <div className="property-item">
              <label>边框颜色</label>
              <input
                type="color"
                value={(comp.data as any).borderColor || '#ff6b35'}
                onChange={(e) => handleUpdate({ data: { ...comp.data, borderColor: e.target.value } })}
                className="property-color"
              />
            </div>
            <div className="property-grid">
              <div className="property-item">
                <label>边框宽度</label>
                <input
                  type="number"
                  value={(comp.data as any).borderWidth || 2}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, borderWidth: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
              <div className="property-item">
                <label>圆角</label>
                <input
                  type="number"
                  value={(comp.data as any).cornerRadius || 0}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, cornerRadius: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
            </div>
            <div className="property-item">
              <label>边框样式</label>
              <select
                value={(comp.data as any).style || 'solid'}
                onChange={(e) => handleUpdate({ data: { ...comp.data, style: e.target.value } })}
                className="property-select"
              >
                <option value="solid">实线</option>
                <option value="dashed">虚线</option>
                <option value="dotted">点线</option>
                <option value="double">双线</option>
              </select>
            </div>
          </div>
        )}

        {/* 圆点标记属性 */}
        {comp.type === 'dot-marker' && (
          <div className="property-group">
            <h4>圆点标记属性</h4>
            <div className="property-grid">
              <div className="property-item">
                <label>圆点颜色</label>
                <input
                  type="color"
                  value={(comp.data as any).dotColor || '#ff6b35'}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, dotColor: e.target.value } })}
                  className="property-color"
                />
              </div>
              <div className="property-item">
                <label>圆点大小</label>
                <input
                  type="number"
                  value={(comp.data as any).dotSize || 12}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, dotSize: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
            </div>
            <div className="property-item">
              <label>
                <input
                  type="checkbox"
                  checked={(comp.data as any).filled !== false}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, filled: e.target.checked } })}
                />
                填充模式
              </label>
            </div>
          </div>
        )}

        {/* 水印属性 */}
        {comp.type === 'watermark' && (
          <div className="property-group">
            <h4>水印属性</h4>
            <div className="property-item">
              <label>水印文字</label>
              <input
                type="text"
                value={(comp.data as any).text || ''}
                onChange={(e) => handleUpdate({ data: { ...comp.data, text: e.target.value } })}
                className="property-input"
              />
            </div>
            <div className="property-grid">
              <div className="property-item">
                <label>字号</label>
                <input
                  type="number"
                  value={(comp.data as any).fontSize || 24}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, fontSize: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
              <div className="property-item">
                <label>透明度</label>
                <input
                  type="number"
                  min="0"
                  max="1"
                  step="0.1"
                  value={(comp.data as any).opacity || 0.3}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, opacity: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
            </div>
            <div className="property-item">
              <label>颜色</label>
              <input
                type="color"
                value={(comp.data as any).color || '#ffffff'}
                onChange={(e) => handleUpdate({ data: { ...comp.data, color: e.target.value } })}
                className="property-color"
              />
            </div>
            <div className="property-item">
              <label>
                <input
                  type="checkbox"
                  checked={(comp.data as any).repeat !== false}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, repeat: e.target.checked } })}
                />
                重复显示
              </label>
            </div>
            <div className="property-item">
              <label>旋转角度</label>
              <input
                type="number"
                value={(comp.data as any).rotation || 45}
                onChange={(e) => handleUpdate({ data: { ...comp.data, rotation: Number(e.target.value) } })}
                className="property-input"
              />
            </div>
          </div>
        )}

        {/* 倒计时属性 */}
        {comp.type === 'countdown' && (
          <div className="property-group">
            <h4>倒计时属性</h4>
            <div className="property-grid">
              <div className="property-item">
                <label>天</label>
                <input
                  type="number"
                  value={(comp.data as any).days || 0}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, days: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
              <div className="property-item">
                <label>时</label>
                <input
                  type="number"
                  value={(comp.data as any).hours || 0}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, hours: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
              <div className="property-item">
                <label>分</label>
                <input
                  type="number"
                  value={(comp.data as any).minutes || 0}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, minutes: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
              <div className="property-item">
                <label>秒</label>
                <input
                  type="number"
                  value={(comp.data as any).seconds || 0}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, seconds: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
            </div>
            <div className="property-grid">
              <div className="property-item">
                <label>数字颜色</label>
                <input
                  type="color"
                  value={(comp.data as any).numberColor || '#ffffff'}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, numberColor: e.target.value } })}
                  className="property-color"
                />
              </div>
              <div className="property-item">
                <label>背景颜色</label>
                <input
                  type="color"
                  value={(comp.data as any).backgroundColor || 'rgba(255,107,53,0.1)'}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, backgroundColor: e.target.value } })}
                  className="property-color"
                />
              </div>
            </div>
            <div className="property-item">
              <label>
                <input
                  type="checkbox"
                  checked={(comp.data as any).showLabels !== false}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, showLabels: e.target.checked } })}
                />
                显示标签
              </label>
            </div>
          </div>
        )}

        {/* 数据表格属性 */}
        {comp.type === 'table' && (
          <div className="property-group">
            <h4>数据表格属性</h4>
            <div className="property-item">
              <label>表头背景</label>
              <input
                type="color"
                value={(comp.data as any).headerBgColor || 'rgba(255,107,53,0.2)'}
                onChange={(e) => handleUpdate({ data: { ...comp.data, headerBgColor: e.target.value } })}
                className="property-color"
              />
            </div>
            <div className="property-item">
              <label>表头文字</label>
              <input
                type="color"
                value={(comp.data as any).headerColor || '#ffffff'}
                onChange={(e) => handleUpdate({ data: { ...comp.data, headerColor: e.target.value } })}
                className="property-color"
              />
            </div>
            <div className="property-grid">
              <div className="property-item">
                <label>字号</label>
                <input
                  type="number"
                  value={(comp.data as any).fontSize || 12}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, fontSize: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
              <div className="property-item">
                <label>圆角</label>
                <input
                  type="number"
                  value={(comp.data as any).cornerRadius || 4}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, cornerRadius: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
            </div>
            <div className="property-item">
              <label>
                <input
                  type="checkbox"
                  checked={(comp.data as any).showHeaders !== false}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, showHeaders: e.target.checked } })}
                />
                显示表头
              </label>
            </div>
          </div>
        )}

        {/* 图标属性 */}
        {comp.type === 'icon' && (
          <div className="property-group">
            <h4>图标属性</h4>
            <div className="property-item">
              <label>图标类型</label>
              <select
                value={(comp.data as any).iconType || 'star'}
                onChange={(e) => handleUpdate({ data: { ...comp.data, iconType: e.target.value } })}
                className="property-select"
              >
                <option value="image">图片</option>
                <option value="video">视频</option>
                <option value="link">链接</option>
                <option value="email">邮箱</option>
                <option value="phone">电话</option>
                <option value="location">位置</option>
                <option value="calendar">日历</option>
                <option value="user">用户</option>
                <option value="gear">齿轮</option>
                <option value="check">勾选</option>
                <option value="warning">警告</option>
                <option value="info">信息</option>
                <option value="question">问号</option>
                <option value="star">星星</option>
                <option value="heart">心形</option>
                <option value="cart">购物车</option>
                <option value="search">搜索</option>
                <option value="plus">加号</option>
                <option value="minus">减号</option>
                <option value="close">关闭</option>
                <option value="menu">菜单</option>
              </select>
            </div>
            <div className="property-grid">
              <div className="property-item">
                <label>图标颜色</label>
                <input
                  type="color"
                  value={(comp.data as any).iconColor || '#ffffff'}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, iconColor: e.target.value } })}
                  className="property-color"
                />
              </div>
              <div className="property-item">
                <label>图标大小</label>
                <input
                  type="number"
                  value={(comp.data as any).iconSize || 24}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, iconSize: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
            </div>
            <div className="property-item">
              <label>
                <input
                  type="checkbox"
                  checked={(comp.data as any).filled !== false}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, filled: e.target.checked } })}
                />
                填充模式
              </label>
            </div>
            <div className="property-item">
              <label>
                <input
                  type="checkbox"
                  checked={(comp.data as any).showBackground || false}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, showBackground: e.target.checked } })}
                />
                显示背景
              </label>
            </div>
          </div>
        )}

        {/* ========== 新组合组件属性面板 ========== */}

        {/* 标题卡片属性 */}
        {(comp.type === 'new-title-card') && (
          <div className="property-group">
            <h4>标题卡片属性</h4>
            <div className="property-item">
              <label>标题文字</label>
              <input
                type="text"
                value={(comp.data as any).title || ''}
                onChange={(e) => handleUpdate({ data: { ...comp.data, title: e.target.value } })}
                className="property-input"
              />
            </div>
            <div className="property-item">
              <label>副标题</label>
              <input
                type="text"
                value={(comp.data as any).subtitle || ''}
                onChange={(e) => handleUpdate({ data: { ...comp.data, subtitle: e.target.value } })}
                className="property-input"
              />
            </div>
            <div className="property-grid">
              <div className="property-item">
                <label>标题颜色</label>
                <input
                  type="color"
                  value={(comp.data as any).titleColor || '#ffffff'}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, titleColor: e.target.value } })}
                  className="property-color"
                />
              </div>
              <div className="property-item">
                <label>背景样式</label>
                <select
                  value={(comp.data as any).bgStyle || 'gradient'}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, bgStyle: e.target.value } })}
                  className="property-select"
                >
                  <option value="gradient">渐变</option>
                  <option value="solid">实色</option>
                  <option value="outline">轮廓</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* 数据卡片属性 */}
        {(comp.type === 'new-data-card') && (
          <div className="property-group">
            <h4>数据卡片属性</h4>
            <div className="property-item">
              <label>标签文字</label>
              <input
                type="text"
                value={(comp.data as any).label || ''}
                onChange={(e) => handleUpdate({ data: { ...comp.data, label: e.target.value } })}
                className="property-input"
              />
            </div>
            <div className="property-item">
              <label>数值</label>
              <input
                type="text"
                value={(comp.data as any).value || ''}
                onChange={(e) => handleUpdate({ data: { ...comp.data, value: e.target.value } })}
                className="property-input"
              />
            </div>
            <div className="property-grid">
              <div className="property-item">
                <label>数值颜色</label>
                <input
                  type="color"
                  value={(comp.data as any).valueColor || '#ffffff'}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, valueColor: e.target.value } })}
                  className="property-color"
                />
              </div>
              <div className="property-item">
                <label>标签颜色</label>
                <input
                  type="color"
                  value={(comp.data as any).labelColor || '#94a3b8'}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, labelColor: e.target.value } })}
                  className="property-color"
                />
              </div>
            </div>
          </div>
        )}

        {/* 用户卡片属性 */}
        {(comp.type === 'new-user-card') && (
          <div className="property-group">
            <h4>用户卡片属性</h4>
            <div className="property-item">
              <label>用户名称</label>
              <input
                type="text"
                value={(comp.data as any).name || ''}
                onChange={(e) => handleUpdate({ data: { ...comp.data, name: e.target.value } })}
                className="property-input"
              />
            </div>
            <div className="property-item">
              <label>职位标题</label>
              <input
                type="text"
                value={(comp.data as any).title || ''}
                onChange={(e) => handleUpdate({ data: { ...comp.data, title: e.target.value } })}
                className="property-input"
              />
            </div>
            <div className="property-item">
              <label>个人简介</label>
              <input
                type="text"
                value={(comp.data as any).bio || ''}
                onChange={(e) => handleUpdate({ data: { ...comp.data, bio: e.target.value } })}
                className="property-input"
              />
            </div>
            <div className="property-item">
              <label>名称颜色</label>
              <input
                type="color"
                value={(comp.data as any).nameColor || '#ffffff'}
                onChange={(e) => handleUpdate({ data: { ...comp.data, nameColor: e.target.value } })}
                className="property-color"
              />
            </div>
          </div>
        )}

        {/* 产品卡片属性 */}
        {(comp.type === 'new-product-card') && (
          <div className="property-group">
            <h4>产品卡片属性</h4>
            <div className="property-item">
              <label>产品标题</label>
              <input
                type="text"
                value={(comp.data as any).title || ''}
                onChange={(e) => handleUpdate({ data: { ...comp.data, title: e.target.value } })}
                className="property-input"
              />
            </div>
            <div className="property-item">
              <label>价格</label>
              <input
                type="text"
                value={(comp.data as any).price || ''}
                onChange={(e) => handleUpdate({ data: { ...comp.data, price: e.target.value } })}
                className="property-input"
              />
            </div>
            <div className="property-item">
              <label>原价</label>
              <input
                type="text"
                value={(comp.data as any).originalPrice || ''}
                onChange={(e) => handleUpdate({ data: { ...comp.data, originalPrice: e.target.value } })}
                className="property-input"
              />
            </div>
            <div className="property-grid">
              <div className="property-item">
                <label>标题颜色</label>
                <input
                  type="color"
                  value={(comp.data as any).titleColor || '#ffffff'}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, titleColor: e.target.value } })}
                  className="property-color"
                />
              </div>
              <div className="property-item">
                <label>价格颜色</label>
                <input
                  type="color"
                  value={(comp.data as any).priceColor || '#ff6b35'}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, priceColor: e.target.value } })}
                  className="property-color"
                />
              </div>
            </div>
          </div>
        )}

        {/* 时间线属性 */}
        {(comp.type === 'new-timeline') && (
          <div className="property-group">
            <h4>时间线属性</h4>
            <div className="property-item">
              <label>日期</label>
              <input
                type="text"
                value={(comp.data as any).date || ''}
                onChange={(e) => handleUpdate({ data: { ...comp.data, date: e.target.value } })}
                className="property-input"
              />
            </div>
            <div className="property-item">
              <label>标题</label>
              <input
                type="text"
                value={(comp.data as any).title || ''}
                onChange={(e) => handleUpdate({ data: { ...comp.data, title: e.target.value } })}
                className="property-input"
              />
            </div>
            <div className="property-item">
              <label>描述</label>
              <input
                type="text"
                value={(comp.data as any).description || ''}
                onChange={(e) => handleUpdate({ data: { ...comp.data, description: e.target.value } })}
                className="property-input"
              />
            </div>
            <div className="property-item">
              <label>位置</label>
              <select
                value={(comp.data as any).position || 'left'}
                onChange={(e) => handleUpdate({ data: { ...comp.data, position: e.target.value } })}
                className="property-select"
              >
                <option value="left">左侧</option>
                <option value="center">居中</option>
                <option value="right">右侧</option>
              </select>
            </div>
          </div>
        )}

        {/* 统计图表属性 */}
        {(comp.type === 'new-stats-chart') && (
          <div className="property-group">
            <h4>统计图表属性</h4>
            <div className="property-item">
              <label>
                <input
                  type="checkbox"
                  checked={(comp.data as any).showValues !== false}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, showValues: e.target.checked } })}
                />
                显示数值
              </label>
            </div>
            <div className="property-item">
              <label>标签颜色</label>
              <input
                type="color"
                value={(comp.data as any).labelColor || '#94a3b8'}
                onChange={(e) => handleUpdate({ data: { ...comp.data, labelColor: e.target.value } })}
                className="property-color"
              />
            </div>
            <div className="property-item">
              <label>数值颜色</label>
              <input
                type="color"
                value={(comp.data as any).valueColor || '#ffffff'}
                onChange={(e) => handleUpdate({ data: { ...comp.data, valueColor: e.target.value } })}
                className="property-color"
              />
            </div>
          </div>
        )}

        {/* 引用卡片属性 */}
        {(comp.type === 'new-quote-card') && (
          <div className="property-group">
            <h4>引用卡片属性</h4>
            <div className="property-item">
              <label>引用内容</label>
              <input
                type="text"
                value={(comp.data as any).quote || ''}
                onChange={(e) => handleUpdate({ data: { ...comp.data, quote: e.target.value } })}
                className="property-input"
              />
            </div>
            <div className="property-item">
              <label>作者</label>
              <input
                type="text"
                value={(comp.data as any).author || ''}
                onChange={(e) => handleUpdate({ data: { ...comp.data, author: e.target.value } })}
                className="property-input"
              />
            </div>
            <div className="property-item">
              <label>来源</label>
              <input
                type="text"
                value={(comp.data as any).source || ''}
                onChange={(e) => handleUpdate({ data: { ...comp.data, source: e.target.value } })}
                className="property-input"
              />
            </div>
            <div className="property-grid">
              <div className="property-item">
                <label>引用颜色</label>
                <input
                  type="color"
                  value={(comp.data as any).quoteColor || '#ffffff'}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, quoteColor: e.target.value } })}
                  className="property-color"
                />
              </div>
              <div className="property-item">
                <label>样式</label>
                <select
                  value={(comp.data as any).style || 'simple'}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, style: e.target.value } })}
                  className="property-select"
                >
                  <option value="simple">简约</option>
                  <option value="border">边框</option>
                  <option value="icon">图标</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* 分隔装饰属性 */}
        {(comp.type === 'new-section-divider') && (
          <div className="property-group">
            <h4>分隔装饰属性</h4>
            <div className="property-item">
              <label>样式</label>
              <select
                value={(comp.data as any).style || 'line'}
                onChange={(e) => handleUpdate({ data: { ...comp.data, style: e.target.value } })}
                className="property-select"
              >
                <option value="line">线条</option>
                <option value="dashed">虚线</option>
                <option value="dotted">点线</option>
                <option value="gradient">渐变</option>
                <option value="dots">圆点</option>
                <option value="wave">波浪</option>
                <option value="stars">星星</option>
              </select>
            </div>
            <div className="property-grid">
              <div className="property-item">
                <label>线条颜色</label>
                <input
                  type="color"
                  value={(comp.data as any).color || '#ff8c5a'}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, color: e.target.value } })}
                  className="property-color"
                />
              </div>
              <div className="property-item">
                <label>粗细</label>
                <input
                  type="number"
                  value={(comp.data as any).thickness || 2}
                  onChange={(e) => handleUpdate({ data: { ...comp.data, thickness: Number(e.target.value) } })}
                  className="property-input"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
