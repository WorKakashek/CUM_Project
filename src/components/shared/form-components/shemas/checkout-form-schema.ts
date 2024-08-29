import { z } from "zod";

export const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters long",
  }),
  email: z.string().email({ message: "Invalid email address" }),
});

export type CheckoutFormSchema = z.infer<typeof checkoutFormSchema>;
