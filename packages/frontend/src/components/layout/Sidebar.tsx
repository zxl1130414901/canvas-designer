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
            { id: 'chart', name: '图表', icon: <BarChart3 size={18} />, action: () => {} },
            { id: 'qr', name: '二维码', icon: <QrCode size={18} />, action: () => {} },
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