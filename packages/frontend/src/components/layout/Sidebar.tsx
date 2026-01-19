import React, { useState } from 'react';
import { useStore } from '../../store';
import { v4 as uuidv4 } from 'uuid';
import {
  Layers,
  Zap,
  FileText,
  BarChart3,
  QrCode,
  Type,
  Square,
  Circle,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  onExportSVG: () => void;
  onExportPNG: () => void;
}

interface SubCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  items: Array<{
    id: string;
    name: string;
    icon: React.ReactNode;
    action: () => void;
  }>;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  subCategories: SubCategory[];
}

export const Sidebar: React.FC<SidebarProps> = ({ onExportSVG, onExportPNG }) => {
  const { addComponent } = useStore();
  const [expandedCategory, setExpandedCategory] = useState<string>('basic');

  // 添加文本组件
  const addText = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'text' as const,
      x: 500,
      y: 300,
      width: 300,
      height: 60,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        text: '点击编辑文字',
        fontSize: 24,
        fontFamily: 'Inter',
        fontWeight: 'bold' as const,
        color: '#333333',
        textAlign: 'center' as const,
        lineHeight: 1.5,
      },
    };
    addComponent(newComponent);
  };

  // 添加矩形组件
  const addRectangle = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'rectangle' as const,
      x: 550,
      y: 350,
      width: 200,
      height: 150,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        fillColor: 'rgba(255, 107, 53, 0.8)',
        borderColor: '#ff6b35',
        borderWidth: 2,
        borderRadius: 12,
        borderStyle: 'solid' as const,
      },
    };
    addComponent(newComponent);
  };

  // 添加圆形组件
  const addCircle = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'circle' as const,
      x: 600,
      y: 400,
      width: 120,
      height: 120,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        fillColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: '#3b82f6',
        borderWidth: 2,
        borderRadius: 0,
        borderStyle: 'solid' as const,
      },
    };
    addComponent(newComponent);
  };

  // 添加三角形组件
  const addTriangle = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'triangle' as const,
      x: 650,
      y: 450,
      width: 150,
      height: 150,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        fillColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: '#ef4444',
        borderWidth: 2,
        radius: 75,
      },
    };
    addComponent(newComponent);
  };

  // 添加星形组件
  const addStar = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'star' as const,
      x: 700,
      y: 500,
      width: 150,
      height: 150,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        innerRadius: 30,
        outerRadius: 75,
        numPoints: 5,
        fillColor: 'rgba(245, 158, 11, 0.8)',
        borderColor: '#f59e0b',
        borderWidth: 2,
      },
    };
    addComponent(newComponent);
  };

  // 添加箭头组件
  const addArrow = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'arrow' as const,
      x: 600,
      y: 550,
      width: 200,
      height: 100,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
       data: {
         points: [0, 50, 200, 50],
         pointerLength: 15,
         pointerWidth: 10,
         strokeColor: '#ff8c5a',
         strokeWidth: 3,
         direction: 'right' as const,
         lineLength: 200,
         curvature: 0,
         doubleEnded: false,
         arrowStyle: 'standard' as const,
       },
    };
    addComponent(newComponent);
  };

  // 添加标签组件
  const addTag = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'tag' as const,
      x: 650,
      y: 600,
      width: 150,
      height: 50,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        text: 'NEW',
        backgroundColor: '#ff8c5a',
        textColor: '#ffffff',
        borderColor: 'transparent',
        borderRadius: 20,
        padding: 12,
        variant: 'pill' as const,
        fontSize: 16,
        textAlign: 'center' as const,
        // 文本位置控制
        textPositionX: 'padding' as const,
        textPositionY: 'padding' as const,
        customTextX: 0,
        customTextY: 0,
        // 边框样式
        borderStyle: 'solid' as const,
        // 阴影
        shadowEnabled: false,
        shadowColor: '#000000' as const,
        shadowBlur: 10,
        shadowOffsetX: 2,
        shadowOffsetY: 4,
        // 边框宽度（启用）
        borderWidth: 1,
      },
    };
    addComponent(newComponent);
  };

  // 添加内容卡片组件（简化版 - 一体化组件）
  const addContentCard = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'content-card' as const,
      x: 500,
      y: 300,
      width: 300,
      height: 200,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        layout: 'image-top' as const,
        spacing: 16,
        padding: 16,
        borderRadius: 12,
        showBadge: true,
        title: '卡片标题',
        subtitle: '副标题文本',
        bgColor: 'rgba(255, 107, 53, 0.12)',
        borderColor: 'rgba(255, 107, 53, 0.3)',
        badgeText: 'NEW',
      },
    };
    addComponent(newComponent);
  };

  // 添加信息网格组件（简化版）
  const addInfoGrid = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'info-grid' as const,
      x: 500,
      y: 350,
      width: 320,
      height: 200,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        rows: 2,
        columns: 2,
        spacing: 8,
        padding: 12,
        showBorders: true,
        data: [
          { label: 'Item 1', value: 'Value 1' },
          { label: 'Item 2', value: 'Value 2' },
          { label: 'Item 3', value: 'Value 3' },
          { label: 'Item 4', value: 'Value 4' },
        ],
        bgColor: 'rgba(255, 107, 53, 0.06)',
        borderColor: 'rgba(255, 107, 53, 0.2)',
      },
    };
    addComponent(newComponent);
  };

  // 添加标注框组件（简化版）
  const addCalloutBox = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'callout-box' as const,
      x: 500,
      y: 400,
      width: 280,
      height: 120,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        variant: 'info' as const,
        position: 'icon-left' as const,
        padding: 16,
        borderRadius: 8,
        bgColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: 'rgba(59, 130, 246, 0.3)',
        iconColor: '#3b82f6',
        text: '这是一个提示信息',
        textColor: '#ffffff',
      },
    };
    addComponent(newComponent);
  };

  // 添加分割线组件
  const addDivider = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'divider' as const,
      x: 500,
      y: 500,
      width: 300,
      height: 10,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        orientation: 'horizontal' as const,
        thickness: 2,
        color: '#94a3b8',
        style: 'solid' as const,
        label: '',
        labelPosition: 'center' as const,
      },
    };
    addComponent(newComponent);
  };

  // 添加时间块组件（简化版）
  const addTimelineBlock = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'timeline-block' as const,
      x: 500,
      y: 550,
      width: 320,
      height: 150,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        position: 'left' as const,
        showConnector: true,
        connectorColor: '#94a3b8',
        dateColor: '#ff8c5a',
        showIcon: true,
        dateText: '01-17',
        titleText: '事件标题',
        descText: '事件的详细描述内容，可以包含多行文字。',
        dotColor: '#ff8c5a',
        bgColor: 'transparent',
      },
    };
    addComponent(newComponent);
  };

  // 添加统计卡片组件（简化版）
  const addStatsCard = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'stats-card' as const,
      x: 500,
      y: 400,
      width: 280,
      height: 180,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        label: '总用户数',
        value: '12,345',
        trendDirection: 'up' as const,
        trendPercentage: 12.5,
        showSparkline: true,
        trendColor: '#10b981',
        labelColor: '#94a3b8',
        valueColor: '#ffffff',
        bgColor: 'rgba(255, 107, 53, 0.12)',
      },
    };
    addComponent(newComponent);
  };

  // 添加页眉组合组件
  const addHeaderGroup = () => {
    const headerId = uuidv4();
    const titleId = uuidv4();
    const subtitleId = uuidv4();

    // Create child components
    const titleComponent = {
      id: titleId,
      type: 'text' as const,
      x: 0, y: 0,
      width: 400, height: 50,
      rotation: 0,
      opacity: 1,
      zIndex: 2,
      selected: false,
      locked: false,
      data: {
        text: '主标题',
        fontSize: 36,
        fontFamily: 'Inter',
        fontWeight: 'bold' as const,
        color: '#333333',
        textAlign: 'left' as const,
        lineHeight: 1.2,
      },
    };

    const subtitleComponent = {
      id: subtitleId,
      type: 'text' as const,
      x: 0, y: 60,
      width: 400, height: 30,
      rotation: 0,
      opacity: 1,
      zIndex: 2,
      selected: false,
      locked: false,
      data: {
        text: '副标题 - 描述性文字',
        fontSize: 18,
        fontFamily: 'Inter',
        fontWeight: 'normal' as const,
        color: '#666666',
        textAlign: 'left' as const,
        lineHeight: 1.4,
      },
    };

    // Create header group composite
    const headerComponent = {
      id: headerId,
      type: 'header-group' as const,
      x: 300,
      y: 200,
      width: 400,
      height: 100,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        childIds: [titleId, subtitleId],
        layout: 'vertical' as const,
        spacing: 10,
      },
    };

    // Add all components to store
    addComponent(titleComponent);
    addComponent(subtitleComponent);
    addComponent(headerComponent);
  };

  // 添加新标题卡片组件
  const addTitleCard = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'new-title-card' as const,
      x: 400,
      y: 150,
      width: 400,
      height: 120,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        title: '精彩标题',
        subtitle: '副标题描述文本',
        bgStyle: 'gradient' as const,
        gradientColors: ['#3b82f6', '#8b5cf6'] as [string, string],
        titleColor: '#ffffff',
        subtitleColor: 'rgba(255,255,255,0.8)',
      },
    };
    addComponent(newComponent);
  };

  // 添加新数据卡片组件
  const addDataCard = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'new-data-card' as const,
      x: 400,
      y: 300,
      width: 280,
      height: 160,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        label: '总用户数',
        value: '12,345',
        unit: '+',
        trend: {
          direction: 'up' as const,
          value: '12.5%',
          color: '#10b981',
        },
        valueColor: '#ffffff',
        labelColor: '#94a3b8',
        bgColor: 'rgba(16, 185, 129, 0.1)',
      },
    };
    addComponent(newComponent);
  };

  // 添加新用户卡片组件
  const addUserCard = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'new-user-card' as const,
      x: 400,
      y: 500,
      width: 320,
      height: 140,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        name: '张三',
        title: '产品设计师',
        bio: '专注于用户体验设计和交互创新',
        nameColor: '#ffffff',
        titleColor: 'rgba(255,255,255,0.7)',
        bioColor: 'rgba(255,255,255,0.6)',
        bgColor: 'rgba(139, 92, 246, 0.1)',
        avatarBg: 'rgba(139, 92, 246, 0.3)',
      },
    };
    addComponent(newComponent);
  };

  // 添加新产品卡片组件
  const addProductCard = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'new-product-card' as const,
      x: 400,
      y: 680,
      width: 280,
      height: 280,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        title: '高级产品名称',
        price: '¥299',
        originalPrice: '¥499',
        buttonText: '立即购买',
        badge: {
          text: 'HOT',
          color: '#ef4444',
        },
        titleColor: '#ffffff',
        priceColor: '#10b981',
        buttonColor: '#3b82f6',
        bgColor: 'rgba(255, 255, 255, 0.05)',
      },
    };
    addComponent(newComponent);
  };

  // 添加新时间线组件
  const addTimeline = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'new-timeline' as const,
      x: 400,
      y: 1000,
      width: 360,
      height: 120,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        date: '01-19',
        time: '14:30',
        title: '项目启动会议',
        description: '讨论项目计划和分工安排',
        dateColor: '#ff8c5a',
        titleColor: '#ffffff',
        descColor: 'rgba(255,255,255,0.6)',
        dotColor: '#ff8c5a',
        lineColor: 'rgba(255,255,255,0.2)',
      },
    };
    addComponent(newComponent);
  };

  // 添加新统计图表组件
  const addStatsChart = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'new-stats-chart' as const,
      x: 750,
      y: 150,
      width: 320,
      height: 200,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        type: 'bar' as const,
        data: [
          { label: 'A', value: 65, color: '#ff8c5a' },
          { label: 'B', value: 45, color: '#3b82f6' },
          { label: 'C', value: 85, color: '#10b981' },
          { label: 'D', value: 55, color: '#f59e0b' },
          { label: 'E', value: 70, color: '#8b5cf6' },
        ],
        labels: ['A', 'B', 'C', 'D', 'E'],
        showValues: true,
        labelColor: 'rgba(255,255,255,0.6)',
        valueColor: '#ffffff',
        bgColor: 'rgba(255, 255, 255, 0.03)',
      },
    };
    addComponent(newComponent);
  };

  // 添加新引用卡片组件
  const addQuoteCard = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'new-quote-card' as const,
      x: 750,
      y: 380,
      width: 320,
      height: 160,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        quote: '设计不仅仅是外观和感觉，设计是如何运作的。',
        author: 'Steve Jobs',
        style: 'border' as const,
        quoteColor: '#ffffff',
        authorColor: 'rgba(255,255,255,0.8)',
        borderColor: 'rgba(255, 107, 53, 0.3)',
        bgColor: 'rgba(255, 107, 53, 0.08)',
      },
    };
    addComponent(newComponent);
  };

  // 添加新分隔装饰组件
  const addSectionDivider = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'new-section-divider' as const,
      x: 750,
      y: 580,
      width: 320,
      height: 40,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        style: 'stars' as const,
        length: 200,
        thickness: 2,
        color: '#ff8c5a',
        secondaryColor: '#8b5cf6',
      },
    };
    addComponent(newComponent);
  };

  // 添加进度条组件
  const addProgressBar = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'progress-bar' as const,
      x: 500,
      y: 500,
      width: 300,
      height: 50,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        progress: 65,
        barColor: '#ff6b35',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        showLabel: true,
        labelColor: '#94a3b8',
        barHeight: 16,
        borderRadius: 4,
      },
    };
    addComponent(newComponent);
  };

  // 添加星级评分组件
  const addRating = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'rating' as const,
      x: 550,
      y: 550,
      width: 160,
      height: 50,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        rating: 4,
        maxStars: 5,
        starColor: '#fbbf24',
        emptyColor: 'rgba(255, 255, 255, 0.2)',
        showLabel: true,
        labelText: 'Excellent',
        labelColor: '#94a3b8',
        starSize: 24,
      },
    };
    addComponent(newComponent);
  };

  // 添加背景块组件
  const addBackground = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'background' as const,
      x: 400,
      y: 300,
      width: 400,
      height: 300,
      rotation: 0,
      opacity: 1,
      zIndex: 0,
      selected: false,
      locked: false,
      data: {
        fillColor: 'rgba(255, 107, 53, 0.15)',
        cornerRadius: 12,
        opacity: 1,
        borderColor: undefined,
        borderWidth: 0,
      },
    };
    addComponent(newComponent);
  };

  // 添加边框装饰组件
  const addBorder = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'border' as const,
      x: 450,
      y: 350,
      width: 300,
      height: 200,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        borderColor: '#ff8c5a',
        borderWidth: 2,
        cornerRadius: 8,
        style: 'dashed' as const,
        position: 'inside' as const,
      },
    };
    addComponent(newComponent);
  };

  // 添加圆点标记组件
  const addDotMarker = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'dot-marker' as const,
      x: 600,
      y: 600,
      width: 60,
      height: 60,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        dotColor: '#ff6b35',
        dotSize: 12,
        label: undefined,
        labelColor: '#94a3b8',
        labelPosition: 'top' as const,
        filled: true,
        borderColor: undefined,
        borderWidth: 0,
      },
    };
    addComponent(newComponent);
  };

  // 添加水印组件
  const addWatermark = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'watermark' as const,
      x: 300,
      y: 200,
      width: 500,
      height: 600,
      rotation: 0,
      opacity: 1,
      zIndex: 0,
      selected: false,
      locked: false,
      data: {
        text: 'CONFIDENTIAL',
        fontSize: 32,
        fontFamily: 'Inter',
        color: 'rgba(255, 255, 255, 0.3)',
        opacity: 1,
        rotation: 45,
        repeat: true,
        repeatSpacing: 200,
        patternAngle: 0,
      },
    };
    addComponent(newComponent);
  };

  // 添加倒计时组件
  const addCountdown = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'countdown' as const,
      x: 500,
      y: 450,
      width: 280,
      height: 80,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        days: 12,
        hours: 5,
        minutes: 30,
        seconds: 45,
        separatorColor: '#ff8c5a',
        numberColor: '#ffffff',
        labelColor: '#94a3b8',
        showLabels: true,
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        cornerRadius: 8,
      },
    };
    addComponent(newComponent);
  };

  // 添加表格组件
  const addTable = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'table' as const,
      x: 400,
      y: 400,
      width: 350,
      height: 150,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        headers: ['名称', '数值', '状态'],
        rows: [
          { cells: [{ text: '项目A', fontWeight: 'bold' as const }, { text: '128' }, { text: '完成', color: '#10b981' }] },
          { cells: [{ text: '项目B', fontWeight: 'bold' as const }, { text: '256' }, { text: '进行中', color: '#f59e0b' }] },
          { cells: [{ text: '项目C', fontWeight: 'bold' as const }, { text: '512' }, { text: '待开始', color: '#94a3b8' }] },
        ],
        showHeaders: true,
        headerBgColor: 'rgba(255, 107, 53, 0.2)',
        headerColor: '#ffffff',
        borderColor: 'rgba(255, 107, 53, 0.3)',
        cellPadding: 8,
        fontSize: 12,
        cornerRadius: 4,
      },
    };
    addComponent(newComponent);
  };

  // 添加图片组件
  const addImage = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'image' as const,
      x: 400,
      y: 300,
      width: 200,
      height: 150,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        src: '',
        placeholderColor: 'rgba(59, 130, 246, 0.2)',
        placeholderText: '点击上传图片',
        showPlaceholder: true,
        cornerRadius: 8,
        objectFit: 'cover' as const,
      },
    };
    addComponent(newComponent);
  };

  // 添加图标组件
  const addIcon = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'icon' as const,
      x: 450,
      y: 350,
      width: 48,
      height: 48,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        iconType: 'gear' as const,
        iconColor: '#3b82f6',
        iconSize: 24,
        filled: false,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        showBackground: true,
        strokeWidth: 1,
      },
    };
    addComponent(newComponent);
  };

  // 添加条形码组件
  const addBarcode = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'barcode' as const,
      x: 500,
      y: 400,
      width: 200,
      height: 60,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        content: '1234567890',
        barcodeType: 'CODE128' as const,
        width: 200,
        height: 60,
        showText: true,
        barColor: '#000000',
        backgroundColor: '#ffffff',
        fontSize: 12,
      },
    };
    addComponent(newComponent);
  };

  // 添加二维码组件
  const addQRCode = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'qrcode' as const,
      x: 550,
      y: 450,
      width: 100,
      height: 100,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        content: 'https://example.com',
        size: 100,
        foregroundColor: '#000000',
        backgroundColor: '#ffffff',
        errorCorrectionLevel: 'M' as const,
      },
    };
    addComponent(newComponent);
  };

  // 添加图表区域组件
  const addChartSection = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'chart-section' as const,
      x: 400,
      y: 300,
      width: 320,
      height: 200,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        chartType: 'bar' as const,
        data: [
          { label: 'A', value: 100 },
          { label: 'B', value: 80 },
          { label: 'C', value: 120 },
          { label: 'D', value: 90 },
        ],
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
      },
    };
    addComponent(newComponent);
  };

  // 添加品牌页脚组件
  const addBrandFooter = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'brand-footer' as const,
      x: 400,
      y: 600,
      width: 400,
      height: 120,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        logoText: 'BRAND',
        company: '公司名称',
        copyright: '© 2024 All Rights Reserved',
        socialLinks: [
          { platform: 'twitter', icon: '🐦' },
          { platform: 'facebook', icon: '👤' },
          { platform: 'linkedin', icon: '💼' },
        ],
        logoColor: '#ffffff',
        textColor: '#94a3b8',
        separatorColor: 'rgba(255, 255, 255, 0.2)',
        bgColor: 'rgba(255, 255, 255, 0.05)',
        showSeparator: true,
      },
    };
    addComponent(newComponent);
  };

  // 添加信息区块组件
  const addInfoBlock = () => {
    const newComponent = {
      id: uuidv4(),
      type: 'info-block' as const,
      x: 450,
      y: 400,
      width: 320,
      height: 180,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      selected: false,
      locked: false,
      data: {
        title: '信息区块',
        subtitle: '数据统计',
        infoItems: [
          { label: '项目A', value: '100' },
          { label: '项目B', value: '200' },
          { label: '项目C', value: '150' },
          { label: '项目D', value: '180' },
        ],
        bgColor: 'rgba(255, 255, 255, 0.05)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        titleColor: '#ffffff',
        textColor: '#94a3b8',
        columns: 2,
        showGrid: true,
      },
    };
    addComponent(newComponent);
  };

  const categories: Category[] = [
    {
      id: 'basic',
      name: '基础组件',
      icon: <Layers size={20} />,
      subCategories: [
        {
          id: 'text',
          name: '文本类',
          icon: <Type size={16} />,
          items: [
            { id: 'text', name: '文本', icon: <Type size={18} />, action: addText },
            { id: 'tag', name: '标签', icon: <span className="tool-icon">◆</span>, action: addTag },
          ]
        },
        {
          id: 'shape',
          name: '形状类',
          icon: <Square size={16} />,
          items: [
            { id: 'rectangle', name: '矩形', icon: <Square size={18} />, action: addRectangle },
            { id: 'circle', name: '圆形', icon: <Circle size={18} />, action: addCircle },
            { id: 'triangle', name: '三角形', icon: <span className="tool-icon">▲</span>, action: addTriangle },
            { id: 'star', name: '星形', icon: <span className="tool-icon">★</span>, action: addStar },
          ]
        },
        {
          id: 'other',
          name: '其他类',
          icon: <Zap size={16} />,
          items: [
            { id: 'arrow', name: '箭头', icon: <span className="tool-icon">→</span>, action: addArrow },
            { id: 'image', name: '图片', icon: <span className="tool-icon">🖼️</span>, action: addImage },
            { id: 'icon', name: '图标', icon: <span className="tool-icon">⚙️</span>, action: addIcon },
          ]
        }
      ]
    },
    {
      id: 'advanced',
      name: '高级组件',
      icon: <Zap size={20} />,
      subCategories: [
        {
          id: 'combo',
          name: '组合类',
          icon: <FileText size={16} />,
          items: [
            { id: 'header', name: '页眉组合', icon: <FileText size={18} />, action: addHeaderGroup },
            { id: 'content-card', name: '内容卡片', icon: <span className="tool-icon">📄</span>, action: addContentCard },
            { id: 'info-grid', name: '信息网格', icon: <span className="tool-icon">⊞</span>, action: addInfoGrid },
            { id: 'chart-section', name: '图表区域', icon: <span className="tool-icon">📊</span>, action: addChartSection },
            { id: 'brand-footer', name: '品牌页脚', icon: <span className="tool-icon">©️</span>, action: addBrandFooter },
            { id: 'info-block', name: '信息区块', icon: <span className="tool-icon">📋</span>, action: addInfoBlock },
          ]
        },
        {
          id: 'annotation',
          name: '标注类',
          icon: <BarChart3 size={16} />,
          items: [
            { id: 'callout', name: '标注框', icon: <span className="tool-icon">💬</span>, action: addCalloutBox },
            { id: 'timeline', name: '时间块', icon: <span className="tool-icon">📅</span>, action: addTimelineBlock },
            { id: 'stats', name: '统计卡片', icon: <span className="tool-icon">📊</span>, action: addStatsCard },
          ]
        },
        {
          id: 'helper',
          name: '辅助类',
          icon: <Zap size={16} />,
          items: [
            { id: 'divider', name: '分割线', icon: <span className="tool-icon">━</span>, action: addDivider },
            { id: 'chart', name: '图表', icon: <BarChart3 size={18} />, action: addChartSection },
            { id: 'qr', name: '二维码', icon: <QrCode size={18} />, action: addQRCode },
            { id: 'barcode', name: '条形码', icon: <span className="tool-icon">║▮</span>, action: addBarcode },
          ]
        }
      ]
    },
    {
      id: 'new-composite',
      name: '新组合组件',
      icon: <Layers size={20} />,
      subCategories: [
        {
          id: 'title',
          name: '标题类',
          icon: <Type size={16} />,
          items: [
            { id: 'title-card', name: '标题卡片', icon: <span className="tool-icon">📑</span>, action: addTitleCard },
          ]
        },
        {
          id: 'data',
          name: '数据类',
          icon: <BarChart3 size={16} />,
          items: [
            { id: 'data-card', name: '数据卡片', icon: <span className="tool-icon">📊</span>, action: addDataCard },
            { id: 'stats-chart', name: '统计图表', icon: <span className="tool-icon">📈</span>, action: addStatsChart },
          ]
        },
        {
          id: 'profile',
          name: '信息类',
          icon: <FileText size={16} />,
          items: [
            { id: 'user-card', name: '用户卡片', icon: <span className="tool-icon">👤</span>, action: addUserCard },
            { id: 'product-card', name: '产品卡片', icon: <span className="tool-icon">🛍️</span>, action: addProductCard },
          ]
        },
        {
          id: 'content',
          name: '内容类',
          icon: <FileText size={16} />,
          items: [
            { id: 'timeline', name: '时间线', icon: <span className="tool-icon">📅</span>, action: addTimeline },
            { id: 'quote-card', name: '引用卡片', icon: <span className="tool-icon">❝</span>, action: addQuoteCard },
            { id: 'divider', name: '分隔装饰', icon: <span className="tool-icon">✦</span>, action: addSectionDivider },
          ]
        }
      ]
    },
    {
      id: 'enhanced-atoms',
      name: '增强原子组件',
      icon: <Zap size={20} />,
      subCategories: [
        {
          id: 'progress',
          name: '进度类',
          icon: <BarChart3 size={16} />,
          items: [
            { id: 'progress-bar', name: '进度条', icon: <span className="tool-icon">📊</span>, action: addProgressBar },
            { id: 'rating', name: '星级评分', icon: <span className="tool-icon">⭐</span>, action: addRating },
          ]
        },
        {
          id: 'decor',
          name: '装饰类',
          icon: <Zap size={16} />,
          items: [
            { id: 'background', name: '背景块', icon: <span className="tool-icon">⬜</span>, action: addBackground },
            { id: 'border', name: '边框装饰', icon: <span className="tool-icon">🔲</span>, action: addBorder },
            { id: 'dot-marker', name: '圆点标记', icon: <span className="tool-icon">●</span>, action: addDotMarker },
            { id: 'watermark', name: '水印', icon: <span className="tool-icon">🔒</span>, action: addWatermark },
          ]
        },
        {
          id: 'functional',
          name: '功能类',
          icon: <FileText size={16} />,
          items: [
            { id: 'countdown', name: '倒计时', icon: <span className="tool-icon">⏱️</span>, action: addCountdown },
            { id: 'table', name: '数据表格', icon: <span className="tool-icon">📋</span>, action: addTable },
          ]
        }
      ]
    },
    {
      id: 'export',
      name: '导出功能',
      icon: <FileText size={20} />,
      subCategories: [
        {
          id: 'export-options',
          name: '导出格式',
          icon: <BarChart3 size={16} />,
          items: [
            { id: 'svg', name: 'SVG矢量', icon: <BarChart3 size={18} />, action: onExportSVG },
            { id: 'png', name: 'PNG图片', icon: <QrCode size={18} />, action: onExportPNG },
          ]
        }
      ]
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? '' : categoryId);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-accordion">
        {categories.map((category) => (
          <div key={category.id} className="accordion-item">
            {/* Category Header */}
            <button
              className={`accordion-header ${expandedCategory === category.id ? 'expanded' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="accordion-header-left">
                <span className="accordion-icon">{category.icon}</span>
                <span className="accordion-title">{category.name}</span>
              </div>
              <span className="accordion-chevron">
                {expandedCategory === category.id ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </span>
            </button>

            {/* Sub Categories (Collapsible) */}
            <div
              className={`accordion-content ${expandedCategory === category.id ? 'expanded' : ''}`}
            >
              {category.subCategories.map((subCategory) => (
                <div key={subCategory.id} className="sub-category">
                  {/* Sub Category Header */}
                  <div className="sub-category-header">
                    <span className="sub-category-icon">{subCategory.icon}</span>
                    <span className="sub-category-title">{subCategory.name}</span>
                  </div>

                  {/* Sub Category Items */}
                  <div className="sub-category-items">
                    {subCategory.items.map((item) => (
                      <button
                        key={item.id}
                        className="tool-item"
                        onClick={item.action}
                      >
                        <div className="tool-item-icon">{item.icon}</div>
                        <span className="tool-item-name">{item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};