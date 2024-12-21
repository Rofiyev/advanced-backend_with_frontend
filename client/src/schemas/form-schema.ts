import { z } from "zod";

const formSchema = z.object({
  email: z.string().min(2).email({ message: "Email is required!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(16, { message: "Password must be at most 16 characters long." }),
});

export default formSchema;

