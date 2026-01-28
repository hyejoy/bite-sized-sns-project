import { useCountStore } from "../store/count";
import { useCountStore2 } from "../store/count2";

export default function ControllerPrev() {
  /**
     const { increase, decrease } = useCountStore();
   *❓ count만 변경되었는데 버튼도 같이 리랜더링 되는이유
   *
   *    1. zustand 는 컴포넌트에서 불러온 스토어 값들 중에 하나라도 업데이트되면
   *       해당 컴포넌트를 자동으로 리렌더링 시킨다.
   *    2. store전부를 불러오기 때문이다.
   *       → useCountStore 훅을 호출하면 전체 store 객체가 반환되는데,
   *         1번이유로 인해 해당 컴포넌트를 리랜더링 시킴
   *       → 구조분해 할당으로 count를 안받았을뿐, 불러온 상태
   */

  /**
   * 📃 해결방법
   *    1. hook의 인수로 selecter 함수 ≒ 스토어로부터 어떤 값을 꺼내올 건지 명시하는 함수 전달
   *    2. 원하는 값만 스토어에서 뽑아 불러오도록 설정하기
   *    3. hook의 매개변수로 callback 함수를 전달하는데, callback 함수에는
   *       매개변수로 현재의 스토어 객체가 제공이 됨
   *       반환값들만 return하게 되도록 작성
   */
  //                              ⌈ select 함수 라고 부르며, 이 함수를 통해 스토어로부터 특정 값만
  //                             ↓ 불러오도록 설정 할 수 있음
  const increase = useCountStore((store) => store.increase);
  const decrease = useCountStore((store) => store.decrease);
  // count 값은 불러오지않아, count state값을 변경을 시켜도 버튼은 리랜더링 안됨

  /**
   * increase, decrease 두줄로 불러오는 방법이 귀찮으면
   * count store 내부에서 increase, decrease를 action이라는 속성으로 한번 묶어주기
   */

  const { increase1, decrease1 } = useCountStore2((store) => store.action);
  return (
    <>
      <button onClick={increase}>증가</button>
      <button onClick={decrease}>감소</button>
    </>
  );
}

/**
 * 📝 규모있는 프로젝트에서는 셀렉터 함수를 컴포넌트 내부에 직접 정의하는일은 별로 없음
 *  유지보수 과정이 어려워지기 때문임
 *  예를들어 count Store에서 새로운 기능을 추가하거나 코드를 수정하는 과정중에
 *  특정 프로퍼티의 이름이 바뀔수도 있는데, ex) increase함수가 increaseOne으로
 *  count Store를 불러다가 사용하는  컨트롤러 컴포넌트에도 수정사항이 발생함
 *  따라서 countStore에서 커스텀 훅을 만드는게 일반적임
 */
