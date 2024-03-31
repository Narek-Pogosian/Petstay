import * as z from "zod";

export const searchParamsSchema = z.object({
  city: z.string().optional(),
  guests: z
    .string()
    .regex(/^[0-9]*$/)
    .optional(),
  maxPrice: z
    .string()
    .regex(/^[0-9]*$/)
    .optional(),
});

export type SearchParamsSchemaType = z.infer<typeof searchParamsSchema>;
