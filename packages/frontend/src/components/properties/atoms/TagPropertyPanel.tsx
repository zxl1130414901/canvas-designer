import React from 'react';
import type { Component } from '../../../types';

interface TagPropertyPanelProps {
  comp: Component;
  handleUpdate: (updates: any) => void;
}

export const TagPropertyPanel: React.FC<TagPropertyPanelProps> = ({ comp, handleUpdate }) => {
  const data = comp.data as any;

  return (
    <div className="property-group">
      <h4>标签属性</h4>
      <div className="property-item">
        <label>文字内容</label>
        <input
          type="text"
          value={data.text}
          onChange={(e) =>
            handleUpdate({
              data: { ...data, text: e.target.value },
            })
          }
          className="property-input"
        />
      </div>
      <div className="property-grid">
        <div className="property-item">
          <label>宽度</label>
          <input
            type="number"
            value={comp.width}
            onChange={(e) =>
              handleUpdate({
                  width: Number(e.target.value),
                })
            }
            className="property-input"
          />
        </div>
        <div className="property-item">
          <label>高度</label>
          <input
            type="number"
            value={comp.height}
            onChange={(e) =>
              handleUpdate({
                  height: Number(e.target.value),
                })
            }
            className="property-input"
          />
        </div>
      </div>
      <div className="property-item">
        <label>文字对齐</label>
        <select
          value={data.textAlign}
          onChange={(e) =>
            handleUpdate({
              data: { ...data, textAlign: e.target.value },
            })
          }
          className="property-select"
        >
          <option value="left">左对齐</option>
          <option value="center">居中</option>
          <option value="right">右对齐</option>
        </select>
      </div>
      <div className="property-grid">
        <div className="property-item">
          <label>背景颜色</label>
          <div className="color-input">
            <input
              type="color"
              value={data.backgroundColor}
              onChange={(e) =>
                handleUpdate({
                    data: { ...data, backgroundColor: e.target.value },
                  })
                }
                className="color-picker"
            />
            <input
              type="text"
              value={data.backgroundColor}
              onChange={(e) =>
                handleUpdate({
                    data: { ...data, backgroundColor: e.target.value },
                  })
                }
                className="color-text"
            />
          </div>
        </div>
        <div className="property-item">
          <label>文字颜色</label>
          <div className="color-input">
            <input
              type="color"
              value={data.textColor}
              onChange={(e) =>
                handleUpdate({
                    data: { ...data, textColor: e.target.value },
                  })
                }
                className="color-picker"
            />
            <input
              type="text"
              value={data.textColor}
              onChange={(e) =>
                handleUpdate({
                    data: { ...data, textColor: e.target.value },
                  })
                }
                className="color-text"
            />
          </div>
        </div>
      </div>
      <div className="property-grid">
        <div className="property-item">
          <label>边框颜色</label>
          <div className="color-input">
            <input
              type="color"
              value={data.borderColor}
              onChange={(e) =>
                handleUpdate({
                    data: { ...data, borderColor: e.target.value },
                  })
                }
                className="color-picker"
            />
            <input
              type="text"
              value={data.borderColor}
              onChange={(e) =>
                handleUpdate({
                    data: { ...data, borderColor: e.target.value },
                  })
                }
                className="color-text"
            />
          </div>
        </div>
        <div className="property-item">
          <label>圆角半径</label>
          <input
            type="number"
            value={data.borderRadius}
            onChange={(e) =>
              handleUpdate({
                data: { ...data, borderRadius: Number(e.target.value) },
              })
            }
            className="property-input"
          />
        </div>
      </div>
      <div className="property-grid">
        <div className="property-item">
          <label>内边距</label>
          <input
            type="number"
            value={data.padding}
            onChange={(e) =>
              handleUpdate({
                data: { ...data, padding: Number(e.target.value) },
              })
            }
            className="property-input"
          />
        </div>
        <div className="property-item">
          <label>字体大小</label>
          <input
            type="number"
            value={data.fontSize}
            onChange={(e) =>
              handleUpdate({
                data: { ...data, fontSize: Number(e.target.value) },
              })
            }
            className="property-input"
          />
        </div>
      </div>
      <div className="property-item">
        <label>样式</label>
        <select
          value={data.variant}
          onChange={(e) =>
            handleUpdate({
              data: { ...data, variant: e.target.value },
            })
          }
          className="property-select"
        >
          <option value="pill">胶囊</option>
          <option value="rounded">圆角</option>
          <option value="square">方形</option>
        </select>
      </div>
      <div className="property-item">
        <label>文本位置 X</label>
        <select
          value={data.textPositionX || 'padding'}
          onChange={(e) =>
            handleUpdate({
              data: { ...data, textPositionX: e.target.value },
            })
          }
          className="property-select"
        >
          <option value="padding">左边距</option>
          <option value="center">居中</option>
          <option value="custom">自定义</option>
        </select>
      </div>
      {data.textPositionX === 'custom' && (
        <div className="property-item">
          <label>自定义 X 位置</label>
          <input
            type="number"
            value={data.customTextX || 0}
            onChange={(e) =>
              handleUpdate({
                data: { ...data, customTextX: Number(e.target.value) },
              })
            }
            className="property-input"
          />
        </div>
      )}
      <div className="property-item">
        <label>文本位置 Y</label>
        <select
          value={data.textPositionY || 'padding'}
          onChange={(e) =>
            handleUpdate({
              data: { ...data, textPositionY: e.target.value },
              })
            }
          className="property-select"
        >
          <option value="padding">上边距</option>
          <option value="center">居中</option>
          <option value="custom">自定义</option>
        </select>
      </div>
      {data.textPositionY === 'custom' && (
        <div className="property-item">
          <label>自定义 Y 位置</label>
          <input
            type="number"
            value={data.customTextY || 0}
            onChange={(e) =>
              handleUpdate({
                data: { ...data, customTextY: Number(e.target.value) },
              })
            }
            className="property-input"
          />
        </div>
      )}
      <div className="property-item">
        <label>边框样式</label>
        <select
          value={data.borderStyle || 'solid'}
          onChange={(e) =>
            handleUpdate({
              data: { ...data, borderStyle: e.target.value },
            })
          }
          className="property-select"
        >
          <option value="solid">实线</option>
          <option value="dashed">虚线</option>
          <option value="dotted">点线</option>
        </select>
      </div>
      <div className="property-grid">
        <div className="property-item">
          <label>启用阴影</label>
          <input
            type="checkbox"
            checked={data.shadowEnabled || false}
            onChange={(e) =>
              handleUpdate({
                data: { ...data, shadowEnabled: e.target.checked },
              })
            }
            className="property-checkbox"
          />
        </div>
        {data.shadowEnabled && (
          <div className="property-item">
            <label>阴影颜色</label>
            <div className="color-input">
              <input
                type="color"
                value={data.shadowColor || '#000000'}
                onChange={(e) =>
                  handleUpdate({
                      data: { ...data, shadowColor: e.target.value },
                    })
                  }
                  className="color-picker"
              />
              <input
                type="text"
                value={data.shadowColor || '#000000'}
                onChange={(e) =>
                  handleUpdate({
                      data: { ...data, shadowColor: e.target.value },
                    })
                  }
                  className="color-text"
              />
            </div>
          </div>
        )}
      </div>
      {data.shadowEnabled && (
        <div className="property-grid">
          <div className="property-item">
            <label>阴影模糊度</label>
            <input
              type="number"
              value={data.shadowBlur || 10}
              onChange={(e) =>
                handleUpdate({
                  data: { ...data, shadowBlur: Number(e.target.value) },
                })
              }
              className="property-input"
              min="0"
              max="50"
            />
          </div>
          <div className="property-item">
            <label>阴影 X 偏移</label>
            <input
              type="number"
              value={data.shadowOffsetX || 2}
              onChange={(e) =>
                handleUpdate({
                  data: { ...data, shadowOffsetX: Number(e.target.value) },
                  })
              }
              className="property-input"
            />
          </div>
        </div>
      )}
      {data.shadowEnabled && (
        <div className="property-item">
          <label>阴影 Y 偏移</label>
          <input
            type="number"
            value={data.shadowOffsetY || 4}
            onChange={(e) =>
              handleUpdate({
                  data: { ...data, shadowOffsetY: Number(e.target.value) },
                  })
              }
              className="property-input"
            />
        </div>
      )}
    </div>
  );
};
