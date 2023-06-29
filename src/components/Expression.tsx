import clsx from "clsx"

import { useCalculator } from "../contexts/CalculatorContext"
import { OPERATIONS } from "../constants/KEYS"
import { maskExpression } from "../utils/masks"
import { OperatorIcon } from "./OperatorIcon"

export function Expression() {
	const { expression } = useCalculator()

	const maskedExpression = maskExpression(expression.slice())
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
						<OperatorIcon
							operator={element}
							cssClasses='text-sm ml-2 text-blue-300'
							key={element + index}
						/> :
						<span key={element + index} className="ml-2 text-zinc-400">
							{element}
						</span>
				})
			}
		</div>
	)
}
