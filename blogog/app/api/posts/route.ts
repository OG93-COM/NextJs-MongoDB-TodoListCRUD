import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";


export async function POST(req: Request) {

    

    const session = await getServerSession(authOptions)
    if(!session){
        return NextResponse.json({error:"not authentificated"},{status:401})
    }

    const {title, content, links, imgUrl, selectedCategory, publicId } = await req.json()
    const authorEmail = session?.user?.email as string

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