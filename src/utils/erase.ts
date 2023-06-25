export function erase(entry: string) {
	if (entry.length > 1) {
		entry = entry.substring(0, entry.length - 1)

		if (entry === '-') {
			entry = '0'
		}
	}
	else if (entry !== '0') {
		entry = '0'
	}

	return entry
}
