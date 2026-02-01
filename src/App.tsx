import "./App.css";

export default function App() {
  return (
    <>
      <div className="text-xs text-red-500"> 타이포그래프 : text-xs</div>
      <div className="text-sm text-[rgb(100,30,200)]">
        타이포그래프 : text-sm
      </div>
      <div className="text-lg font-bold"> 타이포그래프 : text-lg</div>
      <div className="text-xl font-extrabold"> 타이포그래프 : text-xl</div>
      <div className="text-2xl font-black"> 타이포그래프 : text-2xl</div>
      <div className="text-[40px]"> 타이포그래프 : text-[40px]</div>

      <div className="bg-amber-500">Background color</div>

      <div className="w-20 border-4">
        SIZE : w-20 은 '4'x20 = 80px 을 의미한다.
      </div>
      <div className="w-[100px] border-4">CUSTOM SIZE : Width 100px</div>
      <div className="h-20 w-full bg-amber-400">WIDTH FULL!</div>

      {/* 여백 */}
      <div className="m-5 h-50 w-50 bg-pink-400 p-5 pt-5 pr-5 pb-5 pl-5">
        <div className="h-full w-full bg-blue-200 px-5 py-5">
          <div className="s-full h-full bg-yellow-400"></div>
        </div>
      </div>
    </>
  );
}
