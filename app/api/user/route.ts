import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export async function GET(req: NextRequest) {
  try {
    // قراءة الكوكي مباشرة باستخدام request.cookies
    const token = req.cookies.get("jwtToken")?.value;

    if (!token) {
      return NextResponse.json({ message: "No token found" }, { status: 401 });
    }

    // فك التوكن
    const decoded: { name: string; email: string } = jwtDecode(token);

    // إرجاع البيانات
    return NextResponse.json(
      { name: decoded.name, email: decoded.email },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error decoding token:", error);
    return NextResponse.json(
      { message: "Error decoding token", error: error.message },
      { status: 500 }
    );
  }
}
