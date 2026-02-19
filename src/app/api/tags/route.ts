import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const tags = await prisma.tag.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return NextResponse.json(tags);
}

export async function POST(request: Request) {
    const body = await request.json();
    const { text, color } = body;

    const tag = await prisma.tag.create({
        data: {
            text,
            ...(color !== undefined && { color }),
        },
    });

    return NextResponse.json(tag, { status: 201 });
}
