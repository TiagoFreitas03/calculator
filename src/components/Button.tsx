import { ButtonHTMLAttributes } from "react"
import clsx from 'clsx'

import { NUMBERS, OPERATIONS } from '../utils/keys'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	text: string
}

export function Button({ text, ...rest }: ButtonProps) {
	return (
		<button
			className={clsx("w-12 h-12 rounded-lg m-2 text-gray-200 text-lg", {
				"bg-gray-800": NUMBERS.includes(text),
				"bg-blue-700": OPERATIONS.includes(text),
				"bg-zinc-900": !NUMBERS.includes(text) && !OPERATIONS.includes(text),
				"w-28": text === '='
			})}
			{...rest}
		>
			{ text }
		</button>
	)
}
