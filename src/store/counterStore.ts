import { create } from 'zustand';

type CounterStore = {
  count: number;
  actions: {
    increase: () => void;
    decrease: () => void;
  };
};

// create 함수에
export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  actions: {
    increase: () => {
      set((store) => ({ count: store.count + 1 }));
    },
    decrease: () => {
      set((store) => ({ count: store.count - 1 }));
    },
  },
}));

/** 전용 CUSTOM HOOKS */
export const useCount = () => {
  const count = useCounterStore((state) => state.count);
  return count;
};

export const useIncreaseCount = () => {
  return useCounterStore((state) => state.actions.increase);
};

export const useDecreaseCount = () => {
  return useCounterStore((state) => state.actions.decrease);
};
