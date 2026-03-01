import { API_URL } from '@/lib/constants';
import type { Todo } from '@/types';

export async function deleteTodo(id: string) {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('delete todo failed');
  const data: Todo = await response.json(); // 삭제 된 todo item 보관됨
  return data;
}
