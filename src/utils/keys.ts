const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

const TEXT_KEYS = [...NUMBERS, '.']

const OPERATIONS = ['+', '-', '/', '*']

const KEYS = [
	...TEXT_KEYS,
	...OPERATIONS,
	'Backspace', 'Enter', '=', '%', 'c', 'C', 'Escape'
]

export { NUMBERS, OPERATIONS, TEXT_KEYS, KEYS }
