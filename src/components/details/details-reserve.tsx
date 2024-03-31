"use client";

import { Listing } from "@prisma/client";
import { ReservationDatePicker } from "../reservation/reservation-date-picker";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import useIsMounted from "@/hooks/use-is-mounted";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useReservationContext } from "@/hooks/use-reservation-context";

type Props = {
  listing: Listing;
};

function DetailsReserve({ listing }: Props) {
  const isMounted = useIsMounted();
  const router = useRouter();

  const { user } = useAuthContext();
  const { setListing } = useReservationContext();

  function handleClick() {
    setListing(listing);
    router.push("/reserve");
  }

  return (
    <div className="mt-8 min-h-[30px]">
      {isMounted &&
        (!user ? (
          <p className="text-muted-foreground italic">
            Need to be signed in to reserve
          </p>
        ) : (
          <div className="flex gap-4 flex-wrap ">
            <div>
              <ReservationDatePicker />
              <p className="text-sm text-muted-foreground pt-2 pl-2">
                You can edit the dates in checkout.
              </p>
            </div>
            <Button onClick={handleClick} className="h-fit">
              Reserve
            </Button>
          </div>
        ))}
    </div>
  );
}

export default DetailsReserve;
