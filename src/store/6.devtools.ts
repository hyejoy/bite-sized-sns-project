/**
 * 스토어를 디버깅할 수 있도록 도와주는 미들웨어
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// 가장 마지막에 감싸면됨

type Store = {
  count: number;
  actions: {
    increase: () => void;
    decrease: () => void;
  };
};

//create(devtool(persist(immer())))

export const useCountStore = create(
  // devtools는 인수 2개필요함
  devtools(
    //첫번째 인수
    persist(
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
      {
        name: 'countStore',
        partialize: (store) => ({
          count: store.count,
        }),
      }
    ),
    // 두번째 인수
    // 현재 스토어의 이름을 name 프로퍼티를 이용하여 넣으면 된다.
    { name: 'countStore' }
    // redux devtools 크롬 확장프로그램 필요함 [Redux] 탭에서 > countStore에서 확인가능
  )
);

/**
 * ♞ 미들웨어 적용 순서
 * devtools > persist > subscribeWithSelector > immer > combine
 */
