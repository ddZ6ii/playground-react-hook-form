import { PropsWithChildren, useEffect, useMemo } from "react"
import { useSavedPreference } from "@/shared/hooks"
import { ThemeContext } from "@/shared/store"
import { Theme } from "@/shared/types"
import { getUserPreference } from "@/shared/utils"

/**
 * React Context API is used to handle the application's theme.
 *
 * On first render, theme is loaded from session storage (if any, to retrieve a previously stored value in case of page refresh, or fallbacks to user's preference (set through an operating system setting or a user agent setting) via the media query `window.matchMedia("(prefers-color-scheme: dark)")`.
 *
 * Then, and Effect is used to handle the selected theme for initial and subsequent renders to:
 *  1. apply the corresponding class to the `body` element
 *  2. set the state for the entire application (to be shared via context to any component)
 *  3. save it to session storage
 *
 * Theme switching with these approach relies on appending / removing a class directly from the `body` HTML (top hierarchy) element, and the use of CSS variables (App.css file) instantiated from Tailwind config. file to be used as custom Tailwind classnames.
 *
 * 🚀 This approach for handling theme provides several benefits:
 *  - it does not trigger the whole app to re-renders
 *  - it can be used to handle custom themes besides "light" and "dark"
 *
 * 📕 Inspired by:
 * https://www.youtube.com/watch?v=UHciHtsuFnw
 * https://dev.to/franklin030601/using-dark-mode-in-your-react-app-5364
 */

export default function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, changeTheme] = useSavedPreference<Theme>(
    getUserPreference(),
    "__theme",
  )

  // Additional side-effect (interacting directly with the DOM on theme change).
  useEffect(() => {
    const htmlEl = document.querySelector("html")
    if (!htmlEl) return
    if (theme === "dark") {
      htmlEl.classList.add("dark")
    } else {
      htmlEl.classList.remove("dark")
    }
  }, [theme])

  const themeContextValue = useMemo(
    () => ({ theme, changeTheme }),
    [theme, changeTheme],
  )

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
