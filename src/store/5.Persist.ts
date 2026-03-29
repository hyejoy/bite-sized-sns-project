/**
 * 현재 스토어의 값을 브라우저의 스토리지,
 * 로컬 스토리지나 세션 스토리지에 보관하도록 해주는 persist 미들웨어
 */

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type Store = {
  count: number;
  actions: {
    increase: () => void;
    decrease: () => void;
  };
};
//create(persist(immer()))
export const useCountStore = create<Store>()(
  persist(
    // persists는 2개의 인수가 필요함
    // 첫번째 인수  immer
    immer<Store>((set) => ({
      count: 0,
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
    })),
    // 2번째 인수로는 객체가 들어가야하는데 name프로퍼티로 스토리지에 저장될 스토어 이름 지정해주기
    // partialize 속성에 어떤 스토리지의 값을 저장할건지 지정 (지정하지않으면 action함수가 빈객체{}로 저장돼서 함수 동작안함)
    // -> 함수는 직렬화로 저장이안되기때문에 나타나는 문제
    {
      name: 'countStore',
      partialize: (store) => ({
        count: store.count, // store의 count값만 보관
      }),
      // 기본적으로 로컬 스토리지에 저장되는데 세션 스토리지에 저장하기위해서는 storage 속성 이용
      // -> createJSONStorage 함수 import 해야함
      // createJSONStoragte의 콜백함수로 세션스토리지를 넘겨주면 됨
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
