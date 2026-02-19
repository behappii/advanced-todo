"use client";

import { useCreateTodo } from "@/hooks/use-todos";
import { Plus, X } from "lucide-react";
import { useState } from "react";

const CreateTodo = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState("");
    const [timeFrom, setTimeFrom] = useState("");
    const [timeTo, setTimeTo] = useState("");
    const [wholeDay, setWholeDay] = useState(false);

    const mutation = useCreateTodo();

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!text.trim()) return;

        const now = new Date();
        const defaultTimeFrom = wholeDay
            ? now.toISOString()
            : new Date(now.setHours(9, 0, 0, 0)).toISOString();
        const defaultTimeTo = wholeDay
            ? now.toISOString()
            : new Date(now.setHours(17, 0, 0, 0)).toISOString();

        await mutation.mutate({
            text: text.trim(),
            completed: false,
            wholeDay,
            timeFrom: timeFrom || defaultTimeFrom,
            timeTo: timeTo || defaultTimeTo,
        });

        setText("");
        setTimeFrom("");
        setTimeTo("");
        setWholeDay(false);
        setIsOpen(false);
    };

    return (
        <>
            {/* Floating action button */}
            <button
                className={`
                    fixed bottom-6 right-6
                    w-14 h-14
                    rounded-full
                    bg-linear-to-br from-red-600 to-red-700
                    shadow-lg shadow-red-950/50
                    flex items-center justify-center
                    text-white
                    hover:from-red-500 hover:to-red-600
                    active:scale-95
                    transition-all duration-300 ease-out
                    hover:shadow-xl hover:shadow-red-800/60 hover:-translate-y-1
                    z-40
                    border border-red-500/30
                `}
                onClick={() => setIsOpen(true)}
                aria-label="Add new todo"
            >
                <Plus size={28} />
            </button>

            {/* Modal */}
            {isOpen && (
                <div
                    className={`
                        fixed inset-0 z-50
                        flex items-center justify-center
                        bg-black/60 backdrop-blur-sm
                        p-4
                        animate-in fade-in duration-200
                    `}
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className={`
                            relative
                            bg-linear-to-br from-red-950 to-red-900
                            rounded-2xl
                            border border-red-800/30
                            shadow-2xl shadow-red-950/50
                            w-full max-w-md
                            overflow-hidden
                            animate-in zoom-in-95 duration-200
                        `}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div
                            className={`
                                flex items-center justify-between
                                p-5
                                border-b border-red-800/30
                            `}
                        >
                            <h2 className="text-xl font-medium text-red-50">
                                New Task
                            </h2>
                            <button
                                className={`
                                    text-red-300
                                    hover:text-white
                                    hover:bg-red-800/40
                                    rounded-lg
                                    p-2
                                    transition-all
                                `}
                                onClick={() => setIsOpen(false)}
                                aria-label="Close"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-5 space-y-4">
                            {/* Text input */}
                            <div>
                                <label
                                    htmlFor="text"
                                    className={`
                                        block
                                        text-sm
                                        font-light
                                        text-red-300/80
                                        mb-2
                                    `}
                                >
                                    Task description
                                </label>
                                <textarea
                                    id="text"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="What needs to be done?"
                                    rows={3}
                                    className={`
                                        w-full
                                        px-4 py-3
                                        rounded-xl
                                        bg-red-950/50
                                        border border-red-800/50
                                        text-red-50
                                        placeholder:text-red-400/40
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-red-500/50
                                        focus:border-transparent
                                        transition-all
                                        resize-none
                                    `}
                                    required
                                />
                            </div>

                            {/* Whole day toggle */}
                            <div
                                className={`
                                    flex items-center justify-between
                                    p-3
                                    rounded-xl
                                    bg-red-950/30
                                    border border-red-800/30
                                `}
                            >
                                <label
                                    htmlFor="wholeDay"
                                    className={`
                                        text-sm
                                        font-light
                                        text-red-300/80
                                    `}
                                >
                                    All day
                                </label>
                                <button
                                    type="button"
                                    id="wholeDay"
                                    onClick={() => setWholeDay(!wholeDay)}
                                    className={`
                                        relative
                                        w-12 h-6
                                        rounded-full
                                        transition-colors duration-200
                                        ${wholeDay ? "bg-red-600" : "bg-red-900/50"}
                                    `}
                                >
                                    <div
                                        className={`
                                            absolute top-1
                                            w-4 h-4
                                            rounded-full
                                            bg-white
                                            transition-transform duration-200
                                            ${wholeDay ? "left-7" : "left-1"}
                                        `}
                                    />
                                </button>
                            </div>

                            {wholeDay ? (
                                <>
                                    {/* Time */}
                                    <div>
                                        <label
                                            htmlFor="timeFrom"
                                            className={`
                                                block
                                                text-sm
                                                font-light
                                                text-red-300/80
                                                mb-2
                                            `}
                                        >
                                            Time
                                        </label>
                                        <input
                                            type="datetime-local"
                                            id="timeFrom"
                                            value={timeFrom}
                                            onChange={(e) =>
                                                setTimeFrom(e.target.value)
                                            }
                                            className={`
                                                w-full
                                                px-4 py-3
                                                rounded-xl
                                                bg-red-950/50
                                                border border-red-800/50
                                                text-red-50
                                                placeholder:text-red-400/40
                                                focus:outline-none
                                                focus:ring-2
                                                focus:ring-red-500/50
                                                focus:border-transparent
                                                transition-all
                                                [&::-webkit-calendar-picker-indicator]:filter
                                                [&::-webkit-calendar-picker-indicator]:invert
                                                [&::-webkit-calendar-picker-indicator]:opacity-50
                                                [&::-webkit-calendar-picker-indicator]:hover:opacity-100
                                            `}
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* Time from */}
                                    <div>
                                        <label
                                            htmlFor="timeFrom"
                                            className={`
                                                block
                                                text-sm
                                                font-light
                                                text-red-300/80
                                                mb-2
                                            `}
                                        >
                                            Start time
                                        </label>
                                        <input
                                            type="datetime-local"
                                            id="timeFrom"
                                            value={timeFrom}
                                            onChange={(e) =>
                                                setTimeFrom(e.target.value)
                                            }
                                            className={`
                                                w-full
                                                px-4 py-3
                                                rounded-xl
                                                bg-red-950/50
                                                border border-red-800/50
                                                text-red-50
                                                placeholder:text-red-400/40
                                                focus:outline-none
                                                focus:ring-2
                                                focus:ring-red-500/50
                                                focus:border-transparent
                                                transition-all
                                                [&::-webkit-calendar-picker-indicator]:filter
                                                [&::-webkit-calendar-picker-indicator]:invert
                                                [&::-webkit-calendar-picker-indicator]:opacity-50
                                                [&::-webkit-calendar-picker-indicator]:hover:opacity-100
                                            `}
                                        />
                                    </div>

                                    {/* Time to */}
                                    <div>
                                        <label
                                            htmlFor="timeTo"
                                            className={`
                                                block
                                                text-sm
                                                font-light
                                                text-red-300/80
                                                mb-2
                                            `}
                                        >
                                            End time
                                        </label>
                                        <input
                                            type="datetime-local"
                                            id="timeTo"
                                            value={timeTo}
                                            onChange={(e) =>
                                                setTimeTo(e.target.value)
                                            }
                                            className={`
                                                w-full
                                                px-4 py-3
                                                rounded-xl
                                                bg-red-950/50
                                                border border-red-800/50
                                                text-red-50
                                                placeholder:text-red-400/40
                                                focus:outline-none
                                                focus:ring-2
                                                focus:ring-red-500/50
                                                focus:border-transparent
                                                transition-all
                                                [&::-webkit-calendar-picker-indicator]:filter
                                                [&::-webkit-calendar-picker-indicator]:invert
                                                [&::-webkit-calendar-picker-indicator]:opacity-50
                                                [&::-webkit-calendar-picker-indicator]:hover:opacity-100
                                            `}
                                        />
                                    </div>
                                </>
                            )}

                            {/* Submit button */}
                            <button
                                type="submit"
                                disabled={mutation.isPending || !text.trim()}
                                className={`
                                    w-full
                                    py-3
                                    mt-2
                                    rounded-xl
                                    bg-linear-to-br from-red-600 to-red-700
                                    text-white
                                    font-medium
                                    shadow-lg shadow-red-950/40
                                    hover:from-red-500 hover:to-red-600
                                    hover:shadow-xl hover:shadow-red-800/50
                                    active:scale-[0.98]
                                    transition-all duration-200
                                    disabled:opacity-50
                                    disabled:cursor-not-allowed
                                    disabled:hover:scale-100
                                    disabled:hover:shadow-lg
                                `}
                            >
                                {mutation.isPending
                                    ? "Creating..."
                                    : "Create Task"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateTodo;
