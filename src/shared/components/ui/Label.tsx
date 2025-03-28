import { twMerge } from "tailwind-merge"

export default function Label({
  className,
  ...restProps
}: React.HTMLProps<HTMLLabelElement>) {
  return <label className={twMerge("", className)} {...restProps} />
}
