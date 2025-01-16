import { NextRequest, NextResponse } from "next/server";
import { baseValidation, validation } from "../../../lib/validation";
import prisma from "@/lib/dp";
import bcrypt from "bcrypt";
import { generateJWT } from "@/lib/generateToken";
import { serialize } from "cookie";

export async function POST(request: NextRequest) {
  try {
    // قراءة البيانات من الـ body
    const body = await request.json();
    console.log(body);

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

    const { name, password, email } = body;

    // تحقق من وجود البريد الإلكتروني مسبقًا
    const emailExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (emailExist) {
      return NextResponse.json(
        { message: "Email already exists, please log in" },
        { status: 409 }
      );
    }

    // إنشاء كلمة مرور مشفرة
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);

    // إنشاء توكن
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHashed,
      },
    });

    // إنشاء توكن باستخدام بيانات المستخدم
    const token = generateJWT({ email, name, id: newUser.id });

    // تحديث المستخدم بالتوكن
    await prisma.user.update({
      where: { id: newUser.id },
      data: { token },
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
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );

    response.headers.set("Set-Cookie", cookie);

    return response; // تأكد من إرجاع الاستجابة
  } catch (error: any) {
    console.log("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message || error },
      { status: 500 }
    );
  }
}
