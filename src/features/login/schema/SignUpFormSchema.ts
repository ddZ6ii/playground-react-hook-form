import { isRobustPassword } from "@/features/login/utils"
import { z } from "zod"

export const FormSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().superRefine(isRobustPassword),
  confirmPassword: z.string(),
})

export const SignUpFormSchema = FormSchema.refine(
  ({ password, confirmPassword }) => password === confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  },
)
