import type { Todo } from '@/types';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const initalState: {
  todos: Todo[];
} = {
  todos: [],
};

export const TodosStore = create(
  immer(
    combine(initalState, (set) => ({
      actions: {
        createTodo: (content: string) => {
          set((state) => {
            state.todos.push({
              id: new Date().getTime(),
              content: content,
            });
          });
        },
        deleteTodo: (targetId: number) => {
          set((state) => {
            state.todos = state.todos.filter((todo) => todo.id !== targetId);
          });
        },
      },
    }))
  )
);

export const useTodos = () => {
  const todos = TodosStore((state) => state.todos);
  return todos;
};

export const useTodosActions = () => {
  const actions = TodosStore((state) => state.actions);
  return actions;
};
