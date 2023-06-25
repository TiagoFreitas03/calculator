export function reverseSignal(value: string) {
	const num = Number(value)

	return isNaN(num) ? value : (num * (-1)).toString()
}
