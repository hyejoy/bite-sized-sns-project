import { create } from "zustand"; // zustand store 생성하는 함수
import {
  combine,
  persist,
  subscribeWithSelector,
  createJSONStorage,
  devtools,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

/**
 * @persist 미들웨어 설정 가이드
 * * 1. 설정 방법: 두 번째 인수로 옵션 객체를 전달합니다.
 * 2. name 속성: 브라우저 로컬 스토리지에 저장될 고유 키(Key) 이름을 지정합니다.
 * 3. 자동 저장: 설정 시 스토어의 상태(State)가 로컬 스토리지에 자동으로 동기화됩니다.
 * 4. 데이터 유지: 페이지 새로고침 시에도 스토리지에 저장된 값이 복구되어 상태가 유지됩니다.
 * * ⚠️ 주의사항 및 팁
 * - 함수(Actions)는 JSON 파싱이 불가능하므로 스토리지에 저장되지 않습니다.
 *
 *
 * - 📝[partialize] 옵션 :
 * 스토어의 전체 데이터 중 '저장이 필요한 상태값'만 선택하여 보관할 때 사용
 * (예: selector 함수를 통해 특정 상태만 명시적으로 반환)
 *
 * - 📝[storage] 옵션 : 로컬스토리지 대신 세션 스토리지의 데이터를 보관하도록 하는방법
 *   1) createJSONStorage import
 *   2) createJSONStorage 콜백함수로 sessionStorage 반환
 *
 * - 📝[devtools] 옵션 : 개발자 도구를 통해 스토어를 디버깅할 수 있도록 도와주는 옵션
 *   1) create 함수를 devtools로 감싸고
 *   2) 두번째 인자로, name 속성에 현재 스토어의 이름을 넣어주면된다.
 *   3) Redux DevTools 크롬 확장 프로그램 설치 필수
 *
 * ⭐ zustand 미들웨어는 감싸는 순서가 중요함
 *    combine → immer → subscribeWithSelector → persists → devtools
 */

export const useCountStore = create(
  devtools(
    persist(
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
      {
        name: "countStore", // 로컬 스토리지에 저장할 key 값
        partialize: (store) => ({
          count: store.count, //count값만 로컬 스토리지에 저장함 (그외의 값은 저장 X)
        }),
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
    {
      name: "countStore",
    },
  ),
);

// 첫번째 인수로는 어떤 값을 구독할 건지, 셀렉터 함수를 넣어준다.
// 아래 코드는 store.count를 구독하고,ㅡ 해당 값이 변경될때마다,
// 두번째 인수로 넣어준 콜백함수를 실행시킨다.
useCountStore.subscribe(
  (store) => store.count,
  (count, prevCount) => {
    // 구독한 값이 첫번째 인자로 들어오고, 두번째 인자로는 이전의 값이 들어옴
    //Listner 함수
    console.log(count);
    console.log(prevCount);

    // store 특정값을 업데이트 하는것도 가능함 → getState 함수 사용
    const store = useCountStore.getState(); // 현재 스토어의 값을 반환해줌
    useCountStore.setState((store) => ({ name: "변경돼요" })); // 원하는 코드 실행
  },
);
/**
 * 📝  이 미들웨어는 사용자가 로그아웃을 해서 세션을 보관하는 스토어의 값이 바뀌었을때
 *      로그인페이지로 보내게 하는 사이드 이펙트를 관리할 때 종종 사용이 됨
 */
export const useCount = () => {
  return useCountStore((state) => state.count);
};

export const useCountActions = () => {
  return useCountStore((state) => state.actions);
};
