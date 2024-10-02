import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import next from "next/types";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: Request, {params}:{params:{postId:string}}) {
    const id = params.postId
    try {
        const onePost = await prisma.post.findUnique({where:{id}})
        return NextResponse.json(onePost)
    } catch (error) {
        return NextResponse.json({message:"Get Post by ID Failed❌"},{status:500})
        }
}

export async function PUT(req:Request, {params}:{params:{postId:string}}) {

    const session = await getServerSession(authOptions)
    if(!session){
        return NextResponse.json({error:"not authentificated"},{status:401})
    }

    const {title, content, links, imgUrl, selectedCategory, publicId } = await req.json()
    const id = params.postId
    try {
        const post = await prisma.post.update({where:{id}, data:{
            title, content, links, imgUrl, publicId, catName: selectedCategory
        }})
        return NextResponse.json(post)
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Post cant be modified ❌"})
    }
}

export async function DELETE(req:Request, {params}:{params:{postId:string}}) {
    const session = await getServerSession(authOptions)
    if(!session){
        return NextResponse.json({error:"not authentificated"},{status:401})
    }
    
    const id = params.postId
    try {
        const post = await prisma.post.delete({where:{id}})
        return NextResponse.json(post)
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Post can't be deleted ❌"})
    }
}