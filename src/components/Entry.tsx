import clsx from "clsx"

import { useCalculator } from "../contexts/CalculatorContext"
import { maskNumber } from "../utils/masks"

export function Entry() {
	const { entry } = useCalculator()

	const maskedEntry = maskNumber(entry)
	const entryLength = maskedEntry.length

	return (
		<span
			className={clsx("my-1 h-12 flex items-center justify-end", {
				"text-4xl": entryLength <= 15,
				"text-3xl": entryLength > 15 && entryLength <= 18,
				"text-2xl": entryLength > 18 && entryLength <= 21,
				"text-xl": entryLength > 21
			})}
		>
			{maskedEntry}
		</span>
	)
}
