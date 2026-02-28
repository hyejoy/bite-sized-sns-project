import type { Todo } from '@/types';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const initalState: {
  todos: Todo[];
} = {
  todos: [],
};

const useTodoStore = create(
  immer(
    combine(initalState, (set) => ({
      actions: {
        createTodo: (content: string) => {
          set((state) => {
            state.todos.push({
              id: new Date().getTime().toString(),
              content,
              isDone: false,
            });
          });
        },
        deleteTodo: (targetId: string) => {
          set((state) => {
            state.todos = state.todos.filter((todo) => todo.id !== targetId);
          });
        },
      },
    }))
  )
);

/** custom hook */

export const useTodos = () => {
  return useTodoStore((store) => store.todos);
};

export const useTodosActions = () => {
  return useTodoStore((state) => state.actions);
};
