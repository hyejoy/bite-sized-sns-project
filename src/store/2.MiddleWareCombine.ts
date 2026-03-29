import { create } from 'zustand';
import { combine } from 'zustand/middleware';

type Store = {
  count: number;
  actions: {
    increase: () => void;
    decrease: () => void;
  };
};

// create(combine())형태로 작성
// 첫번째 인수로는, state값들
// 두번째 인수로는, callback 함수로 매개변수 set,get을 받아와 중괄호를 열어 반환값으로 액션 함수들을 포함한 객체를 리턴
// ----> 첫번째 인수를 바탕으로 타입 자동 추론

create(
  combine({ count: 0 }, (set, get) => ({
    actions: {
      increase: () => {
        set((store) => ({ count: store.count + 1 }));
      },
      decrease: () => {
        set((store) => ({ count: store.count - 1 }));
      },
    },
  }))
);

// basic store

export const useCountStore = create<Store>((set) => ({
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

/**
 * combine : 결합하다 라는 뜻으로, 새로운 저장소를 생성할때, state, action끼리 분리해 작성한다음 결합하도록 도와줌
 */
