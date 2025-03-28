function capitalizeWord(word: string): string {
  return word.trim().charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

export function capitalize(text: string | undefined): string {
  return (text ?? "").split(" ").map(capitalizeWord).join(" ")
}

export function toCamelCase(str: string): string {
  return (
    str.split(" ").slice(0, 1).join("").toLowerCase() +
    str.split(" ").slice(1).map(capitalizeWord).join("")
  )
}

export function pluralize(word: string, count: number): string {
  return count === 1 ? word : `${word}s`
}
