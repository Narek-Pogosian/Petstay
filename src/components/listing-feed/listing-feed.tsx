"use client";

import { SearchParamsSchemaType } from "@/lib/validations/search-params-validation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ListingResponse } from "@/app/api/listing/route";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ListingCard from "./listing-card";
import LoadingSpinner from "../shared/loading-spinner";
import { objectToParamsString } from "@/lib/helpers/search-params";

type Props = {
  initialData: ListingResponse;
  searchParams: SearchParamsSchemaType;
};

async function getListings(
  nextCursor: string | undefined,
  params: SearchParamsSchemaType
): Promise<ListingResponse> {
  const res = await fetch(
    `/api/listing?cursor=${nextCursor}&${objectToParamsString(params)}`
  );
  return await res.json();
}

function ListingFeed({ initialData, searchParams }: Props) {
  const { ref, inView } = useInView({ rootMargin: "20px" });

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    ["listings", searchParams],
    ({ pageParam = initialData.nextCursor }) =>
      getListings(pageParam, searchParams),
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialData: { pages: [initialData], pageParams: [1] },
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 0,
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, fetchNextPage, hasNextPage]);

  if (!data || data.pages[0].listings.length === 0) {
    return <p className="text-lg text-center pt-10">No listings found</p>;
  }

  const listings =
    data?.pages.flatMap((page) => page.listings) ?? initialData.listings;

  return (
    <>
      <ul className="grid lg:grid-cols-2 gap-12">
        {listings.map((listing) => (
          <ListingCard listing={listing} key={listing.id} />
        ))}
      </ul>
      {isFetching && (
        <div className="flex justify-center pt-10">
          <LoadingSpinner />
        </div>
      )}
      {!hasNextPage && data.pages.length > 1 && (
        <p className="text-center pt-10">You have reached the end!</p>
      )}
      <div ref={ref}></div>
    </>
  );
}

export default ListingFeed;
