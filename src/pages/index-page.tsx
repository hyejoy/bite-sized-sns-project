import Controller from "../components/controller";
import Viewer from "../components/viewer";

export default function IndexPage() {
  return (
    <>
      <div className="text-2xl font-bold underline">Hello World</div>

      <Viewer />
      <Controller />
    </>
  );
}
