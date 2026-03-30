import { useCreateTodo } from '@/api/creatTodos';
import { QUERY_KEYS } from '@/lib/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: useCreateTodo,
    // mutation은 4가지 옵션을 설정할수있음 (해당 작업이 끝났을때 실행할 동작등 설정할 수 있음)
    onMutate: () => {}, // 요청 시작
    onSettled: () => {}, //요청 종료
    onSuccess: () => {
      // todos 캐시값을 무효화시켜 useQuery hook이 관리하고있는 캐시데이터가 무효화된걸 인식하고 리패칭됨
      // 1. 쿼리클라이언트 불러오기
      // 2. 쿼리클라이언트의 invalidateQueries함수를 이용해 해당 키값을가진 캐시데이터 무효화 시키기
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.todo.list, // 불필요한 캐시까지 무효화시키지 않기위해 쿼리키 별도 관리
      });
    }, //요청성공
    onError: (error) => {
      alert(error.message);
    }, // 요청 실패
  });
}
