import { updateTodo } from '@/api/updateTodos';
import { QUERY_KEYS } from '@/lib/constants';
import type { Todo } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTodo,
    // onMutate함수에는 인수로 전달된 값이 매개변수로 자동 제공됨
    onMutate: (updateTodo) => {
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        if (!prevTodos) return [];
        return prevTodos.map((todo) =>
          todo.id === updateTodo.id ? { ...todo, ...updateTodo } : todo
        );
      });
    }, // 함수실행할때 낙관적 업데이트
  });
}
