import { ReactNode, createContext, useContext, useEffect, useState } from "react"

interface ContextProps {
	children: ReactNode
}

interface Calculation {
	expression: string[]
	result: string
}

interface CalculatorContextData {
	history: Calculation[]
	addToHistory: (expression: string[], result: string) => void
	clearHistory: () => void
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

	function clearHistory() {
		setHistory([])
		localStorage.removeItem('calculator-history')
	}

	function addToHistory(expression: string[], result: string) {
		const aux = [...history.slice(-19), { expression, result }]
		setHistory(aux)
		localStorage.setItem('calculator-history', JSON.stringify(aux))
	}

	return (
		<CalculatorContext.Provider
			value={{
				history,
				clearHistory,
				addToHistory
			}}
		>
			{ children }
		</CalculatorContext.Provider>
	)
}

export const useCalculator = () => useContext(CalculatorContext)
