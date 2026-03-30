import type { Todo } from '@/types';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const initialData: {
  todos: Todo[];
} = {
  todos: [],
};

const useTodoStore = create(
  immer(
    combine(initialData, (set) => ({
      actions: {
        createTodo: (content: string) => {
          set((state) => {
            state.todos.push({
              id: new Date().getTime(),
              content,
            });
          });
        },
        deleteTodo: (id: number) => {
          set((state) => {
            state.todos = state.todos.filter((todo) => todo.id !== id);
          });
        },
      },
    }))
  )
);

export const useTodos = () => {
  const todos = useTodoStore((store) => store.todos);
  return todos;
};

export const useTodoActions = () => {
  const actions = useTodoStore((store) => store.actions);
  return actions;
};
