import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const post = prisma.post.create()
    } catch (error) {
        
    }
}