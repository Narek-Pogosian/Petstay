import { SearchParamsSchemaType } from "../validations/search-params-validation";

export type SearchParams = { [key: string]: string | string[] | undefined };

export function objectToParamsString(params: SearchParams) {
  return Object.entries(params)
    .map((param) => `${param[0]}=${param[1]}`)
    .join("&");
}

/**
 * @returns a string with full pathname and query params, can be used with router.push and Link
 */
export function setSearchQueries(values: SearchParamsSchemaType) {
  const searchParams = new URLSearchParams(window.location.search);

  const keys = Object.keys(values) as Array<keyof typeof values>;

  keys.forEach((key) => {
    if (values[key]) {
      searchParams.set(key, values[key]!); // idk, typescript says it can be undefined even with if check
    } else {
      searchParams.delete(key);
    }
  });

  // if (values.city) {
  //   searchParams.set("city", values.city.toLocaleLowerCase());
  // } else {
  //   searchParams.delete("city");
  // }

  // if (values.guests) {
  //   searchParams.set("guests", values.guests);
  // } else {
  //   searchParams.delete("guests");
  // }

  return `${window.location.pathname}?${searchParams.toString()}`;
}
