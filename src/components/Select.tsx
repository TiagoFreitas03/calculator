import { SelectHTMLAttributes } from "react"

interface Option {
	title: string
	value: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	options: Option[]
}

export function Select({ options, ...rest }: SelectProps) {
	return (
		<select {...rest} className="bg-black p-1">
			{
				options.map(opt => {
					return (
						<option value={opt.value} key={opt.value}>
							{opt.title}
						</option>
					)
				})
			}
		</select>
	)
}
