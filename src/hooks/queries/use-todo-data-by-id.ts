import { fetchTodoById } from '@/api/fetchTodoById';
import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

export function useTodoDataById(id: string) {
  return useQuery({
    queryFn: () => fetchTodoById(id),
    queryKey: QUERY_KEYS.todo.detail(id),
    staleTime: 5000, // 5s

    /** 리패칭 설정 */
    /**
     refetchOnMount: false, // mount시 리패칭 끄기
     refetchOnWindowFocus:  false, // window focus시 리패칭 끄기
     refetchOnReconnect: false, // 연결끊겼다 재연결시 리패칭 끄기
     refetchInterval:false // 주기적으로 리패칭 기능 끄기
     */
  });
}
