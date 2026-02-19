import { TodoTag } from "./todo-tag";

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    wholeDay: boolean;
    timeFrom: string | Date;
    timeTo: string | Date;
    todosId?: string | null;
    todoTags?: TodoTag[];
    createdAt: string | Date;
    updatedAt: string | Date;
}
