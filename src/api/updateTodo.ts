import { API_URL } from '@/lib/constants';
import type { Todo } from '@/types';

export async function updateTodo(todo: Partial<Todo> & { id: string }) {
  const respose = await fetch(`${API_URL}/todos/${todo.id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify(todo),
  });

  if (!respose.ok) throw new Error('update todo failed');
  const data: Todo = await respose.json();

  return data;
}
