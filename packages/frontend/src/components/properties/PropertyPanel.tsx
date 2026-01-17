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
    selectComponent,
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
    ['content-card', 'info-grid', 'callout-box', 'timeline-block', 'stats-card', 'divider', 'header-group'].includes(selectedComponent.type)
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
            
            {/* 容器基本属性 */}
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

            {/* 容器内子组件列表 (仅适用于有子组件的组合组件,如header-group) */}
            {(() => {
              const childIds = (comp.data as any).childIds || [];
              if (childIds.length === 0) return null; // 没有子组件则不显示

              const childComponents = canvas.components.filter(c => childIds.includes(c.id));
              
              if (childComponents.length === 0) {
                return (
                  <p className="hint" style={{ marginTop: '12px' }}>
                    容器内无子组件，点击"分离"按钮拆分成独立组件
                  </p>
                );
              }
              
              return (
                <div style={{ marginTop: '16px' }}>
                  <p className="hint">容器内子组件：{childComponents.length} 个</p>
                  
                  {childComponents.map((child, index) => (
                    <div 
                      key={child.id} 
                      className="property-group"
                      style={{ 
                        border: '1px solid rgba(255, 107, 53, 0.3)', 
                        borderRadius: '8px',
                        padding: '12px',
                        marginTop: '12px',
                        background: 'rgba(255, 107, 53, 0.05)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <h5 style={{ margin: 0, color: '#ff8c5a', fontSize: '13px' }}>
                          {child.type} {index + 1}
                        </h5>
                        <button
                          onClick={() => selectComponent(child.id)}
                          style={{
                            background: 'rgba(255, 107, 53, 0.2)',
                            border: '1px solid rgba(255, 107, 53, 0.4)',
                            color: '#ff8c5a',
                            borderRadius: '4px',
                            padding: '4px 8px',
                            fontSize: '12px',
                            cursor: 'pointer'
                          }}
                        >
                          选中编辑
                        </button>
                      </div>
                      
                      {/* 子组件相对位置 */}
                      <div className="property-grid">
                        <div className="property-item">
                          <label>相对X</label>
                          <input
                            type="number"
                            value={Math.round(child.x - comp.x)}
                            onChange={(e) => {
                              const newRelativeX = Number(e.target.value);
                              updateComponent(child.id, { x: comp.x + newRelativeX });
                            }}
                            className="property-input"
                          />
                        </div>
                        <div className="property-item">
                          <label>相对Y</label>
                          <input
                            type="number"
                            value={Math.round(child.y - comp.y)}
                            onChange={(e) => {
                              const newRelativeY = Number(e.target.value);
                              updateComponent(child.id, { y: comp.y + newRelativeY });
                            }}
                            className="property-input"
                          />
                        </div>
                        <div className="property-item">
                          <label>宽度</label>
                          <input
                            type="number"
                            value={Math.round(child.width)}
                            onChange={(e) => updateComponent(child.id, { width: Number(e.target.value) })}
                            className="property-input"
                          />
                        </div>
                        <div className="property-item">
                          <label>高度</label>
                          <input
                            type="number"
                            value={Math.round(child.height)}
                            onChange={(e) => updateComponent(child.id, { height: Number(e.target.value) })}
                            className="property-input"
                          />
                        </div>
                      </div>

                      {/* 子组件特有属性 */}
                      {child.type === 'text' && (
                        <div style={{ marginTop: '12px' }}>
                          <div className="property-item">
                            <label>文本内容</label>
                            <input
                              type="text"
                              value={(child.data as any).text || ''}
                              onChange={(e) => updateComponent(child.id, { data: { ...child.data, text: e.target.value } })}
                              className="property-input"
                            />
                          </div>
                          <div className="property-grid" style={{ marginTop: '8px' }}>
                            <div className="property-item">
                              <label>字号</label>
                              <input
                                type="number"
                                value={(child.data as any).fontSize || 16}
                                onChange={(e) => updateComponent(child.id, { data: { ...child.data, fontSize: Number(e.target.value) } })}
                                className="property-input"
                              />
                            </div>
                            <div className="property-item">
                              <label>颜色</label>
                              <input
                                type="color"
                                value={(child.data as any).color || '#ffffff'}
                                onChange={(e) => updateComponent(child.id, { data: { ...child.data, color: e.target.value } })}
                                className="property-color"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {(child.type === 'rectangle' || child.type === 'circle' || child.type === 'line') && (
                        <div style={{ marginTop: '12px' }}>
                          <div className="property-item">
                            <label>填充颜色</label>
                            <input
                              type="color"
                              value={(child.data as any).fillColor || '#ffffff'}
                              onChange={(e) => updateComponent(child.id, { data: { ...child.data, fillColor: e.target.value } })}
                              className="property-color"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};
