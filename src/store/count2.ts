import { create } from "zustand"; // zustand store 생성하는 함수

type Store = {
  count: number;
  action: {
    increase1: () => void;
    decrease1: () => void;
  };
};

export const useCountStore2 = create<Store>((set, get) => {
  return {
    count: 0,
    action: {
      increase1: () => {
        set((store) => ({
          count: store.count + 1,
        }));
      },
      decrease1: () => {
        set((store) => ({
          count: store.count - 1,
        }));
      },
    },
  };
});

// → react 컴포넌트라면 useCountStore 훅을 불러 객체 형태의 store에 접근이 가능해짐
