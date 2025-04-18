import { z } from "zod"
export const formSchema = z.object({
  email: z.string().email({ message: "Invalid email adress" }),
});

export type FormSchema = z.infer<typeof formSchema>