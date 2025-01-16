import prisma from "@/lib/dp";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

interface DecodedToken {
  id: number;
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("jwtToken")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Please log in" },
        { status: 400 }
      );
    }

    const decoded: DecodedToken = jwt.verify(token, process.env.JWT_KEY as string) as DecodedToken;
    const { gameId } = await request.json();

    const favorite = await prisma.favorite.findFirst({
      where: {
        gameId,
        userId: decoded.id,
      },
    });

    return NextResponse.json({ isFavorite: !!favorite }, { status: 200 });
  } catch (error: any) {
    console.log("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message || error },
      { status: 500 }
    );
  }
}
