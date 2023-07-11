import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	title: string
}

export function Button({ title, ...rest }: ButtonProps) {
	return (
		<button
			className={
				"w-full mt-4 bg-blue-400 font-semibold text-zinc-900 py-2 rounded-full outline-none"
			}
			{...rest}
		>
			{title}
		</button>
	)
}
