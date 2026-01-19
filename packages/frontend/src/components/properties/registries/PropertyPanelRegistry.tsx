import React from 'react';
import { TextPropertyPanel } from '../panels/TextPropertyPanel';
import { ShapePropertyPanel } from '../panels/ShapePropertyPanel';
import { TrianglePropertyPanel } from '../panels/TrianglePropertyPanel';
import { StarPropertyPanel } from '../panels/StarPropertyPanel';
import { ArrowPropertyPanel } from '../panels/ArrowPropertyPanel';
import { TagPropertyPanel } from '../panels/TagPropertyPanel';
import { ProgressBarPropertyPanel } from '../panels/ProgressBarPropertyPanel';
import { RatingPropertyPanel } from '../panels/RatingPropertyPanel';
import { BackgroundPropertyPanel } from '../panels/BackgroundPropertyPanel';
import { BorderPropertyPanel } from '../panels/BorderPropertyPanel';
import { DotMarkerPropertyPanel } from '../panels/DotMarkerPropertyPanel';
import { WatermarkPropertyPanel } from '../panels/WatermarkPropertyPanel';
import { CountdownPropertyPanel } from '../panels/CountdownPropertyPanel';
import { TablePropertyPanel } from '../panels/TablePropertyPanel';
import { ImagePropertyPanel } from '../panels/ImagePropertyPanel';
import { IconPropertyPanel } from '../panels/IconPropertyPanel';
import { BarcodePropertyPanel } from '../panels/BarcodePropertyPanel';
import { QRCodePropertyPanel } from '../panels/QRCodePropertyPanel';
import { ChartSectionPropertyPanel } from '../panels/ChartSectionPropertyPanel';
import { BrandFooterPropertyPanel } from '../panels/BrandFooterPropertyPanel';
import { InfoBlockPropertyPanel } from '../panels/InfoBlockPropertyPanel';
import { CompositePropertyPanel } from '../panels/CompositePropertyPanel';

// Registry mapping component types to their property panels
export const PROPERTY_PANEL_REGISTRY: Record<string, React.ComponentType<any>> = {
  // Atomic Components
  'text': TextPropertyPanel,
  'image': ImagePropertyPanel,
  'icon': IconPropertyPanel,
  'barcode': BarcodePropertyPanel,
  'qrcode': QRCodePropertyPanel,
  'rectangle': ShapePropertyPanel,
  'circle': ShapePropertyPanel,
  'line': ShapePropertyPanel,
  'triangle': TrianglePropertyPanel,
  'star': StarPropertyPanel,
  'arrow': ArrowPropertyPanel,
  'tag': TagPropertyPanel,
  'progress-bar': ProgressBarPropertyPanel,
  'rating': RatingPropertyPanel,
  'background': BackgroundPropertyPanel,
  'border': BorderPropertyPanel,
  'dot-marker': DotMarkerPropertyPanel,
  'watermark': WatermarkPropertyPanel,
  'countdown': CountdownPropertyPanel,
  'table': TablePropertyPanel,

  // Composite Components (original and new)
  'header-group': CompositePropertyPanel,
  'content-card': CompositePropertyPanel,
  'chart-section': ChartSectionPropertyPanel,
  'brand-footer': BrandFooterPropertyPanel,
  'info-block': InfoBlockPropertyPanel,
  'info-grid': CompositePropertyPanel,
  'callout-box': CompositePropertyPanel,
  'divider': CompositePropertyPanel,
  'timeline-block': CompositePropertyPanel,
  'stats-card': CompositePropertyPanel,
  'new-title-card': CompositePropertyPanel,
  'new-data-card': CompositePropertyPanel,
  'new-user-card': CompositePropertyPanel,
  'new-product-card': CompositePropertyPanel,
  'new-timeline': CompositePropertyPanel,
  'new-stats-chart': CompositePropertyPanel,
  'new-quote-card': CompositePropertyPanel,
  'new-section-divider': CompositePropertyPanel,
} as const;

export type PropertyPanelType = keyof typeof PROPERTY_PANEL_REGISTRY;
