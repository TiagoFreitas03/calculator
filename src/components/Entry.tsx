import clsx from "clsx"

import { maskNumber } from "../utils/masks"

interface EntryProps {
	value: string
}

export function Entry({ value }: EntryProps) {
	const maskedEntry = maskNumber(value)
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
