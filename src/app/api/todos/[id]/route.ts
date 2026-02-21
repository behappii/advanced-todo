import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    const todo = await prisma.todo.findUnique({
        where: { id },
        include: {
            todoTags: {
                include: {
                    tag: true,
                },
            },
        },
    });

    if (!todo) {
        return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(todo);
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    const body = await request.json();
    const { text, completed, wholeDay, timeFrom, timeTo, tagIds } = body;

    const existingTodo = await prisma.todo.findUnique({
        where: { id },
    });

    if (!existingTodo) {
        return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    const todo = await prisma.todo.update({
        where: { id },
        data: {
            text,
            completed,
            wholeDay,
            timeFrom: timeFrom ? new Date(timeFrom) : undefined,
            timeTo: timeTo ? new Date(timeTo) : undefined,
            todoTags: tagIds
                ? {
                      deleteMany: {},
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

    return NextResponse.json(todo);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;

    const existingTodo = await prisma.todo.findUnique({
        where: { id },
    });

    if (!existingTodo) {
        return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    await prisma.todo.delete({
        where: { id },
    });

    return NextResponse.json({ message: "Todo deleted successfully" });
}
