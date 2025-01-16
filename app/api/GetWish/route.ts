import prisma from "@/lib/dp";
import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {

    const token = request.cookies.get("jwtToken")?.value as string;
    if (!token) {
      return NextResponse.json({ message: "Please Log In" }, { status: 422 });
    }


    const decoded: any = jwtDecode(token);

  
    const favorite = await prisma.favorite.findMany({
      where: {
        userId: decoded.id,
      },
      select: {
        gameId: true, 
        gameImageUrl: true,
        gameName: true,
      },
    });


    return NextResponse.json({ favorite }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message || error },
      { status: 500 }
    );
  }
}
