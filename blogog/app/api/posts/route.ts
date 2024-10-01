import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const authorEmail = "contact@og93.com"

    const {title, content, links, imgUrl, selectedCategory, publicId } = await req.json()

    if(!title || !content) {
        return NextResponse.json({error:"Title and Content Are Required"},{status:500})
    }

    try {
        const newPost = await prisma.post.create({
            data:{
                title, content, links, imgUrl, publicId, catName: selectedCategory, authorEmail
            }
        })
        console.log("Post Created 📝")
        return NextResponse.json(newPost)
    } catch (error) {
        return NextResponse.json({message:"Could Not Create the post ❌ "})
    }
}

export async function GET(){

    try {
        const posts = await prisma.post.findMany(
            {
                include: {author: {select: {name:true}}},
                    orderBy:{ createdAt:"desc" }
        })
        return NextResponse.json(posts)
    } catch (error) {
        return NextResponse.json({message: "Problem Get DATA Post Server ❌"}, {status:500})
    }
}