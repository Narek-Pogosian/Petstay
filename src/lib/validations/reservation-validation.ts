import * as z from "zod";

export const reservationSchema = z.object({
  firstName: z.string().min(1, { message: "Required" }),
  lastName: z.string().min(1, { message: "Required" }),
  email: z.string().email(),
  cardNumber: z
    .string()
    .regex(/^(\d{4}\s?){4}$/, { message: "Invalid card number" })
    .trim(),
  expirationMonth: z
    .string()
    .regex(/^(0[1-9]|1[0-2])$/, { message: "Invalid" })
    .trim(),
  expirationYear: z
    .string()
    .regex(/^(2[3-9]|3[0-9])$/, { message: "Invalid" })
    .trim(),
  cvc: z
    .string()
    .regex(/^\d{3}$/)
    .trim(),
});

export type ReservationSchemaType = z.infer<typeof reservationSchema>;
