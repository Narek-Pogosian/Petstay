import { searchParamsSchema } from "@/lib/validations/search-params-validation";
import { SearchParams } from "@/lib/helpers/search-params";
import { Suspense } from "react";
import ListingsRSC from "@/components/listing-feed/listings-rsc";
import ListingsSkeleton from "@/components/listing-feed/listings-skeleton";
import SearchForm from "@/components/listing-feed/search-form";
import ScrollTopButton from "@/components/listing-feed/scroll-top-button";

export const dynamic = "force-dynamic";

async function Home({ searchParams }: { searchParams: SearchParams }) {
  const { success } = searchParamsSchema.safeParse(searchParams);

  if (!success) throw Error; // Throw error if we get searchparams that we dont expect

  return (
    <>
      <SearchForm
        searchParams={searchParams}
        key={Object.values(searchParams).toString() + "filter"}
      />
      <Suspense
        key={Object.values(searchParams).toString()}
        fallback={<ListingsSkeleton />}
      >
        <ListingsRSC searchParams={searchParams} />
      </Suspense>
      <ScrollTopButton />
    </>
  );
}

export default Home;
