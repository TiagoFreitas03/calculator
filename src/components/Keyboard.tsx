import { KeyboardButton } from "./KeyboardButton"
import { useKeyboard } from "../hooks/useKeyboard"
import { KEYBOARD_LAYOUTS } from "../constants/KEYBOARD_LAYOUTS"
import { NUMPAD_KEYS } from "../constants/BUTTONS"
import { Button } from "../types/Button"
import { EntryType } from "../types/EntryType"

interface KeyboardProps {
	layout: 'CALCULATOR' | 'COMMON' | 'HEX'
	entry: string
	clear?: boolean
	disabledKeys?: string[]
	type?: EntryType
	onChangeEntry: (text: string) => void
	onButtonClick?: (key: string) => void
}

export function Keyboard({
	layout, entry, clear = false, disabledKeys = [], type = 'dec', onChangeEntry, onButtonClick
}: KeyboardProps) {
	const { topKeys, rightKeys } = KEYBOARD_LAYOUTS[layout]

	const { handleKeyPress } = useKeyboard(type)

	function renderButtons(buttons: Button[]) {
		return buttons.map(({ key, icon, text, changeEntry = true }) => {
			return (
				<KeyboardButton
					key={key}
					onClick={() => {
						if (disabledKeys.includes(key)) {
							return
						}

						if (changeEntry) {
							onChangeEntry(handleKeyPress(clear ? '0' : entry, key))
						}
						else if (onButtonClick) {
							onButtonClick(key)
						}
					}}
					text={text ?? key}
					icon={icon}
					disabled={disabledKeys.includes(key)}
					className={layout === 'CALCULATOR' ? 'h-16' : 'h-full'}
				/>
			)
		})
	}

	return (
		<div className="flex w-full h-full absolute top-0 left-0">
			<div className="grid grid-cols-3">
				{topKeys && renderButtons(topKeys.slice())}

				{renderButtons(NUMPAD_KEYS.slice())}
			</div>

			<div className="flex flex-col justify-around">
				{renderButtons(rightKeys.slice())}
			</div>
		</div>
	)
}
