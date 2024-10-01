import { NextResponse } from "next/server";

export function GET(){
    return NextResponse.json({message: "Get data Category ✅"})
}