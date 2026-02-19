import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    const body = await request.json();
    const { tagIds } = body;

    const existingTodo = await prisma.todo.findUnique({
        where: { id },
    });

    if (!existingTodo) {
        return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    await prisma.todoTag.createMany({
        data: tagIds.map((tagId: string) => ({
            todoId: id,
            tagId,
        })),
    });

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

    return NextResponse.json(todo);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const tagId = searchParams.get("tagId");

    const existingTodo = await prisma.todo.findUnique({
        where: { id },
    });

    if (!existingTodo) {
        return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    if (!tagId) {
        return NextResponse.json(
            { error: "tagId is required" },
            { status: 400 },
        );
    }

    await prisma.todoTag.delete({
        where: {
            todoId_tagId: {
                todoId: id,
                tagId,
            },
        },
    });

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

    return NextResponse.json(todo);
}
