import prisma from "@/lib/dp";
import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request:NextRequest) {
   try{
    const body = await request.json()
    const token = request.cookies.get('jwtToken')?.value as string
    if (!token) {
        NextResponse.json({message:"Please Log In "} , {status:400})
    }
    const decode:any = jwtDecode(token);
    const { gameId } = body;
    if (!gameId) {
      return NextResponse.json(
        { message: 'Missing game ID' },
        { status: 422 }
      );
    }

    // إزالة اللعبة من المفضلة
    await prisma.favorite.deleteMany({
      where: {
        gameId,
        userId: decode.id
      },
    });

    return NextResponse.json(
      { message: 'Game removed from favorites' },
      { status: 200 }
    );
   }
   catch (error: any) {
    console.log('Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message || error },
      { status: 500 }
    );
  
}}