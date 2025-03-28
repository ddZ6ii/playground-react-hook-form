import { useContext } from "react"
import { ThemeContext } from "@/shared/store"

export default function useThemeContext() {
  const themeContext = useContext(ThemeContext)
  if (themeContext === null) {
    throw new Error("ThemeContext was used outside its provider.")
  }
  return themeContext
}
