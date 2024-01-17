import { NumberBase } from "../types/NumberBase"

export interface CalculatorProps {
	text: string
	clear?: boolean
	type?: NumberBase
	onChangeText: (text: string) => void
	onKeyClick?: (key: string) => void
}
