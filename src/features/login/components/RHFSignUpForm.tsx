import React, { useState } from "react"
import { InputField } from "@/features/login/components"
import { FormState } from "@/features/login/types"
import { Button } from "@/shared/components/ui"

const initialFormState: FormState = {
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

export default function RHFSignUpForm() {
  const [formState, setFormState] = useState<FormState>(initialFormState)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [e.target.name]: e.target.value,
      },
    }))
  }

  return (
    <Form>
      <FormHeading>Login</FormHeading>
      <InputField
        id="email"
        name="email"
        type="email"
        label="Email"
        value={formState.data.email}
        errors={formState.error.email}
        onChange={handleChange}
        required
      />
      <InputField
        id="password"
        name="password"
        type="password"
        label="Password"
        value={formState.data.password}
        errors={formState.error.password}
        onChange={handleChange}
        required
      />
      <InputField
        id="confirm-password"
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        value={formState.data.confirmPassword}
        errors={formState.error.confirmPassword}
        onChange={handleChange}
        required
      />
      <Button className="ease justify-center bg-indigo-600 text-white transition-colors duration-150 hover:bg-indigo-500">
        Submit
      </Button>
    </Form>
  )
}

function Form(props: React.HTMLAttributes<HTMLFormElement>) {
  return (
    <form
      className="mx-auto grid w-fit min-w-md gap-8 self-center rounded-xl border border-slate-200 p-12"
      {...props}
    />
  )
}

function FormHeading(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className="text-xl font-bold" {...props} />
}
