import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { Component } from '../types';

interface CanvasState {
  width: number;
  height: number;
  backgroundColor: string;
  showGrid: boolean;
  components: Component[];
  selectedIds: string[];
}

interface AppState {
  // 画布状态
  canvas: CanvasState;
  updateCanvas: (updates: Partial<CanvasState>) => void;

  // 组件操作
  addComponent: (component: Component) => void;
  updateComponent: (id: string, updates: Partial<Component>) => void;
  deleteComponent: (id: string) => void;
  selectComponent: (id: string) => void;
  selectMultiple: (ids: string[]) => void;
  clearSelection: () => void;
  moveComponents: (ids: string[], dx: number, dy: number) => void;
  resizeComponent: (id: string, width: number, height: number) => void;
  rotateComponent: (id: string, rotation: number) => void;
  changeZIndex: (id: string, zIndex: number) => void;
  combineComponents: (selectedIds: string[]) => void;
  separateComponents: (compositeId: string) => void;

  // 主题
  theme: 'tech' | 'warmth' | 'business';
  setTheme: (theme: 'tech' | 'warmth' | 'business') => void;
}

export const useStore = create<AppState>((set) => ({
  // 初始画布状态
  canvas: {
    width: 800,
    height: 1200,
    backgroundColor: '#ffffff',
    showGrid: true,
    components: [],
    selectedIds: [],
  },

  updateCanvas: (updates) =>
    set((state) => ({
      canvas: { ...state.canvas, ...updates },
    })),

  addComponent: (component) =>
    set((state) => ({
      canvas: {
        ...state.canvas,
        components: [...state.canvas.components, component],
      },
    })),

  updateComponent: (id, updates) =>
    set((state) => ({
      canvas: {
        ...state.canvas,
        components: state.canvas.components.map((comp) =>
          comp.id === id ? { ...comp, ...updates } : comp
        ),
      },
    })),

  deleteComponent: (id) =>
    set((state) => ({
      canvas: {
        ...state.canvas,
        components: state.canvas.components.filter((comp) => comp.id !== id),
        selectedIds: state.canvas.selectedIds.filter((sid) => sid !== id),
      },
    })),

  selectComponent: (id) =>
    set((state) => ({
      canvas: {
        ...state.canvas,
        selectedIds: [id],
        components: state.canvas.components.map((comp) => ({
          ...comp,
          selected: comp.id === id,
        })),
      },
    })),

  selectMultiple: (ids) =>
    set((state) => ({
      canvas: {
        ...state.canvas,
        selectedIds: ids,
        components: state.canvas.components.map((comp) => ({
          ...comp,
          selected: ids.includes(comp.id),
        })),
      },
    })),

  clearSelection: () =>
    set((state) => ({
      canvas: {
        ...state.canvas,
        selectedIds: [],
        components: state.canvas.components.map((comp) => ({
          ...comp,
          selected: false,
        })),
      },
    })),

  moveComponents: (ids, dx, dy) =>
    set((state) => ({
      canvas: {
        ...state.canvas,
        components: state.canvas.components.map((comp) =>
          ids.includes(comp.id)
            ? { ...comp, x: comp.x + dx, y: comp.y + dy }
            : comp
        ),
      },
    })),

  resizeComponent: (id, width, height) =>
    set((state) => ({
      canvas: {
        ...state.canvas,
        components: state.canvas.components.map((comp) =>
          comp.id === id ? { ...comp, width, height } : comp
        ),
      },
    })),

  rotateComponent: (id, rotation) =>
    set((state) => ({
      canvas: {
        ...state.canvas,
        components: state.canvas.components.map((comp) =>
          comp.id === id ? { ...comp, rotation } : comp
        ),
      },
    })),

  changeZIndex: (id, zIndex) =>
    set((state) => ({
      canvas: {
        ...state.canvas,
        components: state.canvas.components.map((comp) =>
          comp.id === id ? { ...comp, zIndex } : comp
        ),
      },
    })),

  combineComponents: (selectedIds) =>
    set((state) => {
      if (selectedIds.length < 2) return state;

      const selectedComponents = state.canvas.components.filter((c) =>
        selectedIds.includes(c.id)
      );

      if (selectedComponents.some((c) => c.type.includes('-group'))) {
        return state;
      }

      const minX = Math.min(...selectedComponents.map((c) => c.x));
      const minY = Math.min(...selectedComponents.map((c) => c.y));
      const maxX = Math.max(...selectedComponents.map((c) => c.x + c.width));
      const maxY = Math.max(...selectedComponents.map((c) => c.y + c.height));

      const containerX = minX - 20;
      const containerY = minY - 20;
      const containerWidth = maxX - minX + 40;
      const containerHeight = maxY - minY + 40;
      const containerId = uuidv4();

      const componentsWithRelativeCoords = selectedComponents.map((child) => ({
        ...child,
        selected: false,
        x: child.x - containerX,
        y: child.y - containerY,
      }));

      const componentsWithoutSelected = state.canvas.components.filter(
        (c) => !selectedIds.includes(c.id)
      );

      const containerComponent = {
        id: containerId,
        type: 'header-group' as const,
        x: containerX,
        y: containerY,
        width: containerWidth,
        height: containerHeight,
        rotation: 0,
        opacity: 1,
        zIndex: Math.max(...selectedComponents.map((c) => c.zIndex)) + 1,
        selected: false,
        locked: false,
        data: {
          childIds: selectedIds,
          layout: 'vertical' as const,
          spacing: 10,
        },
      };

      return {
        canvas: {
          ...state.canvas,
          components: [
            ...componentsWithoutSelected,
            ...componentsWithRelativeCoords,
            containerComponent,
          ],
          selectedIds: [containerId],
        },
      };
    }),

  separateComponents: (compositeId) =>
    set((state) => {
      const composite = state.canvas.components.find((c) => c.id === compositeId);
      if (!composite || !composite.type.includes('-group')) return state;

      const childIds = (composite.data as any).childIds || [];
      const containerX = composite.x;
      const containerY = composite.y;

      const componentsWithAbsoluteCoords = childIds.map((childId: string) => {
        const child = state.canvas.components.find((c: Component) => c.id === childId);
        if (!child) return null;
        return {
          ...child,
          x: containerX + child.x,
          y: containerY + child.y,
          selected: true,
        };
      }).filter((c: Component | null): c is Component => c !== null);

      const components = state.canvas.components
        .filter((c: Component) => !childIds.includes(c.id) && c.id !== compositeId)
        .concat(componentsWithAbsoluteCoords);

      return {
        canvas: {
          ...state.canvas,
          components: components,
          selectedIds: childIds,
        },
      };
    }),

  // 主题
  theme: 'tech',
  setTheme: (theme) => set({ theme }),
}));
