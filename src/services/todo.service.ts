import { Todo } from "@/types";
import { useTodoStore } from "@/stores/todo-store";

export const fetchTodos = async () => {
    const response = await fetch("/api/todos");
    if (!response.ok) throw new Error("error loading");

    const data = await response.json();

    // Сохраняем данные в zustand store
    useTodoStore.getState().setTodos(data);

    return data;
};

export const updateTodo = async (todo: Todo) => {
    const response = await fetch(`/api/todos/${todo.id}`, {
        method: "PATCH",
        body: JSON.stringify(todo),
    });
    const updated = await response.json();

    // Обновляем в zustand store
    useTodoStore.getState().updateTodo(updated);

    return updated;
};

export const createTodo = async (data: Partial<Todo>) => {
    console.log(data);
    const response = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify(data),
    });
    const created = await response.json();

    // Добавляем в zustand store
    useTodoStore.getState().addTodo(created);

    return created;
};

export const deleteTodo = async (id: string) => {
    const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
    });

    if (response.ok) {
        // Удаляем из zustand store
        useTodoStore.getState().deleteTodo(id);
    }

    return response.ok;
};
