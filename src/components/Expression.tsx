import clsx from "clsx"

import { OPERATIONS } from "../constants/KEYS"
import { maskExpression } from "../utils/masks"

interface ExpressionProps {
	value: string[]
}

export function Expression({ value }: ExpressionProps) {
	const maskedExpression = maskExpression(value.slice())
	const expressionLength = maskedExpression.join(' ').length

	return (
		<div className={clsx('flex items-center justify-end h-8 mb-2', {
			'text-lg': expressionLength <= 32,
			'': expressionLength > 32 && expressionLength <= 36,
			'text-sm': expressionLength > 36 && expressionLength <= 41,
			'text-xs': expressionLength > 41,
		})}>
			{
				maskedExpression.map((element, index) => {
					return [...OPERATIONS, '='].includes(element) ?
						<i
							key={element + index}
							className={clsx('fas text-sm ml-2 text-blue-300', {
								'fa-plus': element === '+',
								'fa-minus': element === '-',
								'fa-xmark': element === '*',
								'fa-divide': element === '/',
								'fa-equals': element === '='
							})}
						/> :
						<span key={element + index} className="ml-2 text-zinc-400">
							{element}
						</span>
				})
			}
		</div>
	)
}
