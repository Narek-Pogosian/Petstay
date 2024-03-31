import GoBack from "@/components/shared/go-back";
import ListingDetails from "@/components/details/listing-details";
import DetailsReserve from "@/components/details/details-reserve";
import AddReviewDialog from "@/components/reviews/add-review-dialog";
import ListingFAQ from "@/components/details/listing-faq";
import Reviews from "@/components/reviews/reviews";
import Carousel from "@/components/details/carousel";
import { getBaseUrl } from "@/lib/utils";
import { Listing } from "@prisma/client";
import { db } from "@/lib/db";
import { ListingDetailsType } from "@/app/api/listing/[listingId]/route";

export const dynamic = "force-static";
/**
 * SSG, generates the ids of all listings to build their pages during build time
 * Wouldnt have SSG if adding listing from client was possible
 */
export async function generateStaticParams() {
  const listings = await db.listing.findMany({ select: { id: true } });

  return listings.map((listing) => ({
    id: listing.id,
  }));
}

async function page({ params }: { params: { listingId: string } }) {
  const listing: ListingDetailsType = await fetch(
    `${getBaseUrl()}/api/listing/${params.listingId}`
  ).then((res) => {
    if (res.status === 404) throw Error("Listing not found");
    return res.json();
  });

  return (
    <div className="lg:space-y-12 space-y-6">
      <div className="lg:hidden">
        <GoBack />
      </div>
      <h1 className="text-3xl font-bold lg:!mt-0">{listing.name} </h1>

      <section className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <ListingDetails listing={listing} />
          <DetailsReserve listing={listing} />
        </div>
        <Carousel images={listing.images} />
      </section>

      <hr />
      <section className="space-y-8">
        {listing.pet_policy && (
          <div className="bg-emerald-50 rounded p-4">
            <h2 className="mb-2 font-semibold text-xl">Pet policy</h2>
            <p>{listing.pet_policy}</p>
          </div>
        )}
        {listing.sound_level && (
          <div className="bg-emerald-50 rounded p-4">
            <h2 className="mb-2 font-semibold text-xl">Sound level</h2>
            <p>{listing.sound_level}</p>
          </div>
        )}
      </section>

      <hr />
      <section>
        <h2 className="font-semibold text-xl text-center mb-8">Amenities</h2>
        <ul className="grid grid-cols-2 gap-4 md:gap-12 max-w-md mx-auto">
          {listing.amenities.map((item, id) => (
            <li key={id} className="font-semibold text-center">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <hr />
      <section>
        <h2 className="font-semibold text-xl text-center mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-center mb-4">
          To your host <b>{listing.host.name}</b>
        </p>
        <ListingFAQ faq={listing.faq} />
      </section>

      <hr />
      <section>
        <h2 className="text-xl font-semibold text-center mb-4">Reviews</h2>
        <Reviews listingId={listing.id} />
        <div className="flex justify-center mt-10">
          <AddReviewDialog listingId={listing.id} />
        </div>
      </section>
      <hr />
    </div>
  );
}

export default page;
