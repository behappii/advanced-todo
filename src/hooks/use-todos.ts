import {
    fetchTodos,
    updateTodo,
    createTodo,
    deleteTodo,
} from "@/services/todo.service";
import { useTodoStore } from "@/stores/todo-store";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

export const useTodos = () => {
    const { todos, isLoading, error, setTodos, setLoading, setError } =
        useTodoStore();

    useEffect(() => {
        const loadTodos = async () => {
            setLoading(true);
            try {
                const data = await fetchTodos();
                setTodos(data);
                setError(null);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err
                        : new Error("Failed to load todos"),
                );
            } finally {
                setLoading(false);
            }
        };

        if (todos.length === 0) {
            loadTodos();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return {
        data: todos,
        isLoading,
        isError: !!error,
        error,
    };
};

export const useUpdateTodo = () => {
    const { isPending, mutate } = useMutation({
        mutationFn: updateTodo,
    });

    return {
        mutate,
        isPending,
    };
};

export const useCreateTodo = () => {
    const { isPending, mutate } = useMutation({
        mutationFn: createTodo,
    });

    return {
        mutate,
        isPending,
    };
};

export const useDeleteTodo = () => {
    const { isPending, mutate } = useMutation({
        mutationFn: deleteTodo,
    });

    return {
        mutate,
        isPending,
    };
};
