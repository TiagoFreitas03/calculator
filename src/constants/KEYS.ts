import { BUTTONS } from './BUTTONS'

const KEYS = BUTTONS.map(button => button.key).concat('=')

const NUMBERS = KEYS.filter(key => !isNaN(Number(key)))

const LETTERS = KEYS.filter(key => key.length === 1 && key.match(/[a-f]/))

const TEXT_KEYS = [...NUMBERS, ...LETTERS, '.']

const OPERATIONS = ['+', '-', '*', '/']

export {
	KEYS,
	NUMBERS,
	LETTERS,
	OPERATIONS,
	TEXT_KEYS
}
