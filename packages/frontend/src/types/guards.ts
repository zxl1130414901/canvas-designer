import type { Component } from '../types';

/**
 * Discriminated union types for components
 * Enables type-safe component property access
 */

// Type guards for runtime component checking
export function isTextComponent(comp: Component): comp is Component & { type: 'text'; data: any } {
  return comp.type === 'text';
}

export function isShapeComponent(comp: Component): comp is Component & { type: 'rectangle' | 'circle' | 'line' } {
  return ['rectangle', 'circle', 'line'].includes(comp.type);
}

export function isTriangleComponent(comp: Component): comp is Component & { type: 'triangle' } {
  return comp.type === 'triangle';
}

export function isStarComponent(comp: Component): comp is Component & { type: 'star' } {
  return comp.type === 'star';
}

export function isArrowComponent(comp: Component): comp is Component & { type: 'arrow' } {
  return comp.type === 'arrow';
}

export function isTagComponent(comp: Component): comp is Component & { type: 'tag' } {
  return comp.type === 'tag';
}

export function isProgressComponent(comp: Component): comp is Component & { type: 'progress-bar' } {
  return comp.type === 'progress-bar';
}

export function isRatingComponent(comp: Component): comp is Component & { type: 'rating' } {
  return comp.type === 'rating';
}

export function isBackgroundComponent(comp: Component): comp is Component & { type: 'background' } {
  return comp.type === 'background';
}

export function isBorderComponent(comp: Component): comp is Component & { type: 'border' } {
  return comp.type === 'border';
}

export function isDotMarkerComponent(comp: Component): comp is Component & { type: 'dot-marker' } {
  return comp.type === 'dot-marker';
}

export function isWatermarkComponent(comp: Component): comp is Component & { type: 'watermark' } {
  return comp.type === 'watermark';
}

export function isCountdownComponent(comp: Component): comp is Component & { type: 'countdown' } {
  return comp.type === 'countdown';
}

export function isTableComponent(comp: Component): comp is Component & { type: 'table' } {
  return comp.type === 'table';
}

export function isCompositeComponent(comp: Component): comp is Component & { type: 'header-group' | 'content-card' | 'info-grid' | 'callout-box' | 'divider' | 'timeline-block' | 'stats-card' | 'new-title-card' | 'new-data-card' | 'new-user-card' | 'new-product-card' | 'new-timeline' | 'new-stats-chart' | 'new-quote-card' | 'new-section-divider' } {
  const compositeTypes = [
    'header-group', 'content-card', 'info-grid', 'callout-box', 
    'divider', 'timeline-block', 'stats-card',
    'new-title-card', 'new-data-card', 'new-user-card', 'new-product-card',
    'new-timeline', 'new-stats-chart', 'new-quote-card', 'new-section-divider'
  ];
  return compositeTypes.includes(comp.type);
}
