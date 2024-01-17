import { NumberBase } from "../types/NumberBase"

function maskExpression(expression: string[]) {
	for (let i = 0; i < expression.length; i++) {
		if (!isNaN(Number(expression[i]))) {
			expression[i] = maskNumber(expression[i], true)
		}
	}

	return expression
}

function maskNumber(
	str: string,
	parenthesis: boolean = false,
	base: NumberBase = 'dec',
	decimalPlaces?: number
) {
	const maskDecimal = () => {
		if (isNaN(Number(str)) || !(/^-?\d*\.?\d+.?$/).test(str)) {
			return str
		}

		if (decimalPlaces) {
			str = Number(str).toFixed(decimalPlaces)
		}

		const decimalSeparatorPos = str.indexOf('.')
		const negative = Number(str) < 0
		str = negative ? str.substring(1) : str

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
			num.push(`,${decimalPart ?? ''}`)
		}

		if (negative) {
			num.unshift('-')

			if (parenthesis) {
				num.unshift('(')
				num.push(')')
			}
		}

		return num.join('')
	}

	const maskOtherBases = (spacePos: number) => {
		const digits = str.split('')
		const num: string[] = []
		let i = 0

		for (let pos = digits.length - 1; pos >= 0; pos--) {
			num.unshift(digits[pos])
			i++

			if (i % spacePos === 0 && i < digits.length) {
				num.unshift(' ')
			}
		}

		return num.join('')
	}

	switch (base) {
		case 'dec':
			return maskDecimal()
		case 'oct':
			return maskOtherBases(3)
		default:
			return maskOtherBases(4)
	}
}

export { maskNumber, maskExpression }
