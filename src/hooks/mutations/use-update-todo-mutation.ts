import { updateTodo } from '@/api/updateTodos';
import { QUERY_KEYS } from '@/lib/constants';
import type { Todo } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTodo,
    // onMutate함수에는 인수로 전달된 값이 매개변수로 자동 제공됨
    onMutate: async (updateTodo) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.todo.list,
      });
      const prevTodos = queryClient.getQueryData<Todo[]>(QUERY_KEYS.todo.list); // 에러 대비 -- 원본데이터 저장
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        if (!prevTodos) return [];
        return prevTodos.map((todo) =>
          todo.id === updateTodo.id ? { ...todo, ...updateTodo } : todo
        );
      });

      return {
        prevTodos, // 에러 대비 리턴 ---> context로 들어옴
      };
    }, // 함수실행할때 낙관적 업데이트
    onError: (error, variable, context) => {
      if (context && context.prevTodos) {
        queryClient.setQueryData<Todo[]>(
          QUERY_KEYS.todo.list,
          context.prevTodos // 복구
        );
      }
    },
    // 요청 종료
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.todo.list, // 데이터 수정 마무리 이후 투두리스트 캐시 무효화하고 다시 서버로부터 불러온 값으로 갱신
      });
    },
  });
}

/**
 * onMutate 사용시 예외사항
 * - 1. 비동기 요청이 실패했을때
 *  > 원상복구 해야함
 *  > onError 함수 사용하면됨
 * > onError에는 3가지 매개변수가 자동으로 제공됨 (error, varaible : 요청할때 전달한값, context : onMutate반환하는값)
 *
 * - 2. 비동기 요청 시점이 다를때
 *  > update시점 이후에 다른 조회 데이터가 덮어씌워질때
 *  > 데이터 수정 요청이 발생했을때 조회 요청을 아예 취소시키면 됨
 *    queryClient.cancelQueries({
        queryKey: QUERY_KEYS.todo.list,
      });
    > await async 신경써주기 
 * todoList 조회 기능을 전부 취소하는 기능 수행     
 * 
 * - 3. 백엔드 데이터와 다른경우 (무결성 유지 안된 경우)
 * > 캐시 데이터무효화시켜 리패칭 되도록해 데이터의 무결성을 검증하는 과정까지 추가  
 */
