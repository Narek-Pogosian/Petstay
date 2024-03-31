"use client";

import { useReservationContext } from "@/hooks/use-reservation-context";
import { ReservationDatePicker } from "./reservation-date-picker";
import { differenceInDays } from "date-fns";

function ReservationListingCard() {
  const { listing, date } = useReservationContext();

  if (!listing) {
    return <p>No listing</p>;
  }

  return (
    <div className="sm:pl-8 sm:border-l">
      <h3 className="font-bold text-lg">{listing.name}</h3>
      <p className="text-primary font-semibold mb-6">{listing.city}</p>

      <p className="text-sm font-semibold">Choose dates</p>
      <ReservationDatePicker />
      {date?.from && date?.to && (
        <p className="pt-6">
          <span className="font-semibold">Total price:</span>{" "}
          {differenceInDays(date.to, date.from) * listing.price_per_night} SEK
        </p>
      )}
    </div>
  );
}

export default ReservationListingCard;
