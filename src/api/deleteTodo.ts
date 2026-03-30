import { API_URL } from '@/lib/constants';

export async function deleteTodo(id: string) {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw new Error('del failed');

  return id;
}
