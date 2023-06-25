export function percent(value: string) {
	const num = Number(value)

	return isNaN(num) ? value : (num * 0.01).toString()
}
