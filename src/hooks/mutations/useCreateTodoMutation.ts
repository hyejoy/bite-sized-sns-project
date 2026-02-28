import { createTodo } from '@/api/createTodo';
import { QUERY_KEYS } from '@/lib/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateTodoMutation() {
  // 1. queryClient 불러오기
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTodo,
    onMutate: () => {},
    onSettled: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.todo.list, // todos데이터 무효화
      });
    },
    onError: (error) => {
      window.alert(error.message);
    },
  });
}
