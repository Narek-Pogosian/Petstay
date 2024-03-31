"use client";

import {
  SearchParamsSchemaType,
  searchParamsSchema,
} from "@/lib/validations/search-params-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as Form from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { setSearchQueries } from "@/lib/helpers/search-params";

function SearchForm({
  searchParams,
}: {
  searchParams: SearchParamsSchemaType;
}) {
  const form = useForm<SearchParamsSchemaType>({
    resolver: zodResolver(searchParamsSchema),
    defaultValues: {
      city: searchParams.city ?? "",
      guests: searchParams.guests ?? "",
      maxPrice: searchParams.maxPrice ?? "",
    },
  });

  const router = useRouter();

  const onSubmit = (values: SearchParamsSchemaType) => {
    router.push(setSearchQueries(values));
  };

  function reset() {
    form.reset({ city: "", guests: "", maxPrice: "" });
    router.push(setSearchQueries({}));
  }

  return (
    <Form.Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid pb-6 mb-6 border-b gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <Form.FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <Form.FormItem className="@sm:col-span-2">
              <Form.FormLabel>City</Form.FormLabel>
              <Form.FormControl>
                <Input placeholder="City" {...field} />
              </Form.FormControl>
            </Form.FormItem>
          )}
        />

        <Form.FormField
          control={form.control}
          name="guests"
          render={({ field }) => (
            <Form.FormItem className="@sm:col-span-2">
              <Form.FormLabel>Minimum number of guests</Form.FormLabel>
              <Form.FormControl>
                <Input placeholder="Guests" {...field} type="number" min={1} />
              </Form.FormControl>
            </Form.FormItem>
          )}
        />

        <Form.FormField
          control={form.control}
          name="maxPrice"
          render={({ field }) => (
            <Form.FormItem className="@sm:col-span-2">
              <Form.FormLabel>Maximum price per night SEK</Form.FormLabel>
              <Form.FormControl>
                <Input placeholder="Price" {...field} type="number" min={1} />
              </Form.FormControl>
            </Form.FormItem>
          )}
        />

        <div className="flex items-end gap-4">
          <Button type="submit">Search</Button>
          <Button onClick={reset} variant="secondary">
            Reset
          </Button>
        </div>
      </form>
    </Form.Form>
  );
}

export default SearchForm;
