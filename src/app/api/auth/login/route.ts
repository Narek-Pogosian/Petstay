import { db } from "@/lib/db";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginSchema } from "@/lib/validations/auth-validations";
import { TokenUser } from "@/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const validData = loginSchema.parse(body);

    const user = await db.user.findUnique({
      where: { email: validData.email },
    });

    if (!user)
      return Response.json({ message: "Invalid credentials" }, { status: 400 });

    const isMatch = await bcrypt.compare(
      validData.password,
      user.password_hash
    );

    if (!isMatch)
      return Response.json({ message: "Invalid credentials" }, { status: 400 });

    const token = jwt.sign(
      { userId: user.id, name: user.name, email: user.email } as TokenUser,
      process.env.JWT_SECRET!
    );

    const response = NextResponse.json({ token }, { status: 200 });
    response.cookies.set("token", token);

    return response;
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json({ message: "Invalid data" }, { status: 400 });
    }

    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
