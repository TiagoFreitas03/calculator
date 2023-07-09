import clsx from "clsx"

import { useKeyboard } from "../hooks/useKeyboard"
import { maskNumber } from "../utils/masks"
import { BUTTONS } from "../constants/BUTTONS"

interface EntryProps {
	text: string
	clear?: boolean
	onTextChange: (text: string) => void
	onKeyPress: (key: string) => void
}

export function Entry({ text, clear = false, onTextChange, onKeyPress }: EntryProps) {
	const { handleKeyPress } = useKeyboard()

	window.onkeydown = (event) => {
		const { key } = event
		const button = BUTTONS.find(button => button.key === key)

		if (!button) {
			return
		}

		if (button.changeEntry) {
			onTextChange(handleKeyPress(clear ? '0' : text, key))
		}
		else {
			onKeyPress(key)
		}
	}

	const maskedEntry = maskNumber(text)
	const entryLength = maskedEntry.length

	return (
		<span
			className={clsx("pr-1 h-14 flex items-center justify-end cursor-pointer", {
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
