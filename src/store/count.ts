import { create } from "zustand"; // zustand store 생성하는 함수
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
/**
 * 📃 복습
 * get : 객체 스토어를 그대로 반환하는 역할
 *               ⌈------------여기 부분 객체 스토어-----------------⌉
 * create(() => ({ count: 0, increse: () => {}, decrease: () => {} }));
 * set : 인수로 전달한 값으로 현재 스토어를 업데이트 시켜주는 함수
 */

/**
 * 📝 combine
 *  - state는 state끼리 action은 action함수끼리 분리할 수 있도록 결합시킬 수 있도록 도와줌
 *  - store의 타입을 자동 추론
 */

/**
 * @param count : store에 포함될 state
 * @param callback : set,get을 받아와 ({액션 함수들을 포함한 객체를 리턴})
 *  conbine으로 만든 스토어 객체는
 *  1. 첫번째 인수로 전달한 count 에 보관
 *  2. 두번째 인수로 전달한 콜백함수의 리턴값들 (actions 객체)를 포함
 *
 * @description combine 미들웨어를 이용하여 state와 액션 함수들을 분리해 생성하는 이유는
 * 첫번째 인수로 전달한 state 타입이 자동으로 추론되기 때문이다.
 */

export const useCountStore_Combine = create(
  combine({ count: 0 }, (set, get) => {
    return {
      actions: {
        icreaseCount: () => {
          set((state) => ({ count: state.count + 1 })); // state type 자동 추론
        },
        decreaseCount: () => {
          set((state) => ({ count: state.count - 1 }));
        },
      },
    };
  }),
);

/**
 * 📝 Immer
 *  - npm i Immer
 *  - 중첩된 객체의 데이터를 수정할 때 복잡해지는 코드를 단순화 시킬 수 있음
 *  - immer가 combine 함수를 전체 다 감싸도록 작성
 */

/**
 * @param combine : combine 함수의 호출 결과값 전달
 * @description 업데이트를 보다 편리하게 할 수 있도록 불변성을 관리해주는 immer
 * 복잡한 state를 다룰때 진가가 잘 드러남
 */

export const useCountStore = create(
  immer(
    combine({ count: 0 }, (set, get) => {
      return {
        actions: {
          icreaseCount: () => {
            set((state) => {
              state.count += 1;
            });
          },
          decreaseCount: () => {
            set((state) => {
              state.count -= 1;
            });
          },
        },
      };
    }),
  ),
);

/**
 * 📝 각 스테이트와 액션을 꺼내오는 전용 커스텀 훅들을 만들 수 있음
 *  이렇게하면 하나의 파일만 수정사항을 처리할 수 있기때문에 유리한 구조로 코드를 작성 할 수 있음
 */
export const useCount = () => {
  const count = useCountStore((store) => store.count);
  return count;
};

export const useIncreseCount = () => {
  const increase = useCountStore((store) => store.actions.icreaseCount);
  return increase;
};

export const useDecreaseCount = () => {
  const decrease = useCountStore((store) => store.actions.decreaseCount);
  return decrease;
};
