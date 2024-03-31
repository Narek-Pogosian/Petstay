import { db } from "@/lib/db";
import jwt, { JsonWebTokenError, type UserJwtPayload } from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token)
    return Response.json({ message: "Unauthorized" }, { status: 401 });

  try {
    // Will throw JsonWebTokenError if failed
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as UserJwtPayload;

    const reservations = await getReservations(payload.userId);

    return Response.json(reservations, { status: 200 });
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}

export type ReservationsResponse = Awaited<ReturnType<typeof getReservations>>;

async function getReservations(userId: string) {
  return await db.reservation.findMany({
    where: {
      user_id: userId,
    },
    include: {
      Listing: {
        select: {
          id: true,
          name: true,
          city: true,
        },
      },
    },
  });
}
