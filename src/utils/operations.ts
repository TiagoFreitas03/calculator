export type Operators = '' | '+' | '-' | '/' | '*'

export function calc(value: number, operation: Operators, result: string) {
	const num = Number(result)
	let res = 0

	if (operation === '' || isNaN(num)) {
		return res
	}

	if (operation === '+')
		res = value + num
	else if (operation === '-')
		res = value - num
	else if (operation === '*')
		res = Number((value * num).toFixed(2))
	else if (operation === '/') {
		if (num === 0)
			alert('Não é possível dividir por 0')
		else
			res = value / num
	}

	return res
}
