import { API_URL } from '@/lib/constants';
import type { Todo } from '@/types';

export async function fetchTodos() {
  const res = await fetch(`${API_URL}/todos`);
  if (!res.ok) throw new Error('Fetch Error');
  const data: Todo[] = await res.json();
  return data;
}
