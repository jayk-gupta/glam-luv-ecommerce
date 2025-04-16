import {z} from "zod"
export const formSchem = z.object({
  email: z.string().email({ message: "Invalid email adress" }),
  password: z.string(),
  // .min(6, { message: "Password must be at least 8 characters long" })
  // .regex(/[A-Z]/, {
  //   message: "Password must contain at least one uppercase letter",
  // })
  // .regex(/[a-z]/, {
  //   message: "Password must contain at least one lowercase letter",
  // })
  // .regex(/\d/, { message: "Password must contain at least one number" })
});