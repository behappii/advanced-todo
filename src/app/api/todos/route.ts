import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const todos = await prisma.todo.findMany({
        include: {
            todoTags: {
                include: {
                    tag: true,
                },
            },
        },
        orderBy: {
            timeFrom: "asc"
        },
    });

    return NextResponse.json(todos);
}

export async function POST(request: Request) {
    const body = await request.json();
    const { text, completed, wholeDay, timeFrom, timeTo, tagIds } = body;

    const todo = await prisma.todo.create({
        data: {
            text,
            completed: completed ?? false,
            wholeDay: wholeDay ?? false,
            timeFrom: timeFrom ? new Date(timeFrom) : undefined,
            timeTo: timeTo ? new Date(timeTo) : undefined,
            todoTags: tagIds
                ? {
                    create: tagIds.map((tagId: string) => ({
                        tagId,
                    })),
                }
                : undefined,
        },
        include: {
            todoTags: {
                include: {
                    tag: true,
                },
            },
        },
    });

    return NextResponse.json(todo, { status: 201 });
}
