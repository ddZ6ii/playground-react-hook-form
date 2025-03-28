import { useState } from "react"
import { twMerge } from "tailwind-merge"
import { PASSWORD_REQUIREMENT } from "@/features/login/utils"
import { Input, Label } from "@/shared/components/ui"
import { capitalize, toCamelCase } from "@/shared/utils"

type InputFieldProps = React.HTMLProps<HTMLInputElement> & {
  label: string
  value: string
  errors: string[]
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export default function InputField({
  label,
  value,
  errors,
  onChange,
  type: initialInputType = "text",
  className = "",
  ...restProps
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [inputType, setInputType] = useState(initialInputType)

  const hasError = errors.length > 0
  const isPasswordInput = initialInputType === "password"

  const handleTogglePasswordVisibility = (
    _e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setShowPassword(!showPassword)
    if (initialInputType === "password") {
      setInputType(inputType === "password" ? "text" : "password")
    }
  }

  const formatErrorMessage = () => {
    const baseStyle = "text-sm text-red-800"
    const shouldDisplayAsList = isPasswordInput && errors.length > 1
    if (shouldDisplayAsList) {
      return (
        <ul className={twMerge(baseStyle, "list-inside list-disc")}>
          Your password does not meet password policy requirements:
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )
    }
    return <p className={baseStyle}>{errors.join(". ")}</p>
  }

  const inputId = restProps.id ?? restProps.name ?? label.toLowerCase()

  return (
    <Field className={twMerge("text-secondary-500 grid gap-2", className)}>
      <Label htmlFor={inputId}>
        <div className="relative w-fit">
          {capitalize(label)}
          {restProps.required && <span className="text-red-800"> *</span>}
          {isPasswordInput && <Info />}
        </div>
      </Label>
      <div className="relative">
        <Input
          type={inputType}
          id={inputId}
          name={toCamelCase(restProps.name ?? label)}
          value={value}
          placeholder={label}
          onChange={onChange}
          onBlur={restProps.onBlur}
          className={twMerge(
            hasError
              ? "border-red-800 hover:outline-red-800 focus-visible:outline-red-800"
              : "",
            isPasswordInput ? "pr-6" : "",
          )}
          {...restProps}
        />
        {isPasswordInput && (
          <TogglePasswordVisibility onClick={handleTogglePasswordVisibility}>
            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </TogglePasswordVisibility>
        )}
      </div>
      {errors.length > 0 && formatErrorMessage()}
    </Field>
  )
}

function Field({
  children,
  ...restProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...restProps}>{children}</div>
}

function Info() {
  const [showToolTip, setShowToolTip] = useState(false)
  return (
    <div
      className="absolute top-1/2 right-0 z-10 translate-x-6 -translate-y-1/2 cursor-pointer"
      onMouseOver={() => {
        setShowToolTip(true)
      }}
      onMouseLeave={() => {
        setShowToolTip(false)
      }}
    >
      <InfoIcon />
      {showToolTip && (
        <ul className="bg-secondary-500 text-primary-500 absolute top-1/2 right-0 min-w-80 translate-x-[105%] -translate-y-1/2 list-inside list-disc rounded-lg p-4">
          <strong>Password requirements:</strong>
          {Object.entries(PASSWORD_REQUIREMENT).map(([constraint, message]) => (
            <li key={constraint}>{message}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

function InfoIcon() {
  return (
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
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      />
    </svg>
  )
}

function TogglePasswordVisibility({
  children,
  ...restProps
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="absolute top-1/2 right-0 -translate-x-1.5 -translate-y-1/2 cursor-pointer hover:text-indigo-600 focus-visible:text-indigo-600"
      {...restProps}
    >
      {children}
    </button>
  )
}

function EyeIcon() {
  return (
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
        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  )
}

function EyeSlashIcon() {
  return (
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
        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  )
}
