import { FallbackProps } from "react-error-boundary"
import { Button as BaseButton } from "@/shared/components/ui"
import { twMerge } from "tailwind-merge"

type FallbackErrorBoundaryProps = FallbackProps & {
  fullPage?: boolean
  message?: string
  onReset?: () => void
}

export default function FallbackError({
  error,
  resetErrorBoundary,
  onReset,
  message = "Quelque chose d'inattendu s'est produit.",
  fullPage = false,
}: FallbackErrorBoundaryProps) {
  const errorMessage =
    error instanceof Error ? error.message : JSON.stringify(error)

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (_e) => {
    if (onReset === undefined) {
      /* 
        Run the function passed to the `onReset` props (if any) of the closest `ErrorBoundary` parent component.
        Otherwise, reset and re-render the whole tree inside the `ErrorBoudary` component.
      */
      resetErrorBoundary()
      return
    }
    onReset()
  }

  return (
    <Wrapper fullPage={fullPage}>
      <Container>
        <LeftContent>
          <Header>Something went wrong</Header>
          <Heading1>
            Oops! <br />
            Une erreur est survenue
          </Heading1>
          <ErrorMessage>{errorMessage}</ErrorMessage>
          <Image />
        </LeftContent>
        <RightContent>
          <Text>
            {message} <br />
            Si l&apos;erreur persiste, contacter votre administrateur.
          </Text>
          <Button onClick={handleClick}>
            Réessayer
            <ArrowRightIcon />
          </Button>
        </RightContent>
      </Container>
    </Wrapper>
  )
}

function Wrapper({
  fullPage = false,
  ...restProps
}: React.HTMLAttributes<HTMLDivElement> & {
  fullPage?: boolean
}) {
  return (
    <div
      role="alert"
      className={twMerge(
        "grid min-h-screen place-content-center",
        fullPage ? "min-h-screen" : "h-full",
      )}
      {...restProps}
    />
  )
}

function Container(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="container grid w-fit gap-4 md:grid-cols-[1fr_1fr] md:gap-6 lg:gap-16"
      {...props}
    />
  )
}

function LeftContent(props: React.ComponentProps<typeof BaseContent>) {
  return <BaseContent className="justify-center" {...props} />
}

function RightContent(props: React.ComponentProps<typeof BaseContent>) {
  return (
    <BaseContent
      className="md:justify-center md:before:absolute md:before:top-1/2 md:before:-ml-3 md:before:block md:before:h-[80%] md:before:w-0.5 md:before:-translate-y-1/2 md:before:bg-slate-100 lg:before:-ml-8"
      {...props}
    />
  )
}

function BaseContent({
  className = "",
  ...restProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={twMerge("flex flex-col gap-2 md:gap-4", className)}
      {...restProps}
    />
  )
}

function Header(props: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className="text-sm tracking-[.25em] text-slate-500 uppercase md:tracking-[.5em]"
      {...props}
    />
  )
}

function Heading1(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className="font-sans text-2xl font-black text-slate-500 lg:text-4xl"
      {...props}
    />
  )
}

function Image(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="max-w-[200px] md:max-w-[350px]" {...props}>
      <img
        src="img/not-found.webp"
        alt="not found"
        width="770"
        className="object-contain hue-rotate-[-1deg] saturate-[1.05]"
      />
    </div>
  )
}

function ErrorMessage(props: React.ComponentProps<typeof Text>) {
  return <Text className="whitespace-pre-wrap italic" {...props} />
}

function Text({
  className,
  ...restProps
}: React.HTMLAttributes<HTMLPreElement>) {
  return <pre className={twMerge("text-slate-500", className)} {...restProps} />
}

function ArrowRightIcon() {
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
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      />
    </svg>
  )
}

function Button(props: React.ComponentProps<typeof BaseButton>) {
  return <BaseButton className="bg-accent-500 w-fit" {...props} />
}
