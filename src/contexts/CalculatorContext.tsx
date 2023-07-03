import { ReactNode, createContext, useContext, useEffect, useState } from "react"

import { KEYS, OPERATIONS, TEXT_KEYS } from "../constants/KEYS"
import { append, erase, percent, reverse, calculate, addOperator } from '../utils/operations'

interface ContextProps {
	children: ReactNode
}

interface Calculation {
	expression: string[]
	result: string
}

interface CalculatorContextData {
	entry: string
	expression: string[]
	history: Calculation[]
	handleKeyPress(key: string): void
	clearHistory: () => void
	restoreHistory: (math: Calculation) => void
}

const CalculatorContext = createContext<CalculatorContextData>({} as CalculatorContextData)

export function CalculatorContextProvider({ children }: ContextProps) {
	const [entry, setEntry] = useState('0')
	const [expression, setExpression] = useState<string[]>([])
	const [clearEntry, setClearEntry] = useState(false)
	const [history, setHistory] = useState<Calculation[]>([])

	useEffect(() => {
		const localHistory = localStorage.getItem('calculator-history')

		if (localHistory) {
			const parsedHistory = JSON.parse(localHistory) as Calculation[]
			setHistory(parsedHistory)
		}
	}, [])

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
			try {
				const aux = addOperator(expression.slice(), entry, key, clearEntry)

				if (aux.calculated) {
					addToHistory(expression.concat([entry, '=']).slice(), aux.entry)
				}

				setEntry(aux.entry)
				setExpression(aux.expression.slice())
				setClearEntry(true)
			}
			catch (err) {
				alert(err)
			}
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
				case '+-':
					setEntry(reverse(entry))
					break
				case 'Enter':
				case '=':
					if (expression.length < 2 || !OPERATIONS.includes(expression[1])) {
						return
					}

					const aux = expression.slice()
					aux.push(Number(entry).toString())

					if (aux.length > 3) {
						aux[0] = entry
						aux.splice(3, aux.length - 3)
					}

					try {
						const result = calculate(aux)
						aux.push('=')

						setEntry(result)
						setExpression(aux)
						setClearEntry(true)
						addToHistory(aux.slice(), result)
					} catch (err) {
						alert(err)
					}
			}
		}
	}

	function clearHistory() {
		setHistory([])
		localStorage.removeItem('calculator-history')
	}

	function addToHistory(expression: string[], result: string) {
		const aux = [...history.slice(-19), { expression, result }]
		setHistory(aux)
		localStorage.setItem('calculator-history', JSON.stringify(aux))
	}

	function restoreHistory(math: Calculation) {
		setEntry(math.result)
		setExpression(math.expression)
	}

	return (
		<CalculatorContext.Provider value={{
			entry,
			expression,
			history,
			handleKeyPress,
			clearHistory,
			restoreHistory
		}}>
			{ children }
		</CalculatorContext.Provider>
	)
}

export const useCalculator = () => useContext(CalculatorContext)
