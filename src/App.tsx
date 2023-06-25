import { CalculatorContextProvider } from './contexts/CalculatorContext'
import { Calculator } from './screens/Calculator'

export function App() {
	return (
		<CalculatorContextProvider>
			<Calculator />
		</CalculatorContextProvider>
	)
}
