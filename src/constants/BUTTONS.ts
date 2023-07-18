import { Button } from '../types/Button'

const NUMPAD_KEYS: Button[] = [
	{ key: '7', icon: '7' },
	{ key: '8', icon: '8' },
	{ key: '9', icon: '9' },
	{ key: '4', icon: '4' },
	{ key: '5', icon: '5' },
	{ key: '6', icon: '6' },
	{ key: '1', icon: '1' },
	{ key: '2', icon: '2' },
	{ key: '3', icon: '3' },
	{ key: '+-', icon: 'plus-minus' },
	{ key: '0', icon: '0' },
	{ key: '.', text: ',' }
]

const HEX_KEYS: Button[] = [
	{ key: 'd', icon: 'd' },
	{ key: 'e', icon: 'e' },
	{ key: 'f', icon: 'f' },
	{ key: 'a', icon: 'a' },
	{ key: 'b', icon: 'b' },
	{ key: 'c', icon: 'c' }
]

const OPERATOR_KEYS: Button[] = [
	{ key: '/', icon: 'divide', changeEntry: false },
	{ key: '*', icon: 'xmark', changeEntry: false },
	{ key: '-', icon: 'minus', changeEntry: false },
	{ key: '+', icon: 'plus', changeEntry: false }
]

const CLEAR_ALL_BUTTON: Button = { key: 'Escape', icon: 'c', changeEntry: false }
const CLEAR_ENTRY_BUTTON: Button = { key: 'Delete', text: 'CE' }
const PERCENT_BUTTON: Button = { key: '%', icon: 'percent' }
const BACKSPACE_BUTTON: Button = { key: 'Backspace', icon: 'delete-left' }
const EQUALS_BUTTON: Button = { key: 'Enter', icon: 'equals', changeEntry: false }

const BUTTONS: Button[] = [
	...NUMPAD_KEYS,
	...HEX_KEYS,
	...OPERATOR_KEYS,
	CLEAR_ALL_BUTTON,
	CLEAR_ENTRY_BUTTON,
	PERCENT_BUTTON,
	BACKSPACE_BUTTON,
	EQUALS_BUTTON
].map(({ changeEntry = true, ...rest }) => {
	return { ...rest, changeEntry }
})

export {
	BUTTONS,
	NUMPAD_KEYS,
	HEX_KEYS,
	OPERATOR_KEYS,
	CLEAR_ALL_BUTTON,
	CLEAR_ENTRY_BUTTON,
	PERCENT_BUTTON,
	BACKSPACE_BUTTON,
	EQUALS_BUTTON
}
