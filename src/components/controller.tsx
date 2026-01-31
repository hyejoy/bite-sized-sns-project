import { useCountActions } from "../store/count";

export default function Controller() {
  const { increaseCount, decreaseCount } = useCountActions();
  return (
    <div>
      <button onClick={increaseCount}>+</button>
      <button onClick={decreaseCount}>-</button>
    </div>
  );
}
