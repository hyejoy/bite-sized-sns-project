import { useTodoDataById } from '@/hooks/queries/use-todo-data-by-id';
import { useParams } from 'react-router';

export default function TodoDetailPage() {
  const params = useParams();

  const { id } = params;

  const { data, isLoading, error } = useTodoDataById(String(id));

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error</div>;
  return (
    <>
      <h1>{data?.content}</h1>
    </>
  );
}
