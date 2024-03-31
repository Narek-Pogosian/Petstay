import { ListingResponse } from "@/app/api/listing/route";
import Image from "next/image";
import Link from "next/link";
import Tag from "../ui/tag";

type Props = {
  listing: ListingResponse["listings"][0];
};

const ListingCard = ({ listing }: Props) => {
  return (
    <li className="@container rounded overflow-hidden shadow-lg">
      <Link
        href={`/listing/${listing.id}`}
        className="grid @xl:grid-cols-2 @xl:h-[200px]"
      >
        <div className="aspect-video @xl:aspect-auto relative">
          <Image
            src={listing.images[0]}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            alt=""
            className="w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="px-4 pt-2 pb-4 flex flex-col">
          <h3 className="font-semibold text-lg mb-1">{listing.name}</h3>
          <p className="text-primary font-semibold text-sm">
            {listing.city} &bull; {listing.price_per_night} SEK/night
          </p>
          <p className="text-sm pt-1 pb-4 flex gap-1 flex-wrap">
            <span>{listing.max_guests} guests &bull; </span>
            <span>{listing.rooms} rooms &bull;</span>
            <span>{listing.beds} beds &bull;</span>{" "}
            <span>{listing.bathrooms} bathrooms</span>
          </p>
          <div className="flex gap-2 flex-wrap mt-auto">
            {listing.tags.map((tag, i) => (
              <Tag text={tag} key={i} />
            ))}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ListingCard;
