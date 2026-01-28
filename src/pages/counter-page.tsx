import { useCountStore } from "../store/count";

export default function CounterPage() {
  // const store = useCountStore();
  const { count, increase, decrease } = useCountStore();
  return (
    <>
      <h1>{count}</h1>
      <button onClick={increase}>증가</button>
      <button onClick={decrease}>감소</button>
    </>
  );
}
