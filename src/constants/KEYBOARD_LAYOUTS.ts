import {
	BACKSPACE_BUTTON,
	CLEAR_ALL_BUTTON,
	CLEAR_ENTRY_BUTTON,
	EQUALS_BUTTON,
	HEX_KEYS,
	OPERATOR_KEYS,
	PERCENT_BUTTON
} from './BUTTONS'
import { Button } from '../interfaces/Button'

interface KeyboardLayout {
	topKeys?: Button[]
	rightKeys: Button[]
}

const CALCULATOR: KeyboardLayout = {
	topKeys: [CLEAR_ALL_BUTTON, CLEAR_ENTRY_BUTTON, PERCENT_BUTTON],
	rightKeys: [...OPERATOR_KEYS, EQUALS_BUTTON]
}

const COMMON: KeyboardLayout = {
	rightKeys: [CLEAR_ENTRY_BUTTON, BACKSPACE_BUTTON]
}

const HEX: KeyboardLayout = {
	topKeys: HEX_KEYS,
	rightKeys: COMMON.rightKeys
}

export const KEYBOARD_LAYOUTS = { CALCULATOR, COMMON, HEX }
