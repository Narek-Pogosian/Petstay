import { JsonWebTokenError, UserJwtPayload } from "jsonwebtoken";
import { ZodError } from "zod";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";
import { checkoutSchema } from "@/lib/validations/checkout-validation";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token)
    return Response.json({ message: "Unauthorized" }, { status: 401 });

  try {
    // Will throw JsonWebTokenError if failed
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as UserJwtPayload;

    const body = await req.json();

    const safeData = checkoutSchema.parse(body);

    await db.reservation.create({
      data: {
        from_date: safeData.fromDate,
        to_date: safeData.toDate,
        listing_id: safeData.listingId,
        user_id: payload.userId,
      },
    });

    return Response.json(
      { message: "Successfully created reservation" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (error instanceof ZodError) {
      return Response.json({ message: "Invalid data" }, { status: 400 });
    }

    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
