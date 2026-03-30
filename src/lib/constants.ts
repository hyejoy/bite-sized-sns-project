export const API_URL = 'http://localhost:3000';

// mutation onSuccess todos key가진 캐시 무효화 하고있기때문에
// 카테고리 마다 중복되지 않게 작성하는게좋음
// 겹치면 다 삭제되는 문제 발생함 [todos] , [todos, 1] --> 같이 삭제됨
export const QUERY_KEYS = {
  todo: {
    all: ['todo'],
    list: ['todo', 'list'],
    detail: (id: string) => ['todo', 'detail', id],
  },
};
