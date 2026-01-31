import { create } from "zustand"; // zustand store 생성하는 함수
import { combine, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

/**
 * @subscribeWithSelector
 * - 셀렉터 함수를 통해 스토어의 특정값을 구독함으로써 해당 값이 변경될때마다
 *   어떠한 기능을 추가로 수행하도록 하는 useEffect 같은 미들웨어임
 */

export const useSubscribe = create(
  subscribeWithSelector(
    immer(
      combine({ count: 0 }, (set, get) => {
        return {
          actions: {
            increaseCount: () => {
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
  ),
);

// 첫번째 인수로는 어떤 값을 구독할 건지, 셀렉터 함수를 넣어준다.
// 아래 코드는 store.count를 구독하고,ㅡ 해당 값이 변경될때마다,
// 두번째 인수로 넣어준 콜백함수를 실행시킨다.
useSubscribe.subscribe(
  (store) => store.count,
  (count, prevCount) => {
    // 구독한 값이 첫번째 인자로 들어오고, 두번째 인자로는 이전의 값이 들어옴
    //Listner 함수
    console.log(count);
    console.log(prevCount);

    // store 특정값을 업데이트 하는것도 가능함 → getState 함수 사용
    const store = useSubscribe.getState(); // 현재 스토어의 값을 반환해줌
    useSubscribe.setState((store) => ({ name: "변경돼요" })); // 원하는 코드 실행
  },
);
/**
 * 📝  이 미들웨어는 사용자가 로그아웃을 해서 세션을 보관하는 스토어의 값이 바뀌었을때
 *      로그인페이지로 보내게 하는 사이드 이펙트를 관리할 때 종종 사용이 됨
 */
export const useCount_subscribe = () => {
  //                         이부분이 셀렉터 함수임
  const count = useSubscribe((store) => store.count);
  return count;
};

export const useIncreaseCount_subscribe = () => {
  const increase = useSubscribe((store) => store.actions.increaseCount);
  return increase;
};

export const useDecreaseCount_subscribe = () => {
  const decrease = useSubscribe((store) => store.actions.decreaseCount);
  return decrease;
};
