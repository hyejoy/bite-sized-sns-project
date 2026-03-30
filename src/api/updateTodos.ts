import { API_URL } from '@/lib/constants';
import type { Todo } from '@/types';

// todo타입의 속성을 선택적 프로퍼티로 받게 partial타입으로 지정 (id는 필수)
export async function updateTodo(todo: Partial<Todo> & { id: string }) {
  const res = await fetch(`${API_URL}/todos/${todo.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  if (!res.ok) throw new Error('update failed');
  const data: Todo = await res.json(); // 수정된 todo가 그대로 담기게 될것임
  return data;
}
