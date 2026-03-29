import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// create(immer(combine()))

create(
  immer(
    combine({ count: 0 }, (set, get) => ({
      actions: {
        increase: () => {
          set((state) => {
            // 소괄호와 함께 객체를 반환하는게 아닌
            // 바로 중괄호 열어서 함수 본문에서 현재 state값에 접근하여 변경
            state.count += 1;
          });
        },
        decrease: () => {
          set((state) => {
            state.count -= 1;
          });
        },
      },
    }))
  )
);

// basic + combine store
create(
  combine({ count: 0 }, (set, get) => ({
    actions: {
      increase: () => {
        set((store) => ({ count: store.count + 1 }));
      },
      decrease: () => {
        set((store) => ({ count: store.count - 1 }));
      },
    },
  }))
);
