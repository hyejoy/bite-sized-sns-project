import { updateTodo } from '@/api/updateTodo';
import { QUERY_KEYS } from '@/lib/constants';
import type { Todo } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTodo,
    // 요청이 성공했다고 가정하고 바로 반응하기 위해 낙관적 업데이트 진행
    // mutate 인수로 전달한 값이 자동으로 매개변수로 들어옴
    //  const handleCheckboxClick = () => {
    //   mutate({ id, isDone: !isDone }); // 여기 인수로 전달한 값 자동으로 들어옴
    // };

    onMutate: async (updateTodo) => {
      // 덮어씌우기 방지 (수정 이전 조회 요청은 취소됨)
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.todo.detail(updateTodo.id),
      });
      const prevTodo = queryClient.getQueryData<Todo>(
        QUERY_KEYS.todo.detail(updateTodo.id)
      );
      queryClient.setQueryData(
        QUERY_KEYS.todo.detail(updateTodo.id),
        (prevTodo) => {
          if (!prevTodo) return;
          return {
            ...prevTodo,
            updateTodo,
          };
        }
      );

      return {
        prevTodo, // onError에서 사용할 이전 값
      };
    },
    // error내용, mutation function호출할때 인수로 전달한 값, onMutate가 반환하는 값
    onError: (error, variable, context) => {
      if (context && context.prevTodo) {
        queryClient.setQueryData<Todo>(
          QUERY_KEYS.todo.detail(context.prevTodo.id),
          context.prevTodo
        );
      }
    },

    // 데이터 무결성검사
    // onmutate에서 todo item 이 true로 수정될것이라고 예상하고 업데이트해뒀는데
    // 실제 백엔드에서는 버그.실수때문에 예상하는 다른값으로 업데이트 되는경우 (무결성 깨짐)
    // onSettled: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: QUERY_KEYS.todo.list,
    //   });
    // },
  });
}
