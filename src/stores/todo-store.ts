import { create } from "zustand";
import { Todo } from "@/types";

interface TodoState {
    todos: Todo[];
    isLoading: boolean;
    error: Error | null;
    expandedTodo: Todo | null;

    // Actions
    setTodos: (todos: Todo[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: Error | null) => void;
    addTodo: (todo: Todo) => void;
    updateTodo: (todo: Todo) => void;
    deleteTodo: (id: string) => void;
    setExpandedTodo: (todo: Todo | null) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
    todos: [],
    isLoading: false,
    error: null,
    expandedTodo: null,

    setTodos: (todos) => set({ todos }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    addTodo: (todo) => set((state) => ({ todos: [todo, ...state.todos] })),
    updateTodo: (todo) =>
        set((state) => ({
            todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
        })),
    deleteTodo: (id) =>
        set((state) => ({
            todos: state.todos.filter((t) => t.id !== id),
        })),
    setExpandedTodo: (todo) => set({ expandedTodo: todo }),
}));
