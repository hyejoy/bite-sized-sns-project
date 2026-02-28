import { API_URL } from '@/lib/constants';
import type { Todo } from '@/types';

export async function createTodo(content: string) {
  const res = await fetch(`${API_URL}/todos`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content,
      isDone: false,
    }),
  });

  if (!res.ok) throw new Error('create todo failed');
  const data: Todo = await res.json();
  return data;
}
