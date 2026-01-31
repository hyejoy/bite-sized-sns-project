import { useCount } from "../store/count";

export default function viewer() {
  const count = useCount();
  return (
    <>
      <h1>{count}</h1>
    </>
  );
}
