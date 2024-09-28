import connectMongoDB from "@/libs/mongodb";
import Todo from "@/models/todoSchema";
import { NextResponse } from "next/server";

export async function PUT(request, {params}){
    const {id} = params;
    const {newTitle:title, newDescription:description} = await request.json();
    await connectMongoDB();
    await Todo.findByIdAndUpdate(id,{title, description})
    return NextResponse.json({message:"TODO updated"})
}