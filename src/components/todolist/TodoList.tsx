"use client";

import { useTodos } from "@/hooks/use-todos";
import { Todo } from "@/types";
import { AlertCircle, Loader2 } from "lucide-react";
import TodoListItem from "./TodoListItem";

const TodoList = () => {
    const { data, isLoading, isError, error } = useTodos();

    if (isLoading) {
        return (
            <div
                className={`
                    flex flex-col items-center justify-center
                    min-h-100
                    gap-4
                `}
            >
                <div
                    className={`
                        relative
                        w-16 h-16
                    `}
                >
                    <div
                        className={`
                            absolute inset-0
                            rounded-full
                            border-4 border-red-900/30
                        `}
                    />
                    <Loader2
                        className={`
                            absolute inset-0
                            w-16 h-16
                            text-red-500
                            animate-spin
                        `}
                    />
                </div>
                <p
                    className={`
                        text-red-300/80
                        text-lg
                        font-light
                        animate-pulse
                    `}
                >
                    Loading tasks...
                </p>
            </div>
        );
    }

    if (isError) {
        return (
            <div
                className={`
                    flex flex-col items-center justify-center
                    min-h-100
                    gap-4
                    p-6
                `}
            >
                <div
                    className={`
                        flex items-center justify-center
                        w-16 h-16
                        rounded-full
                        bg-red-900/30
                        border border-red-800/50
                        shadow-lg shadow-red-950/30
                    `}
                >
                    <AlertCircle
                        className={`
                            w-8 h-8
                            text-red-500
                        `}
                    />
                </div>
                <div className="text-center">
                    <p
                        className={`
                            text-red-100
                            text-lg
                            font-medium
                            mb-1
                        `}
                    >
                        Something went wrong
                    </p>
                    <p
                        className={`
                            text-red-300/60
                            text-sm
                            font-light
                            max-w-md
                        `}
                    >
                        {error?.message || "Failed to load tasks"}
                    </p>
                </div>
            </div>
        );
    }

    const sortedData = [...data].sort(
        (a, b) =>
            new Date(a.timeFrom).getTime() - new Date(b.timeFrom).getTime(),
    );

    return (
        <ol
            className={`
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                lg:grid-cols-3 
                xl:grid-cols-4
                gap-4 sm:gap-5 md:gap-6
                p-4 sm:p-6 md:p-8
                max-w-7xl 
                mx-auto
            `}
        >
            {sortedData.map((todo: Todo) => (
                <li key={todo.id} className="flex justify-center">
                    <TodoListItem todo={todo} />
                </li>
            ))}
        </ol>
    );
};

export default TodoList;
