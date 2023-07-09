import { ButtonHTMLAttributes } from "react"
import clsx from 'clsx'

interface KeyboardButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	text: string
	icon?: string
}

export function KeyboardButton({ text, icon, disabled, className, ...rest }: KeyboardButtonProps) {
	return (
		<button
			className={clsx(`w-16 m-2 text-xl outline-none font-bold ${className}`, {
				"text-zinc-200": (!isNaN(Number(text)) || (/^([a-z]){1}$/).test(text)) && !disabled,
				"text-blue-500": isNaN(Number(text)) && !(/^([a-z]){1}$/).test(text),
				"bg-blue-500 rounded-full text-zinc-900": text === 'Enter',
				"hover:bg-zinc-900": text !== 'Enter' && !disabled,
				"text-zinc-800 cursor-default": disabled
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
