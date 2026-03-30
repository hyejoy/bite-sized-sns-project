import TodoEditor from '@/components/todo-list/TodoEditor';
import TodoItem from '@/components/todo-list/TodoItem';
import { useTodosData } from '@/hooks/queries/use-todos-data';

export default function TodoListPage() {
  const { data: todos, isLoading, error } = useTodosData();

  if (isLoading) return <div>loding</div>;
  if (error) return <div>error</div>;

  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="text-2xl font-bold">TodoList</h1>
      <TodoEditor />
      {todos?.map((item) => (
        <TodoItem key={item.id} id={item.id} content={item.content} />
      ))}
    </div>
  );
}
