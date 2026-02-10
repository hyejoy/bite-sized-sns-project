import { Button } from '@/components/ui/button';
import {
  useCounterStore,
  useDecreaseCount,
  useIncreaseCount,
} from '@/store/counterStore';

export default function Controller() {
  // const { increase, decrease } = useCounterStore((store) => store.actions);
  const increase = useIncreaseCount();
  const decrease = useDecreaseCount();

  return (
    <div>
      <Button onClick={decrease}>-</Button>
      <Button onClick={increase}>+</Button>
    </div>
  );
}
