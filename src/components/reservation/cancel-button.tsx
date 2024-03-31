"use client";

import { useReservationContext } from "@/hooks/use-reservation-context";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

function CancelButton({ disabled }: { disabled?: boolean }) {
  const { listing, resetFormInfo } = useReservationContext();
  const router = useRouter();

  function handleClick() {
    // Look reservation-confirmation components, have setTimeout here just in case
    setTimeout(() => {
      resetFormInfo();
    }, 1500);
    router.replace(listing ? `/listing/${listing?.id}` : "/");
  }

  return (
    <Button
      variant="destructive"
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className="h-fit"
    >
      Cancel
    </Button>
  );
}

export default CancelButton;
