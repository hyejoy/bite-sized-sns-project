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
    onMutate: (updateTodo) => {
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        if (!prevTodos) return [];
        return prevTodos.map((prevTodo) =>
          prevTodo.id === updateTodo.id
            ? { ...prevTodo, ...updateTodo }
            : prevTodo
        );
      });
    },
  });
}
