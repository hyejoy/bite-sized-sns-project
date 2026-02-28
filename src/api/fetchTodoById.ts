import { API_URL } from '@/lib/constants';
import type { Todo } from '@/types';

export async function fetchTodoById(id: string) {
  const res = await fetch(`${API_URL}/todos/${id}`);
  if (!res.ok) throw new Error('fetch failed');

  const data: Todo = await res.json();
  return data;
}
