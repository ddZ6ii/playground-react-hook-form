import { forwardRef, useEffect, useRef, useState } from "react"
import { Toast } from "radix-ui"
import { ZodError } from "zod"
import { InputField } from "@/features/login/components"
import { FormSchema, SignUpFormSchema } from "@/features/login/schema"
import { FormState } from "@/features/login/types"
import { formatError } from "@/features/login/utils"
import { Button, Spinner } from "@/shared/components/ui"
import { wait } from "@/shared/utils"

export const initialFormState: FormState = {
  data: {
    email: "",
    password: "",
    confirmPassword: "",
  },
  error: {
    email: [],
    password: [],
    confirmPassword: [],
  },
  status: "typing",
}

export default function SignUpForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [formState, setFormState] = useState<FormState>(initialFormState)

  const success = formState.status === "success"
  const submitting = formState.status === "submitting"

  const focusFirstFieldWithError = (formErrors: FormState["error"]): void => {
    const firstFieldWithError = Object.entries(formErrors).find(
      ([_fieldName, fieldErrors]) => !!fieldErrors.length,
    )
    const formEl = formRef.current
    if (!formEl || !firstFieldWithError) return
    const [fieldName] = firstFieldWithError
    const shouldFocusOnPassword = fieldName === "confirmPassword"
    const target = formEl.elements.namedItem(
      shouldFocusOnPassword ? "password" : fieldName,
    )
    if (target instanceof HTMLElement) target.focus()
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name as keyof FormState["data"]
    const fieldValue = e.target.value
    setFormState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [fieldName]: fieldValue,
      },
      error: {
        ...prev.error,
        [fieldName]: initialFormState.error[fieldName],
      },
      status: "typing",
    }))
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    try {
      setFormState((prev) => ({
        ...prev,
        status: "typing",
      }))
      const fieldName = e.target.name as keyof FormState["data"]
      const fieldValue = e.target.value
      FormSchema.partial().parse({
        [fieldName]: fieldValue,
      })
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const nextFormError = formatError(formState.error, error)
        setFormState((prev) => ({
          ...prev,
          error: nextFormError,
        }))
      }
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      setFormState((prev) => ({
        ...prev,
        error: initialFormState.error,
        status: "submitting",
      }))
      await wait() // simulate asynchronous operation
      SignUpFormSchema.parse(formState.data)
      setFormState((prev) => ({
        ...prev,
        data: initialFormState.data,
        status: "success",
      }))
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const nextFormError = formatError(initialFormState.error, error)
        setFormState((prev) => ({
          ...prev,
          error: nextFormError,
        }))
      }
      setFormState((prev) => ({
        ...prev,
        status: "error",
      }))
    }
  }

  useEffect(() => {
    if (formState.status === "error") {
      focusFirstFieldWithError(formState.error)
    }
  }, [formState.error, formState.status])

  return (
    <>
      <Form noValidate ref={formRef} onSubmit={handleSubmit}>
        <FormHeading>Login</FormHeading>
        <InputField
          id="email"
          name="email"
          type="email"
          label="Email"
          value={formState.data.email}
          errors={formState.error.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          disabled={submitting}
        />
        <InputField
          id="password"
          name="password"
          type="password"
          label="Password"
          value={formState.data.password}
          errors={formState.error.password}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          disabled={submitting}
        />
        <InputField
          id="confirm-password"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          value={formState.data.confirmPassword}
          errors={formState.error.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          disabled={submitting}
        />
        <SubmitButton disabled={submitting}>
          {submitting && <Spinner align="center" size="4" className="grow-0" />}
          {submitting ? "Submitting..." : " Sign Up"}
        </SubmitButton>
      </Form>
      {success && (
        <Notification>
          <SuccessMessage userInfo={formState.data.email} />
        </Notification>
      )}
    </>
  )
}

const Form = forwardRef<
  HTMLFormElement,
  React.FormHTMLAttributes<HTMLFormElement>
>(function Form(props, ref) {
  return (
    <form
      ref={ref}
      className="mx-auto grid w-fit min-w-md gap-8 self-center rounded-xl border border-slate-200 p-12"
      {...props}
    />
  )
})

function FormHeading(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className="text-xl font-bold" {...props} />
}

function SubmitButton({
  children,
  ...restProps
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      type="submit"
      className="ease disabled:bg-primary-400 disabled:text-primary-300 justify-center bg-indigo-600 text-white transition-colors duration-150 hover:bg-indigo-500 disabled:cursor-not-allowed"
      {...restProps}
    >
      {children}
    </Button>
  )
}

function SuccessMessage({ userInfo }: { userInfo?: string }) {
  return (
    <div className="grid place-content-center">
      <span className="text-lg">
        👋 Welcome back{userInfo && ` ${userInfo}`}!
      </span>
    </div>
  )
}

function Notification({ children }: { children: React.ReactElement }) {
  return (
    <Toast.Provider duration={2000} swipeDirection="right">
      <Toast.Root className="absolute right-8 bottom-8 grid w-fit place-content-center rounded-lg bg-slate-800 p-6 text-slate-50">
        <Toast.Title />
        <Toast.Description asChild>{children}</Toast.Description>
        <Toast.Close asChild>
          <button
            type="button"
            className="absolute top-2 right-2 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </Toast.Close>
      </Toast.Root>
      <Toast.Viewport />
    </Toast.Provider>
  )
}
