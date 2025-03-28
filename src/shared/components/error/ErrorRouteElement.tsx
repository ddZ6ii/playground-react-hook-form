import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom"

export default function ErrorRouteElement() {
  const error = useRouteError()

  let errorMessage = "Unknown error"

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText
  }
  if (error instanceof Error) {
    errorMessage = error.message
  }
  if (typeof error === "string") {
    errorMessage = error
  }

  return (
    <div className="container mx-auto grid h-screen w-screen content-center gap-4 px-5 text-gray-700 lg:grid-cols-2 lg:items-center lg:gap-6">
      <div className="grid gap-8">
        <p className="text-2xl leading-normal font-light md:text-3xl">
          Sorry we couldn&apos;t find the page you&apos;re looking for
        </p>
        <p className="text-slate-400">
          <i>{errorMessage}</i>
        </p>
        <Link to="/" className="underline">
          Return to HomePage
        </Link>
      </div>
      <div>
        <img
          src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
          alt="Page not found"
        />
      </div>
    </div>
  )
}
