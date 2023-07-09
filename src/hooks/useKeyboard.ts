import { ENTRY_TYPE } from "../constants/ENTRY_TYPE"
import { LETTERS, NUMBERS, TEXT_KEYS } from "../constants/KEYS"
import { onlyNumbers } from "../utils/only-numbers"

export function useKeyboard(type: ENTRY_TYPE = 'bin') {
	function handleKeyPress(text: string, key: string) {
		if (TEXT_KEYS.includes(key)) {
			return append(text, key)
		}
		else if (key === 'Backspace') {
			return erase(text)
		}
		else if (key === '%') {
			return percent(text)
		}
		else if (key === '+-') {
			return reverse(text)
		}
		else if (key === 'Delete') {
			return '0'
		}

		return text
	}

	function append(text: string, key: string) {
		const original = text

		if (NUMBERS.includes(key) || LETTERS.includes(key.toLowerCase())) { // 0..9, A..F
			if (onlyNumbers(text).length < 15) {
				text = text === '0' ? key : text + key
			}
		}
		else if (key === '.' && !text.includes(key)) {
			if (onlyNumbers(text).length < 15) {
				text = text + key
			}
		}

		return validateEntry(text) ? text : original
	}

	function erase(text: string) {
		if (text.length > 1) {
			text = text.substring(0, text.length - 1)

			if (text === '-') {
				text = '0'
			}
		}
		else if (text !== '0') {
			text = '0'
		}

		return text
	}

	function percent(value: string) {
		const num = Number(value)

		return isNaN(num) ? value : (num * 0.01).toString()
	}

	function reverse(value: string) {
		const num = Number(value)

		return isNaN(num) ? value : (num * (-1)).toString()
	}

	function validateEntry(text: string) {
		switch (type) {
			case 'bin': return (/^\-?[01]*\.?[01]*$/).test(text)
			case 'oct': return (/^\-?[0-7]*\.?[0-7]*$/).test(text)
			case 'dec': return (/^\-?[0-9]*\.?[0-9]*$/).test(text)
			case 'hex': return (/^\-?[0-9A-Fa-f]*\.?[0-9A-Fa-f]*$/).test(text)
		}
	}

	return { handleKeyPress }
}
