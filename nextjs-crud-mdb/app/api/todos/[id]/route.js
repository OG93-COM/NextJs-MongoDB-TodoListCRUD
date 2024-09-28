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

export async function GET(request,{params}){
    const {id} = params;
    await connectMongoDB();
    const todos = await Todo.findOne({_id: id});
    return NextResponse.json({todos}, {status:200})
}