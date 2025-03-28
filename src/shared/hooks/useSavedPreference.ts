import { useCallback, useState } from "react"

/**
 * Similar to `useState` but also allows to persist the value into the browser's local storage when specifying a key. Allows to "remember" the last value in case of page refresh or after page session ends (page closed).
 *
 * ⚠️Should be used for non-sensitive preferences only (e.g. expand/collapse panels, color mode...).
 *
 * @param initialValue The initial value to "remember".
 * @param preferenceName The name of the key for local storage (optional). If not passed, the value will not be persisted.
 */
export default function useSavedPreference<T>(
  initialValue: T,
  preferenceName?: string,
): [T, (nextPreference: T) => void] {
  const [savedPreference, setSavedPreference] = useState(() => {
    if (preferenceName) {
      const savedPreference = localStorage.getItem(preferenceName)
      if (savedPreference !== null) {
        return JSON.parse(savedPreference) as unknown as T
      }
    }
    return initialValue
  })

  const setAndSavePreference = useCallback(
    (nextPreference: T): void => {
      setSavedPreference(nextPreference)
      if (preferenceName) {
        localStorage.setItem(preferenceName, JSON.stringify(nextPreference))
      }
    },
    [preferenceName],
  )

  return [savedPreference, setAndSavePreference]
}
