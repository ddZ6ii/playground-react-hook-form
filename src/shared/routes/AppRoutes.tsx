import { lazy, Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom"
import { FallbackErrorBoundary } from "@/shared/components/error"
import { Spinner } from "@/shared/components/ui"

/* 
  Lazy load not initially shown pages to enhance application rendering performance.
  
  Use dynamic import together with React `lazy` method to defer loading a page's code until it is rendered for the first time. Use React `Suspense` boundary to specify what should be displayed while it is loading (typically a loader).
  
  This is especially usefull for pages that are not initially displayed when the application loads (pages that require navigation).
  
  This technique allows to split the application's code into smaller chunks that are loaded on demand, reducing the initial page load time.

  How to use:
    1. Lazy load a page usign dynamic import and React `lazy`:
       const AnotherPage = lazy(() => import("@/shared/pages/AnotherPage"))
    
    2. ⚠️Lazy loaded pages must be wrapped within React `Suspense` boundary in the list of routes:
        element: (
          <Suspense fallback={<Spinner />}>
            <AnotherPage />
          </Suspense>
        )
    ℹ️ This is not required for children routes since they are already wrapper in `Suspense` from their parent. Similarly, a child route content is already wrapper in `Suspense` from `PageLayout`.
*/
const LandingPage = lazy(() => import("@/shared/pages/LandingPage"))
const NotFoundPage = lazy(() => import("@/shared/pages/NotFoundPage"))
const PageLayout = lazy(() => import("@/shared/layouts/PageLayout"))

export default function AppRoutes() {
  const routes = publicRoutes
  const router = createBrowserRouter(routes)
  return <RouterProvider router={router} />
}

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <ErrorBoundary FallbackComponent={FallbackErrorBoundary}>
        <Suspense fallback={<Spinner height="fullPage" />}>
          <PageLayout />
        </Suspense>
      </ErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
    ],
  },
  // Invalid route
  {
    path: "*",
    element: <NotFoundPage />,
  },
]
