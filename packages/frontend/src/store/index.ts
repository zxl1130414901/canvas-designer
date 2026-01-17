import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { Component } from '../types';

// 画布状态
interface CanvasState {
  width: number;
  height: number;
  backgroundColor: string;
  showGrid: boolean;
  components: Component[];
  selectedIds: string[];
}

// 历史记录（用于撤销/重做）
interface HistoryItem {
  components: Component[];
  canvas: Partial<CanvasState>;
}

// 应用状态
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

  // 历史记录
  history: HistoryItem[];
  historyIndex: number;
  undo: () => void;
  redo: () => void;

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

      // 排除现有的组合组件（不能组合组合）
      if (selectedComponents.some((c) => c.type.includes('-group'))) {
        return state;
      }

      // 计算容器的边界
      const minX = Math.min(...selectedComponents.map((c) => c.x));
      const minY = Math.min(...selectedComponents.map((c) => c.y));
      const maxX = Math.max(...selectedComponents.map((c) => c.x + c.width));
      const maxY = Math.max(...selectedComponents.map((c) => c.y + c.height));

      const containerX = minX - 20;
      const containerY = minY - 20;
      const containerWidth = maxX - minX + 40;
      const containerHeight = maxY - minY + 40;

      // 创建组合容器
      const containerId = uuidv4();

      // 将子组件转换为相对坐标
      const componentsWithRelativeCoords = selectedComponents.map((child) => ({
        ...child,
        selected: false,
        x: child.x - containerX,
        y: child.y - containerY,
      }));

      // 更新现有子组件
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

      // 将子组件转换为绝对坐标
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

      // 删除容器组件，保留其他组件，更新子组件
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

  // 历史记录
  history: [],
  historyIndex: -1,

  undo: () =>
    set((state) => {
      if (state.historyIndex > 0) {
        const newIndex = state.historyIndex - 1;
        const item = state.history[newIndex];
        return {
          historyIndex: newIndex,
          canvas: {
            ...state.canvas,
            components: item.components,
            ...item.canvas,
          },
        };
      }
      return state;
    }),

  redo: () =>
    set((state) => {
      if (state.historyIndex < state.history.length - 1) {
        const newIndex = state.historyIndex + 1;
        const item = state.history[newIndex];
        return {
          historyIndex: newIndex,
          canvas: {
            ...state.canvas,
            components: item.components,
            ...item.canvas,
          },
        };
      }
      return state;
    }),

  // 主题
  theme: 'tech',
  setTheme: (theme) => set({ theme }),
}));
