import { twMerge } from "tailwind-merge"

export default function Input({
  className = "",
  ...restProps
}: React.HTMLProps<HTMLInputElement>) {
  return (
    <input
      className={twMerge(
        "disabled:bg-primary-400 disabled-text-primary-300 disabled:placeholder:text-primary-300 w-full rounded-sm border border-slate-200 px-2 py-1 hover:outline hover:outline-indigo-600 focus-visible:outline focus-visible:outline-indigo-600 disabled:cursor-not-allowed",
        className,
      )}
      {...restProps}
    />
  )
}
