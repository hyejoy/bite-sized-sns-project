import { Button } from '@/components/ui/button';
import { useDeleteTodoMutation } from '@/hooks/mutations/useDeleteTodoMutation';
import { useUpdateTodoMutation } from '@/hooks/mutations/useUpdateTodoMutation';
import { useTodoDataById } from '@/hooks/quries/useTodoDataById';
import { Link } from 'react-router';

export default function TodoItem({ id }: { id: string }) {
  const { data: todo } = useTodoDataById(id, 'LIST'); // LIST는 어떠한 상황에도 리패칭 되지 않도록 함
  if (!todo) throw new Error('todo data undefined');
  const { content, isDone } = todo;
  const { mutate: updateTodo } = useUpdateTodoMutation();
  // 삭제 중 isDone을 수정하는 경우를 방지하기위해 pending설정 진행
  const { mutate: deleteTodo, isPending: isDeleteTodoPending } =
    useDeleteTodoMutation();
  const handleCheckboxClick = () => {
    updateTodo({ id, isDone: !isDone }); // 이요청이 성공됐다고 가정
  };
  const handleDeleteClick = () => {
    deleteTodo(id);
  };
  return (
    <div className="flex items-center justify-between border p-2">
      <div className="flex gap-5">
        <input
          disabled={isDeleteTodoPending}
          type="checkbox"
          checked={isDone}
          onChange={handleCheckboxClick}
        />
        <Link to={`/todolist/${id}`}>{content}</Link>
      </div>
      <Button
        variant={'destructive'}
        disabled={isDeleteTodoPending}
        onClick={handleDeleteClick}
      >
        삭제
      </Button>
    </div>
  );
}
