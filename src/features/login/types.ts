import { z } from "zod"
import { SignUpFormSchema } from "@/features/login/schema"

type FormData = z.infer<typeof SignUpFormSchema>

export type FormError = Record<keyof FormData, string[]>

type FormStatus = "typing" | "submitting" | "error" | "success"

export type FormState = {
  data: FormData
  error: FormError
  status: FormStatus
}
