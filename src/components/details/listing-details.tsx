import { Listing } from "@prisma/client";
import React from "react";

type Props = {
  listing: Listing;
};

function ListingDetails({ listing }: Props) {
  return (
    <>
      <p className="text-primary text-xl font-semibold">{listing.city}</p>
      <p className="font-semibold text-sm pt-2 pb-4 flex gap-2 flex-wrap">
        <span>{listing.max_guests} guests &bull; </span>
        <span>{listing.rooms} rooms &bull;</span>
        <span>{listing.beds} beds &bull;</span>{" "}
        <span>{listing.bathrooms} bathrooms</span>
      </p>
      <p>{listing.description}</p>
    </>
  );
}

export default ListingDetails;
