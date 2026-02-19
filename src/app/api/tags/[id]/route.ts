import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const tag = await prisma.tag.findUnique({
        where: { id },
    });

    if (!tag) {
        return NextResponse.json({ error: "Tag not found" }, { status: 404 });
    }

    return NextResponse.json(tag);
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await request.json();
    const { text, color } = body;

    const existingTag = await prisma.tag.findUnique({
        where: { id },
    });

    if (!existingTag) {
        return NextResponse.json({ error: "Tag not found" }, { status: 404 });
    }

    const tag = await prisma.tag.update({
        where: { id },
        data: {
            ...(text !== undefined && { text }),
            ...(color !== undefined && { color }),
        },
    });

    return NextResponse.json(tag);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const existingTag = await prisma.tag.findUnique({
        where: { id },
    });

    if (!existingTag) {
        return NextResponse.json({ error: "Tag not found" }, { status: 404 });
    }

    await prisma.tag.delete({
        where: { id },
    });

    return NextResponse.json({ message: "Tag deleted successfully" });
}
