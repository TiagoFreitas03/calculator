import { NUMBERS, OPERATIONS } from "../constants/KEYS"
import { onlyNumbers } from "./only-numbers"

function append(entry: string, key: string) {
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

function erase(entry: string) {
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

function percent(value: string) {
	const num = Number(value)

	return isNaN(num) ? value : (num * 0.01).toString()
}

function reverse(value: string) {
	const num = Number(value)

	return isNaN(num) ? value : (num * (-1)).toString()
}

function calculate(expression: string[]) {
	let left = 0, right = 0
	let operator = ''

	function validateExpression() {
		if (expression.length !== 3) {
			return false
		}

		[left, operator, right] = [Number(expression[0]), expression[1], Number(expression[2])];

		return !(isNaN(left) || isNaN(right) || !OPERATIONS.includes(expression[1]))
	}

	const result = () => {
		if (!validateExpression()) {
			return '0'
		}

		const format = (num: number) => Number(num.toPrecision(15)).toString()

		switch (operator) {
			case '+': return format(left + right)
			case '-': return format(left - right)
			case '*': return format(left * right)
			default:
				if (right !== 0) {
					return format(left / right)
				}

				throw new Error('Não é possível dividir por zero')
		}
	}

	try {
		return result()
	}
	catch (err) {
		throw err
	}
}

function addOperator(expression: string[], entry: string, operator: string, replace = false) {
	if (!OPERATIONS.includes(operator)) {
		return { expression, entry, calculated: false }
	}

	let result = entry
	let calculated = false

	if (expression.length === 2) {
		if (replace) {
			expression.splice(1, 1, operator)
		}
		else {
			try {
				result = calculate(expression.concat(entry))
				calculated = true
			}
			catch (err) {
				throw err
			}
		}
	}

	return {
		expression: [Number(result).toString(), operator],
		entry: result,
		calculated
	}
}

export { append, erase, percent, reverse, calculate, addOperator }
