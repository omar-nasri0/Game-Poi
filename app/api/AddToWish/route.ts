import prisma from "@/lib/dp";
import { Favorite } from "@prisma/client";
import {jwtDecode} from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";
import  jwt from "jsonwebtoken";
interface DecodedToken {
  id: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = request.cookies.get("jwtToken")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Please log in" },
        { status: 400 }
      );
    }

    // فك التوكن للحصول على بيانات المستخدم
    const decoded: any = jwtDecode(token)

    const { gameName, gameId, gameImageUrl } = body;
    if (!gameName || !gameId || !gameImageUrl) {
        return NextResponse.json(
          { message: "Missing required data" },
          { status: 422 }
        );
      }
      
    // إضافة اللعبة إلى المفضلة
    const favorite:Favorite = await prisma.favorite.create({
      data: {
        gameName,
        gameId,
        gameImageUrl,
        userId: decoded.id,
      },
    });

    return NextResponse.json(
      { message: "Game added to favorites", favorite },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message || error },
      { status: 500 }
    );
  }
}
