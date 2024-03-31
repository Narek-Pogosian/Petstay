"use client";

import { ReviewsType } from "@/app/api/listing/[listingId]/review/route";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import axios from "axios";
import Stars from "./stars";

type Props = {
  listingId: string;
};

function Reviews({ listingId }: Props) {
  const {
    data: reviews,
    isError,
    isLoading,
  } = useQuery<ReviewsType, any>(["reviews", listingId], () =>
    axios.get(`/api/listing/${listingId}/review`).then((res) => res.data)
  );

  if (isLoading) {
    return <p className="text-center py-8">Loading reviews...</p>;
  }

  if (!reviews || !reviews.length || isError) {
    return <p className="text-center py-8">No reviews</p>;
  }

  return (
    <ul className={cn("grid gap-8", { "lg:grid-cols-2": reviews.length > 1 })}>
      {reviews.map((review) => (
        <li key={review.id} className="rounded p-4 border h-fit">
          <p className="shrink-0 font-semibold">{review.User.name}</p>
          <p className="text-sm text-muted-foreground mb-1">
            {format(new Date(review.created_at), "LLL dd, y")}
          </p>
          {!!review.rating && (
            <div className="mb-2">
              <Stars count={Math.floor(review.rating)} />
            </div>
          )}
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}

export default Reviews;
