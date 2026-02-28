import { fetchTodoById } from '@/api/fetchTodoById';
import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

export function useTodoDataById(id: string) {
  return useQuery({
    queryFn: () => fetchTodoById(id),
    queryKey: QUERY_KEYS.todo.detail(id),

    staleTime: 5000, //stale까지 되는 시간
    gcTime: 5000,

    // 데이터가 stale한 상태가 되어도 내가 원하는 시점에 리패칭되도록 설정 하는 옵션들
    // refetchInterval: 1000, → 1초마다 리패칭
    // refetchOnMount: false, → stale 상태가 되어도 리패칭 진행 안함
    // refetchOnWindowFocus: false, → 윈도우 포커스 시점에서도 리패칭 되지 않도록함
    // refetchOnReconnect: false, → 연결이 끊어졌다가 다시 되는 reconnect 시점에 리패칭 되지 않도록 함
    // refetchInterval: false, → 주기적 리패칭하지 않도록 함
  });
}
