import { z } from "zod";

export const formSchema = z.object({
  otp: z
    .string()
    .length(6, { message: "OTP must be 6 digits" })
    .regex(/^\d+$/, { message: "OTP must be numeric" }),
});

export type FormSchema = z.infer<typeof formSchema>;
