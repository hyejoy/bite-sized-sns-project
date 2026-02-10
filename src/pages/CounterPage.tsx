import Controller from '@/counter/Controller';
import Viewer from '@/counter/Viewer';

export default function CounterPage() {
  return (
    <>
      <h1 className="text-2xl font-bold">CounterPage Component</h1>
      <Viewer />
      <Controller />
    </>
  );
}
