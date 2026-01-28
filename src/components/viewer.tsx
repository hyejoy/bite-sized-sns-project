import { useCount } from "../store/customCount";

export default function Viewer() {
  // const { count } = useCountStore();
  const count = useCount();
  return (
    <>
      <h1>{count}</h1>
    </>
  );
}
