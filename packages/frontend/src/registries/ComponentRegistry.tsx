import React from 'react';
import { AtomicText } from '../components/atoms/AtomicText';
import { AtomicShape } from '../components/atoms/AtomicShape';
import { AtomicTriangle } from '../components/atoms/AtomicTriangle';
import { AtomicStar } from '../components/atoms/AtomicStar';
import { AtomicArrow } from '../components/atoms/AtomicArrow';
import { AtomicTag } from '../components/atoms/AtomicTag';
import { AtomicProgressBar } from '../components/atoms/AtomicProgressBar';
import { AtomicRating } from '../components/atoms/AtomicRating';
import { AtomicBackground } from '../components/atoms/AtomicBackground';
import { AtomicBorder } from '../components/atoms/AtomicBorder';
import { AtomicDotMarker } from '../components/atoms/AtomicDotMarker';
import { AtomicWatermark } from '../components/atoms/AtomicWatermark';
import { AtomicCountdown } from '../components/atoms/AtomicCountdown';
import { AtomicTable } from '../components/atoms/AtomicTable';
import { AtomicImage } from '../components/atoms/AtomicImage';
import { AtomicIcon } from '../components/atoms/AtomicIcon';
import { AtomicBarcode } from '../components/atoms/AtomicBarcode';
import { AtomicQRCode } from '../components/atoms/AtomicQRCode';
import { CompositeHeader } from '../components/composite/CompositeHeader';
import { CompositeContentCard } from '../components/composite/CompositeContentCard';
import { CompositeInfoGrid } from '../components/composite/CompositeInfoGrid';
import { CompositeCalloutBox } from '../components/composite/CompositeCalloutBox';
import { CompositeDivider } from '../components/composite/CompositeDivider';
import { CompositeTimelineBlock } from '../components/composite/CompositeTimelineBlock';
import { CompositeStatsCard } from '../components/composite/CompositeStatsCard';
import { CompositeChartSection } from '../components/composite/CompositeChartSection';
import { CompositeBrandFooter } from '../components/composite/CompositeBrandFooter';
import { CompositeInfoBlock } from '../components/composite/CompositeInfoBlock';
import { NewTitleCard, NewDataCard, NewUserCard, NewProductCard, NewTimeline, NewStatsChart, NewQuoteCard, NewSectionDivider } from '../components/new-composite';

/**
 * Component Registry with React.memo optimization
 * Maps component type strings to their memoized React components
 * This eliminates need for 23+ if-else statements in Canvas.tsx
 */

// Memoize atomic components for performance (AtomicTag removed memo to fix data updates)
const MemoAtomicText = React.memo(AtomicText);
const MemoAtomicShape = React.memo(AtomicShape);
const MemoAtomicTriangle = React.memo(AtomicTriangle);
const MemoAtomicStar = React.memo(AtomicStar);
const MemoAtomicArrow = React.memo(AtomicArrow);
const MemoAtomicTag = AtomicTag; // Not memoized - data props update frequently
const MemoAtomicProgressBar = React.memo(AtomicProgressBar);
const MemoAtomicRating = React.memo(AtomicRating);
const MemoAtomicBackground = React.memo(AtomicBackground);
const MemoAtomicBorder = React.memo(AtomicBorder);
const MemoAtomicDotMarker = React.memo(AtomicDotMarker);
const MemoAtomicWatermark = React.memo(AtomicWatermark);
const MemoAtomicCountdown = React.memo(AtomicCountdown);
const MemoAtomicTable = React.memo(AtomicTable);
const MemoAtomicImage = React.memo(AtomicImage);
const MemoAtomicIcon = React.memo(AtomicIcon);
const MemoAtomicBarcode = React.memo(AtomicBarcode);
const MemoAtomicQRCode = React.memo(AtomicQRCode);

// Memoize composite components for performance
const MemoCompositeHeader = React.memo(CompositeHeader);
const MemoCompositeContentCard = React.memo(CompositeContentCard);
const MemoCompositeInfoGrid = React.memo(CompositeInfoGrid);
const MemoCompositeCalloutBox = React.memo(CompositeCalloutBox);
const MemoCompositeDivider = React.memo(CompositeDivider);
const MemoCompositeTimelineBlock = React.memo(CompositeTimelineBlock);
const MemoCompositeStatsCard = React.memo(CompositeStatsCard);
const MemoCompositeChartSection = React.memo(CompositeChartSection);
const MemoCompositeBrandFooter = React.memo(CompositeBrandFooter);
const MemoCompositeInfoBlock = React.memo(CompositeInfoBlock);

// Memoize new composite components for performance
const MemoNewTitleCard = React.memo(NewTitleCard);
const MemoNewDataCard = React.memo(NewDataCard);
const MemoNewUserCard = React.memo(NewUserCard);
const MemoNewProductCard = React.memo(NewProductCard);
const MemoNewTimeline = React.memo(NewTimeline);
const MemoNewStatsChart = React.memo(NewStatsChart);
const MemoNewQuoteCard = React.memo(NewQuoteCard);
const MemoNewSectionDivider = React.memo(NewSectionDivider);

/**
 * Component Registry
 * Maps component type strings to their memoized React components.
 * O(1) lookup time, eliminates runtime type checking
 */
export const COMPONENT_REGISTRY: Record<string, React.ComponentType<any>> = {
  // Atomic Components
  'text': MemoAtomicText,
  'image': MemoAtomicImage,
  'icon': MemoAtomicIcon,
  'barcode': MemoAtomicBarcode,
  'qrcode': MemoAtomicQRCode,
  'rectangle': MemoAtomicShape,
  'circle': MemoAtomicShape,
  'line': MemoAtomicShape,
  'triangle': MemoAtomicTriangle,
  'star': MemoAtomicStar,
  'arrow': MemoAtomicArrow,
  'tag': MemoAtomicTag,
  'progress-bar': MemoAtomicProgressBar,
  'rating': MemoAtomicRating,
  'background': MemoAtomicBackground,
  'border': MemoAtomicBorder,
  'dot-marker': MemoAtomicDotMarker,
  'watermark': MemoAtomicWatermark,
  'countdown': MemoAtomicCountdown,
  'table': MemoAtomicTable,

  // Original Composite Components
  'header-group': MemoCompositeHeader,
  'content-card': MemoCompositeContentCard,
  'chart-section': MemoCompositeChartSection,
  'brand-footer': MemoCompositeBrandFooter,
  'info-block': MemoCompositeInfoBlock,
  'info-grid': MemoCompositeInfoGrid,
  'callout-box': MemoCompositeCalloutBox,
  'divider': MemoCompositeDivider,
  'timeline-block': MemoCompositeTimelineBlock,
  'stats-card': MemoCompositeStatsCard,

  // New Composite Components
  'new-title-card': MemoNewTitleCard,
  'new-data-card': MemoNewDataCard,
  'new-user-card': MemoNewUserCard,
  'new-product-card': MemoNewProductCard,
  'new-timeline': MemoNewTimeline,
  'new-stats-chart': MemoNewStatsChart,
  'new-quote-card': MemoNewQuoteCard,
  'new-section-divider': MemoNewSectionDivider,
} as const;

export type ComponentType = keyof typeof COMPONENT_REGISTRY;
