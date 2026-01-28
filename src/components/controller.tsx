import { useDecreaseCount, useIncreseCount } from "../store/count";

export default function Controller() {
  const increase = useIncreseCount();
  const decrease = useDecreaseCount();
  return (
    <div>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </div>
  );
}
