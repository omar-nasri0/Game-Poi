import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
        const res = NextResponse.json({message:"log out successfully"},{status:201});
        res.cookies.set("jwtToken" , '' ,  { maxAge: 0 })
        return res
    } catch (error:any) {
        console.log("Error during logout:", error);
        return NextResponse.json({ message: "Failed to log out", error: error.message }, { status: 500 });
    }
}