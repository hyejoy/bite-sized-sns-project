/*
 * subscribeWithSelector : 셀렉터 함수와 구독을
 * 셀렉터 함수를 통해 특정값을 구독해, 이 값이 변경될때마다 어떠한 기능을 추가로 수행하도록 만들어주는 미들웨어
 */

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type Store = {
  count: number;
  actions: {
    increase: () => void;
    decrease: () => void;
  };
};

// create(subscribeWithSelectore(immer()))
const useCountStore = create<Store>()(
  // 특정값을 구독하고, 해당하는 값이 변경될때마다 특정 코드 실행시킬 수 있게됨
  subscribeWithSelector(
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
    }))
  )
);

// count값이 변경될때마다(셀렉터함수), 두번째 인수로 전달하는 콜백함수를 실행시킴
useCountStore.subscribe(
  (store) => store.count, // count값 구독한 상태
  (count, prevCount) => {
    //Listner
    // 선택된 count state의 이전값도 제공해줌
    console.log('count: ', count);
    console.log('prevCount: ', prevCount);

    // 현재 스토어를 불러오거나 현재 스토어의 업데이트하는것도 가능함
    const store = useCountStore.getState(); // 현재 store값 반환
    // 업데이트 하는 방법
    useCountStore.setState((store) => ({
      // count : 10,
      // store의 특정값 변경
      // 무한루프 돌아서 주석처리 (현재 count 구독중)
    }));
  }
);
/**
 * 세션을 보관하는 스토어의 값이 변경되었을때
 * 로그인 페이지로 다시 보내는 사이드 이펙트를 관리할때 종종 이용
 */

// create + immer 패턴 : create<Store>()()
create<Store>()(
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
  }))
);
