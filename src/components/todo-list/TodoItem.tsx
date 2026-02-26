import { Button } from '@/components/ui/button';
import { useTodosActions } from '@/store/todosStore';
import type { Todo } from '@/types';

export default function TodoItem({ id, content }: Todo) {
  const { deleteTodo } = useTodosActions();

  const handleDeleteClick = () => {
    deleteTodo(id);
  };
  return (
    <div className="flex items-center justify-between border p-2">
      {content}
      <Button
        onClick={() => handleDeleteClick}
        className="text-white"
        variant={'destructive'}
      >
        삭제
      </Button>
    </div>
  );
}
