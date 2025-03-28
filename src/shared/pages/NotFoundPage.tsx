import { ComponentProps, HTMLAttributes, PropsWithChildren } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/shared/components/ui"

export default function NotFoundPage() {
  const navigate = useNavigate()
  const handleClick = (_e: React.MouseEvent<HTMLButtonElement>) => {
    navigate("/")
  }
  return (
    <Main>
      <Heading1>Oops!</Heading1>
      <Section>
        <Heading2>Something is going on in the Universe...</Heading2>
        <Text>Looks like you probably got lost.</Text>
      </Section>
      <BackToHomeBtn onClick={handleClick}>
        Take me back to base 🚀
      </BackToHomeBtn>
    </Main>
  )
}

function Main({ children }: PropsWithChildren) {
  return (
    <main className="grid min-h-dvh place-content-center gap-8 bg-slate-800 text-slate-200">
      {children}
    </main>
  )
}

function Heading1({ children }: HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className="text-4xl">{children}</h1>
}

function Section({ children }: PropsWithChildren) {
  return <section className="">{children}</section>
}

function Heading2({ children }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className="text-2xl">{children}</h2>
}

function Text({ children }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className="my-2 text-lg">{children}</p>
}

function BackToHomeBtn({
  children,
  ...restProps
}: ComponentProps<typeof Button>) {
  return (
    <Button className="w-fit max-w-none text-lg" {...restProps}>
      {children}
    </Button>
  )
}
