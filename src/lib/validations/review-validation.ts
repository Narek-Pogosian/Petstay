import * as z from "zod";

export const reviewSchema = z.object({
  description: z.string(),
  rating: z.coerce
    .number()
    .min(0, { message: "Rate between 0-5" })
    .max(5, { message: "Rate between 0-5" }),
});

export type ReviewSchemaType = z.infer<typeof reviewSchema>;
