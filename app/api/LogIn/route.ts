import { NextRequest, NextResponse } from "next/server";
import { validation } from "../../../lib/validation_2";
import prisma from "@/lib/dp";
import bcrypt from "bcrypt";
import { generateJWT } from "@/lib/generateToken";
import { serialize } from "cookie";

export async function POST(request: NextRequest) {
  try {
    // قراءة البيانات من الـ body
    const body = await request.json();

    // التحقق من البيانات باستخدام مكتبة Zod
    try {
      validation.parse(body);
    } catch (validationError: any) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: validationError.errors || "Unknown validation error",
        },
        { status: 422 }
      );
    }

    const { password, email } = body;

    // تحقق من وجود البريد الإلكتروني مسبقًا
    const emailExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!emailExist) {
      return NextResponse.json(
        { message: "No Email exists, please Sign Up" },
        { status: 409 }
      );
    }

    // مقارنة كلمة المرور المدخلة مع الكلمة المشفرة
    const isPasswordValid = await bcrypt.compare(password, emailExist.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid password' },
        { status: 401 }
      );
    }

    // إنشاء توكن
    const token = generateJWT({ email, name: emailExist.name, id: emailExist.id });

    // تحديث التوكن في قاعدة البيانات للمستخدم الموجود
    const updatedUser = await prisma.user.update({
      where: {
        email: emailExist.email,
      },
      data: {
        token,
      },
    });

    // إعداد الكوكي
    const cookie = serialize("jwtToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    const response = NextResponse.json(
      { message: "Login successful", user: updatedUser },
      { status: 200 }
    );

    response.headers.set("Set-Cookie", cookie);

    return response; // تأكد من إرجاع الاستجابة
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message || error },
      { status: 500 }
    );
  }
}
