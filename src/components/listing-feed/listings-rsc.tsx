import { ListingResponse } from "@/app/api/listing/route";
import { objectToParamsString } from "@/lib/helpers/search-params";
import { getBaseUrl } from "@/lib/utils";
import { SearchParamsSchemaType } from "@/lib/validations/search-params-validation";
import ListingFeed from "./listing-feed";

async function ListingsRSC({
  searchParams,
}: {
  searchParams: SearchParamsSchemaType;
}) {
  const listings: ListingResponse = await fetch(
    `${getBaseUrl()}/api/listing?${objectToParamsString(searchParams)}`
  ).then((res) => res.json());

  return <ListingFeed initialData={listings} searchParams={searchParams} />;
}

export default ListingsRSC;
