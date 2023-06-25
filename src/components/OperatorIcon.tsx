import clsx from "clsx"

interface OperatorIconProps {
	operator: string
	cssClasses: string
}

export function OperatorIcon({ cssClasses, operator }: OperatorIconProps) {
	return (
		<i
			className={clsx(cssClasses + ' fas ', {
				'fa-plus': operator === '+',
				'fa-minus': operator === '-',
				'fa-xmark': operator === '*',
				'fa-divide': operator === '/',
				'fa-equals': operator === '=',
			})}
		/>
	)
}
