import clsx from "clsx"

import { maskNumber } from "../utils/masks"
import { EntryType } from "../types/EntryType"

interface OutputProps {
	value: string
	type?: EntryType
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
