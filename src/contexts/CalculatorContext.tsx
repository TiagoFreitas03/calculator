import { ReactNode, createContext, useContext, useEffect, useState } from "react"

import { OPERATIONS } from "../constants/KEYS"

interface ContextProps {
	children: ReactNode
}

interface Calculation {
	expression: string[]
	result: string
}

interface CalculatorContextData {
	history: Calculation[]
	calculate: (expression: string[]) => string
	addOperator: (expression: string[], entry: string, operator: string, replace?: boolean) => {
		expression: string[];
		entry: string;
	}
}

const CalculatorContext = createContext<CalculatorContextData>({} as CalculatorContextData)

export function CalculatorContextProvider({ children }: ContextProps) {
	const [history, setHistory] = useState<Calculation[]>([])

	useEffect(() => {
		const localHistory = localStorage.getItem('calculator-history')

		if (localHistory) {
			const parsedHistory = JSON.parse(localHistory) as Calculation[]
			setHistory(parsedHistory)
		}
	}, [])

	useEffect(() => {
		if (history.length > 0) {
			localStorage.setItem('calculator-history', JSON.stringify(history))
		}
	}, [history])

	function calculate(expression: string[]) {
		let left = 0, right = 0
		let operator = ''

		function validateExpression() {
			if (expression.length !== 3) {
				return false
			}

			[left, operator, right] = [Number(expression[0]), expression[1], Number(expression[2])];

			return !(isNaN(left) || isNaN(right) || !OPERATIONS.includes(expression[1]))
		}

		const calcResult = () => {
			if (!validateExpression()) {
				return '0'
			}

			const format = (num: number) => Number(num.toPrecision(15)).toString()

			switch (operator) {
				case '+': return format(left + right)
				case '-': return format(left - right)
				case '*': return format(left * right)
				default:
					if (right !== 0) {
						return format(left / right)
					}

					alert('Não é possível dividir por zero')
					return '0'
			}
		}

		const result = calcResult()

		setHistory([...history.slice(-19), { expression: expression.concat('='), result }])

		return calcResult().toString()
	}

	function addOperator(expression: string[], entry: string, operator: string, replace = false) {
		if (!OPERATIONS.includes(operator)) {
			return { expression, entry }
		}

		let result = entry

		if (expression.length === 2) {
			if (replace) {
				expression.splice(1, 1, operator)
			}
			else {
				result = calculate(expression.concat(entry))
			}
		}

		return {
			expression: [Number(result).toString(), operator],
			entry: result
		}
	}

	return (
		<CalculatorContext.Provider value={{ history, calculate, addOperator }}>
			{ children }
		</CalculatorContext.Provider>
	)
}

export const useCalculatorContext = () => useContext(CalculatorContext)
