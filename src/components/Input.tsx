import clsx from "clsx"
import { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string
	big?: boolean
}

export function Input({ label, big = false, ...rest }: InputProps) {
	return (
		<>
			<label>{ label }</label>

			<input
				className={clsx("bg-black text-right outline-none text-blue-300", {
					'w-full text-3xl': big,
					'flex-1': !big
				})}
				{...rest}
			/>
		</>
	)
}
