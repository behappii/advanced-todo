import "dotenv/config";
import { prisma } from "@/lib/prisma";

async function main() {
    const todos = await prisma.todos.deleteMany();
    const todoTag = await prisma.todoTag.deleteMany();
    const todo = await prisma.todo.deleteMany();
    const tag = await prisma.tag.deleteMany();

    console.log(todos, todoTag, todo, tag);
    console.log("Database reset success");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
