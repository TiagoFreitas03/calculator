import { useState } from "react"

import { KEYS, OPERATIONS, TEXT_KEYS } from "../constants/KEYS"
import { append, addOperator, erase, percent, reverseSignal, calculate } from '../utils/operations'

export function useCalculator() {
	const [entry, setEntry] = useState('0')
	const [expression, setExpression] = useState<string[]>([])
	const [clearEntry, setClearEntry] = useState(false)

	function handleKeyPress(key: string) {
		if (!KEYS.includes(key)) {
			return
		}

		if (TEXT_KEYS.includes(key)) {
			setEntry(append(clearEntry ? '0' : entry, key))
			setClearEntry(false)

			if (expression.length > 3) {
				setExpression([])
			}
		}
		else if (OPERATIONS.includes(key)) {
			const aux = addOperator(expression.slice(), entry, key, clearEntry)
			setEntry(aux.entry)
			setExpression(aux.expression.slice())
			setClearEntry(true)
		}
		else {
			switch (key) {
				case 'Escape':
					setExpression([])
					setEntry('0')
					break
				case 'Delete':
					setEntry('0')
					break
				case 'Backspace':
					setEntry(erase(entry))
					break
				case '%':
					setEntry(percent(entry))
					break
				case '+/-':
					setEntry(reverseSignal(entry))
					break
				case 'Enter':
				case '=':
					if (expression.length < 2 || !OPERATIONS.includes(expression[1])) {
						return
					}

					expression.push(entry)

					if (expression.length > 3) {
						expression[0] = entry
						expression.splice(3, expression.length - 3)
					}

					setEntry(calculate(expression))
					setExpression(expression.concat('='))
					setClearEntry(true)
					break
			}
		}
	}

	return {
		entry,
		expression,
		handleKeyPress
	}
}
