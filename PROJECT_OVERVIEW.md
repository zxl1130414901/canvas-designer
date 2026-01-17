# 📋 项目总览

## 🎯 项目定位

**企业级海报生成器** - 一个原子化组件拖拽系统，让用户像拼积木一样快速组装专业海报。

### 核心价值

- ⚡ **快速组装** - 拖拽式操作，无需设计基础
- 🎨 **专业美观** - 三种预设主题（科技、商务、温暖）
- 🧩 **灵活扩展** - 原子组件可单独使用，也可组合使用
- 🤖 **AI辅助** - 通义千问生成图片、润色文案
- 📦 **矢量输出** - SVG格式，可缩放不失真

---

## 🏗️ 技术架构

### 整体架构

```
┌─────────────────────────────────────────────────────────┐
│                   用户界面层                        │
│  ┌──────────────┐       ┌──────────────┐      │
│  │   工具栏    │       │    画布      │      │
│  │  (Toolbar)   │       │   (Canvas)   │      │
│  └──────────────┘       └──────────────┘      │
└─────────────────────────────────────────────────────────┘
                          │
                          ↓
┌─────────────────────────────────────────────────────────┐
│                  前端状态管理                      │
│              (Zustand Store)                      │
│  ┌────────────────────────────────────────┐      │
│  │  组件列表 │ 画布配置  │ 主题  │      │
│  └────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────┘
                          │
                          ↓
┌─────────────────────────────────────────────────────────┐
│                渲染引擎                           │
│            (react-konva)                          │
│  ┌────────────────────────────────────────┐      │
│  │  图层管理  │ 拖拽  │ 事件  │      │
│  └────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────┘
                          │
                          ↓ (API调用)
┌─────────────────────────────────────────────────────────┐
│                 后端服务                          │
│               (Express Server)                       │
│  ┌────────────────────────────────────────┐      │
│  │  AI服务  │ 导出服务  │ 健康检查 │     │
│  └────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────┘
```

---

## 📦 核心模块

### 1. 原子组件系统（Atomic Components）

#### 设计理念
原子组件是系统中最小、最基础的单元，像"螺丝"、"螺帽"一样：
- ✅ 可单独使用
- ✅ 可组合成更大的功能单元
- ✅ 属性完全可配置
- ✅ 统一的交互方式（拖拽、缩放、旋转）

#### 组件分类

```
原子组件
├── 文本类
│   ├── 标题文本
│   ├── 正文文本
│   └── 装饰文字
├── 图形类
│   ├── 基础图形（矩形、圆形、线条）
│   └── 复杂图形（多边形、星形等）
├── 图片类
│   ├── 上传图片
│   └── AI生成图片
├── 图表类
│   ├── 柱状图
│   ├── 饼图
│   └── 折线图
├── 装饰类
│   ├── 边框
│   ├── 背景
│   ├── 纹理
│   └── 水印
└── 功能类
    ├── 二维码
    └── 条形码
```

#### 技术实现

**接口定义：**
```typescript
interface BaseComponent {
  id: string;              // 唯一标识
  type: ComponentType;     // 组件类型
  x, y: number;          // 位置
  width, height: number;   // 尺寸
  rotation: number;        // 旋转角度
  opacity: number;        // 透明度
  zIndex: number;         // 层级
  selected: boolean;      // 是否选中
  locked: boolean;        // 是否锁定
  data: ComponentData;    // 组件特定数据
}
```

**示例：文本组件**
```typescript
interface TextComponentData {
  text: string;           // 文字内容
  fontSize: number;       // 字体大小
  fontFamily: string;     // 字体
  fontWeight: string;     // 字重
  color: string;          // 颜色
  textAlign: string;      // 对齐方式
  lineHeight: number;      // 行高
}
```

---

### 2. 组合组件系统（Composite Components）

#### 设计理念
组合组件像"电脑的一个部件"（如电源模块、主板）：
- 由多个原子组件组成
- 保持内部组件的独立性
- 可作为整体拖拽和操作
- 支持嵌套组合

#### 组件分类

```
组合组件
├── 页眉组合
│   ├── 标题
│   ├── 副标题
│   └── 装饰元素
├── 内容卡片
│   ├── 标题
│   ├── 正文
│   └── 图片
├── 图表区域
│   ├── 图表
│   ├── 标题
│   └── 图例
├── 品牌页脚
│   ├── Logo
│   ├── 版权
│   └── 联系方式
└── 信息区块
    ├── 多个信息项
    └── 装饰背景
```

#### 技术实现

```typescript
interface CompositeComponentData {
  childIds: string[];      // 子组件ID列表
  layout: LayoutType;       // 布局方式
  spacing: number;          // 间距
}

type LayoutType = 'horizontal' | 'vertical' | 'grid';
```

**示例：页眉组合**
```typescript
const headerGroup = {
  type: 'header-group',
  x: 100,
  y: 100,
  width: 600,
  height: 100,
  data: {
    childIds: ['title-id', 'subtitle-id', 'deco-id'],
    layout: 'horizontal',
    spacing: 20,
  }
};
```

---

### 3. 拖拽系统

