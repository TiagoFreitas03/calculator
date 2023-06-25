import { NUMBERS } from "../constants/KEYS"
import { onlyNumbers } from "./only-numbers"

export function append(entry: string, key: string) {
	if (NUMBERS.includes(key)) { // 0..9
		if (onlyNumbers(entry).length < 15) {
			entry = entry === '0' ? key : entry + key
		}
	}
	else if (key === '.' && !entry.includes(key)) {
		if (onlyNumbers(entry).length < 15) {
			entry = entry + key
		}
	}

	return entry
}
