import { useCount } from '@/store/counterStore';

export default function Viewer() {
  const count = useCount();
  return (
    <>
      <div>{count}</div>
    </>
  );
}
