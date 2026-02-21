"use client";

import { useTodos } from "@/hooks/use-todos";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isToday from "dayjs/plugin/isToday";
import { useState } from "react";
import "dayjs/locale/ru";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isToday);
dayjs.locale("ru");

const Calendar = () => {
    const todos = useTodos();

    const [currentMonth, setCurrentMonth] = useState(dayjs());
    const [selectedDay, setSelectedDay] = useState(dayjs());

    const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

    // Получаем todos для конкретного дня
    const getTodosForDay = (day: dayjs.Dayjs) => {
        return todos.data?.filter((todo) => {
            const todoDate = dayjs(todo.timeFrom);
            return todoDate.isSame(day, "day");
        });
    };

    // Переключение на предыдущий месяц
    const prevMonth = () => {
        setCurrentMonth(currentMonth.subtract(1, "month"));
    };

    // Переключение на следующий месяц
    const nextMonth = () => {
        setCurrentMonth(currentMonth.add(1, "month"));
    };

    // Переход к текущему месяцу
    const goToToday = () => {
        setCurrentMonth(dayjs());
        setSelectedDay(dayjs());
    };

    // Генерация сетки календаря
    const generateCalendarDays = () => {
        const startOfMonth = currentMonth.startOf("month");
        const endOfMonth = currentMonth.endOf("month");

        // Первый день месяца (с учетом того, что неделя начинается с понедельника)
        const startDay = startOfMonth.day() || 7; // 0 (вс) -> 7
        const daysBeforeMonth = startDay - 1;

        // Последний день месяца
        const endDay = endOfMonth.day() || 7;
        const daysAfterMonth = 7 - endDay;

        const days: dayjs.Dayjs[] = [];

        // Дни предыдущего месяца
        for (let i = daysBeforeMonth; i > 0; i--) {
            days.push(startOfMonth.subtract(i, "day"));
        }

        // Дни текущего месяца
        for (let i = 1; i <= endOfMonth.date(); i++) {
            days.push(startOfMonth.date(i));
        }

        // Дни следующего месяца
        for (let i = 1; i <= daysAfterMonth; i++) {
            days.push(endOfMonth.add(i, "day"));
        }

        return days;
    };

    const calendarDays = generateCalendarDays();
    const currentMonthString = currentMonth.format("MMMM YYYY");

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Заголовок календаря */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold capitalize">
                    {currentMonthString}
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={goToToday}
                        className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground border border-foreground/20 rounded-lg hover:bg-foreground/5 transition-colors"
                    >
                        Сегодня
                    </button>
                    <button
                        onClick={prevMonth}
                        className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground border border-foreground/20 rounded-lg hover:bg-foreground/5 transition-colors"
                    >
                        ←
                    </button>
                    <button
                        onClick={nextMonth}
                        className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground border border-foreground/20 rounded-lg hover:bg-foreground/5 transition-colors"
                    >
                        →
                    </button>
                </div>
            </div>

            {/* Сетка календаря */}
            <div className="border border-foreground/10 rounded-xl overflow-hidden">
                {/* Дни недели */}
                <div className="grid grid-cols-7 bg-foreground/5">
                    {daysOfWeek.map((day) => (
                        <div
                            key={day}
                            className="py-3 text-center text-sm font-semibold text-foreground/70"
                        >
                            {day}
                        </div>
                    ))}
                </div>

                {/* Дни месяца */}
                <div className="grid grid-cols-7">
                    {calendarDays.map((day, index) => {
                        const dayTodos = getTodosForDay(day);
                        const isCurrentMonthDay = day.month() === currentMonth.month() && day.year() === currentMonth.year();
                        const isTodayDay = day.isToday();
                        const isSelectedDay = day.isSame(selectedDay, "day");

                        return (
                            <div
                                key={index}
                                onClick={() => setSelectedDay(day)}
                                className={`
                                    min-h-28 p-2 border-t border-r border-foreground/10 cursor-pointer transition-colors
                                    ${!isCurrentMonthDay ? "bg-foreground/2 text-foreground/40" : "hover:bg-foreground/5"}
                                    ${isSelectedDay ? "bg-foreground/10" : ""}
                                    ${isTodayDay ? "ring-2 ring-inset ring-blue-500" : ""}
                                `}
                            >
                                {/* Номер дня */}
                                <div className={`
                                    text-sm font-medium mb-1 w-7 h-7 flex items-center justify-center rounded-full
                                    ${isTodayDay ? "bg-blue-500 text-white" : ""}
                                `}>
                                    {day.format("D")}
                                </div>

                                {/* Todos для этого дня */}
                                <div className="space-y-1">
                                    {dayTodos.slice(0, 3).map((todo) => (
                                        <div
                                            key={todo.id}
                                            className={`
                                                text-xs px-2 py-1 rounded truncate
                                                ${todo.completed
                                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 line-through"
                                                    : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                                }
                                            `}
                                        >
                                            {todo.text}
                                        </div>
                                    ))}
                                    {dayTodos.length > 3 && (
                                        <div className="text-xs text-foreground/50 pl-2">
                                            +{dayTodos.length - 3} ещё
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Информация о выбранном дне */}
            <div className="mt-6 p-4 border border-foreground/10 rounded-xl">
                <h3 className="text-lg font-semibold mb-3">
                    {selectedDay.format("DD MMMM YYYY, dddd")}
                </h3>
                {getTodosForDay(selectedDay).length > 0 ? (
                    <ul className="space-y-2">
                        {getTodosForDay(selectedDay).map((todo) => (
                            <li
                                key={todo.id}
                                className={`
                                    p-3 rounded-lg border
                                    ${todo.completed
                                        ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                                        : "bg-foreground/5 border-foreground/10"
                                    }
                                `}
                            >
                                <div className="flex items-center gap-2">
                                    <span className={todo.completed ? "line-through text-foreground/50" : ""}>
                                        {todo.text}
                                    </span>
                                </div>
                                {
                                    <div className="text-sm text-foreground/60 mt-1">
                                        {todo.wholeDay ? (
                                            <>{dayjs(todo.timeFrom).format("HH:mm")}</>
                                            ) : (
                                            <>{dayjs(todo.timeFrom).format("HH:mm")} - {dayjs(todo.timeTo).format("HH:mm")}</>
                                        )}

                                    </div>
                                }
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-foreground/50">Нет задач на этот день</p>
                )}
            </div>
        </div>
    );
};

export default Calendar;
