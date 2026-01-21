import { useRef, useEffect } from 'react';
import { Rect, Group } from 'react-konva';

interface NeonSelectionBorderProps {
  stageRef: React.RefObject<any>;
  componentId: string;
}

export const NeonSelectionBorder: React.FC<NeonSelectionBorderProps> = ({
  stageRef,
  componentId,
}) => {
  const groupRef = useRef<any>(null);
  const rectRef = useRef<any>(null);
  const animationRef = useRef<number | null>(null);

  // 监听节点拖动和变换
  useEffect(() => {
    const stage = stageRef.current;
    const node = stage?.findOne?.(`#${componentId}`);
    if (!node) return;

    const updatePosition = () => {
      if (!groupRef.current || !rectRef.current) return;

      try {
        const clientRect = node.getClientRect?.();
        if (clientRect?.width) {
          const nodeX = node.x?.() || 0;
          const nodeY = node.y?.() || 0;
          const nodeRotation = node.rotation?.() || 0;
          const offsetX = clientRect.x - nodeX;
          const offsetY = clientRect.y - nodeY;

          groupRef.current.x(nodeX);
          groupRef.current.y(nodeY);
          groupRef.current.rotation(nodeRotation);
          rectRef.current.x(offsetX);
          rectRef.current.y(offsetY);
          rectRef.current.width(clientRect.width);
          rectRef.current.height(clientRect.height);
        }
      } catch (e) {}
    };

    node.on('dragmove', updatePosition);
    node.on('transform', updatePosition);
    updatePosition();

    return () => {
      node.off('dragmove', updatePosition);
      node.off('transform', updatePosition);
    };
  }, [stageRef, componentId]);

  // 流动动画
  useEffect(() => {
    const rect = rectRef.current;
    if (!rect) return;

    let dashOffset = 0;

    const animate = () => {
      if (!rect) return;
      dashOffset -= 0.4;
      rect.dashOffset(dashOffset);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, []);

  return (
    <Group ref={groupRef} listening={false}>
      <Rect
        ref={rectRef}
        stroke="#00d4ff"
        strokeWidth={2}
        dash={[200, 6]}
        cornerRadius={3}
        shadowColor="#00d4ff"
        shadowBlur={20}
        shadowOpacity={0.9}
      />
    </Group>
  );
};
