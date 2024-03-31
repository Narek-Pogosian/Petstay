import { db } from "@/lib/db";
import { Listing, User } from "@prisma/client";

export async function GET(
  req: Request,
  { params }: { params: { listingId: string } }
) {
  try {
    const listing = await db.listing.findFirst({
      where: {
        id: params.listingId,
      },
      include: {
        host: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!listing)
      return Response.json({ message: "Listing not found" }, { status: 404 });

    return Response.json(listing);
  } catch (error) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}

export interface ListingDetailsType extends Listing {
  host: Pick<User, "name">;
}
