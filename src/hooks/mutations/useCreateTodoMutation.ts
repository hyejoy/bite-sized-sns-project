import { createTodo } from '@/api/createTodo';
import { useMutation } from '@tanstack/react-query';

export function useCreateTodoMutation() {
  return useMutation({
    mutationFn: createTodo,
    onMutate: () => {},
    onSettled: () => {},
    onSuccess: () => {},
    onError: () => {},
  });
}
