import { SignUpForm } from "@/features/login/components"

export default function LandingPage() {
  return (
    <Wrapper>
      <Heading1>React Hook Form</Heading1>
      <SignUpForm />
    </Wrapper>
  )
}

function Wrapper(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div className="grid h-full grid-rows-[auto_1fr] gap-2" {...props} />
}

function Heading1({ children }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className="text-center text-2xl font-bold">{children}</h1>
}
