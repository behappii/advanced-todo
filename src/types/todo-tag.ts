import { Tag } from "./tag";

export interface TodoTag {
    todoId: string;
    tagId: string;
    tag: Tag;
    createdAt: string | Date;
}
