function maskExpression(expression: string[]) {
	for (let i = 0; i < expression.length; i++) {
		if (!isNaN(Number(expression[i]))) {
			expression[i] = maskNumber(expression[i], true)
		}
	}

	return expression
}

function maskNumber(str: string, parenthesis: boolean = false) {
	if (isNaN(Number(str)) || str === 'Infinity') {
		return str
	}

	const decimalSeparatorPos = str.indexOf('.')
	let integerPart = str
	let decimalPart = ''

	if (decimalSeparatorPos > 0) {
		integerPart = str.split('.')[0]
		decimalPart = str.split('.')[1]
	}

	const num: string[] = []
	const digits = integerPart.split('')
	let i = 0

	for (let pos = digits.length - 1; pos >= 0; pos--) {
		num.unshift(digits[pos])
		i++

		if (i % 3 === 0 && i < digits.length) {
			num.unshift('.')
		}
	}

	if (decimalSeparatorPos > 0) {
		num.push(`,${decimalPart}`)
	}

	if (Number(num.join('')) < 0 && parenthesis) {
		num.unshift('(')
		num.push(')')
	}

	return num.join('')
}

export { maskNumber, maskExpression }
