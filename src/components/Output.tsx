import clsx from "clsx"

import { NumberBase } from "../types/NumberBase"
import { maskNumber } from "../utils/masks"

interface OutputProps {
	value: string
	type?: NumberBase
}

export function Output({ value, type = 'dec' }: OutputProps) {
	const maskedOutput = maskNumber(value, false, type)
	const outputLength = maskedOutput.length

	return (
		<span
			className={clsx("pr-1 h-14 flex items-center justify-end", {
				"text-3xl": outputLength <= 15,
				"text-2xl": outputLength > 15 && outputLength <= 18,
				"text-xl": outputLength > 18 && outputLength <= 21,
				"text-lg": outputLength > 21
			})}
		>
			{maskedOutput}
		</span>
	)
}
