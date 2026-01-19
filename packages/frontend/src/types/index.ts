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
   | 'tag'
   | 'progress-bar'
   | 'rating'
   | 'background'
   | 'border'
   | 'dot-marker'
   | 'watermark'
   | 'countdown'
   | 'table';

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

// 新组合组件类型
export type NewCompositeComponentType =
  | 'new-title-card'
  | 'new-data-card'
  | 'new-user-card'
  | 'new-product-card'
  | 'new-timeline'
  | 'new-stats-chart'
  | 'new-quote-card'
  | 'new-section-divider';

export type ComponentType = AtomicComponentType | CompositeComponentType | NewCompositeComponentType;

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
  src?: string;
  scale?: number;
  brightness?: number;
  contrast?: number;
  saturate?: number;
  placeholderColor: string;
  placeholderText: string;
  showPlaceholder: boolean;
  cornerRadius: number;
  objectFit: 'cover' | 'contain' | 'fill';
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

// 条形码组件数据
export interface BarcodeComponentData {
  content: string;
  barcodeType: 'CODE128' | 'EAN13' | 'EAN8' | 'UPC';
  width: number;
  height: number;
  showText: boolean;
  barColor: string;
  backgroundColor: string;
  fontSize: number;
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
    content?: string;
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

// 标题卡片数据
export interface TitleCardData {
  title: string;
  subtitle?: string;
  bgStyle: 'gradient' | 'solid' | 'outline';
  gradientColors?: [string, string];
  bgColor?: string;
  titleColor: string;
  subtitleColor?: string;
  icon?: string;
  iconColor?: string;
}

// 数据卡片数据
export interface DataCardData {
  label: string;
  value: string;
  unit?: string;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string;
    color: string;
  };
  icon?: string;
  iconColor?: string;
  bgColor?: string;
  valueColor: string;
  labelColor: string;
}

// 用户卡片数据
export interface UserCardData {
  avatarUrl?: string;
  name: string;
  title?: string;
  bio?: string;
  socialLinks?: Array<{ platform: string; url: string }>;
  bgColor?: string;
  avatarBg?: string;
  nameColor: string;
  titleColor?: string;
  bioColor?: string;
}

// 产品卡片数据
export interface ProductCardData {
  imageUrl?: string;
  title: string;
  description?: string;
  price: string;
  originalPrice?: string;
  buttonText?: string;
  badge?: {
    text: string;
    color: string;
  };
  bgColor?: string;
  titleColor: string;
  priceColor: string;
  buttonColor?: string;
}

// 时间线数据
export interface TimelineData {
  date: string;
  time?: string;
  title: string;
  description?: string;
  icon?: string;
  iconColor?: string;
  dotColor?: string;
  lineColor?: string;
  bgColor?: string;
  dateColor: string;
  titleColor: string;
  descColor?: string;
}

// 统计图表数据
export interface StatsChartData {
  type: 'bar' | 'horizontal-bar';
  data: Array<{ label: string; value: number; color?: string }>;
  labels: string[];
  colors?: string[];
  showValues: boolean;
  barColor?: string;
  labelColor: string;
  valueColor?: string;
  bgColor?: string;
}

// 图表区域组件数据
export interface ChartSectionData {
  chartType: 'bar' | 'pie' | 'line';
  data: Array<{ label: string; value: number }>;
  colors?: string[];
}

