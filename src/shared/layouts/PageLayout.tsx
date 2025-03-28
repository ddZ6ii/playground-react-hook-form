import { HTMLAttributes, Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { Outlet } from "react-router-dom"
import { Header } from "@/shared/components"
import { FallbackErrorBoundary } from "@/shared/components/error"
import { Spinner } from "@/shared/components/ui"

export default function PageLayout() {
  return (
    <ErrorBoundary
      fallbackRender={(props) => <FallbackErrorBoundary fullPage {...props} />}
    >
      <PageWrapper>
        <Header />
        <Main>
          <ErrorBoundary FallbackComponent={FallbackErrorBoundary}>
            <Suspense fallback={<Spinner height="fullHeight" />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </Main>
      </PageWrapper>
    </ErrorBoundary>
  )
}

function PageWrapper({ children }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr] overflow-auto">
      {children}
    </div>
  )
}

function Main({ children }: HTMLAttributes<HTMLDivElement>) {
  return <main className="h-full w-full px-4">{children}</main>
}
