"use client";

import { useUpdateTodo } from "@/hooks/use-todos";
import dayjs, { DATE_FORMAT } from "@/lib/dayjs";
import { useTodoStore } from "@/stores/todo-store";
import { Todo } from "@/types";
import TodoModal from "@components/todolist/TodoModal";
import { Clock, Square, SquareCheckBig } from "lucide-react";

const MAX_TEXT_LENGTH = 45;

const TodoListItem = ({ todo }: { todo: Todo }) => {
    const mutation = useUpdateTodo();
    const { expandedTodoModal, setExpandedTodoModal } = useTodoStore();

    const isTruncated = todo.text.length > MAX_TEXT_LENGTH;
    const displayText = isTruncated
        ? todo.text.slice(0, MAX_TEXT_LENGTH) + "..."
        : todo.text;
    const isExpanded = expandedTodoModal?.id === todo.id;

    return (
        <>
            <div
                className={`
                    group relative overflow-hidden
                    rounded-2xl
                    bg-linear-to-br from-red-950 to-red-900/80
                    shadow-lg shadow-red-950/50
                    p-4 sm:p-5
                    w-full sm:w-72 md:w-80
                    transition-all duration-300 ease-out
                    hover:shadow-xl hover:shadow-red-800/60 hover:-translate-y-0.5
                    active:scale-[0.98]
                    border border-red-800/30
                `}
                onClick={() => setExpandedTodoModal(todo)}
            >
                {/* Animated background glow on hover */}
                <div
                    className={`
                        absolute inset-0
                        bg-linear-to-br from-red-700/10 to-orange-600/10
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-500 ease-out
                    `}
                />

                <div className="relative flex items-start justify-between gap-3">
                    {/* Todo text with responsive typography */}
                    <h2
                        className={`
                            text-lg sm:text-xl md:text-2xl
                            font-medium
                            text-red-50
                            leading-tight
                            wrap-break-word
                            flex-1
                            transition-colors duration-300
                            group-hover:text-white
                        `}
                    >
                        {displayText}
                    </h2>

                    {/* Checkbox button with enhanced animations */}
                    <button
                        className={`
                            shrink-0
                            text-red-400
                            hover:text-red-200
                            hover:bg-red-800/40
                            active:bg-red-700/50
                            rounded-xl
                            p-2
                            shadow-md shadow-red-950/40
                            transition-all duration-300 ease-out
                            hover:scale-110
                            active:scale-95
                            focus:outline-none
                            focus:ring-2
                            focus:ring-red-500/50
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                            disabled:hover:scale-100
                        `}
                        onClick={(e) => {
                            e.stopPropagation();
                            mutation.mutate({
                                ...todo,
                                completed: !todo.completed,
                            });
                        }}
                        disabled={mutation.isPending}
                        aria-label={
                            todo.completed
                                ? "Mark as incomplete"
                                : "Mark as complete"
                        }
                    >
                        <div
                            className={`
                                transition-all duration-300 ease-out
                                ${todo.completed ? "scale-110 text-green-400" : "scale-100"}
                            `}
                        >
                            {todo.completed ? (
                                <SquareCheckBig size={24}/>
                            ) : (
                                <Square size={24}/>
                            )}
                        </div>
                    </button>
                </div>
                <p
                    className={`
                        flex items-center gap-2
                        mt-3
                        text-red-300/60
                        text-xs sm:text-sm
                        font-light
                        transition-all duration-300
                        group-hover:text-red-200/70
                    `}
                >
                    <Clock size={14} className="shrink-0"/>
                    <span className="truncate">
                        {todo.timeFrom === todo.timeTo || todo.wholeDay ? (
                            <>{dayjs(todo.timeFrom).format(DATE_FORMAT.full)}</>
                        ) : (
                            <>
                                {dayjs(todo.timeFrom).format(DATE_FORMAT.full)}
                                <span className="mx-1">-</span>
                                {dayjs(todo.timeTo).format(DATE_FORMAT.full)}
                            </>
                        )}
                    </span>
                </p>

                {/* Bottom accent line */}
                <div
                    className={`
                        absolute bottom-0 left-0 right-0 h-0.5
                        bg-linear-to-r from-red-600 via-red-500 to-orange-500
                        transform scale-x-0 group-hover:scale-x-100
                        transition-transform duration-500 ease-out
                        origin-left
                    `}
                />
            </div>

            {/* Expanded modal */}
            {isExpanded && (
                <TodoModal todo={todo}/>
            )}
        </>
    );
};

export default TodoListItem;
