import { API_URL } from '@/lib/constants';
import type { Todo } from '@/types';

export async function useCreateTodo(content: string) {
  console.log('test', content);
  const res = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      //id는  자동생성됨
      content,
      isDone: false,
    }),
  });

  if (!res.ok) throw new Error('create todo failed');
  const data: Todo = await res.json();
  return data;
}
