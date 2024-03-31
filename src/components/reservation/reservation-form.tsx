"use client";

import {
  ReservationSchemaType,
  reservationSchema,
} from "@/lib/validations/reservation-validation";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useReservationContext } from "@/hooks/use-reservation-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CancelButton from "@/components/reservation/cancel-button";
import * as Form from "@/components/ui/form";

function ReservationForm() {
  const { user } = useAuthContext();
  const { listing, setFormInfo, date, formInfo } = useReservationContext();

  const router = useRouter();

  const form = useForm<ReservationSchemaType>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      cardNumber: formInfo?.cardNumber ?? "",
      cvc: formInfo?.cvc ?? "",
      expirationMonth: formInfo?.expirationMonth ?? "",
      expirationYear: formInfo?.expirationYear ?? "",
      email: formInfo?.email ?? user?.email ?? "",
      firstName: formInfo?.firstName ?? user?.name.split(" ")[0] ?? "",
      lastName: formInfo?.lastName ?? user?.name.split(" ")[1] ?? "",
    },
  });

  function onSubmit(values: ReservationSchemaType) {
    // Has default values but checking anyway
    // TODO: Error message
    if (!date || !date.from || !date.to) return;

    setFormInfo(values);
    router.push("/reserve/confirm");
  }

  if (!listing || !user) return redirect("/");

  return (
    <Form.Form {...form}>
      <div className="@container max-lg:order-last ">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-6 gap-x-4 gap-y-6 @lg:gap-6"
        >
          <Form.FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <Form.FormItem className="col-span-6 @lg:col-span-3">
                <Form.FormLabel>First name</Form.FormLabel>
                <Form.FormControl>
                  <Input
                    placeholder="First name"
                    {...field}
                    autoComplete="given-name"
                  />
                </Form.FormControl>
                <Form.FormMessage />
              </Form.FormItem>
            )}
          />
          <Form.FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <Form.FormItem className="col-span-6 @lg:col-span-3">
                <Form.FormLabel>Last name</Form.FormLabel>
                <Form.FormControl>
                  <Input
                    placeholder="Last name"
                    {...field}
                    autoComplete="family-name"
                  />
                </Form.FormControl>
                <Form.FormMessage />
              </Form.FormItem>
            )}
          />
          <Form.FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <Form.FormItem className="col-span-6 @lg:col-span-3">
                <Form.FormLabel>Email</Form.FormLabel>
                <Form.FormControl>
                  <Input placeholder="Email" {...field} />
                </Form.FormControl>
                <Form.FormMessage />
              </Form.FormItem>
            )}
          />
          <Form.FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <Form.FormItem className="col-span-6 @lg:col-span-3">
                <Form.FormLabel>Card number</Form.FormLabel>
                <Form.FormControl>
                  <Input
                    placeholder="1234 5678 1234 5678"
                    {...field}
                    autoComplete="cc-number"
                  />
                </Form.FormControl>
                <Form.FormMessage />
              </Form.FormItem>
            )}
          />
          <Form.FormField
            control={form.control}
            name="expirationMonth"
            render={({ field }) => (
              <Form.FormItem className="col-span-2 @xl:col-span-1">
                <Form.FormLabel>Exp month</Form.FormLabel>
                <Form.FormControl>
                  <Input
                    placeholder="01"
                    {...field}
                    autoComplete="cc-exp-month"
                  />
                </Form.FormControl>
                <Form.FormMessage />
              </Form.FormItem>
            )}
          />
          <Form.FormField
            control={form.control}
            name="expirationYear"
            render={({ field }) => (
              <Form.FormItem className="col-span-2 @xl:col-span-1">
                <Form.FormLabel>Exp year</Form.FormLabel>
                <Form.FormControl>
                  <Input
                    placeholder="23"
                    {...field}
                    autoComplete="cc-exp-year"
                  />
                </Form.FormControl>
                <Form.FormMessage />
              </Form.FormItem>
            )}
          />
          <Form.FormField
            control={form.control}
            name="cvc"
            render={({ field }) => (
              <Form.FormItem className="col-span-2 @xl:col-span-1">
                <Form.FormLabel>CVC code</Form.FormLabel>
                <Form.FormControl>
                  <Input placeholder="123" {...field} autoComplete="cc-csc" />
                </Form.FormControl>
                <Form.FormMessage />
              </Form.FormItem>
            )}
          />
          <div className="flex justify-end gap-4 col-span-6">
            <CancelButton />
            <Button>To Checkout</Button>
          </div>
        </form>
      </div>
    </Form.Form>
  );
}

export default ReservationForm;
