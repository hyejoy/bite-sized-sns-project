import { create } from "zustand"; // zustand store 생성하는 함수

type Store = {
  count: number;
  action: {
    increaseOne: () => void;
    decreaseOne: () => void;
  };
};

export const useCustomCount = create<Store>((set, get) => {
  return {
    count: 0,
    action: {
      increaseOne: () => {
        set((store) => ({
          count: store.count + 1,
        }));
      },
      decreaseOne: () => {
        set((store) => ({
          count: store.count - 1,
        }));
      },
    },
  };
});

/**
 * 📝 각 스테이트와 액션을 꺼내오는 전용 커스텀 훅들을 만들 수 있음 ⭐⭐⭐
 *  이렇게하면 하나의 파일만 수정사항을 처리할 수 있기때문에 유리한 구조로 코드를 작성 할 수 있음
 */
export const useCount = () => {
  const count = useCustomCount((store) => store.count);
  return count;
};

export const useIncreseCount = () => {
  const increase = useCustomCount((store) => store.action.increaseOne);
  return increase;
};

export const useDecreaseCount = () => {
  const decrease = useCustomCount((store) => store.action.decreaseOne);
  return decrease;
};
