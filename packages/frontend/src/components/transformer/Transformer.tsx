import React from 'react';
import { Transformer } from 'react-konva';

interface TransformerProps {
  selectedId: string;
}

export const TransformerComponent: React.FC<TransformerProps> = ({ selectedId }) => {
  return (
    <Transformer
      id={selectedId}
      boundBoxFunc={(oldBox) => {
        // 确保变换器正确包裹节点
        return oldBox;
      }}
      anchorSize={10}
      anchorCornerRadius={4}
      anchorStroke="#ff6b35"
      anchorFill="#ff6b35"
      borderStroke="#ff6b35"
      borderDash={[6, 4]}
      enabledAnchors={[
        'top-left',
        'top-center',
        'top-right',
        'middle-right',
        'bottom-right',
        'bottom-center',
        'bottom-left',
        'middle-left',
      ]}
      rotateEnabled
    />
  );
};
