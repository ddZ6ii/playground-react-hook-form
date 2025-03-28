import { ZodError } from "zod"
import { FormError } from "@/features/login/types"

export function formatError(
  formError: FormError,
  validationErrors: ZodError,
): FormError {
  return validationErrors.errors.reduce<FormError>((acc, error) => {
    const fieldName = error.path[0] as keyof FormData
    const nextFieldError = [...acc[fieldName as keyof FormError], error.message]
    if (formError[fieldName as keyof FormError].includes(error.message))
      return acc
    return {
      ...acc,
      [fieldName]: nextFieldError,
    }
  }, formError)
}
