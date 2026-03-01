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
      // 업데이트 해둔 캐시 데이터를 과거의 버전으로 다시 덮어씌워버리게 되는 상황 방지
      // 👉 조회가 끝나는 시점과 수정이 끝나는 시점이 어긋날때 생기는 현상 방지
      await queryClient.cancelQueries({
        // todolist 를 불러오고 있는 데이터 조회 요청들 취소
        queryKey: QUERY_KEYS.todo.list,
      });

      // 오류시 원상복구할 데이터 미리 저장해놓기
      const prevTodos = queryClient.getQueryData<Todo[]>(QUERY_KEYS.todo.list);
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        if (!prevTodos) return [];
        return prevTodos.map((prevTodo) =>
          prevTodo.id === updateTodo.id
            ? { ...prevTodo, ...updateTodo }
            : prevTodo
        );
      });

      return { prevTodos }; // onError시 context 값으로 들어감
    },
    // error내용, mutation function호출할때 인수로 전달한 값, onMutate가 반환하는 값
    onError: (error, variable, context) => {
      if (context && context.prevTodos) {
        queryClient.setQueryData<Todo[]>(
          QUERY_KEYS.todo.list,
          context.prevTodos
        );
      }
    },

    // 데이터 무결성검사
    // onmutate에서 todo item 이 true로 수정될것이라고 예상하고 업데이트해뒀는데
    // 실제 백엔드에서는 버그.실수때문에 예상하는 다른값으로 업데이트 되는경우 (무결성 깨짐)
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.todo.list,
      });
    },
  });
}
