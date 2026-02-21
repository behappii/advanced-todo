import { useDeleteTodo } from "@/hooks/use-todos";
import dayjs, { DATE_FORMAT } from "@/lib/dayjs";
import { useTodoStore } from "@/stores/todo-store";
import { Todo } from "@/types";
import EditTodo from "@components/todolist/EditTodo";
import { Clock, Pencil, Trash2, X } from "lucide-react";
import React from "react";

const TodoModal = ({ todo }: { todo: Todo }) => {
    const { expandedTodoEdit, setExpandedTodoModal, setExpandedTodoEdit } = useTodoStore();
    const deleteMutation = useDeleteTodo();

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this todo?")) {
            deleteMutation.mutate(todo.id);
            setExpandedTodoModal(null);
        }
    };
    if (expandedTodoEdit) {
        return <EditTodo todo={todo}/>;
    }
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setExpandedTodoModal(null)}
        >
            <div
                className="relative bg-linear-to-br from-red-950 to-red-900 rounded-2xl border border-red-800/30 shadow-2xl shadow-red-950/50 max-w-lg w-full max-h-[80vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-3 right-3 text-red-300 hover:text-white hover:bg-red-800/40 rounded-lg p-2 transition-all"
                    onClick={() => setExpandedTodoModal(null)}
                    aria-label="Close"
                >
                    <X size={20}/>
                </button>
                <div className="mt-6 p-6">
                    <h2 className="text-xl font-medium text-red-50 leading-relaxed">
                        {todo.text}
                    </h2>
                    <div
                        className={`
                                    flex items-center gap-2
                                    mt-4
                                    text-red-300/60
                                    text-sm
                                    font-light
                                `}
                    >
                        <Clock size={14} className="shrink-0"/>
                        <span>
                                    {todo.timeFrom == todo.timeTo ||
                                    todo.wholeDay ? (
                                        <>
                                            {dayjs(todo.timeFrom).format(
                                                DATE_FORMAT.full,
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            {dayjs(todo.timeFrom).format(
                                                DATE_FORMAT.full,
                                            )}
                                            <span className="mx-1">-</span>
                                            {dayjs(todo.timeTo).format(
                                                DATE_FORMAT.full,
                                            )}
                                        </>
                                    )}
                                </span>
                    </div>
                    <button onClick={() => setExpandedTodoEdit(todo)}>
                        <Pencil/>
                    </button>
                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            className="
                                        flex items-center gap-2
                                        px-4 py-2
                                        bg-red-800/40 hover:bg-red-700/50
                                        text-red-200 hover:text-white
                                        rounded-lg
                                        transition-all duration-300
                                        hover:scale-105
                                        active:scale-95
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-red-500/50
                                    "
                            onClick={handleDelete}
                            disabled={deleteMutation.isPending}
                            aria-label="Delete todo"
                        >
                            <Trash2 size={18}/>
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoModal;