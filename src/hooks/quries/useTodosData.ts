import { fetchTodos } from '@/api/fetchTodos';
import { QUERY_KEYS } from '@/lib/constants';
import type { Todo } from '@/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// useTodoData를 호출하면 자동으로 fetchTodos가 실행되어
// 해당 요청의 상태값을 어디든지 쓸 수 있게 된다.

// useQuery 매개변수
// 1. queryFn : Fetch함수
// 2. queryKey : query key값

// UseQuery훅은 마운트 되었을때 queryFn으로 설정한 fetch함수를 자동으로 호출함
// 알아서 data, isLoading, error 객체를 제공해줌
export function useTodosData() {
  const queryClient = useQueryClient();

  return useQuery({
    queryFn: async () => {
      const todos = await fetchTodos();

      todos.forEach((todo) => {
        queryClient.setQueryData<Todo>(QUERY_KEYS.todo.detail(todo.id), todo);
      });
      return todos.map((todo) => todo.id); // todo의 id값만 따로 모아둔 배열이 캐시데이터로 보관이 됨
    },
    queryKey: QUERY_KEYS.todo.list,
    // retry: 0,
  });
}

// tanstack query는 오류 발생시 3번정도 다시 request를 보내게 내장 설정 되어있음
// retry:0 으로 설정하게되면 제시도 횟수가 0으로 됨
