"use client";

import { differenceInDays, format } from "date-fns";
import { useRouter } from "next/navigation";
import {
  CheckoutSchemaType,
  checkoutSchema,
} from "@/lib/validations/checkout-validation";
import { useEffect } from "react";
import { useReservationContext } from "@/hooks/use-reservation-context";
import { useAuthContext } from "@/hooks/use-auth-context";
import { Alert, AlertDescription } from "../ui/alert";
import { useMutation } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import LoadingSpinner from "../shared/loading-spinner";
import LoadingButton from "../ui/loading-button";
import Image from "next/image";

function ReservationConfirmation() {
  const router = useRouter();

  const { formInfo, listing, date, resetFormInfo } = useReservationContext();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!formInfo || !user || !listing || !date) {
      router.push("/");
    }
  }, [formInfo, user, listing, date, router]);

  const { mutateAsync, isLoading, error } = useMutation({
    mutationFn: (values: CheckoutSchemaType) =>
      axios.post("/api/reserve", values),
  });

  async function handleConfirm() {
    try {
      // Shouldnt be invalid but checking anyway.
      const validData = checkoutSchema.parse({
        fromDate: date?.from?.toISOString(),
        toDate: date?.to?.toISOString(),
        listingId: listing?.id,
      });

      await mutateAsync(validData, {
        onSuccess: () => {
          // Need setTime because the useEfect will be triggered otherwise.
          setTimeout(() => {
            resetFormInfo();
          }, 1500);

          router.push(`/profile`);
          // Need to refresh in case we already have profile page in client cache.
          // Other new reservation wont show.
          router.refresh();
        },
      });
    } catch (error) {}
  }

  if (!formInfo || !user || !listing || !date) {
    return <LoadingSpinner className="mx-auto" />;
  }

  return (
    <div className="grid sm:grid-cols-2 gap-12 mb-4">
      <div>
        <h3 className="text-2xl font-bold">{listing.name}</h3>
        <p className="text-primary text-lg mb-2">{listing.city}</p>
        <p className="mb-4 font-semibold">
          {format(date.from!, "LLL dd, y")} - {format(date.to!, "LLL dd, y")}
        </p>
        <div className="flex gap-4 flex-wrap">
          <p>
            <b>Name: </b>
            {formInfo.firstName} {formInfo!.lastName}
          </p>
          <p>
            <b>Email: </b>
            {formInfo.email}
          </p>
        </div>
        <p className="pt-4 text-lg">
          <b>Total price:</b>{" "}
          {differenceInDays(date.to!, date.from!) * listing.price_per_night} SEK
        </p>

        {isAxiosError(error) && (
          <Alert variant="destructive">
            <AlertDescription>
              {error.response?.data.message ?? "Something went wrong"}
            </AlertDescription>
          </Alert>
        )}

        <LoadingButton
          onClick={handleConfirm}
          isLoading={isLoading}
          className="w-full mt-12"
        >
          Confirm
        </LoadingButton>
      </div>
      <div className="relative aspect-video">
        <Image
          src={listing.images[0]}
          fill
          alt=""
          className="rounded"
          sizes="(max-width: 640px) 100vw, 40vw"
        />
      </div>
    </div>
  );
}

export default ReservationConfirmation;
