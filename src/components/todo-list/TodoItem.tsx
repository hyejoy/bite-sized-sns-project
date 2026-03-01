import { Button } from '@/components/ui/button';
import { useUpdateTodoMutation } from '@/hooks/mutations/useUpdateTodoMutation';
import type { Todo } from '@/types';
import { Link } from 'react-router';

export default function TodoItem({ id, content, isDone }: Todo) {
  const { mutate } = useUpdateTodoMutation();
  const handleCheckboxClick = () => {
    mutate({ id, isDone: !isDone }); // 이요청이 성공됐다고 가정
  };
  const handleDeleteClick = () => {};
  return (
    <div className="flex items-center justify-between border p-2">
      <div className="flex gap-5">
        <input
          type="checkbox"
          checked={isDone}
          onChange={handleCheckboxClick}
        />
        <Link to={`/todolist/${id}`}>{content}</Link>
      </div>
      <Button variant={'destructive'} onClick={handleDeleteClick}>
        삭제
      </Button>
    </div>
  );
}
