import { HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

export default function Section({
  children,
  className = "",
  ...restProps
}: HTMLAttributes<HTMLElement>) {
  const baseStyle =
    "group mx-auto mt-8 w-1/2 max-w-[480px] rounded-xl p-8 hover:shadow-accent-500/20 shadow-xl space-y-4 transition-shadow ease duration-500"

  return (
    <section className={twMerge(baseStyle, className)} {...restProps}>
      {children}
    </section>
  )
}
