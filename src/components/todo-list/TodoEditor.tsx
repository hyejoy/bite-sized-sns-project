import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTodosActions } from '@/store/todosStore';
import { useState } from 'react';

export default function TodoEditor() {
  const [content, setContent] = useState('');

  const { createTodo } = useTodosActions();

  const handleAddClick = (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    if (content.trim() === '') return;
    createTodo(content);
    setContent('');
  };

  return (
    <form onSubmit={handleAddClick}>
      <div className="flex gap-2">
        <Input
          placeholder="새로운 할 일을 입력하세요 ..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button type="submit">추가</Button>
      </div>
    </form>
  );
}