#### 核心功能
- 🖱️ **拖拽移动** - 鼠标/触屏拖拽
- 📏 **缩放调整** - 八方向手柄
- 🔄 **旋转控制** - 旋转手柄
- 📚 **图层管理** - 调整zIndex
- 🔒 **锁定机制** - 防止误操作

#### 技术栈
- **react-konva** - Canvas渲染和事件处理
- **Zustand** - 状态管理
- **事件冒泡** - 精确的事件捕获

#### 实现原理

```
用户拖拽
    ↓
react-konva触发onDragStart
    ↓
Zustand更新组件位置
    ↓
Canvas重新渲染
    ↓
显示新位置
```

---

### 4. AI集成

#### 功能规划

1. **图片生成**
   - 用户输入描述
   - 调用通义千问API
   - 返回图片URL
   - 自动添加到画布

2. **文案润色**
   - 用户输入草稿
   - AI优化文案
   - 返回多个版本

3. **属性建议**
   - 分析当前组件
   - AI建议配色、排版
   - 一键应用建议

#### 技术实现

```typescript
// 后端接口示例
app.post('/api/ai/generate', async (req, res) => {
  const { type, prompt, style } = req.body;

  // 调用通义千问
  const response = await qwenAPI.generate({
    model: 'qwen-vl-max',
    prompt,
    style,
  });

  res.json({ success: true, data: response });
});
```

---

## 🎨 视觉设计

### 设计原则（遵循frontend-design skill）

1. **避免"AI slop"**
   - ❌ 不使用Inter、Roboto、Arial等通用字体
   - ❌ 不使用紫色渐变+白色背景
   - ❌ 不使用居中对齐+圆角卡片

2. **追求独特性**
   - ✅ 使用Orbitron等独特显示字体
   - ✅ 深色科技感+温暖活力点缀
   - ✅ 不对称布局、对角线流动
   - ✅ 微交互和动画

### 主题系统

#### 🌟 科技感（默认）
```css
--primary: #0a0e27     /* 深蓝黑 */
--accent: #ff6b35       /* 活力橙 */
--display-font: Orbitron  /* 科技感字体 */
```

#### 💼 商务风
```css
--primary: #1e293b     /* 商务蓝灰 */
--accent: #3b82f6       /* 专业蓝 */
```

#### 🔥 温暖活力
```css
--primary: warm-tone    /* 暖色基底 */
--accent: #ff6b35       /* 活力橙 */
```

### 动画系统

```css
/* 入场动画 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 滑入动画 */
@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

/* 发光效果 */
.text-glow {
  text-shadow: 0 0 20px rgba(255, 107, 53, 0.5);
}
```

---

## 📊 数据流

### 状态管理（Zustand）

```typescript
interface AppState {
  // 画布状态
  canvas: CanvasState;

  // 组件操作
  addComponent: (comp) => void;
  updateComponent: (id, updates) => void;
  deleteComponent: (id) => void;

  // 选择操作
  selectComponent: (id) => void;
  selectMultiple: (ids) => void;
  clearSelection: () => void;

  // 历史记录
  undo: () => void;
  redo: () => void;

  // 主题
  theme: ThemeType;
  setTheme: (theme) => void;
}
```

### 数据流向

```
用户操作
    ↓
Action触发
    ↓
Zustand Store更新
    ↓
React组件重新渲染
    ↓
Konva Canvas更新
    ↓
视觉反馈
```

---

## 🚀 开发路线图

### Phase 1: 基础拖拽（已完成 ✅）
- [x] 项目初始化
- [x] 组件类型定义
- [x] Zustand状态管理
- [x] 基础拖拽功能
- [x] 原子组件（文本、图形）
- [x] 组合组件（页眉）
- [x] 工具栏UI

### Phase 2: 完善拖拽（进行中 ⏳）
- [ ] 组件缩放（8方向手柄）
- [ ] 组件旋转
- [ ] 属性编辑面板
- [ ] 图层管理UI
- [ ] 删除组件
- [ ] 撤销/重做

### Phase 3: 扩展组件（计划中 📋）
- [ ] 图片组件
- [ ] 图表组件
- [ ] 二维码组件
- [ ] 更多图形（线条、图标）
- [ ] 更多组合组件

### Phase 4: AI集成（计划中 📋）
- [ ] 通义千问API集成
- [ ] AI图片生成
- [ ] AI文案润色
- [ ] AI属性建议

### Phase 5: 导出功能（计划中 📋）
- [ ] SVG导出
- [ ] PNG导出
- [ ] PDF导出
- [ ] 批量导出

### Phase 6: 高级功能（计划中 📋）
- [ ] 模板系统
- [ ] 组件保存为模板
- [ ] 历史记录
- [ ] 快捷键系统
- [ ] 响应式画布

---

## 📝 总结

这是一个**企业级、美观、可扩展**的海报生成器项目：

- ✨ **美观大气** - 遵循frontend-design skill的设计原则
- 🧩 **原子化组件** - 灵活的积木式系统
- 🤖 **AI辅助** - 通义千问智能生成
- 📦 **Monorepo** - 前后端统一管理
- 🚀 **现代技术栈** - React + TypeScript + Konva + Express

当前已实现基础拖拽框架，可以开始使用和扩展！
