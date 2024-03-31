import z from "zod";

export const checkoutSchema = z.object({
  listingId: z.string(),
  fromDate: z.string(),
  toDate: z.string(),
});

export type CheckoutSchemaType = z.infer<typeof checkoutSchema>;
