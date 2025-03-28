import { Theme } from "@/shared/types"

export default function getUserPreference(): Theme {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
  return isDarkMode ? "dark" : "light"
}
