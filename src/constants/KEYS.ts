import { BUTTONS } from './BUTTONS'

const KEYS = BUTTONS.map(button => button.key).concat(['Backspace', '='])

const NUMBERS = KEYS.filter(key => !isNaN(Number(key)))

const TEXT_KEYS = [...NUMBERS, '.']

const OPERATIONS = ['+', '-', '*', '/']

export { NUMBERS, OPERATIONS, TEXT_KEYS, KEYS }
