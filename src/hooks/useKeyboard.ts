import { NumberBase } from "../types/NumberBase"
import { LETTERS, NUMBERS, TEXT_KEYS } from "../constants/KEYS"
import { onlyHexCharacters, onlyNumbers } from "../utils/text-filters"

export function useKeyboard(type: NumberBase = 'dec', allowDecimals = true) {
	function handleKeyPress(text: string, key: string) {
		if (TEXT_KEYS.includes(key)) {
			return append(text, key)
		}
		else {
			switch (key) {
				case 'Backspace':
					return erase(text);
				case '%':
					return percent(text)
				case '+-':
					return reverse(text)
				case 'Delete':
					return '0'
			}
		}

		return text
	}

	function append(text: string, key: string) {
		const original = text
		key = key.toUpperCase()

		if (NUMBERS.includes(key) || LETTERS.includes(key.toLowerCase())) { // 0..9, A..F
			const conditions = [
				type === 'bin' && onlyNumbers(text).length < 48,
				type === 'oct' && onlyNumbers(text).length < 17,
				type === 'dec' && onlyNumbers(text).length < 15,
				type === 'hex' && onlyHexCharacters(text).length < 12
			]

			if (conditions.some(c => c === true)) {
				text = text === '0' ? key : text + key
			}
		}
		else if (key === '.' && !text.includes(key) && onlyNumbers(text).length < 21) {
			text = text + key
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
			case 'bin':
				return (/^[01]+$/g).test(text)
			case 'oct':
				return (/^[0-7]+$/g).test(text)
			case 'dec':
				return allowDecimals ?
					(/^\-?[0-9]*\.?[0-9]*$/).test(text) :
					(/^[0-9]+$/g).test(text)
			case 'hex':
				return (/^[0-9A-Fa-f]+$/g).test(text)
		}
	}

	return { handleKeyPress }
}
