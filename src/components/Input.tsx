import { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string
}

export function Input({ label, ...rest }: InputProps) {
	return (
		<>
			<label>{ label }</label>

			<input
				className="flex-1 ml-4 bg-black text-right outline-none text-blue-300"
				{...rest}
			/>
		</>
	)
}