// 品牌页脚组件数据
export interface BrandFooterData {
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

// 信息区块组件数据
export interface InfoBlockData {
  title: string;
  subtitle?: string;
  infoItems: Array<{label: string, value: string}>;
  bgColor: string;
  borderColor: string;
  titleColor: string;
  textColor: string;
  columns: number;
  showGrid: boolean;
}

// 引用卡片数据
export interface QuoteCardData {
  quote: string;
  author?: string;
  source?: string;
  style: 'simple' | 'border' | 'icon';
  icon?: string;
  bgColor?: string;
  quoteColor: string;
  authorColor?: string;
  borderColor?: string;
}

// 分隔装饰数据
export interface SectionDividerData {
  style: 'line' | 'dashed' | 'dotted' | 'gradient' | 'dots' | 'wave' | 'stars';
  length: number;
  thickness: number;
  color: string;
  secondaryColor?: string;
  decorations?: Array<{ type: string; position: number }>;
}

// 新增原子组件类型定义

// 进度条组件数据
export interface ProgressBarComponentData {
  progress: number; // 0-100
  barColor: string;
  backgroundColor: string;
  showLabel: boolean;
  labelColor: string;
  barHeight: number;
  borderRadius: number;
}

// 星级评分组件数据
export interface RatingComponentData {
  rating: number; // 0-5
  maxStars: number;
  starColor: string;
  emptyColor: string;
  showLabel: boolean;
  labelText: string;
  labelColor: string;
  starSize: number;
}

// 图片组件数据
export interface ImageComponentData {
  src?: string; // 图片URL或base64
  placeholderColor: string;
  placeholderText: string;
  showPlaceholder: boolean;
  cornerRadius: number;
  objectFit: 'cover' | 'contain' | 'fill';
}

// 背景块组件数据
export interface BackgroundComponentData {
  fillColor: string;
  cornerRadius: number;
  gradientColors?: string[];
  gradientDirection?: 'horizontal' | 'vertical';
  opacity: number;
  borderColor?: string;
  borderWidth?: number;
}

// 边框装饰组件数据
export interface BorderComponentData {
  borderColor: string;
  borderWidth: number;
  cornerRadius: number;
  style: 'solid' | 'dashed' | 'dotted' | 'double';
  position: 'inside' | 'outside' | 'center';
}

// 圆点标记组件数据
export interface DotMarkerComponentData {
  dotColor: string;
  dotSize: number;
  label?: string;
  labelColor: string;
  labelPosition: 'top' | 'bottom' | 'left' | 'right';
  filled: boolean;
  borderColor?: string;
  borderWidth?: number;
}

// 水印组件数据
export interface WatermarkComponentData {
  text: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  opacity: number;
  rotation: number;
  repeat: boolean;
  repeatSpacing: number;
  patternAngle: number;
}

// 图标组件数据
export interface IconComponentData {
  iconType: 'image' | 'video' | 'link' | 'email' | 'phone' | 'location' | 'calendar' | 'user' | 'gear' | 'check' | 'warning' | 'info' | 'question' | 'star' | 'heart' | 'cart' | 'search' | 'plus' | 'minus' | 'close' | 'menu';
  iconColor: string;
  iconSize: number;
  filled: boolean;
  backgroundColor?: string;
  showBackground: boolean;
  strokeWidth?: number;
}

// 倒计时组件数据
export interface CountdownComponentData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  separatorColor: string;
  numberColor: string;
  labelColor: string;
  showLabels: boolean;
  backgroundColor: string;
  cornerRadius: number;
}

// 表格组件数据
export interface TableCell {
  text: string;
  color?: string;
  fontWeight?: 'normal' | 'bold';
  align?: 'left' | 'center' | 'right';
}

export interface TableRow {
  cells: TableCell[];
  bgColor?: string;
}

export interface TableComponentData {
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
    | BarcodeComponentData
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
    | CompositeComponentData
    | TitleCardData
    | DataCardData
    | UserCardData
    | ProductCardData
    | TimelineData
    | StatsChartData
    | QuoteCardData
    | SectionDividerData
    | ProgressBarComponentData
    | RatingComponentData
    | BackgroundComponentData
    | BorderComponentData
    | DotMarkerComponentData
    | WatermarkComponentData
    | IconComponentData
    | CountdownComponentData
    | TableComponentData
    | ChartSectionData
    | BrandFooterData
    | InfoBlockData;
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

// Type guards for runtime component checking
export * from './guards';
