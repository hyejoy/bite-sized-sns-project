import './App.css';
import { Button } from '@/components/ui/button';
import { cn } from './lib/utils'; // 샤드시엔에서 설치된 유틸함수
export default function App() {
  const isActive = true;
  return (
    <>
      <Button>샤드시엔 버튼 (shadcn/ui)</Button>
      {/* 📌 샤드시엔 index.css 파일의 색상이 자동으로 css변수로 설정되고 tailwindcss에서 사용할 수 있음*/}
      <div className="text-primary">Primary</div>
      <div className="text-muted">Muted</div>
      <div className="text-destructive">Destructive</div>

      {/* 조건부로 className을 적용해야 할때 cn 유틸 함수를 이용하면 편리함 */}
      <div className={cn(isActive ? 'text-green-500' : 'text-red-500')}>
        isActive
      </div>
    </>
  );
}
