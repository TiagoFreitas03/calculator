import { ButtonHTMLAttributes } from "react"
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	text: string
	icon?: string
}

export function Button({ text, icon, ...rest }: ButtonProps) {
	return (
		<button
			className={clsx("w-16 h-16 m-2 text-xl outline-none font-bold", {
				"text-zinc-200": !isNaN(Number(text)),
				"text-blue-500": isNaN(Number(text)) && text !== 'Enter',
				"bg-blue-500 rounded-full text-zinc-900": text === 'Enter',
				"hover:bg-zinc-900": text !== 'Enter'
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
