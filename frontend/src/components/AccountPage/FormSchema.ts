import { z } from "zod";
const addressSchema = z.object({
  _id: z.string().optional(),
  fullName: z.string(),
  phone: z
    .string()
    .min(10, "Phone must be 10 digits")
    .max(10, "Phone must be 10 digits")
    .regex(/^[6-9]\d{9}$/, "Enter a valid Indian phone number"), // Starts with 6-9, total 10 digits
  street: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  pincode: z
    .string()
    .length(6, "Pincode must be 6 digits")
    .regex(/^\d{6}$/, "Enter a valid 6-digit Indian pincode"),
  isDefault: z.boolean().optional(),
});
export const formSchema = z.object({
  name: z.string(),
  phone: z
    .string()
    .min(10, "Phone must be 10 digits")
    .max(10, "Phone must be 10 digits")
    .regex(/^[6-9]\d{9}$/, "Enter a valid Indian phone number"),
  address: addressSchema.optional(), // Optional if editing only name/phone
});
export type FormSchema = z.infer<typeof formSchema>;
