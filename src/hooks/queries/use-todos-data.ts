import { fetchTodos } from '@/api/fetchTodos';
import { useQuery } from '@tanstack/react-query';

export function useTodosData() {
  return useQuery({
    queryFn: fetchTodos,
    queryKey: ['todos'],
    retry: 0, // 재시도 횟수 0
  });
}
