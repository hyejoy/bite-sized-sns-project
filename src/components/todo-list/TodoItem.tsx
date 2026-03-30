import { Button } from '@/components/ui/button';
import { useDeleteTodoMutation } from '@/hooks/mutations/use-delete-todo-mutation';
import { useUpdateTodoMutation } from '@/hooks/mutations/use-update-todo-mutation';
import type { Todo } from '@/types';
import { Link } from 'react-router';

export default function TodoItem({ id, content, isDone }: Todo) {
  const { mutate: updateMutate } = useUpdateTodoMutation();
  const { mutate: deleteMutate, isPending: isDeletePending } =
    useDeleteTodoMutation();
  const handleCheckboxClick = () => {
    updateMutate({ id, isDone: !isDone });

    // 체크박스 클릭시 네트워크 요청이 성공할거라고 예상하고 낙관적 데이트 실시
  };
  const handleDeleteClick = () => {
    deleteMutate(id);
  };
  return (
    <div className="flex items-center justify-between border p-2">
      <div className="flex gap-5">
        <input
          disabled={isDeletePending}
          onChange={handleCheckboxClick}
          type="checkbox"
          checked={isDone}
        />
        <Link to={`/todoList/${id}`}>{content}</Link>
      </div>
      <Button
        disabled={isDeletePending}
        onClick={handleDeleteClick}
        className="text-white"
        variant={'destructive'}
      >
        삭제
      </Button>
    </div>
  );
}
