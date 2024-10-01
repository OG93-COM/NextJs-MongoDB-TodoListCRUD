import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(){

    try {
        const post = await prisma.category.findMany()
        return NextResponse.json(post)
        
    } catch (error) {
        console.log(error)
        return NextResponse.json("Get Data Category Failed ❌")
    }

    return NextResponse.json({message: "Get data Category ✅"})
}