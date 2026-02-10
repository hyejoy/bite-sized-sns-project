import TodoEditor from '@/components/todo-list/TodoEditor';
import TodoItem from '@/components/todo-list/TodoItem';

const dummyTodos = [
  { id: '1', content: 'todo1' },
  { id: '2', content: 'todo2' },
  { id: '3', content: 'todo3' },
];
export default function TodoListPage() {
  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="text-2xl font-bold">TodoListPage Component</h1>
      <TodoEditor />
      {dummyTodos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </div>
  );
}
