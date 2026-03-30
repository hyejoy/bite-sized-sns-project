import { Button } from '@/components/ui/button';
import { useTodosActions } from '@/store/todosStore';
import type { Todo } from '@/types';
import { Link } from 'react-router';

export default function TodoItem({ id, content }: Todo) {
  const { deleteTodo } = useTodosActions();

  return (
    <div className="flex items-center justify-between border p-2">
      <Link to={`/todoList/${id}`}>{content}</Link>
      <Button
        onClick={() => deleteTodo(id)}
        className="text-white"
        variant={'destructive'}
      >
        삭제
      </Button>
    </div>
  );
}
