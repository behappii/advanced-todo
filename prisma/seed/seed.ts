import "dotenv/config";
import { prisma } from "@/lib/prisma";

async function main() {
    // Создаём или обновляем список дел (Todos)
    const todosList = await prisma.todos.upsert({
        where: { id: "todos-default" },
        update: {},
        create: {
            id: "todos-default",
        },
    });

    // Создаём или обновляем теги
    const workTag = await prisma.tag.upsert({
        where: { text: "Работа" },
        update: {},
        create: {
            text: "Работа",
        },
    });

    const personalTag = await prisma.tag.upsert({
        where: { text: "Личное" },
        update: {},
        create: {
            text: "Личное",
        },
    });

    const urgentTag = await prisma.tag.upsert({
        where: { text: "Срочно" },
        update: {},
        create: {
            text: "Срочно",
        },
    });

    // Создаём или обновляем задачи с тегами
    await prisma.todo.upsert({
        where: { id: "todo-1" },
        update: {},
        create: {
            id: "todo-1",
            text: "Завершить проект",
            wholeDay: true,
            completed: false,
            timeFrom: new Date("2026-02-19T09:00:00"),
            timeTo: new Date("2026-02-19T18:00:00"),
            todos: {
                connect: { id: todosList.id },
            },
            todoTags: {
                connectOrCreate: [
                    {
                        where: {
                            todoId_tagId: {
                                todoId: "todo-1",
                                tagId: workTag.id,
                            },
                        },
                        create: { tagId: workTag.id },
                    },
                    {
                        where: {
                            todoId_tagId: {
                                todoId: "todo-1",
                                tagId: urgentTag.id,
                            },
                        },
                        create: { tagId: urgentTag.id },
                    },
                ],
            },
        },
    });

    await prisma.todo.upsert({
        where: { id: "todo-2" },
        update: {},
        create: {
            id: "todo-2",
            text: "Купить продукты",
            completed: true,
            wholeDay: false,
            timeFrom: new Date("2026-02-19T14:00:00"),
            timeTo: new Date("2026-02-19T15:00:00"),
            todos: {
                connect: { id: todosList.id },
            },
            todoTags: {
                connectOrCreate: [
                    {
                        where: {
                            todoId_tagId: {
                                todoId: "todo-2",
                                tagId: personalTag.id,
                            },
                        },
                        create: { tagId: personalTag.id },
                    },
                ],
            },
        },
    });

    await prisma.todo.upsert({
        where: { id: "todo-3" },
        update: {},
        create: {
            id: "todo-3",
            text: "Позвонить клиенту",
            completed: false,
            wholeDay: false,
            timeFrom: new Date("2026-02-19T11:00:00"),
            timeTo: new Date("2026-02-19T12:00:00"),
            todos: {
                connect: { id: todosList.id },
            },
            todoTags: {
                connectOrCreate: [
                    {
                        where: {
                            todoId_tagId: {
                                todoId: "todo-3",
                                tagId: workTag.id,
                            },
                        },
                        create: { tagId: workTag.id },
                    },
                ],
            },
        },
    });

    console.log({ todosList, workTag, personalTag, urgentTag });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
