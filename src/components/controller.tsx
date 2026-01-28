import { useCountStore } from "../store/count";
import { useCountStore2 } from "../store/count2";
import { useDecreaseCount, useIncreseCount } from "../store/customCount";

export default function Controller() {
  /**
   * const { increase1, decrease1 } = useCountStore2(❌(store) => store.action❌);
   * 📝 규모있는 프로젝트에서는 셀렉터 함수를 컴포넌트 내부에 직접 정의하는일은 별로 없음
   *  유지보수 과정이 어려워지기 때문임
   *  예를들어 count Store에서 새로운 기능을 추가하거나 코드를 수정하는 과정중에
   *  특정 프로퍼티의 이름이 바뀔수도 있는데, ex) increase함수가 increaseOne으로
   *  count Store를 불러다가 사용하는  컨트롤러 컴포넌트에도 수정사항이 발생함
   *  따라서 countStore에서 커스텀 훅을 만드는게 일반적임
   */
  const increase = useIncreseCount();
  const decrease = useDecreaseCount();
  return (
    <div>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </div>
  );
}
