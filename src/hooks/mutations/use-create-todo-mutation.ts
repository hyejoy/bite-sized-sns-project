import { useCreateTodo } from '@/api/creatTodos';
import { QUERY_KEYS } from '@/lib/constants';
import type { Todo } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: useCreateTodo,
    // mutation은 4가지 옵션을 설정할수있음 (해당 작업이 끝났을때 실행할 동작등 설정할 수 있음)
    onMutate: () => {}, // 요청 시작
    onSettled: () => {}, //요청 종료
    // 함수 반환값은 onSuccess의 매개변수로 전달됨
    onSuccess: (newTodo) => {
      /**
       // todos 캐시값을 무효화시켜 useQuery hook이 관리하고있는 캐시데이터가 무효화된걸 인식하고 리패칭됨
       // 1. 쿼리클라이언트 불러오기
       // 2. 쿼리클라이언트의 invalidateQueries함수를 이용해 해당 키값을가진 캐시데이터 무효화 시키기
       queryClient.invalidateQueries({
         queryKey: QUERY_KEYS.todo.list, // 불필요한 캐시까지 무효화시키지 않기위해 쿼리키 별도 관리
       });
       */

      // 위의 방식은 직관적이지만 모든 캐시를 무효화하기때문에 데이터의 양이 많아지면 다시 불러와야하는 양이많아짐
      // 그래서 반환값으로 넘어오는 값을 이용해 해당 캐시값을 생성해주기만 하면됨
      // setQueryData에 생성할 데이터 타입을 제네릭으로 명시후,
      // 첫번째 인자로는 쿼리키값이름, 두번째는 화살표 함수의 매개변수작성
      // 화살표함수는 첫번째인수로 작성한 키값을 갖는 캐시데이터가 제공됨
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        if (!prevTodos) return [newTodo];
        return [...prevTodos, newTodo];
      });
    }, //요청성공
    onError: (error) => {
      alert(error.message);
    }, // 요청 실패
  });
}
