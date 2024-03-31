import { db } from "@/lib/db";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerSchema } from "@/lib/validations/auth-validations";
import { TokenUser } from "@/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const validData = registerSchema.parse(body);

    const emailTaken = await db.user.findUnique({
      where: { email: validData.email },
      select: { email: true },
    });

    if (emailTaken)
      return Response.json(
        { message: "Email already registered" },
        { status: 400 }
      );

    const hashedPassword = await bcrypt.hash(validData.password, 10);

    const user = await db.user.create({
      data: {
        email: validData.email,
        name: validData.name,
        password_hash: hashedPassword,
      },
      select: { email: true, name: true, id: true },
    });

    const token = jwt.sign(
      { userId: user.id, name: user.name, email: user.email } as TokenUser,
      process.env.JWT_SECRET!
    );

    const response = NextResponse.json({ token }, { status: 201 });
    response.cookies.set("token", token);

    return response;
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json({ message: "Invalid data" }, { status: 400 });
    }

    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
