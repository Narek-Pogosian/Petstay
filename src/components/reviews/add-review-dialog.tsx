"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useState } from "react";
import { Alert, AlertDescription } from "../ui/alert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import LoadingButton from "../ui/loading-button";
import useIsMounted from "@/hooks/use-is-mounted";
import clsx from "clsx";
import {
  ReviewSchemaType,
  reviewSchema,
} from "@/lib/validations/review-validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Form from "@/components/ui/form";
import { Input } from "../ui/input";

type Props = {
  listingId: string;
};

function AddReviewDialog({ listingId }: Props) {
  // Controls dialog open state
  const [isOpen, setIsOpen] = useState(false);

  const isMounted = useIsMounted();
  const queryClient = useQueryClient();

  const form = useForm<ReviewSchemaType>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      description: "",
      rating: 0,
    },
  });

  const { user } = useAuthContext();
  const [clientError, setClientError] = useState("");

  const { isLoading, error, mutateAsync } = useMutation({
    mutationFn: (values: ReviewSchemaType) =>
      axios.post(`/api/listing/${listingId}/review`, values),
  });

  async function onSubmit(values: ReviewSchemaType) {
    if (!user) {
      setClientError("Please sign in");
      return;
    }

    await mutateAsync(values, {
      onSuccess: () => {
        queryClient.invalidateQueries(["reviews", listingId]);
        form.reset({ description: "", rating: 0 });
        setIsOpen(false);
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* isMounted needed for hydration warning, button may not show otherwise because of missmatch with server rendered */}
      {isMounted && (
        <DialogTrigger asChild>
          {/* Hidden if no user */}
          <Button className={clsx({ hidden: !user })}>Add review</Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader className="mb-8">
          <DialogTitle>Write a review.</DialogTitle>
        </DialogHeader>
        <Form.Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <Form.FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <Form.FormItem>
                  <Form.FormLabel>Rating between 0 to 5</Form.FormLabel>
                  <Form.FormControl>
                    <Input
                      type="number"
                      min={0}
                      max={5}
                      placeholder="Rating between 0 - 5"
                      {...field}
                    />
                  </Form.FormControl>
                  <Form.FormMessage />
                </Form.FormItem>
              )}
            />
            <Form.FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <Form.FormItem>
                  <Form.FormLabel>Description</Form.FormLabel>
                  <Form.FormControl>
                    <Textarea
                      placeholder="Please share your thought on this product"
                      rows={4}
                      {...field}
                      className="resize-none"
                    />
                  </Form.FormControl>
                  <Form.FormMessage />
                </Form.FormItem>
              )}
            />

            {isAxiosError(error) && (
              <Alert variant="destructive">
                <AlertDescription>
                  {error.response?.data.message ?? "Something went wrong"}
                </AlertDescription>
              </Alert>
            )}

            {clientError && (
              <Alert variant="destructive">
                <AlertDescription>{clientError}</AlertDescription>
              </Alert>
            )}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="destructive"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <LoadingButton type="submit" isLoading={isLoading}>
                Submit
              </LoadingButton>
            </div>
          </form>
        </Form.Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddReviewDialog;
