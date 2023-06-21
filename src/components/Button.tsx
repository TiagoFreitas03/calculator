import { ButtonHTMLAttributes } from "react"
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	text: string
	icon?: string
}

export function Button({ text, icon, ...rest }: ButtonProps) {
	return (
		<button
			className={clsx("w-14 h-14 m-2 text-lg", {
				"text-gray-200": !isNaN(Number(text)) || text === '=',
				"text-blue-500": isNaN(Number(text)) && text !== '=',
				"bg-blue-500 rounded-full text-zinc-900": text === '=',
				"hover:bg-zinc-900": text !== '='
			})}
			{...rest}
		>
			{
				icon ?
					<i className={`fa-solid fa-${icon}`} /> :
					<span>{ text }</span>
			}
		</button>
	)
}
