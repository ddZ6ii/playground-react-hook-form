import { twMerge } from "tailwind-merge"

export default function Button({
  children,
  className = "",
  ...restProps
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const baseStyle =
    "flex cursor-pointer items-center gap-2 rounded-xl px-4 py-3 font-bold text-neutral-100"
  return (
    <button
      type="button"
      className={twMerge(baseStyle, className)}
      {...restProps}
    >
      {children}
    </button>
  )
}
