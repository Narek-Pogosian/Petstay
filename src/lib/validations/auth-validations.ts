import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(1, { message: "Required" }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
