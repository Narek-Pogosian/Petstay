import { db } from "@/lib/db";
import { reviewSchema } from "@/lib/validations/review-validation";
import jwt, { JsonWebTokenError, UserJwtPayload } from "jsonwebtoken";
import { NextRequest } from "next/server";
import { ZodError } from "zod";

async function getReviews(listingId: string) {
  return await db.review.findMany({
    where: {
      listing_id: listingId,
    },
    select: {
      content: true,
      rating: true,
      created_at: true,
      id: true,
      User: {
        select: {
          email: true,
          name: true,
          id: true,
        },
      },
    },
  });
}

export type ReviewsType = Awaited<ReturnType<typeof getReviews>>;

export async function GET(
  req: NextRequest,
  { params }: { params: { listingId: string } }
) {
  try {
    const reviews = await getReviews(params.listingId);

    return Response.json(reviews);
  } catch (error) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { listingId: string } }
) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token)
      return Response.json({ message: "Unauthorized" }, { status: 401 });

    // Will throw JsonWebTokenError if failed
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as UserJwtPayload;

    const body = await req.json();

    const validData = reviewSchema.parse(body);

    const review = await db.review.create({
      data: {
        content: validData.description,
        rating: validData.rating,
        listing_id: params.listingId,
        user_id: payload.userId,
      },
    });

    return Response.json(review, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json(
        { message: "Please provide a valid review" },
        { status: 400 }
      );
    }

    if (error instanceof JsonWebTokenError) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
