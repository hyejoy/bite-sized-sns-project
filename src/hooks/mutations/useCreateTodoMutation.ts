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
      queryClient.setQueryData<Todo>(
        QUERY_KEYS.todo.detail(newTodo.id),
        newTodo
      );
      queryClient.setQueryData<string[]>(
        QUERY_KEYS.todo.list,
        (prevTodoIds) => {
          if (!prevTodoIds) return [newTodo.id];
          return [...prevTodoIds, newTodo.id];
        }
      );
    },
    onError: (error) => {
      window.alert(error.message);
    },
  });
}
