import { HTMLAttributes } from "react"
import clsx from "clsx"

import { BUTTONS } from "../constants/BUTTONS"
import { KEYS } from "../constants/KEYS"
import { useKeyboard } from "../hooks/useKeyboard"
import { CalculatorProps } from "../interfaces/CalculatorProps"
import { maskNumber } from "../utils/masks"

interface EntryProps extends CalculatorProps, HTMLAttributes<HTMLSpanElement> {
	active?: boolean
	cssClasses?: string
	allowDecimals?: boolean
	small?: boolean
}

export function Entry({
	text,
	type = 'dec',
	clear,
	active = true,
	cssClasses,
	allowDecimals = true,
	small = false,
	onChangeText,
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
					onChangeText(handleKeyPress(clear ? '0' : text, key))
				}
				else if (onKeyClick) {
					onKeyClick(key)
				}
			}
		}
	}

	const maskedEntry = maskNumber(text, false, type)
	const entryLength = maskedEntry.length

	return small ? (
		<span className={"cursor-pointer " + cssClasses} {...rest}>
			{maskedEntry}
		</span>
	) : (
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
