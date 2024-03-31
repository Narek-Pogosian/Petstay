import { db } from "@/lib/db";
import { Listing } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const cursorQuery = url.searchParams.get("cursor");
  const limitQuery = url.searchParams.get("limit");

  // Becomes null if we dont have the query which Prisma doesnt like so need make sure they become undefined instead.
  const city = url.searchParams.get("city") ?? undefined;
  const guests = url.searchParams.get("guests") ?? undefined;
  const maxPrice = url.searchParams.get("maxPrice") ?? undefined;

  const limit =
    limitQuery && parseInt(limitQuery) > 0 ? parseInt(limitQuery) : 8;

  try {
    const listings = await db.listing.findMany({
      take: limit + 1,
      cursor: cursorQuery ? { id: cursorQuery } : undefined,
      select: {
        beds: true,
        images: true,
        name: true,
        rooms: true,
        tags: true,
        price_per_night: true,
        max_guests: true,
        bathrooms: true,
        city: true,
        id: true,
      },
      where: {
        city: {
          contains: city,
          mode: "insensitive",
        },
        max_guests: {
          gte: guests ? parseInt(guests) : undefined,
        },
        price_per_night: {
          lte: maxPrice ? parseInt(maxPrice) : undefined,
        },
      },
    });

    let nextCursor: string | undefined = undefined;

    if (listings.length > limit) {
      const nextItem = listings.pop();
      nextCursor = nextItem!.id; // Since linstings.length > limit and limit > 0 we know nextItem exists
    }

    return Response.json({ nextCursor, listings }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}

// Make sure listings type matches listing in route handler
export type ListingResponse = {
  nextCursor: string | undefined;
  listings: Array<
    Pick<
      Listing,
      | "beds"
      | "id"
      | "images"
      | "name"
      | "rooms"
      | "tags"
      | "price_per_night"
      | "max_guests"
      | "city"
      | "bathrooms"
    >
  >;
};
