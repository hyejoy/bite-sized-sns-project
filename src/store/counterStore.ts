import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// immer을 쓰게 되면서 사용 안함!
type CounterStore = {
  count: number;
  actions: {
    increase: () => void;
    decrease: () => void;
  };
};

export const useCounterStore = create(
  immer(
    combine(
      {
        count: 0,
        name: '이름',
        age: 30,
      },
      (set, get) => ({
        actions: {
          increase: () => {
            set((state) => {
              state.count += 1;
            });
          },
          decrease: () => {
            set((state) => {
              state.count -= 1;
            });
          },
        },
      })
    )
  )
);

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
