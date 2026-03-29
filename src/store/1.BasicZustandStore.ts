import { create } from 'zustand';

type Store = {
  count: number;
  actions: {
    increase: () => void;
    decrease: () => void;
  };
};

export const useCountStore = create<Store>((set, get) => ({
  count: 0,
  actions: {
    increase: () => {
      // const count = get().coount;
      // set({ count: count + 1 });

      set((store) => ({ count: store.count + 1 }));
    },
    decrease: () => {
      set((store) => ({
        count: store.count - 1,
      }));
    },
  },
}));

/** 셀렉터 함수 */
export const useCountActions = () => {
  return useCountStore((store) => store.actions);
};

export const useCount = () => {
  return useCountStore((store) => store.count);
};
