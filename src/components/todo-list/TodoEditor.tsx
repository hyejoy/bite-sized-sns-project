import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useCreateTodoMutation } from './../../hooks/mutations/useCreateTodoMutation';

export default function TodoEditor() {
  const [content, setContent] = useState('');

  const { mutate, isPending } = useCreateTodoMutation();
  const handleAddClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() === '') return;
    mutate(content); // 추가버튼을 누르면 mutate함수가 실행되면서 결과적으로 createTodo함수가 실행됨
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
        <Button disabled={isPending} type="submit">
          추가
        </Button>
      </div>
    </form>
  );
}
