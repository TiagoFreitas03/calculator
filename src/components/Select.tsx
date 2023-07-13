import { SelectHTMLAttributes } from "react"

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	options: string[]
}

export function Select({ options, ...rest }: SelectProps) {
	return (
		<select
			{...rest}
			className="bg-black p-1"
		>
			{
				options.map(opt => {
					return (
						<option value={opt} key={opt}>
							{opt}
						</option>
					)
				})
			}
		</select>
	)
}
