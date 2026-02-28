import { createTodo } from '@/api/createTodo';
import { QUERY_KEYS } from '@/lib/constants';
import type { Todo } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateTodoMutation() {
  // 1. queryClient 불러오기
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTodo,
    onMutate: () => {},
    onSettled: () => {},
    onSuccess: (newTodo) => {
      // setQueryData함수 이용 → Todo[] 형태의 데이터 수정함을 명시
      // 첫번째 인수로는 수정할 캐시 데이터의 키값
      // 두번째 인수로는 setState를 사용하는 것처럼 화살표 함수 넘겨주기
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        if (!prevTodos) return [newTodo];
        return [...prevTodos, newTodo];
      });
    },
    onError: (error) => {
      window.alert(error.message);
    },
  });
}
