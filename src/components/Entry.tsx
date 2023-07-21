import clsx from "clsx"

import { useKeyboard } from "../hooks/useKeyboard"
import { BUTTONS } from "../constants/BUTTONS"
import { KEYS } from "../constants/KEYS"
import { EntryType } from "../types/EntryType"
import { maskNumber } from "../utils/masks"
import { HTMLAttributes } from "react"

interface EntryProps extends HTMLAttributes<HTMLSpanElement> {
	text: string
	clear?: boolean
	type?: EntryType
	active?: boolean
	cssClasses?: string
	allowDecimals?: boolean
	onTextChange: (text: string) => void
	onKeyClick?: (key: string) => void
}

export function Entry({
	text,
	type = 'dec',
	clear,
	active = true,
	cssClasses,
	allowDecimals = true,
	onTextChange,
	onKeyClick,
	...rest
}: EntryProps) {
	const { handleKeyPress } = useKeyboard(type, allowDecimals)

	if (active) {
		window.onkeydown = (event) => {
			const { key } = event

			if (KEYS.includes(key)) {
				event.preventDefault()
			}

			const button = BUTTONS.find(button => button.key === key)

			if (button) {
				if (button.changeEntry) {
					onTextChange(handleKeyPress(clear ? '0' : text, key))
				}
				else if (onKeyClick) {
					onKeyClick(key)
				}
			}
		}
	}

	const maskedEntry = maskNumber(text, false, type)
	const entryLength = maskedEntry.length

	return (
		<span
			className={clsx("pr-1 h-14 flex items-center justify-end cursor-pointer " + cssClasses, {
				"text-4xl": entryLength <= 15 && type !== 'hex',
				"text-3xl": (entryLength > 15 && entryLength <= 18) || (type === 'hex'),
				"text-2xl": entryLength > 18 && entryLength <= 21,
				"text-xl": entryLength > 21
			})}
			{...rest}
		>
			{maskedEntry}
		</span>
	)
}
