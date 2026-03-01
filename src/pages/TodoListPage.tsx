import TodoEditor from '@/components/todo-list/TodoEditor';
import TodoItem from '@/components/todo-list/TodoItem';
import { useTodosData } from '@/hooks/quries/useTodosData';

export default function TodoListPage() {
  /**
   * 변경 전
   *  const {
   *   data: todos,
   *   isLoading,
   *   error,
   * } = useQuery({
   *   queryFn: fetchTodos,
   *   queryKey: ['todos'],
   *
   *});
   */

  const { data: todoIds, isLoading, error } = useTodosData();
  if (error) return <div>오류가 발생했습니다.</div>;
  if (isLoading) return <div>로딩 중 입니다...</div>;

  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="text-2xl font-bold">TodoListPage Component</h1>
      <TodoEditor />
      {todoIds?.map((id) => (
        <TodoItem id={id} key={id} />
      ))}
    </div>
  );
}
