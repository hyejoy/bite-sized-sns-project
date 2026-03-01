import { deleteTodo } from '@/api/deleteTodo';
import { QUERY_KEYS } from '@/lib/constants';
import type { Todo } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/** useDeleteTodoMutation.ts 수정 제안 */
export function useDeleteTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    // onSuccess의 두 번째 인자는 mutate(id) 호출 시 전달한 값(id)입니다.
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        if (!prevTodos) return [];
        // 서버 응답 객체 대신 직접 넘겼던 id를 활용해 확실하게 필터링합니다.
        return prevTodos.filter((todo) => todo.id !== deletedId);
      });
    },
  });
}
