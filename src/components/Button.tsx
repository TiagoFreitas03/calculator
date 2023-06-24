import { ButtonHTMLAttributes } from "react"
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	text: string
	icon?: string
	active: boolean
}

export function Button({ text, icon, active, ...rest }: ButtonProps) {
	return (
		<button
			className={clsx("w-14 h-14 m-2 text-lg outline-none font-bold", {
				"text-gray-200": !isNaN(Number(text)) || text === 'Enter',
				"text-blue-500": isNaN(Number(text)) && text !== 'Enter',
				"bg-blue-500 rounded-full text-zinc-900": text === 'Enter',
				"hover:bg-zinc-900": text !== 'Enter',
				"bg-zinc-900": active && text !== 'Enter'
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
