// 原子组件类型
 export type AtomicComponentType =
   | 'text'
   | 'image'
   | 'rectangle'
   | 'circle'
   | 'line'
   | 'icon'
   | 'barcode'
   | 'qrcode'
   | 'triangle'
   | 'star'
   | 'arrow'
   | 'tag';

// 组合组件类型
 export type CompositeComponentType =
   | 'header-group'
   | 'content-card'
   | 'chart-section'
   | 'brand-footer'
   | 'info-block'
   | 'info-grid'
   | 'callout-box'
   | 'divider'
   | 'timeline-block'
   | 'stats-card';

export type ComponentType = AtomicComponentType | CompositeComponentType;

// 组件接口
export interface BaseComponent {
  id: string;
  type: ComponentType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  zIndex: number;
  selected: boolean;
  locked: boolean;
}

// 文本组件数据
export interface TextComponentData {
  text: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: 'normal' | 'bold' | 'light';
  color: string;
  textAlign: 'left' | 'center' | 'right';
  lineHeight: number;
}

// 图片组件数据
export interface ImageComponentData {
  src: string;
  scale: number;
  brightness: number;
  contrast: number;
  saturate: number;
}

 // 图形组件数据
  export interface ShapeComponentData {
    fillColor: string;
    borderColor: string;
    borderWidth: number;
    borderStyle: 'solid' | 'dashed' | 'dotted';
    borderRadius: number;
  }

 // 线条组件数据
  export interface LineComponentData {
    strokeColor: string;
    strokeWidth: number;
    strokeStyle: 'solid' | 'dashed' | 'dotted';
  }

// 图表组件数据
export interface ChartComponentData {
  chartType: 'bar' | 'pie' | 'line';
  data: Array<{ label: string; value: number }>;
  colors: string[];
}

// 装饰元素数据
export interface DecorationComponentData {
  type: 'border' | 'background' | 'texture' | 'watermark';
  pattern?: string;
}

// 二维码组件数据
export interface QRCodeComponentData {
  content: string;
  size: number;
  foregroundColor: string;
  backgroundColor: string;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
}

// 组合组件数据
export interface CompositeComponentData {
  childIds: string[];
  layout: 'horizontal' | 'vertical' | 'grid';
  spacing: number;
}

// 三角形组件数据
 export interface TriangleComponentData {
   fillColor: string;
   borderColor: string;
   borderWidth: number;
   radius: number;
 }

// 星形组件数据
 export interface StarComponentData {
   innerRadius: number;
   outerRadius: number;
   numPoints: number;
   fillColor: string;
   borderColor: string;
   borderWidth: number;
 }

 // 箭头组件数据
   export interface ArrowComponentData {
     points: number[];
     pointerLength: number;
     pointerWidth: number;
     strokeColor: string;
     strokeWidth: number;
     direction: 'up' | 'down' | 'left' | 'right';
     // 新增：长度控制
     lineLength: number;
     // 新增：曲线控制
     curvature: number;
     // 新增：双箭头
     doubleEnded: boolean;
     // 新增：箭头样式
     arrowStyle: 'standard' | 'filled' | 'outlined';
     // 新增：虚线数组
     dashArray?: number[];
   }

 // 标签组件数据
  export interface TagComponentData {
     text: string;
     backgroundColor: string;
     textColor: string;
     borderColor: string;
     borderRadius: number;
     padding: number;
     variant: 'pill' | 'rounded' | 'square';
     fontSize: number;
     textAlign: 'left' | 'center' | 'right';
     // 新增属性
     textPositionX: 'padding' | 'left' | 'right' | 'top' | 'bottom' | 'center' | 'custom';
     textPositionY: 'padding' | 'left' | 'right' | 'top' | 'bottom' | 'center' | 'custom';
     customTextX: number;
     customTextY: number;
     borderWidth: number;
     borderStyle: 'solid' | 'dashed' | 'dotted';
     shadowEnabled: boolean;
     shadowBlur: number;
     shadowColor: string;
     shadowOffsetX: number;
     shadowOffsetY: number;
  }

 // 内容卡片组件数据
 export interface ContentCardComponentData {
    layout: 'image-top' | 'image-left' | 'image-right';
    spacing: number;
    padding: number;
    borderRadius: number;
    showBadge: boolean;
    title?: string;
    subtitle?: string;
    bgColor?: string;
    borderColor?: string;
    badgeText?: string;
  }

 // 信息网格组件数据
  export interface InfoGridComponentData {
    rows: number;
    columns: number;
    spacing: number;
    padding: number;
    showBorders: boolean;
    data: Array<{ label: string; value: string }>;
    bgColor?: string;
    borderColor?: string;
  }

// 标注框组件数据
 export interface CalloutBoxComponentData {
   variant: 'info' | 'warning' | 'error' | 'success';
   position: 'icon-left' | 'icon-top';
   padding: number;
   borderRadius: number;
 }

// 分割线组件数据
 export interface DividerComponentData {
   orientation: 'horizontal' | 'vertical';
   thickness: number;
   color: string;
   style: 'solid' | 'dashed' | 'dotted';
   label?: string;
   labelPosition: 'center' | 'start' | 'end';
 }

 // 时间块组件数据
  export interface TimelineBlockComponentData {
    position: 'left' | 'right' | 'center';
    showConnector: boolean;
    connectorColor: string;
    dateColor: string;
    showIcon: boolean;
    dateText?: string;
    titleText?: string;
    descText?: string;
    dotColor?: string;
    bgColor?: string;
  }

// 统计卡片组件数据
 export interface StatsCardComponentData {
    trendDirection: 'up' | 'down' | 'neutral';
    trendPercentage: number;
    showSparkline: boolean;
    valueColor: string;
    labelColor: string;
    bgColor?: string;
  }

// 完整组件
 export interface Component extends BaseComponent {
   data:
     | TextComponentData
     | ImageComponentData
     | ShapeComponentData
     | LineComponentData
     | ChartComponentData
     | DecorationComponentData
     | QRCodeComponentData
     | TriangleComponentData
     | StarComponentData
     | ArrowComponentData
     | TagComponentData
     | ContentCardComponentData
     | InfoGridComponentData
     | CalloutBoxComponentData
     | DividerComponentData
     | TimelineBlockComponentData
     | StatsCardComponentData
     | CompositeComponentData;
 }

// 画布配置
export interface CanvasConfig {
  width: number;
  height: number;
  backgroundColor: string;
  gridSize: number;
  showGrid: boolean;
}

// 主题配置
export interface ThemeConfig {
  name: 'tech' | 'warmth' | 'business';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
}

// AI生成请求
export interface AIGenerationRequest {
  type: 'image' | 'text' | 'layout';
  prompt: string;
  style?: 'minimal' | 'business' | 'tech' | 'warmth';
  constraints?: {
    width?: number;
    height?: number;
    colors?: string[];
  };
}

// AI生成响应
export interface AIGenerationResponse {
  success: boolean;
  data?: any;
  error?: string;
}
